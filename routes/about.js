var express = require('express');
var router = express.Router();


router.get('/about', function(req, res) {
  try{
    console.log(req);
    res.render('about');
  }catch(err){
    console.log(err);
  }
  
});

module.exports = router;