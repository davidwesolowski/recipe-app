import mongoose from 'mongoose';

const recipe = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	kind: {
		type: String,
		required: true,
		trim: true
	},
	img: {
		type: String,
		required: true
	},
	ingredients: {
		type: String,
		required: true
	},
	recipe: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'user'
	}
});

export default mongoose.model('recipe', recipe);
