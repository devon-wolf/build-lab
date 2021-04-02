const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const resultsSection = document.getElementById('search-results');
const wordHeader = document.getElementById('user-word');
const synPar = document.getElementById('syns');
const antPar = document.getElementById('ants');
const defPar = document.getElementById('def');
const saveButton = document.getElementById('save-button');

searchForm.addEventListener('submit', e => {
	e.preventDefault();
	const formData = new FormData(searchForm);
	const searchQuery = formData.get('search-query');
	resultsSection.classList.remove('none');
	wordHeader.textContent = searchQuery;
	synPar.textContent = 'synonyms';
	antPar.textContent = 'antonyms';
	defPar.textContent = 'definition';
	searchInput.value = '';
})

saveButton.addEventListener('click', () => {
	console.log('.... you know nothing got saved, right?');
})