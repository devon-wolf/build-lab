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

	static async update(id : string, word : { word?: string, synonyms?: string[], antonyms?: string[], definition?: string[] }) {
		const { originalWord, originalSyns, originalAnts, originalDef } = await Word.selectByID(id);
		const mergedWord = {
			word: word.word || originalWord,
			synonyms: word.synonyms || originalSyns,
			antonyms: word.antonyms || originalAnts,
			definition: word.definition || originalDef
		}
		const updatedWord = await Word.update({ id, ...mergedWord });
		return updatedWord;
	}

	static async delete(id : string) {
		const word = await Word.delete(id);
		return word;
	}
}