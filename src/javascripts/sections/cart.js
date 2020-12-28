/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */
import { register } from '@shopify/theme-sections';

var cache = {};

register('cart-template', {
	onLoad() {
		try {
			console.log("cart");
		} catch (error) {
			console.warn(error);
		}
	}
});

