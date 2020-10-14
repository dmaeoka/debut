
export default class Search {
	constructor(el) {
		this._el = el;
		this._modal;
		this._closeBtn;
		this.init();
	}

	set el(value) {
		this._el = value;
	}
	get el() {
		return this._el;
	}
	set modal(value) {
		this._modal = value;
	}
	get modal() {
		return this._modal;
	}
	set closeBtn(value) {
		this._closeBtn = value;
	}
	get closeBtn() {
		return this._closeBtn;
	}

	setParams() {
		return new Promise((resolve, reject) => {
			this.el = $(this._el);
			this.modal = $(".search-modal");
			this.closeBtn = $(".search-modal--close");

			resolve();
		});
	}

	init() {
		console.log("search");
		this.setParams().then(()=>{
			this.event();
		})

	}

	event() {
		this.el.on("click", e => {
			e.preventDefault();
			this.modal.toggleClass("open");
		});

		this.closeBtn.on("click", e => {
			this.modal.removeClass("open");
		});
	}
}
