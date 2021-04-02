console.log('I am linked');

const wordList = document.getElementById('word-list');

fetch('/api/v1/words', {
	headers: {
	  'Content-Type': 'application/json',
	}})
  .then(res => res.json())
  .then(
	  res => {
		for (let word of res) {
			const testEl = document.createElement('li');
			testEl.textContent = word.word;
			wordList.append(testEl);
		}
	  }
  );