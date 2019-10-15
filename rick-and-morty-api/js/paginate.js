const chipContainer = document.querySelector(".chip-container ul");
let list = undefined;

window.onload = function() {
  	list = new ListComponent();
};

const paginate = (e) => {
	switch(e.target.textContent) {
		case 'Next':
			if(list.paginationInfo.next) {
				chipContainer.innerHTML = '';
				list.getCharacters(list.paginationInfo.next);
			}
		break;
		case 'Previous':
			if(list.paginationInfo.prev) {
				chipContainer.innerHTML = '';
				list.getCharacters(list.paginationInfo.prev);
			}
		break;
	}
};