var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  const keyword = req.query.keyword;
  //keyword可能還要經過處理，例如去除空白、轉小寫等等


  //=============這裡要用到資料庫用keyword去搜尋==========
  var list = ["test1", "test2", "test3"];
  var result = list.filter(item=>item.includes(keyword));
  //====================================================

  res.send(result);
});


module.exports = router;



