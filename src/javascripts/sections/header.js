/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */
import { register } from '@shopify/theme-sections';
import Helpers from "../modules/helpers";

// exports.registered = registered;
// exports.instances = instances;
// exports.register = register;
// exports.unregister = unregister;
// exports.load = load;
// exports.unload = unload;
// exports.extend = extend;
// exports.getInstances = getInstances;
// exports.getInstanceById = getInstanceById;
// exports.isInstance = isInstance;


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

register('header-section', {
	onLoad() {
		try {
			console.log("header");
			this.cacheSelectors();
			this.styleDropdowns(document.querySelectorAll(selectors.siteNavHasDropdown));
			this.positionFullWidthDropdowns();

			cache.parents.forEach(element => {
				element.addEventListener('click', this.submenuParentClickHandler.bind(this), false);
			});

			// check when we're leaving a dropdown and close the active dropdown
			cache.siteNavChildLink.forEach(element => {
				element.addEventListener('focusout', this.submenuFocusoutHandler.bind(this), false);
			});

			cache.topLevel.forEach(element => {
				element.addEventListener('focus', this.hideDropdown.bind(this), false);
			});

			cache.subMenuLinks.forEach(element => {
				element.addEventListener('click', this.stopImmediatePropagation.bind(this), false);
			});

			window.addEventListener('resize', this.resizeHandler.bind(this), false);
		} catch (error) {
			console.warn(error);
		}
	},

	unload() {
		cache.topLevel.forEach(element => {
			element.removeEventListener('focus', this.hideDropdown.bind(this));
		});

		cache.subMenuLinks.forEach(element => {
			element.removeEventListener('click', this.stopImmediatePropagation.bind(this));
		});

		cache.parents.forEach(element => {
			element.removeEventListener('click', this.submenuParentClickHandler.bind(this));
		});

		cache.siteNavChildLink.forEach(element => {
			element.removeEventListener('focusout', this.submenuFocusoutHandler.bind(this));
		});

		window.removeEventListener('resize', this.resizeHandler.bind(this));
		window.removeEventListener('keyup', this.keyUpHandler.bind(this));
		document.body.removeEventListener('click', this.hideDropdown.bind(this));
	},

	stopImmediatePropagation(event) {
		event.stopImmediatePropagation();
	},

	cacheSelectors() {
		const navigation = document.querySelector(selectors.navigation);
		cache = {
			nav: navigation,
			topLevel: document.querySelectorAll(selectors.siteNavLinkMain),
			parents: navigation.querySelectorAll(selectors.siteNavHasDropdown),
			subMenuLinks: document.querySelectorAll(selectors.siteNavChildLinks),
			activeDropdown: document.querySelector(selectors.siteNavActiveDropdown),
			siteHeader: document.querySelector(selectors.siteHeader),
			siteNavChildLink: document.querySelectorAll(selectors.siteNavChildLink)
		};
	},

	showDropdown(element) {
		element.classList.add(config.activeClass);
		// site-nav__dropdown

		if (cache.activeDropdown)
			this.hideDropdown();

		cache.activeDropdown = element;
		element.querySelector(selectors.siteNavLinkMain).setAttribute('aria-expanded', 'true');

		setTimeout(() => {
			window.addEventListener('keyup', this.keyUpHandler.bind(this));
			document.body.addEventListener('click', this.hideDropdown.bind(this));
		}, 250);
	},

	hideDropdown() {
		if (!cache.activeDropdown)
			return;

		cache.activeDropdown.querySelector(selectors.siteNavLinkMain).setAttribute('aria-expanded', 'false');
		cache.activeDropdown.classList.remove(config.activeClass);
		cache.activeDropdown = document.querySelector(selectors.siteNavActiveDropdown);

		window.removeEventListener('keyup', this.keyUpHandler.bind(this));
		document.body.removeEventListener('click', this.hideDropdown.bind(this));
	},

	styleDropdowns(dropdownListItems) {

		dropdownListItems.forEach(item => {
			let dropdownLi = item.querySelector(selectors.siteNavDropdown);

			if (!dropdownLi)
				return;

			if (this.isRightOfLogo(item)) {
				dropdownLi.classList.remove(config.leftDropdownClass);
				dropdownLi.classList.add(config.rightDropdownClass);
			} else {
				dropdownLi.classList.remove(config.rightDropdownClass);
				dropdownLi.classList.add(config.leftDropdownClass);
			}
		});
	},

	isRightOfLogo(item) {
		const rect = item.getBoundingClientRect();
		const win = item.ownerDocument.defaultView;
		const leftOffset = rect.left + win.pageXOffset;
		const headerWidth = Math.floor(cache.siteHeader.offsetWidth) / 2;
		return leftOffset > headerWidth;
	},

	positionFullWidthDropdowns() {
		document.querySelectorAll(selectors.siteNavHasCenteredDropdown).forEach(el => {
			let fullWidthDropdown = el.querySelector(selectors.siteNavCenteredDropdown);
			let fullWidthDropdownOffset = el.offsetTop + 41;
			fullWidthDropdown.style.top = fullWidthDropdownOffset + 'px';
		});
	},

	keyUpHandler(event) {
		if (event.keyCode === 27)
			this.hideDropdown();
	},

	resizeHandler() {
		Helpers.debounce(() => {
			this.styleDropdowns(document.querySelectorAll(selectors.siteNavHasDropdown));
			this.positionFullWidthDropdowns();
		}, 50);
	},

	submenuParentClickHandler(event) {
		var element = event.currentTarget;
		element.classList.contains(config.activeClass) ? this.hideDropdown() : this.showDropdown(element);
	},

	submenuFocusoutHandler() {
		setTimeout(() => {
			if (document.activeElement.classList.contains(config.childLinkClass) || !cache.activeDropdown)
				return;
			this.hideDropdown();
		});
	}
});

