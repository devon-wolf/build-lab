import { ThesaurusData, WordRow } from '../models/types';
import { getThesaurusData } from '../utils/thesaurus'
const Word = require('../models/Word');
module.exports = class WordService {
	static async save({ word } : { word: string }) {
		const newWord = await getThesaurusData(word);

		const wordEntry = await Word.insert(newWord);

		return wordEntry;
	}

	static async getAll() {
		const words = await Word.select();
		return words;
	}

	static async getByID(id : string) {
		const word = await Word.selectByID(id);
		return word;
	}
}