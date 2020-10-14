import { focusHash, bindInPageLinks } from '@shopify/theme-a11y';
import * as cart from '@shopify/theme-cart';

__webpack_public_path__ = window.__webpack_public_path__;

document.addEventListener('DOMContentLoaded', e => {
	console.log("theme.js");
	// Common a11y fixes
	focusHash();
	bindInPageLinks();
	// import(/*
	// 	webpackChunkName: "templates"
	// 	webpackMode: "lazy" */ "./templates")
	// 	.then(() => {
	// 		console.log(cart);
	// 	});
	require("./templates");
});
