var express = require('express');
var router = express.Router();


router.get("/new", function(req, res) {
    res.redirect('https://ccuclass.com/');
});

module.exports = router;