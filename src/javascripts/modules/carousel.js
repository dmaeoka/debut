

export default class Carousel {
	constructor(el) {
		this.el = el;
		this.data = JSON.parse(el.dataset.config);
		this.init();
	}

	init() {
		let config = Object.assign({
			container: this.el,
			mode: 'carousel',
			axis: 'horizontal',
			items: 1,
			gutter: 0,
			edgePadding: 0,
			fixedWidth: false,
			autoWidth: false,
			viewportMax: false,
			slideBy: 1,
			center: false,
			controls: true,
			controlsPosition: 'top',
			controlsText: ['prev', 'next'],
			controlsContainer: false,
			prevButton: false,
			nextButton: false,
			nav: true,
			navPosition: 'top',
			navContainer: false,
			navAsThumbnails: false,
			arrowKeys: false,
			speed: 300,
			autoplay: false,
			autoplayPosition: 'top',
			autoplayTimeout: 5000,
			autoplayDirection: 'forward',
			autoplayText: ['start', 'stop'],
			autoplayHoverPause: false,
			autoplayButton: false,
			autoplayButtonOutput: true,
			autoplayResetOnVisibility: true,
			animateIn: 'tns-fadeIn',
			animateOut: 'tns-fadeOut',
			animateNormal: 'tns-normal',
			animateDelay: false,
			loop: true,
			rewind: false,
			autoHeight: false,
			responsive: false,
			lazyload: false,
			lazyloadSelector: '.tns-lazy-img',
			touch: true,
			mouseDrag: true,
			swipeAngle: 15,
			nested: false,
			preventActionWhenRunning: false,
			preventScrollOnTouch: false,
			freezable: true,
			onInit: false,
			useLocalStorage: true
		},this.data);
		return tns(config);
	}
}
