window.onload = function() {
	const list = document.querySelector(".chat-app__users ul");
	const usersHtml = users.map(user => `<li>${user.name}</li>`).join("");
	list.innerHTML = usersHtml;
}

