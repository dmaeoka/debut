import Helpers from "./helpers";

var selectors = {
	body: 'body',
	navigation: '#AccessibleNav',
	siteNavHasDropdown: '[data-has-dropdowns]',
	siteNavChildLinks: '.site-nav__child-link',
	siteNavActiveDropdown: '.site-nav--active-dropdown',
	siteNavHasCenteredDropdown: '.site-nav--has-centered-dropdown',
	siteNavCenteredDropdown: '.site-nav__dropdown--centered',
	siteNavLinkMain: '.site-nav__link--main',
	siteNavChildLink: '.site-nav__link--last',
	siteNavDropdown: '.site-nav__dropdown',
	siteHeader: '.site-header'
};

var config = {
	activeClass: 'site-nav--active-dropdown',
	childLinkClass: 'site-nav__child-link',
	rightDropdownClass: 'site-nav__dropdown--right',
	leftDropdownClass: 'site-nav__dropdown--left'
};

var cache = {};

export default class Header {
	constructor() {
		this.adjustStyleAndPosition = Helpers.debounce(() => {
			this.styleDropdowns(document.querySelectorAll(selectors.siteNavHasDropdown));
			this.positionFullWidthDropdowns();
		}, 50);
	}

	init() {
		this.cacheSelectors();
		this.styleDropdowns(document.querySelectorAll(selectors.siteNavHasDropdown));
		this.positionFullWidthDropdowns();

		cache.parents.forEach(element => {
			element.addEventListener('click', this.submenuParentClickHandler);
		});

		// check when we're leaving a dropdown and close the active dropdown
		cache.siteNavChildLink.forEach(element => {
			element.addEventListener('focusout', this.submenuFocusoutHandler);
		});

		cache.topLevel.forEach(element => {
			element.addEventListener('focus', this.hideDropdown);
		});

		cache.subMenuLinks.forEach(element => {
			element.addEventListener('click', this.stopImmediatePropagation);
		});

		window.addEventListener('resize', this.resizeHandler);
	}

	stopImmediatePropagation(event) {
		event.stopImmediatePropagation();
	}

	cacheSelectors() {
		var navigation = document.querySelector(selectors.navigation);

		cache = {
			nav: navigation,
			topLevel: document.querySelectorAll(selectors.siteNavLinkMain),
			parents: navigation.querySelectorAll(selectors.siteNavHasDropdown),
			subMenuLinks: document.querySelectorAll(selectors.siteNavChildLinks),
			activeDropdown: document.querySelector(selectors.siteNavActiveDropdown),
			siteHeader: document.querySelector(selectors.siteHeader),
			siteNavChildLink: document.querySelectorAll(selectors.siteNavChildLink)
		};
	}

	showDropdown(element) {
		element.classList.add(config.activeClass);

		if (cache.activeDropdown) this.hideDropdown();

		cache.activeDropdown = element;

		element
			.querySelector(selectors.siteNavLinkMain)
			.setAttribute('aria-expanded', 'true');

		setTimeout(() => {
			window.addEventListener('keyup', this.keyUpHandler);
			document.body.addEventListener('click', this.hideDropdown);
		}, 250);
	}

	hideDropdown() {
		if (!cache.activeDropdown) return;

		cache.activeDropdown
			.querySelector(selectors.siteNavLinkMain)
			.setAttribute('aria-expanded', 'false');
		cache.activeDropdown.classList.remove(config.activeClass);

		cache.activeDropdown = document.querySelector(
			selectors.siteNavActiveDropdown
		);

		window.removeEventListener('keyup', this.keyUpHandler);
		document.body.removeEventListener('click', this.hideDropdown);
	}

	styleDropdowns(dropdownListItems) {
		dropdownListItems.forEach(item => {
			var dropdownLi = item.querySelector(selectors.siteNavDropdown);

			if (!dropdownLi) return;

			if (this.isRightOfLogo(item)) {
				dropdownLi.classList.remove(config.leftDropdownClass);
				dropdownLi.classList.add(config.rightDropdownClass);
			} else {
				dropdownLi.classList.remove(config.rightDropdownClass);
				dropdownLi.classList.add(config.leftDropdownClass);
			}
		});
	}

	isRightOfLogo(item) {
		var rect = item.getBoundingClientRect();
		var win = item.ownerDocument.defaultView;
		var leftOffset = rect.left + win.pageXOffset;
		var headerWidth = Math.floor(cache.siteHeader.offsetWidth) / 2;
		return leftOffset > headerWidth;
	}

	positionFullWidthDropdowns() {
		document
			.querySelectorAll(selectors.siteNavHasCenteredDropdown)
			.forEach(el => {
				var fullWidthDropdown = el.querySelector(
					selectors.siteNavCenteredDropdown
				);
				var fullWidthDropdownOffset = el.offsetTop + 41;
				fullWidthDropdown.style.top = fullWidthDropdownOffset + 'px';
			});
	}

	keyUpHandler(event) {
		if (event.keyCode === 27) this.hideDropdown();
	}

	resizeHandler() {
		this.adjustStyleAndPosition();
	}

	submenuParentClickHandler(event) {
		var element = event.currentTarget;

		element.classList.contains(config.activeClass) ?
			this.hideDropdown() :
			this.showDropdown(element);
	}

	submenuFocusoutHandler() {
		setTimeout(() => {
			if (
				document.activeElement.classList.contains(config.childLinkClass) ||
				!cache.activeDropdown
			) {
				return;
			}

			this.hideDropdown();
		});
	}

	unload() {
		cache.topLevel.forEach(element => {
			element.removeEventListener('focus', this.hideDropdown);
		});

		cache.subMenuLinks.forEach(element => {
			element.removeEventListener('click', this.stopImmediatePropagation);
		});

		cache.parents.forEach(element => {
			element.removeEventListener('click', this.submenuParentClickHandler);
		});

		cache.siteNavChildLink.forEach(element => {
			element.removeEventListener('focusout', this.submenuFocusoutHandler);
		});

		window.removeEventListener('resize', this.resizeHandler);
		window.removeEventListener('keyup', this.keyUpHandler);
		document.body.removeEventListener('click', this.hideDropdown);
	}
}
