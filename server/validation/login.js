const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.enroll = !isEmpty(data.enroll) ? data.enroll : "";
  data.password = !isEmpty(data.password) ? data.password : "";
// Email checks
  if (Validator.isEmpty(data.enroll)) {
    errors.enroll = "Enrollment Number field is required";
  } 
  // else if (!Validator.isEnroll(data.enroll)) {
  //   errors.enroll = "Enrollment Number is invalid";
  // }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};