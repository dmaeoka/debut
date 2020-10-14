const PostcssPurgeCss = require('@fullhuman/postcss-purgecss');

module.exports = {
	html: false,
	images: true,
	fonts: true,
	static: true,
	svgSprite: true,
	legacy: true,
	stylesheets: {
		autoprefixer: {
			overrideBrowserslist: ['> 1%', 'last 3 versions', 'Firefox >= 20', 'iOS >=7'],
			cascade: false
		},
		postcss: {
			plugins: [
				require('tailwindcss'),
				// PostcssPurgeCss({
				// 	content: ['./src/**/*.liquid'],
				// 	whitelistPatterns: [/^(is-|has-|will-|js-|w-|md:w-|sm:w-|lg:w-)/],
				// 	whitelist: ["pb-21x9", "pb-16x9", "pb-4x3"],
				// 	keyframes: true,
				// 	variables: true
				// }),
			]
		}
	},
	javascripts: {
		entry: {
			// files paths are relative to
			// javascripts.dest in path-config.json
			lib: [
				"./lib.js"
			],
			theme: [
				"@babel/polyfill",
				"./theme.js"
			],
			gift_card: [
				"@babel/polyfill",
				"./gift_card.js"
			],
		},
		publicPath: "/"
	},

	browserSync: {
		proxy: {
			target: "https://maeoka-dev.myshopify.com"
		},
		files: [
			"./src/javascripts/**/*.js",
			"./src/stylesheets/**/*.scss"
		]
	},

	production: {
		rev: false
	},

	additionalTasks: {
		development: {
			postbuild: 'legacy'
		},
		production: {
			postbuild: 'legacy'
		}
	}
}
