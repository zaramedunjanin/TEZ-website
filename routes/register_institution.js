var express = require('express');
var router = express.Router();
var login = require('../funkcije/Login')
var baza = require('../funkcije/Baza')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register_institution', { title: 'Institution' });
});

router.post('/', baza.ubaci_instituciju)

module.exports = router;
