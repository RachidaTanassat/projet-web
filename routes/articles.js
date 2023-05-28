var express = require('express');
var router = express.Router();
const {getAllarticles, getarticle, addarticle, updatearticle, delarticle, getarticle_user, getComment } = require('../models/articles.js')


/* GET articles listing. */
router.get('/', function(req, res, next) {
  const take = Number(req.query.take) || 10
	const skip = Number(req.query.skip) || 0
     getAllarticles(take, skip).then(articles => res.json(articles))
});

router.get('/:id', function(req, res, next) {
  getarticle(+req.params.id).then(article => res.json(article))
});

router.get('/user/:id_user', function(req, res, next) {
  getarticle_user(+req.params.id_user).then(article => res.json(article))
});

router.get('/commentaires/:id', function(req, res, next) {
  getComment(+req.params.id).then(article => res.json(article))
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
