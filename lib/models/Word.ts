const pool = require('../utils/pool');

module.exports = class Word {
	id : string;
	word : string;
	synonyms : Array<string>;
	antonyms : Array<string>;
	definition : Array<string>;

	constructor(row : object) {
		this.id = row['id'];
		this.word = row['word'];
		this.synonyms = row['synonyms'];
		this.antonyms = row['antonyms'];
		this.definition = row['definition'];
	}

	static async insert({ word, synonyms, antonyms, definition }) {
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

}