import Joi from 'joi';

const foodEntryCreateValidator = Joi.object({
  name: Joi.string().required(),
  date: Joi.string().date().required(),
  time: Joi.number().required(),
  calories: Joi.number().required(),
  user: Joi.string().required(),
  meal: Joi.string().required(),
});

const foodEntryUpdateValidator = Joi.object({
  name: Joi.string().required(),
  date: Joi.string().date().required(),
  time: Joi.number().required(),
  calories: Joi.number().required(),
  user: Joi.string().required(),
  meal: Joi.string().required(),
});

export { foodEntryCreateValidator, foodEntryUpdateValidator };
