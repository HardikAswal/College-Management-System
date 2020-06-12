const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  enroll: {
    type: Number,
    required:true,
    unique:true
  },
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
    required: true,
    unique:true
  },
  altEmail: {
    type: String,
    unique:true
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
  fname: {
    type:String,
    required:true
  },
  fat_mob_no:{
    type:String,
    required:true
  },
  fth_email:{
    type:String,
    required:true,
    unique:true
  },
  fOccu:{
    type:String,
    required:true
  },
  mname:{
    type:String,
    required:true
  },
  mth_mob_no:{
    type:String,
    required:true
  },
  mth_email:{
    type:String,
    required:true,
    unique:true
  },
  mOccu:{
    type:String,
    required:true
  },
  course: {
    type: String,
    required:true,
  },
  branch: {
    type:String
  }
});
module.exports = User = mongoose.model("users", UserSchema);