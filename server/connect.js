import mongoose from 'mongoose';

(async function() {
	try {
		const url = process.env.MONGODB_URL;
		await mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log('connected');
	} catch (e) {
		throw new Error('Error in connecting to database');
	}
})();
