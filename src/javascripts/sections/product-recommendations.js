/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */
import { register } from '@shopify/theme-sections';

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

register('product-recommendations', {
	onLoad() {
		try {
			console.log("product-recommendations");
		} catch (error) {
			console.warn(error);
		}
	}
});

