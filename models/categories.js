const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient


function getAllcategories(){
    return prisma.Categorie.findMany()
}

function getcategorie(id){
    return prisma.Categorie.findUnique({where: {id}})
}

function addcategorie(categorie){
    return prisma.Categorie.create({data: categorie})
}

function updatecategorie(id, categorie){
    return prisma.Categorie.update({
        where: {id},
        data: categorie
    })
}
function delcategorie(id){
    return prisma.Categorie.delete({where: {id}})
}
 
module.exports = {
        getAllcategories,
        getcategorie,
        addcategorie,
        delcategorie,
        updatecategorie
}