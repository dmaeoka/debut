import Instafeed from "instafeed.js";

export default class Carousel {
	constructor(el) {
		this.el = el;
		this.init();
	}

	init() {

		this.instagram();
	}

	instagram() {
		try {
			const userFeed = new Instafeed({
				get: 'user',
				userId: 8502245751,
				target: 'instagram-container',
				clientId: '90a6d1c25d1245b89a2a391108561efe',
				accessToken: '8502245751.90a6d1c.7b8b699239bb48e3ad6ca64e5701387d',
				resolution: 'standard_resolution',
				template: '<div class="lg:w-1/6 md:w-1/4 w-1/3"><a href="{{link}}" target="_blank" id="{{id}}" class="block"><img src="{{image}}" class="h-64 object-center object-contain object-cover min-w-full" /></a></div>',
				sortBy: 'most-recent',
				limit: 6,
				links: false
			});
			userFeed.run();
		} catch (error) {
			console.warn(error);
		}
	}
}
