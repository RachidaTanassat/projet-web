const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient


function getAllUsers(){
    return prisma.utilisateur.findMany()
}

function getUser(id){
    return prisma.utilisateur.findUnique({where: {id}})
}

function addUser(user){
    return prisma.utilisateur.create({data: user})
}

function updateUser(id, user){
    return prisma.utilisateur.update({
        where: {id},
        data: user
    })
}
function delUser(id){
    return prisma.utilisateur.delete({where: {id}})
}
 
module.exports = {
        getAllUsers,
        getUser,
        addUser,
        delUser,
        updateUser
}