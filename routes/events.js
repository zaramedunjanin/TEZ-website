var express = require('express');
var router = express.Router();
const baza = require('../funkcije/Baza');

/* GET home page. */
router.get('/', baza.uzmi_sve_events, function(req, res, next) {
    if(req.isAuthenticated())
        res.render('events', { title: 'TEZ',events:req.body.events, layout:"layoutLogin" });
    else
        res.render('events', { title: 'TEZ',events:req.body.events});
});
router.get('/:id', baza.uzmi_event, function(req, res, next) {
    if(req.isAuthenticated())
        res.render('event', { title: 'TEZ',event:req.body.event, layout:"layoutLogin" });
    res.render('event', { title: 'TEZ',event:req.body.event });
});

module.exports = router;
