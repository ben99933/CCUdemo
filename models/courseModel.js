const { resolve } = require('path');
const database = require('../config/database');

class Course{

}


const model = {
    async getCourses(class_name){
        let str = `SELECT * FROM course where class_name like '%${class_name}%';`;
        return new Promise((resolve, reject) => {
            database.query(str, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    //console.log(result);
                    resolve(result);
                }
            });
        });
    }
}

module.exports = model;