const mongoose = require('mongoose');

//Department Schema
const departmentSchema = new mongoose.Schema({
   dept_name:{
    type:String,
    required:true
   }
});

const Department = mongoose.model('Department',departmentSchema);

//News Schema
const newsSchema = new mongoose.Schema({
   title:{
      type:String,
      required:true,
   },
   description:{
      type:String,
      required:true
   }
});

const News = mongoose.model('News',newsSchema);

//Course Schema
const courseSchema = new mongoose.Schema ({
   c_name:{
      type:String,
      required:true
   },
   courseDept:{
      type:String
   },
   c_students:{
      type:[String]
   }
});
const Course = mongoose.model('Course',courseSchema);

exports.Department = Department;
exports.News = News;
exports.Course = Course;
