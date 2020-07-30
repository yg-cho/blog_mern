const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileEduInput(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.school)) {
        errors.school = 'Education school is required';
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'Education degree is required';
    }

    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Education fieldofstudy is required';
    }

    if(!Validator.isDate(data.from)) {
        errors.from = 'Education From is not DateType'
    }

    if (Validator.isEmpty(data.from)){
        errors.from = 'Education from is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}