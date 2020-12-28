/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */
import { register } from '@shopify/theme-sections';

var cache = {};

register('map-template', {
	onLoad() {
		try {
			console.log("map-template");
		} catch (error) {
			console.warn(error);
		}
	}
});

