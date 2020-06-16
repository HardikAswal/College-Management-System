const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const {Department,News,Branch,Course,Timetable} = require('../../models/Admin/Admin.js');
const Joi = require('joi');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");
const multer = require('multer');

let filePath;

//Admin Login
router.post("/login",async(req, res) => {
    // Form validation
    console.log(req.body)
      const { error } = validateLogin(req.body);
      if (error) return res.status(400).json(error);
    
      const id = req.body.id;
      const password = req.body.password;
    
      const loginID="admin@1234";
      const loginPassword="admin@1234";

      if(id != loginID) return res.status(400).send("Invalid ID");  
    //   const validPassword=password.localeCompare(loginPassword);
    //   console.log(validPassword);
      if(password != loginPassword) return res.status(400).send('Invalid Password.');
    
      const payload = {
        id:100,
        role:"Admin"
      };
    
      const token = await jwt.sign(payload,keys.secretOrKey,{expiresIn:31556926});
    
      res.status(200).header('x-auth-token',token).send("Successfully logged in.");
      });

function validateLogin(req){
    const schema = {
        id:Joi.string(),
        password:Joi.string()
    }
    return Joi.validate(req,schema);
}      

//CRUD Functions for Department
router.get('/department',async(req,res)=>{
    const departments = await Department.find();
    res.send(departments);
});

router.get('/department/:id',(req,res)=>{

});

router.post('/department',async(req,res)=>{
    let department = await Department.find({d_name:req.body.d_name});
    if(department) res.status(400).send('Department already exists.');

    console.log(req.body);

    const dept = new Department({
        dept_name:req.body.dept_name
    });

    await dept.save();
    res.send(dept);
});

router.put('/department',(req,res)=>{

});

router.delete('/department',(req,res)=>{

});


//CRUD Functions for News
router.get('/news',async(req,res)=>{
    const news = await News.find();
    res.send(news);
});
router.post('/news',async(req,res)=>{
    console.log(req.body);
    let news = new News({
        title:req.body.title,
        description:req.body.description
    });

    await news.save();
    res.send(news);
});

//CRUD Functions for Branch
router.get('/branch',async(req,res)=>{
    const course = await Branch.find();
    res.send(course);
});
router.post('/branch',async(req,res)=>{
    let branch = new Branch({
        branchName:req.body.branchName,
        branch_students:req.body.branch_students,
        branchDept:req.body.branchDept
    });
    await branch.save();
    res.send(branch); 
})

//CRUD Functions for Course
router.get('/course',async(req,res)=>{
    const course = await Course.find();
    res.send(course);
});
router.post('/course',async(req,res)=>{
    let course = new Course({
        courseName:req.body.courseName,
        courseCode:req.body.courseCode,
        courseBranch:req.body.courseBranch,
        courseDept:req.body.courseDept,
        courseStudents:req.body.courseStudents,
    });
    await course.save();
    res.send(course); 
});

router.put('/course/:id',async(req,res)=>{
    console.log(req.body)
    const course = await Course.findByIdAndUpdate(req.params.id,{
      $push:{
        courseStudents:req.body
      }
    },{new:true});
  
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    
    res.send(course);
});

//CRUD for Timetable
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, '../client/public/images')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname )
  }
});

var timetable = multer({storage:storage}).single('timetable')

router.post('/timetable',timetable,(req, res)=> {
    console.log(req.file);
    
    timetable(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      console.log("File:"+req.file);
      filePath = req.file;
      return res.status(200).send(req.file)
    })
});


module.exports = router;