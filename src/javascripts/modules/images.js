export default class Images {
	constructor() {
		console.log("Images");
	}
	/**
	 * Preloads an image in memory and uses the browsers cache to store it until needed.
	 *
	 * @param {Array} images - A list of image urls
	 * @param {String} size - A shopify image size attribute
	 */

	preload(images, size) {
		if (typeof images === 'string') {
			images = [images];
		}

		for (var i = 0; i < images.length; i++) {
			var image = images[i];
			this.loadImage(this.getSizedImageUrl(image, size));
		}
	}

	/**
	 * Loads and caches an image in the browsers cache.
	 * @param {string} path - An image url
	 */
	loadImage(path) {
		new Image().src = path;
	}

	/**
	 * Swaps the src of an image for another OR returns the imageURL to the callback function
	 * @param image
	 * @param element
	 * @param callback
	 */
	switchImage(image, element, callback) {
		var size = this.imageSize(element.src);
		var imageUrl = this.getSizedImageUrl(image.src, size);

		if (callback) {
			callback(imageUrl, image, element); // eslint-disable-line callback-return
		} else {
			element.src = imageUrl;
		}
	}

	/**
	 * +++ Useful
	 * Find the Shopify image attribute size
	 *
	 * @param {string} src
	 * @returns {null}
	 */
	imageSize(src) {
		var match = src.match(
			/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\\.@]/
		);

		if (match !== null) {
			if (match[2] !== undefined) {
				return match[1] + match[2];
			} else {
				return match[1];
			}
		} else {
			return null;
		}
	}

	/**
	 * +++ Useful
	 * Adds a Shopify size attribute to a URL
	 *
	 * @param src
	 * @param size
	 * @returns {*}
	 */
	getSizedImageUrl(src, size) {
		if (size === null) {
			return src;
		}

		if (size === 'master') {
			return this.removeProtocol(src);
		}

		var match = src.match(
			/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i
		);

		if (match !== null) {
			var prefix = src.split(match[0]);
			var suffix = match[0];

			return this.removeProtocol(prefix[0] + '_' + size + suffix);
		}

		return null;
	}

	removeProtocol(path) {
		return path.replace(/http(s)?:/, '');
	}
}
