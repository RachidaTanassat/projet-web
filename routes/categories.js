var express = require('express');
var router = express.Router();
const {getAllcategories, getcategorie, addcategorie, updatecategorie, delcategorie} = require('../models/categories.js')


/* GET categories listing. */
router.get('/', function(req, res, next) {
     getAllcategories().then(categories => res.json(categories))
});

router.get('/:id', function(req, res, next) {
  getcategorie(+req.params.id).then(categorie => res.json(categorie))
});
router.post('/', function(req, res, next) {
  addcategorie(req.body).then(categorie => res.json(categorie))
});

router.patch('/:id', function(req, res, next) {
  updatecategorie(+req.params.id, req.body).then(categorie => res.json(categorie))
});

router.delete('/:id', function(req, res, next) {
  delcategorie(+req.params.id).then(categorie => res.json(categorie))
});



module.exports = router;
