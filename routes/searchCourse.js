var express = require('express');
var router = express.Router();
var controller = require('../controllers/courseSearchController');

router.get('/', async function(req, res) {
  const keyword = req.query.keyword;
  //keyword可能還要經過處理，例如去除空白、轉小寫等等
  //keyword = keyword.trim().toLowerCase();

  //=============讓controller幫我們查==========
  var array = await controller.searchCourse(keyword);
  array = array.map((item)=>{
    let id = item.id;
    let class_name =  item.class_name;
    let teacher = item.teacher;
    let class_time =  item.class_time;
    let class_room = item.class_room;
    return `[${id}] ${class_name}, ${teacher}, ${class_time}, ${class_room}`;
  });
  var result = array.filter(item=>item.includes(keyword));
  //====================================================

  res.send(result);
});


module.exports = router;



