var express = require('express');
var router = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient
const bcrypt = require('bcryptjs');


router.post("/",  async (req, res) => {

    const body = req.body;
    const user = await prisma.Utilisateur.findUnique({
      where: {
        email: req.body.email, 
      },
    })
  
    if (user) {
    // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.status(200).json({success: "Valid password",
        data: user
        
      });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
     }
  
    
  
  });
  


  module.exports = router;