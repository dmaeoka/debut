/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace quotes
 */
import { tns } from "tiny-slider/src/tiny-slider";
import { register } from "@shopify/theme-sections";
// onLoad
// onUnload
// onSelect
// onDeselect
// onBlockSelect
// onBlockDeselect

let config = {
	container: "[data-slider]",
	items: 1,
	gutter: 16,
	edgePadding: 16,
	fixedWidth: false,
	autoWidth: false,
	viewportMax: false,
	slideBy: 1,
	center: false,
	controls: false,
	controlsPosition: "bottom",
	controlsText: ["prev", "next"],
	controlsContainer: false,
	prevButton: false,
	nextButton: false,
	nav: true,
	navPosition: "bottom",
	navContainer: false,
	navAsThumbnails: false,
	arrowKeys: false,
	speed: 300,
	animateIn: "tns-fadeIn",
	animateOut: "tns-fadeOut",
	animateNormal: "tns-normal",
	animateDelay: false,
	loop: true,
	rewind: false,
	autoHeight: false,
	responsive: false,
	lazyload: false,
	lazyloadSelector: ".tns-lazy-img",
	touch: true,
	mouseDrag: true,
	swipeAngle: 15,
	nested: false,
	preventActionWhenRunning: false,
	preventScrollOnTouch: false,
	freezable: true,
	responsive: {
		1024: {
			items: 3
		},
		768: {
			items: 2
		}
	}
};

var cache = {};

register("quotes", {
	onLoad() {
		try {
			console.log("quotes");
			cache = this.initSlider();
		} catch (error) {
			console.warn(error);
		}
	},
	onUnload() {
		try {
			cache.destroy();
			cache = {};
		} catch (error) {
			console.warn(error);
		}
	},
	initSlider() {
		try {
			let mergedConfig = {
				...config,
				...{
					container: this.container.querySelector("[data-slider]")
				}
			};
			return tns(mergedConfig);
		} catch (error) {
			console.warn(error);
		}
	}
});

