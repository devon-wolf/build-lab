import { ApiBody, ThesaurusData } from "../models/types";

const request = require('superagent');

const apiURL : string = 'https://www.dictionaryapi.com/api/v3/references';

const shapeThesaurusData = (word : string, data : ApiBody) => {
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

export const getThesaurusData = async (word : string) => {
	const { body } = await request.get(`${apiURL}/thesaurus/json/${word}?key=${process.env.THESAURUS_KEY}`);
	
	return shapeThesaurusData(word, body[0]);
};