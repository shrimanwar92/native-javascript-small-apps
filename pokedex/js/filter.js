const debounce = function(fn, delay) {
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
};