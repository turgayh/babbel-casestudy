const validateRequest = require("../middleware/validate-request");
const Joi = require("joi");

function createCourseValidation(req, res, next) {
  const validate = Joi.object({
    name: Joi.string().required().max(20),
    user_id: Joi.number().required().max(100),
    lesson_ids: Joi.array().required().items(Joi.number())
  });
  validateRequest(req, next, validate);
}

module.exports = {
  createCourseValidation
};
