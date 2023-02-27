const mysql = require("mysql2/promise");

async function query_classname(class_name) {
    try{
        const con = await mysql.createConnection({
            user: 'root',
            host: 'localhost',
            database: 'ccu',
            password: 'asd63254'
        });
        let str = "SELECT * FROM `course` where class_name like '" + class_name + "%';";
        let [result] = await con.execute(str);
        // console.log(result);
        con.end();
        return result;
    }catch(e){
        console.log(e);
    }
}

exports.query_classname = query_classname;