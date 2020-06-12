const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const FacultySchema = new Schema({
  password: {
    type:String
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required:true
  },
  dob: {
    type:Date,
    required:true
  },
  mob_no: {
    type: Number,
    required:true
  },
  email: {
    type: String,
    required: true
  },
  altEmail: {
    type: String
  },
  address1: {
    type: String,
    required:true
  },
  address2: {
    type:String
  },
  city: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type:String,
    required:true
  },
  id: {
    type: Number,
    required:true
  },
  courses: {
    type: [String],
    required:true,
  },
  dept:{
    type:String,
    required:true
  },
  branch: {
    type:String
  }
});
module.exports = Faculty = mongoose.model("faculty", FacultySchema);
