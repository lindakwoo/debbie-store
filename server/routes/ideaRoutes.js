import express from "express";
import Idea from "../models/Idea.js";
// import { protectRoute, admin } from "../middleware/authMiddleware.js";
import asyncHandler from 'express-async-handler';
// import User from '../models/User.js';

const ideaRoutes = express.Router();

const getIdeas = async (req, res) => {
    console.log("inside the route")
  const page = parseInt(req.params.page); // 1, 2 or 3
  const perPage = parseInt(req.params.perPage); // 10
  const ideas = await Idea.find({});

  if (page && perPage) {
    const totalPages = Math.ceil(ideas.length / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedIdeas = ideas.slice(startIndex, endIndex);
    res.json({ ideas: paginatedIdeas, pagination: { currentPage: page, totalPages } });
  } else {
    res.json({ ideas, pagination: {} });
  }
};

const getIdea = async (req, res) => {
	const idea = await Idea.findById(req.params.id);

	if (idea) {
		res.json(idea);
	} else {
		res.status(404).send("Idea not found");
		throw new Error('Idea not found');
	}
};

const createIdeaReview = asyncHandler(async (req, res) => {
	const { rating, comment, userName } = req.body;

	const idea = await Idea.findById(req.params.id);

	if (idea) {
		const review = {
			name: userName,
			rating: Number(rating),
			comment,
		};

		idea.reviews.push(review);
		await idea.save();
		res.status(201).json({ message: 'Review has been saved.' });
	} else {
		res.status(404).send("Idea not found");
		throw new Error('Idea not found.');
	}
});


ideaRoutes.route('/:page/:perPage').get(getIdeas);
ideaRoutes.route('/').get(getIdeas);
ideaRoutes.route('/:id').get(getIdea);
ideaRoutes.route('/reviews/:id').post(createIdeaReview);


export default ideaRoutes;