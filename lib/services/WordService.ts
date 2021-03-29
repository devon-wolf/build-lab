import { ThesaurusData, WordRow } from '../models/types';
import { getThesaurusData } from '../utils/thesaurus'
const Word = require('../models/Word');
module.exports = class WordService {
	static async save({ word } : { word: string }) {
		const newWord = await getThesaurusData(word);

		const wordEntry = await Word.insert(newWord);

		return wordEntry;
	}
}