var express = require('express');
var router = express.Router();
var login = require('../funkcije/Login')
var baza = require('../funkcije/Baza')
const {provjeri_usera, ubaci_event} = require("../funkcije/Baza");

/* GET home page. */
router.get('/',login.daj_pristup,baza.uzmi_sve_events,baza.uzmi_instituciju2, function(req, res, next) {
    if(req.user.id_institucije === null)
            res.render('index', { title: 'TEZ', events:req.body.events, location:req.body.location, layout:"layoutLogin" });
    else
        res.render('profile_institution', { title: 'TEZ', events:req.body.events,location:req.body.location, layout:"layoutLogin"});
});

router.post('/', provjeri_usera, ubaci_event);

router.get('/add',login.daj_pristup, function(req, res, next) {
        if(req.isAuthenticated())
            res.render('add_institution', { title: 'TEZ', layout:"layoutLogin"});
        else res.render('add_institution', { title: 'TEZ'});
});


module.exports = router;
