export type ThesaurusData = {
	word: string,
	synonyms: string[],
	antonyms: string[],
	definition: string[]
}

export type WordRow = ThesaurusData & {
	id: string
}

export type ApiBody = {
	meta: {
		syns: Array<[]>,
		ants: Array<[]>
	},
	shortdef: string[]
}

export type WordProp = 'word' | 'synonyms' | 'antonyms' | 'definition';