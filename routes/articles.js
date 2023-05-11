var express = require('express');
var router = express.Router();
const {getAllarticles, getarticle, addarticle, updatearticle, delarticle} = require('../models/articles.js')


/* GET articles listing. */
router.get('/', function(req, res, next) {
     getAllarticles().then(articles => res.json(articles))
});

router.get('/:id', function(req, res, next) {
  getarticle(+req.params.id).then(article => res.json(article))
});
router.post('/', function(req, res, next) {
  addarticle(req.body).then(article => res.json(article))
});

router.patch('/:id', function(req, res, next) {
  updatearticle(+req.params.id, req.body).then(article => res.json(article))
});

router.delete('/:id', function(req, res, next) {
  delarticle(+req.params.id).then(article => res.json(article))
});



module.exports = router;
