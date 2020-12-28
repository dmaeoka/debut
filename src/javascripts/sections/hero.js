/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */
import { register } from '@shopify/theme-sections';

var cache = {};

register('hero-section', {
	onLoad() {
		try {
			console.log("hero-section");
		} catch (error) {
			console.warn(error);
		}
	}
});

