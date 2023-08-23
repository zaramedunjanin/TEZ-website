var express = require('express');
var router = express.Router();
const baza = require('../funkcije/Baza');
const login = require('../funkcije/Login');
const passport = require('passport');


/* GET home page. */
router.get('/', login.provjeri_logovanje, (req, res) => {
    res.render('login.ejs', {title:"Login"})
})

router.post('/', login.provjeri_logovanje, passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}))



module.exports = router;
