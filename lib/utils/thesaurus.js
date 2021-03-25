const request = require('superagent');

const URL = 'https://www.dictionaryapi.com/api/v3/references';

const getThesaurusData = async (word) => {
	const response = await request.get(`${URL}/thesaurus/json/${word}?key=${process.env.THESAURUS_KEY}`);

	return response.body;
};

const shapeThesaurusData = async (word) => {
	const [data] = await getThesaurusData(word);

	const [synonyms] = data.meta.syns;
	const [antonyms] = data.meta.ants;
	const definition = data.shortdef;

	return {
		synonyms,
		antonyms,
		definition,
	};
};

module.exports = shapeThesaurusData;