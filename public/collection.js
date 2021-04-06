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
			const entry = document.createElement('li');
			entry.classList.add('word-entry');

			const wordResult = document.createElement('h3');
			wordResult.textContent = word.word;

			const removeButton = document.createElement('button');
			removeButton.textContent = 'X';
			removeButton.addEventListener('click', () => {
				fetch(`/api/v1/words/${word.id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					}
				})
				.then(entry.remove());
			});
			
			entry.append(wordResult);
			entry.append(removeButton);
			wordList.append(entry);
		}
	  }
  );