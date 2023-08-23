var express = require('express');
var router = express.Router();
var Baza = require('../funkcije/Baza');
var login = require('../funkcije/Login');

/* GET home page. */
router.get('/', login.provjeri_logovanje, function(req, res, next) {
  res.render('register', { title: 'Register'});
});

router.post('/', Baza.provjeri_lokaciju, Baza.provjeri_postojanje_korisnika, Baza.ubaci_korisnika);

module.exports = router;
