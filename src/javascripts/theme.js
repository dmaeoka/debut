import { focusHash, bindInPageLinks } from "@shopify/theme-a11y";
import * as cart from "@shopify/theme-cart";

import "bootstrap";

console.log(jQuery.fn.modal);

__webpack_public_path__ = window.__webpack_public_path__;

document.addEventListener("DOMContentLoaded", (e) => {
	try {
		// Common a11y fixes
		focusHash();
		bindInPageLinks();

		// import(/*
		// 	webpackChunkName: "templates"
		// 	webpackMode: "lazy" */ "./templates")
		// 	.then((item) => {
		// 		console.log("theme.js loaded", { item });
		// 	});

		// TODO RETURN TO LAZYLOAD
		require("./templates");
	} catch (error) {
		console.warn(error);
	}
});

/*
data-section-type="article-template"
data-section-type="blog-template"
data-section-type="cart-template"
data-section-type="collection-list"
data-section-type="collection-template"
data-section-type="collection"
data-section-type="custom-content"
data-section-type="feature-columns"
data-section-type="featured-blog"
data-section-type="product"
data-section-type="footer-section"
data-section-type="header-section"
data-section-type="hero-section"
data-section-type="image-bar"
data-section-type="list-collections-template"
data-section-type="logo-bar"
data-section-type="map-template"
data-section-type="newsletter"
data-section-type="product-recommendations"
data-section-type="product-section"
data-section-type="quotes"
data-section-type="rich-text"
data-section-type="slideshow-section"
data-section-type="video-section"
*/
