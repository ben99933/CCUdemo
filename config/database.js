var mysql = require('../config/mysqlDB');
var postgre = require('../config/postgreSQL');

var connection = null;
if(process.env.USING_DATABASE== "postgre"){
  console.log("using postgre");
  connection = postgre;
}else if(process.env.USING_DATABASE== "mysql"){
  console.log("using mysql");
  connection = mysql;
}else{
  console.log("please choose a database!!");
  exit();
}

module.exports = connection;