/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */
import { register } from '@shopify/theme-sections';

var cache = {};

register('video-section', {
	onLoad() {
		try {
			console.log("video-section");
		} catch (error) {
			console.warn(error);
		}
	}
});

