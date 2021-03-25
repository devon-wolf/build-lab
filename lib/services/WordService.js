const Word = require('../models/Word');
const { getThesaurusData } = require('../utils/thesaurus');

module.exports = class WordService {
	static async save({ word }) {
		const newWord = await getThesaurusData(word);

		const wordEntry = await Word.insert(newWord);

		return wordEntry;
	}
}