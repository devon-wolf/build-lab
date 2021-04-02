const searchForm = document.querySelector('form');
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
})