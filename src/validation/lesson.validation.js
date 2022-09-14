const validateRequest = require("../middleware/validate-request");
const Joi = require("joi");

function createLessonValidation(req, res, next) {
  const validate = Joi.object({
    name: Joi.string().required().max(100),
    lesson_text: Joi.string().required().max(250),
    lang_id: Joi.number().required(),
  });
  validateRequest(req, next, validate);
}

function updateLessonFieldValidation(req, res, next) {
  const body = Joi.object({
    name: Joi.string().max(50),
    lesson_text: Joi.string().max(250),
  });
  validateRequest(req, next, body);
}



module.exports = {
  createLessonValidation,
  updateLessonFieldValidation
};
