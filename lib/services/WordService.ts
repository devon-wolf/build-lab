import { ThesaurusData, WordProp, WordRow } from '../models/types';
import { getThesaurusData } from '../utils/thesaurus'
const Word = require('../models/Word');
module.exports = class WordService {
	static async save({ word } : { word: string }) {
		const newWord = await getThesaurusData(word);

		const wordEntry = await Word.insert(newWord);

		return wordEntry;
	}

	static async getAll(sortProperty? : WordProp, sortDirection? : 'asc' | 'desc') {
		const words = await Word.select();
		const sortedWords = this.sort(words, sortProperty, sortDirection);
		return sortedWords;
	}

	static sort(words : WordRow[], property? : WordProp, direction? : 'asc' | 'desc') {
		if (!property || !direction) return words;

		switch (direction) {
			case 'asc':
				return words.sort((word1, word2) => {
					if (word1[property] > word2[property]) return 1;
					else if (word1[property] < word2[property]) return -1;
					else return 0;
				});
			case 'desc':
				return words.sort((word1, word2) => {
					if (word1[property] > word2[property]) return -1;
					else if (word1[property] < word2[property]) return 1;
					else return 0;
				});
		}
	}

	static async getByID(id : string) {
		const word = await Word.selectByID(id);
		return word;
	}

	static async update(id : string, word : ThesaurusData) {
		const updatedWord = await Word.update({ id, ...word });
		return updatedWord;
	}

	static async delete(id : string) {
		const word = await Word.delete(id);
		return word;
	}
}