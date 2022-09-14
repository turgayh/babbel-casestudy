const validateRequest = require("../middleware/validate-request");
const Joi = require("joi");

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

function createUserValidation(req, res, next) {
  const validate = Joi.object({
    name: Joi.string().required().max(100),
    username: Joi.string().required().max(100),
    lastname: Joi.string().required().max(100),
    password: Joi.string().required().max(250),
    picture_code: Joi.string().base64().required(),
  });
  validateRequest(req, next, validate);
}


function updateUserFieldValidation(req, res, next) {
  const body = Joi.object({
    name: Joi.string().max(100),
    code: Joi.string().max(100),
    lastname: Joi.string().max(100),
    password: Joi.string().max(250),
  });
  validateRequest(req, next, body);
}



module.exports = {
  updatePictureValidation,
  updateUserValidation,
  createUserValidation,
  updateUserFieldValidation,
};
