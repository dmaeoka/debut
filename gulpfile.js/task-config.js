const PostcssPurgeCss = require('@fullhuman/postcss-purgecss');

module.exports = {
	images: true,
	fonts: true,
	static: true,
	svgSprite: true,
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
				"@babel/polyfill/noConflict",
				"./theme.js"
			],
			gift_card: [
				"@babel/polyfill/noConflict",
				"./gift_card.js"
			],
		},
		babel: {
			presets: [
				[
					"@babel/preset-env",
					{
						modules: false,
						targets: {
							"edge": "17",
							"firefox": "60",
							"chrome": "67",
							"safari": "11.1",
							"ie": "11"
						},
					},
				]
			],
		},
		production: {
			uglifyJsPlugin: {
				uglifyOptions: {
					mangle: true,
					ie8: false,
					compress: {
						pure_getters: true,
						unsafe: true,
						unsafe_comps: true,
					},
				},
				cache: true,
				sourceMap: false,
				extractComments: false,
				exclude: [/\.min\.js$/gi], // skip pre-minified libs
			},
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
	}
}
