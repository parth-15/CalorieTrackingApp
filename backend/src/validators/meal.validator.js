import Joi from 'joi';

const mealCreateValidator = Joi.object({
  type: Joi.string().required(),
});

const mealUpdateValidator = Joi.object({
  type: Joi.string().required(),
});

export { mealCreateValidator, mealUpdateValidator };
