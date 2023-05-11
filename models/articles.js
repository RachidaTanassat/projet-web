const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient


function getAllarticles(){
    return prisma.Article.findMany()
}

function getarticle(id){
    return prisma.Article.findUnique({where: {id}})
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
 
module.exports = {
        getAllarticles,
        getarticle,
        addarticle,
        delarticle,
        updatearticle
}