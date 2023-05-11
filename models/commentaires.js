const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient


function getAllcommentaires(){
    return prisma.Commentaire.findMany()
}

function getcommentaire(id){
    return prisma.Commentaire.findUnique({where: {id}})
}

function addcommentaire(commentaire){
    return prisma.Commentaire.create({data: commentaire})
}

function updatecommentaire(id, commentaire){
    return prisma.Commentaire.update({
        where: {id},
        data: commentaire
    })
}
function delcommentaire(id){
    return prisma.Commentaire.delete({where: {id}})
}
 
module.exports = {
        getAllcommentaires,
        getcommentaire,
        addcommentaire,
        delcommentaire,
        updatecommentaire
}