const Joi = require("joi");

addValidation = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  birth_date: Joi.date().required(),
});

module.exports = {
  addValidation,
};
