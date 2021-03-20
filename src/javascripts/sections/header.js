/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */
import { register } from "@shopify/theme-sections";
import Helpers from "../modules/helpers";
// onLoad
// onUnload
// onSelect
// onDeselect
// onBlockSelect
// onBlockDeselect

var cache = {};

register("header-section", {
	onLoad() {
		try {
			console.log("header");
			// cache = this.cacheSelectors();

			// const over = (event) => {
			// 	event.preventDefault();
			// 	const $element = $(event.currentTarget);
			// 	const $target = $($element.attr("data-target"));
			// 	$element.attr("aria-expanded", true);
			// 	$target.removeClass("hidden");
			// };

			// const out = (event) => {
			// 	event.preventDefault();
			// 	const $element = $(event.currentTarget);
			// 	const $target = $($element.attr("data-target"));
			// 	$element.attr("aria-expanded", false);
			// 	$target.addClass("hidden");
			// };

			// cache.$topLevel.hoverIntent({
			// 	over,
			// 	out,
			// 	timeout: 80,
			// 	interval: 30,
			// });

			// this.searchDrawer();

			// $("[data-level]").on("click", event => {
			// 	const $nav = cache.$mobileNav;
			// 	const $this = $(event.currentTarget);
			// 	const level = $this.data("level");
			// 	$nav.css({"--transform-translate-x": `${-100 * level}%`});
			// });

			// cache.$mobileNav.on("show.bs.collapse", event => {
			// 	cache.$mobileNav.removeAttr("style");
			// });

		} catch (error) {
			console.warn(error);
		}
	},

	onUnload() {
		try {
			console.log("trigger when unload the module");
		} catch (error) {
			console.warn(error);
		}
	},

	cacheSelectors() {
		// const $nav = $(this.container);
		// return Object.assign(
		// 	{},
		// 	{
		// 		$nav,
		// 		$topLevel: $nav.find("[data-has-dropdowns]"),
		// 		$mobileNav: $nav.find("#MobileNav"),
		// 		overlay: $("#modal-overlay")
		// 	}
		// );
	},

	hideDropdowns() {
		try {
			// cache.$topLevel.find(".site-nav__dropdown").addClass("hidden");
		} catch (error) {
			console.warn(error);
		}
	},

	searchDrawer() {
		try {
			// // ANOTHER METHOD HERE
			// var $drawer = $("#SearchDrawer");
			// $('#SearchDrawer-btn').on("click", event => {
			// 	$drawer.modal("toggle");
			// });
			// $("#SearchDrawer-close").on("click", event => {
			// 	$drawer.modal("hide");
			// })
		} catch (error) {
			console.warn(error);
		}
	}
});
