const pool = require('../utils/pool');

module.exports = class Word {
	id;
	word;
	synonyms;
	antonyms;
	definition;

	constructor(row) {
		this.id = row.id;
		this.word = row.word;
		this.synonyms = row.synonyms;
		this.antonyms = row.antonyms;
		this.definition = row.definition;
	}

	static async insert(word) {
		const { rows } = await pool.query(
			`INSERT INTO words (word, synonyms, antonyms, definition)
			VALUES ($1, $2, $3, $4)
			RETURNING *`,
			[
				word.word,
				word.synonyms,
				word.antonyms,
				word.definition
			]
		);

		return new Word(rows[0]);
	}

}