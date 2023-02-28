const database = require('../config/database');
const model = require('../models/courseModel');

const controller = {
    async searchCourse(keyword){
        let result = await model.getCourses(keyword);
        return result;
    }
};
module.exports = controller;