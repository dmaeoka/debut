/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */
import { register } from '@shopify/theme-sections';

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

