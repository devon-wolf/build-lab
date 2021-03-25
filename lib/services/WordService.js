const Word = require('../models/Word');
const shapeThesaurusData = require('../utils/thesaurus');

module.exports = class WordService {
	static async save({ word }) {
		const newWord = await shapeThesaurusData(word);

		const wordEntry = await Word.insert(newWord);

		return wordEntry;
	}
}