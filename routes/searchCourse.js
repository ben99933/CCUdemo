var express = require('express');
var router = express.Router();
var controller = require('../controllers/courseSearchController');
const regex = require('../utils/myRegex');

router.get('/', async function(req, res) {
  const keyword = req.query.keyword;
  //keyword可能還要經過處理，例如去除空白、轉小寫等等
  //keyword = keyword.trim().toLowerCase();

  //=============讓controller幫我們查==========
  if(regex.checkChineseEnglishNum(keyword)==false){
    res.send(null);
  }else{
    //console.log("keyword: "+keyword);
    var array = await controller.searchCourses(keyword);
    //console.log(array);
    res.send(array);
  }
  
});

module.exports = router;



