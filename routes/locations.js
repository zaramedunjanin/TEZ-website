var express = require('express');
var router = express.Router();
const baza = require('../funkcije/Baza');

/* GET home page. */
router.get('/', baza.uzmi_sve_institucije, function(req, res, next) {
    if(req.isAuthenticated())
        res.render('locations', { title: 'TEZ',locations:req.body.locations,events:req.body.events, layout:"layoutLogin"});
    else
        res.render('locations', { title: 'TEZ',locations:req.body.locations, events:req.body.events });
});
router.get('/:id', baza.uzmi_instituciju, baza.uzmi_event_za_instituciju, function(req, res, next) {
    if(req.isAuthenticated())
        res.render('location', { title: 'TEZ',location:req.body.location, events:req.body.events, layout:"layoutLogin" });
    else
        res.render('location', { title: 'TEZ',location:req.body.location, events:req.body.events });
});

module.exports = router;

