window.onload = function() {
	const chat = new Chat();
	chat.loadUsers();
}

function Chat() {
	this.messagesDom = document.querySelector(".chat-app__messages");
	const inputBox = document.querySelector(".chat-app__input");
	const sendBtn = document.querySelector(".chat-app__submit");
	const users = document.querySelector(".chat-app__users");
	
	this.messages = new Proxy([], {
		get: function(target, property, receiver) {
			return Reflect.get(target, property, receiver);
		},
		set: function(target, property, value, receiver) {
			inputBox.value = "";
			return Reflect.set(target, property, value);
		}
	});

	inputBox.addEventListener("keyup", (event) => {
		if(event.keyCode == 13) {
			this.sendMessage(inputBox.value);
		}
	});

	sendBtn.addEventListener("click", (event) => {
		this.sendMessage(inputBox.value);
	});

	users.addEventListener("click", (event) => {
		const liArr = users.querySelectorAll("li");
		Array.from(liArr).forEach(node => {
			node.classList.remove("active");
		});
		event.target.classList.add("active");
		this.setCurrentUser(event.target.textContent);
	});
}

Chat.prototype.loadUsers = function() {
	const list = document.querySelector(".chat-app__users ul");
	const usersHtml = users.map(user => `<li>${user.name}</li>`).join("");
	list.innerHTML = usersHtml;
}

Chat.prototype.sendMessage = function(message) {
	this.messages.push(message);
	const span = document.createElement("span");
	span.innerHTML = message;
	this.messagesDom.appendChild(span);
}

Chat.prototype.setCurrentUser = function(user) {
	this.currentUser = user;
}