import Helpers from "./helpers";

var types = {
	link: 'link',
	script: 'script'
};

var status = {
	requested: 'requested',
	loaded: 'loaded'
};

var cloudCdn = 'https://cdn.shopify.com/shopifycloud/';

var libraries = {
	youtubeSdk: {
		tagId: 'youtube-sdk',
		src: 'https://www.youtube.com/iframe_api',
		type: types.script
	},
	plyrShopifyStyles: {
		tagId: 'plyr-shopify-styles',
		src: cloudCdn + 'shopify-plyr/v1.0/shopify-plyr.css',
		type: types.link
	},
	modelViewerUiStyles: {
		tagId: 'shopify-model-viewer-ui-styles',
		src: cloudCdn + 'model-viewer-ui/assets/v1.0/model-viewer-ui.css',
		type: types.link
	}
};

export default class LibraryLoader {
	constructor() {

	}

	load(libraryName, callback) {
		var library = libraries[libraryName];

		if (!library) return;
		if (library.status === status.requested) return;

		callback = callback || function() {};
		if (library.status === status.loaded) {
			callback();
			return;
		}

		library.status = status.requested;

		var tag;

		switch (library.type) {
			case types.script:
				tag = createScriptTag(library, callback);
				break;
			case types.link:
				tag = createLinkTag(library, callback);
				break;
		}

		tag.id = library.tagId;
		library.element = tag;

		var firstScriptTag = document.getElementsByTagName(library.type)[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	createScriptTag(library, callback) {
		var tag = document.createElement('script');
		tag.src = library.src;
		tag.addEventListener('load', function() {
			library.status = status.loaded;
			callback();
		});
		return tag;
	}

	createLinkTag(library, callback) {
		var tag = document.createElement('link');
		tag.href = library.src;
		tag.rel = 'stylesheet';
		tag.type = 'text/css';
		tag.addEventListener('load', function() {
			library.status = status.loaded;
			callback();
		});
		return tag;
	}
}

