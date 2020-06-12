const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const {Department,News,Course} = require('../../models/Admin/Admin.js');
const Joi = require('joi');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");


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

//CRUD Functions for Course
router.post('/course',async(req,res)=>{
    let course = new Course({
        c_name:req.body.c_name,
        c_students:req.body.c_students,
        courseDept:req.body.courseDept
    });
    await course.save();
    res.send(course); 
})
module.exports = router;