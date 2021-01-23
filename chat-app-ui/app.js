function loadUsers() {
	const list = document.querySelector(".chat-app__users ul");
	const usersHtml = users.map(user => `<li>${user.name}</li>`).join("");
	list.innerHTML = usersHtml;
}

window.onload = function() {
	loadUsers();
}

