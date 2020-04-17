import jwt from 'jsonwebtoken';

function validAuth(req, res, next) {
	const token = req.headers.authorization.split(' ')[1];
	console.log('validates');
	jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
		if (error) {
			return res.send({ jwtError: 'Sesja zakończyła się!' });
		}
		req.user = payload;
		next();
	});
}

export default validAuth;
