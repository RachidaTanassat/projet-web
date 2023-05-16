const { faker } = require('@faker-js/faker');
const _ = require('lodash');
const {PrismaClient} = require('@prisma/client');
const e = require('express');
const prisma = new PrismaClient




async function createSeedData() {
  try {
    // create 10 users with role "AUTHOR"
    const users = [];
    for (let i = 0; i < 10; i++) {
       const user = await prisma.Utilisateur.create({
        data: {
        nom: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'AUTHOR',
        }
      }).then();
      users.push(user);
 }
  // create 1 user with role "ADMIN"
  prisma.Utilisateur.create({
    data: {
      nom: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'ADMIN',
    },
  }).then();


   // create 10 categories
   const categories = [];
   for (let i = 0; i < 10; i++) {
     const category = await prisma.Categorie.create({
        data:{
       nom: faker.lorem.word(),
        },
     }).then();
     categories.push(category);
   }


    // create 100 articles
    for (let i = 0; i < 100; i++) {
    // create 0 to 20 comments for each article
      const numComments = Math.floor(Math.random() * 21);
        const commentaires = [];
      for (let j = 0; j < numComments; j++) {
        const comment = await prisma.Commentaire.create({
        data:{
            email: faker.internet.email(),
            contenu: faker.lorem.sentence(),
            },
        }).then();
         commentaires.push(comment);
      }

        prisma.Article.create({ 
        data:{
        titre: faker.lorem.sentence(),
        contenu: faker.lorem.paragraphs(),
        image : faker.image.avatar(),
        published: faker.datatype.boolean(),
        utilisateurId: users[Math.floor(Math.random() * users.length)].id,
        commentaires:{
            connect: commentaires.map(c => ({ id: c.id })),
         },
        categories: {
            connect: _.sampleSize(categories, _.random(1, 4)).map(c => ({ id: c.id })),
          },
      },
    }).then();
    }
  
    

    console.log('Seed data created successfully.');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
Promise.all([
    prisma.Utilisateur.deleteMany(),
    prisma.Categorie.deleteMany(),
    prisma.Article.deleteMany(),
    prisma.Commentaire.deleteMany()
  ]).then(console.log('suppression bien effectue'))
.then(createSeedData());
