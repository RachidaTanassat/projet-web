var express = require('express');
var router = express.Router();
const {getAllcommentaires, getcommentaire, addcommentaire, updatecommentaire, delcommentaire} = require('../models/commentaires.js')


/* GET commentaires listing. */
router.get('/', function(req, res, next) {
     getAllcommentaires().then(commentaires => res.json(commentaires))
});

router.get('/:id', function(req, res, next) {
  getcommentaire(+req.params.id).then(commentaire => res.json(commentaire))
});
router.post('/', function(req, res, next) {
  addcommentaire(req.body).then(commentaire => res.json(commentaire))
});

router.patch('/:id', function(req, res, next) {
  updatecommentaire(+req.params.id, req.body).then(commentaire => res.json(commentaire))
});

router.delete('/:id', function(req, res, next) {
  delcommentaire(+req.params.id).then(commentaire => res.json(commentaire))
});



module.exports = router;
