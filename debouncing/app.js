let counter = 0;

const callApi = () => {
	console.log("api called..."+counter);
};

function debounce(fn, delay) {
	let timer = undefined;

	return (...args) => {
		if(timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			fn(...args);
			timer = undefined;
		}, delay);
	}
}

window.addEventListener('scroll', () => {
	let c = debounce(callApi, 100);

	console.log(c(counter++));
});