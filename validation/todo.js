const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTodoInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  if (!Validator.isLength(data.name, { min: 10, max: 150})) {
    errors.name = "Name is invalid";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};