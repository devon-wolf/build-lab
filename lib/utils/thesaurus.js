const request = require('superagent');

const URL = 'https://www.dictionaryapi.com/api/v3/references';

const shapeThesaurusData = async (word, data) => {
	const [synonyms] = data.meta.syns;
	const [antonyms] = data.meta.ants;
	const definition = data.shortdef;

	return {
		word,
		synonyms,
		antonyms,
		definition,
	};
};

const getThesaurusData = async (word) => {
	const { body } = await request.get(`${URL}/thesaurus/json/${word}?key=${process.env.THESAURUS_KEY}`);
	
	return shapeThesaurusData(word, body[0]);
};

module.exports = { getThesaurusData };