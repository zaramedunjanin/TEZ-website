var express = require('express');
var router = express.Router();
const baza = require('../funkcije/Baza');

/* GET home page. */
router.get('/', baza.uzmi_8, function(req, res, next) {
  if(req.isAuthenticated()){
    if(req.user.id_institucije === null)
      res.render('index', { title: 'TEZ',events:req.body.events, layout:"layoutLogin" });
    else
      res.redirect('/profile');
  }
  else
    res.render('index', { title: 'TEZ', events:req.body.events});
});



module.exports = router;
