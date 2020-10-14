export default class Icons {
	constructor(el) {
		this.cache = {};
		this.request;
		this.init();
	}

	init() {
		this.setParams()
			.then(()=>{
				let i = 0;
				let uses = this.uses;
				let xhr;

				let onload = () => {
					let body = document.body;
					let x = document.createElement('x');
					x.innerHTML = xhr.responseText;
					body.insertBefore(x.firstChild, body.firstChild);
				}

				for (i = 0; i < uses.length; i++) {
					const el = uses[i];
					let url = uses[i].getAttribute('xlink:href').split('#');
					let base = url[0];
					let hash = url[1];
					let request = this.request;

					if (!base.length && hash && !document.getElementById(hash)) {
						base = "icons.svg";
					}

					if (base.length) {
						this.cache[base] = this.cache[base] || new request();
						xhr = this.cache[base];
						if (!xhr.onload) {
							xhr.onload = onload;
							xhr.open('GET', base);
							xhr.send();
						}
					}
				}
			}).catch(error => {
				console.warn(error);
			});
	}

	setParams() {
		return new Promise((resolve, reject) => {
			document.addEventListener('DOMContentLoaded', event => {
				this.uses = document.getElementsByTagName('use');

				if (XMLHttpRequest) {
					this.request = new XMLHttpRequest();
					if ('withCredentials' in this.request) {
						this.request = XMLHttpRequest;
					} else {
						this.request = XDomainRequest ? XDomainRequest : false;
					}
				}

				if (!this.request) {
					reject();
				}
				resolve(event);
			}, false);
		})
	}
}
