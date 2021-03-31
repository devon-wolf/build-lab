import { ThesaurusData, WordRow } from './types'
const pool = require('../utils/pool');
module.exports = class Word {
	id : string;
	word : string;
	synonyms : string[];
	antonyms : string[];
	definition : string[];

	constructor(row : WordRow) {
		const { id, word, synonyms, antonyms, definition } = row;

		this.id = id;
		this.word = word;
		this.synonyms = synonyms;
		this.antonyms = antonyms;
		this.definition = definition;
	}

	static async insert({ word, synonyms, antonyms, definition } : ThesaurusData) {
		const { rows } = await pool.query(
			`INSERT INTO words (word, synonyms, antonyms, definition)
			VALUES ($1, $2, $3, $4)
			RETURNING *`,
			[
				word,
				synonyms,
				antonyms,
				definition
			]
		);

		return new Word(rows[0]);
	}

	static async select() {
		const { rows } = await pool.query('SELECT * FROM words');

		return rows;
	}

	static async selectByID(id : string) {
		const { rows } = await pool.query('SELECT * FROM words WHERE id=$1', [id]);

		return new Word(rows[0]);
	}
}