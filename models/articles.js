const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient


function getAllarticles(take, skip){
    return prisma.Article.findMany({
        skip: skip,
        take: take,
        where: {
            published: true,
        },
    },
)}

function getarticle(id){
    return prisma.Article.findUnique({where: {id}})
}

function getarticle_user(id_user){
    return prisma.Article.findMany({where: {
        utilisateurId: id_user,
    },
})
}

function addarticle(article){
    return prisma.Article.create({data: article})
}


function updatearticle(id, article){
    return prisma.Article.update({
        where: {id},
        data: article
    })
}
function delarticle(id){
    return prisma.Article.delete({where: {id}})
}

function getComment(id){
    return prisma.Article.findUnique({
        where: {
          id: id,
        },
        include: {
            commentaires: true,
        },
      })
}
 
module.exports = {
        getAllarticles,
        getarticle,
        addarticle,
        delarticle,
        updatearticle,
        getarticle_user,
        getComment
}