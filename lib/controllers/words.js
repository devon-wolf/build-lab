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
		const { sortProperty, sortDirection } = req.body;
		WordService
			.getAll(sortProperty, sortDirection)
			.then(words => res.send(words))
			.catch(next);
	})

	.get('/:id', (req, res, next) => {
		WordService
			.getByID(req.params.id)
			.then(word => res.send(word))
			.catch(next);
	})

	.put('/:id', (req, res, next) => {
		WordService
			.update(req.params.id, req.body)
			.then(word => res.send(word))
			.catch(next);
	})

	.delete('/:id', (req, res, next) => {
		WordService
			.delete(req.params.id)
			.then(word => res.send(word))
			.catch(next);
	});