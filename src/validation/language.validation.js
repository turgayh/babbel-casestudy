const validateRequest = require("../middleware/validate-request");
const Joi = require("joi");

function createLanguageValidation(req, res, next) {
  const validate = Joi.object({
    name: Joi.string().required().max(20),
    code: Joi.string().required().max(2),
  });
  validateRequest(req, next, validate);
}

function updatePictureValidation(req, res, next) {
  const validate = Joi.object({
    id: Joi.number().required().max(100),
    picture_code: Joi.string().base64().required(),
  });
  validateRequest(req, next, validate);
}

function updateUserValidation(req, res, next) {
  const validate = Joi.object({
    name: Joi.string().required().max(100),
    username: Joi.string().required().max(100),
    lastname: Joi.string().required().max(100),
    password: Joi.string().max(250),
  });
  validateRequest(req, next, validate);
}




function updateLanguageFieldValidation(req, res, next) {
  const body = Joi.object({
    name: Joi.string().max(50),
    code: Joi.string().max(2),
  });
  validateRequest(req, next, body);
}



module.exports = {
  updatePictureValidation,
  updateUserValidation,
  createLanguageValidation,
  updateLanguageFieldValidation,
};
