import Joi from '@hapi/joi';
Joi.objectId = require('joi-objectid')(Joi);

const schema = Joi.object({
	name: Joi.string().required(),
	kind: Joi.string().required(),
	img: Joi.string().required(),
	ingredients: Joi.string().required(),
	recipe: Joi.string().required(),
	user: Joi.objectId().required()
});

const validateRecipe = data => {
	return schema.validate(data, { abortEarly: false });
};

export default validateRecipe;
