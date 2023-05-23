const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient
const { hashPassword } = require('../authentification/hashage.js')


function getAllUsers(){
    return prisma.utilisateur.findMany()
}

function getUser(id){
    return prisma.utilisateur.findUnique({where: {id}})
}

const addUser = async(user)=>{
    
	const hash = await hashPassword(user.password);
	return prisma.utilisateur.create ({
			data: {
				nom: user.nom,
				email: user.email,
				password: hash,
				role: user.role,
			},
		})
}

const  updateUser = async(id, user)=>{
    const hash = await hashPassword(user.password);
    return prisma.utilisateur.update({
        where: {id},
        data: {
            nom: user.nom,
            email: user.email,
            password: hash,
            role: user.role,
        },
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