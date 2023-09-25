const Joi = require('joi');

const register = {
    body: Joi.object().keys({
      title: Joi.string().required(),
      venue: Joi.string().required(),
      organizer: Joi.string().required(),
      date: Joi.string().required(),
      price: Joi.number().required(),
      profileImage: Joi.string(),
      coverImage: Joi.string().required(),
      description: Joi.string(),
    }),
  };

module.exports = {
    register
}