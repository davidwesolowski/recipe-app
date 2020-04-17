import mongoose from 'mongoose';

const user = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 255
	},
	email: {
		type: String,
		trim: true,
		required: true
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024
	}
});

export default mongoose.model('user', user);
