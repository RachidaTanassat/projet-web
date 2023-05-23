var express = require('express');
var router = express.Router();
const {getAllUsers, getUser, addUser, updateUser, delUser} = require('../models/users.js')


/* GET users listing. */
router.get('/', function(req, res, next) {
     getAllUsers().then(users => res.json(users))
});

router.get('/:id', function(req, res, next) {
  getUser(+req.params.id).then(user => res.json(user))
});
router.post('/', function(req, res, next) {
  
    addUser(req.body)
    .then((user) => {
			res.status(200).json(user)
		})
		.catch((err) => {
			res.status(500).json(err)
      console.log('email already exist!!')
		})
});

router.patch('/:id', function(req, res, next) {
  updateUser(+req.params.id, req.body).then(user => res.json(user))
});

router.delete('/:id', function(req, res, next) {
  delUser(+req.params.id).then(user => res.json(user))
});





module.exports = router;
