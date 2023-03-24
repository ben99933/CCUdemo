const model = require('../models/courseModel');

const controller = {
    async searchCourses(keyword){
        let result = await model.getCourses(keyword);
        return result;
    }
};
module.exports = controller;