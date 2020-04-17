import { Router } from 'express';
import Recipe from '../models/Recipe';
import validateRecipe from '../../src/validation/validateRecipe';
import validAuth from '../middlewares/validAuth';
const router = Router();

router.get('/recipes', validAuth, async (req, res) => {
	try {
		const _id = req.user._id;
		const recipes = await Recipe.find({ user: _id }).exec();
		return res.status(200).send({ recipes });
	} catch (error) {
		return res.status(400).send({ error: 'Nie ma żadnych przepisów!' });
	}
});

router.get('/recipe/:id', validAuth, async (req, res) => {
	try {
		const id = req.params.id;
		const recipe = await Recipe.findById(id)
			.lean()
			.exec();
		return res.status(200).send({ recipe });
	} catch (error) {
		return res.status(400).send({ error: 'Przepis nie istnieje!' });
	}
});

router.post('/recipe', validAuth, async (req, res) => {
	try {
		req.body.user = req.user._id;
		const { error } = validateRecipe(req.body);
		if (error) return res.send({ error: 'Niepoprawne dane!' });
		const recipe = await Recipe.create(req.body);
		return res.status(201).send({ recipe: recipe.toObject() });
	} catch (error) {
		return res.status(400).send({ error: 'Nie można dodać przepisu!' });
	}
});

router.patch('/recipe/:id', validAuth, async (req, res) => {
	try {
		const _id = req.params.id;
		const recipe = await Recipe.findOneAndUpdate({ _id }, req.body, {
			new: true
		})
			.lean()
			.exec();
		return res.status(200).send({ recipe });
	} catch (error) {
		return res.status(400).send({ error: 'Nie można edytować przepisu!' });
	}
});

router.delete('/recipe', async (req, res) => {
	try {
		const id = req.body.id;
		const deletedRecipe = await Recipe.findByIdAndDelete(id);
		if (deletedRecipe) return res.status(200).send({ deletedRecipe });
		return res.send({ error: 'Dany przepis nie istnieje!' });
	} catch {
		res.status(400).send({ error: 'Nie można usunąć przepisu!' });
	}
});

export default router;
