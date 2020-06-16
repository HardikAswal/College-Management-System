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
const branchSchema = new mongoose.Schema ({
   branchName:{
      type:String,
      required:true
   },
   branchDept:{
      type:String,
      required:true
   },
   branch_students:{
      type:[String]
   }
});
const Branch = mongoose.model('Branch',branchSchema);

//Course Schema
const courseSchema = new mongoose.Schema ({
   courseName:{
      type:String,
      required:true
   },
   courseCode:{
      type:String,
      required:true
   },
   courseBranch:{
      type:String,
      required:true
   },
   courseDept:{
      type:String,
      required:true
   },
   courseStudents:{
      type:[Object]
   }
});
const Course = mongoose.model('Course',courseSchema);



exports.Department = Department;
exports.News = News;
exports.Branch = Branch;
exports.Course = Course;
