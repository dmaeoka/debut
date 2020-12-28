/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */
import { register } from '@shopify/theme-sections';

var cache = {};

register('collection-template', {
	onLoad() {
		try {
			console.log("collection");
		} catch (error) {
			console.warn(error);
		}
	}
});

