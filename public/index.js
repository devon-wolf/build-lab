const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const resultsSection = document.getElementById('search-results');
const wordHeader = document.getElementById('user-word');
const synsEl = document.getElementById('syns');
const antsEl = document.getElementById('ants');
const defEl = document.getElementById('def');

const displayResults = (results, parentEl) => {
	if (!results) {
		const none = document.createElement('li');
		none.textContent = 'no results';
		parentEl.append(none);
	}
	else {
		for (let item of results) {
			const li = document.createElement('li');
			li.textContent = item;
			parentEl.append(li);
		}
	}
}

searchForm.addEventListener('submit', e => {
	e.preventDefault();

	const allLis = Array.from(document.querySelectorAll('li'));
	console.log(allLis);
	if (allLis.length) {
		for (let li of allLis) {
			li.remove();
		}
	}

	const formData = new FormData(searchForm);
	
	fetch('/api/v1/words', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({
		  word: formData.get('search-query'),
		}),
	  })
	  .then(res => res.json())
	  .then(
		  ({ word, synonyms, antonyms, definition }) =>  {
			wordHeader.textContent = word;
			displayResults(synonyms, synsEl);
			displayResults(antonyms, antsEl);
			displayResults(definition, defEl);
		  }
	  );

	searchInput.value = '';
	resultsSection.classList.remove('none');
	
});