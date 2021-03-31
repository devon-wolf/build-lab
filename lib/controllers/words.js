const { Router } = require('express');
const WordService = require('../services/WordService');

module.exports = Router()
	.post('/', (req, res, next) => {
		WordService
			.save(req.body)
			.then(word => res.send(word))
			.catch(next);
	})
	
	.get('/', (req, res, next) => {
		WordService
			.getAll()
			.then(words => res.send(words))
			.catch(next);
	})

	.get('/:id', (req, res, next) => {
		WordService
			.getByID(req.params.id)
			.then(word => res.send(word))
			.catch(next);
	});