const moduleElements = document.querySelectorAll('[data-module]');
console.log("entrou aqui...");

for (var i = 0; i < moduleElements.length; i++) {
	const el = moduleElements[i];
	const name = el.getAttribute('data-module');
	const Module = require(`./${name}`).default;
	new Module(el);
}
