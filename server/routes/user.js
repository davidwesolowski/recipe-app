import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import validateRegister from '../../src/validation/validateRegister';
import validateLogin from '../../src/validation/validateLogin';
const router = Router();

router.post('/login', async (req, res) => {
	try {
		const { error } = validateLogin(req.body);
		if (error) return res.send({ error });
		const { email, password } = req.body;
		const userExists = await User.findOne({ email })
			.lean()
			.exec();
		if (!userExists)
			return res.send({
				error: "Użytkownik o takim e-mail'u nie istnieje!"
			});
		const userPassword = userExists.password;
		const comparePassword = await bcrypt.compare(password, userPassword);
		if (comparePassword) {
			const token = jwt.sign(
				{ _id: userExists._id },
				process.env.JWT_SECRET,
				{ expiresIn: '50m' }
			);
			return res.status(200).send({
				res: 'Zalogowano pomyślnie!',
				token: `Bearer ${token}`
			});
		}
		return res.send({ error: 'E-mail lub hasło jest niepoprawne!' });
	} catch (error) {
		res.status(400).send();
	}
});

router.post('/signUp', async (req, res) => {
	try {
		const { error } = validateRegister(req.body);
		if (error) return res.send({ error });

		const { email } = req.body;
		const userExists = await User.findOne({ email })
			.lean()
			.exec();
		if (userExists)
			return res.send({
				error: 'Użytkownik o takim e-mail już istnieje!'
			});

		const { name, password } = req.body;
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		await User.create({ name, email, password: passwordHash });
		return res.status(201).send({ res: 'Konto utworzone pomyślnie!' });
	} catch (error) {
		return res.status(400).send({ error: 'Konto nie zostało utworzone!' });
	}
});

export default router;
