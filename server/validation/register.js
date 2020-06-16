const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  console.log("Data:",data)
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.middleName = !isEmpty(data.middleName) ? data.middleName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.dob = !isEmpty(data.dob) ? data.dob : "";
  data.mob_no = !isEmpty(data.mob_no) ? data.mob_no : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.altEmail = !isEmpty(data.altEmail) ? data.altEmail : "";
  data.address1 = !isEmpty(data.address1) ? data.address1 : "";
  data.address2 = !isEmpty(data.address2) ? data.address2 : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.pincode = !isEmpty(data.pincode) ? data.pincode : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.fname = !isEmpty(data.fname) ? data.fname : "";
  data.fat_mob_no = !isEmpty(data.fat_mob_no) ? data.fat_mob_no : "";
  data.fth_email = !isEmpty(data.fth_email) ? data.fth_email : "";
  data.fOccu = !isEmpty(data.fOccu) ? data.fOccu : "";
  data.mname = !isEmpty(data.mname) ? data.mname : "";
  data.mth_mob_no = !isEmpty(data.mth_mob_no) ? data.mth_mob_no : "";
  data.mth_email = !isEmpty(data.mth_email) ? data.mth_email : "";
  data.mOccu = !isEmpty(data.mOccu) ? data.mOccu : "";
  data.enroll = !isEmpty(data.enroll) ? data.enroll : "";
  data.deptartment = !isEmpty(data.department) ? data.department:"";
  data.course = !isEmpty(data.course) ? data.course : "";
  data.branch = !isEmpty(data.branch) ? data.branch : "";

// Name checks
  if (Validator.isEmpty(data.firstName)) {
    errors.name1 = "First Name is required";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.name2 = "Last Name is required";
  }
//Gender checks
  if (Validator.isEmpty(data.gender)) {
    errors.name3 = "Gender is required"
  }
//DOB checks
  if (Validator.isEmpty(data.dob)) {
    errors.name4 = "Date of Birth is required"
  }
//Mobile Number checks
  if (Validator.isEmpty(data.mob_no)) {
    errors.name5 = "Mobile No. is required"
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email1 = "Email field is required";
  }
  // } else if (!Validator.isEmpty(data.email2)) {
  //   errors.email2 = "Email is invalid";
  // }
//Address checks
  if (Validator.isEmpty(data.address1)) {
    errors.name5 = "Address is required"
  }
//City checks
  if (Validator.isEmpty(data.city)) {
    errors.name6 = "City is required"
  } 
  //Mobile Number checks
  if (Validator.isEmpty(data.pincode)) {
    errors.name7 = "Pincode is required"
  }
  //Mobile Number checks
  if (Validator.isEmpty(data.state)) {
    errors.name8 = "State is required"
  }
  //Mobile Number checks
  if (Validator.isEmpty(data.country)) {
    errors.name9 = "Country is required"
  }
  //Mobile Number checks
  if (Validator.isEmpty(data.fname)) {
    errors.name10 = "Father's Name is required"
  }
  //Mobile Number checks
  if (Validator.isEmpty(data.fat_mob_no)) {
    errors.name11 = "Father's Mobile No. is required"
  } 
  //Mobile Number checks
  if (Validator.isEmpty(data.fth_email)) {
    errors.name12 = "Father's Email id is required"
  } 
  //Mobile Number checks
  if (Validator.isEmpty(data.fOccu)) {
    errors.name13 = "Father's Occupation is required"
  } 
  //Mobile Number checks
  if (Validator.isEmpty(data.mname)) {
    errors.name14 = "Mother's Name is required"
  }
  //Mobile Number checks
  if (Validator.isEmpty(data.mth_mob_no)) {
    errors.name15 = "Mother's Mobile No. is required"
  } 
  //Mobile Number checks
  if (Validator.isEmpty(data.mth_email)) {
    errors.name16 = "Mother's Email id is required"
  } 
  //Mobile Number checks
  if (Validator.isEmpty(data.mOccu)) {
    errors.name17 = "Mother's Occupation is required"
  } 
   //Mobile Number checks
   if (Validator.isEmpty(data.enroll)) {
    errors.name18 = "Emrollment No. is required"
  } 
   //Mobile Number checks
   if (Validator.isEmpty(data.department)) {
    errors.name19 = "Department is required"
  } 
  
return {
    errors,
    isValid: isEmpty(errors)
  };
};