import Joi from '@hapi/joi';

const schema = Joi.object({
	name: Joi.string()
		.min(3)
		.max(255)
		.trim()
		.required()
		.error(error => {
			switch (error[0].code) {
				case 'string.min':
					error[0].message = 'Nazwa musi mieć przynajmniej 3 znaki!';
					break;
				case 'string.max':
					error[0].message =
						'Nazwa może mieć maksymalnie 255 znaków!';
					break;
				case 'string.empty':
					error[0].message = 'Nazwa nie może być pusta!';
					break;
				default:
					break;
			}
			return error;
		}),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.trim()
		.required()
		.error(error => {
			switch (error[0].code) {
				case 'string.email':
					error[0].message = 'Wprowadź poprawny adres e-mail!';
					break;
				case 'string.empty':
					error[0].message = 'E-mail nie może być pusty!';
					break;
				default:
					break;
			}
			return error;
		}),
	password: Joi.string()
		.min(6)
		.max(1024)
		.required()
		.error(error => {
			switch (error[0].code) {
				case 'string.min':
					error[0].message = 'Hasło musi mieć przynajmniej 6 znaków!';
					break;
				case 'string.max':
					error[0].message =
						'Hasło może mieć maksymalnie 1024 znaki!';
					break;
				case 'string.empty':
					error[0].message = 'Hasło nie może być puste!';
					break;
				default:
					break;
			}
			return error;
		}),
	repPassword: Joi.ref('password')
}).with('password', 'repPassword');

const validateRegister = data => {
	return schema.validate(data, { abortEarly: false });
};

export default validateRegister;
