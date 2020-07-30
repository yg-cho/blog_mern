const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileExInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Experience title is required';
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = 'Experience company is required';
    }

    if (!Validator.isDate(data.from)) {
        errors.from = 'Experience from is not DateType'
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = 'Experience from is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}