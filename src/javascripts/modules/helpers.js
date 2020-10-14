let touchDevice = false;

let classes = {
	preventScrolling: 'prevent-scrolling'
};

let scrollPosition = window.pageYOffset;

export default class Helpers {
	static setTouch() {
		touchDevice = true;
	}

	static isTouch() {
		return touchDevice;
	}

	static enableScrollLock() {
		scrollPosition = window.pageYOffset;
		document.body.style.top = '-' + scrollPosition + 'px';
		document.body.classList.add(classes.preventScrolling);
	}

	static disableScrollLock() {
		document.body.classList.remove(classes.preventScrolling);
		document.body.style.removeProperty('top');
		window.scrollTo(0, scrollPosition);
	}

	static debounce(func, wait, immediate) {
		var timeout;

		return function() {
			var context = this,
				args = arguments;

			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};

			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	static getScript(source, beforeEl) {
		return new Promise((resolve, reject) => {
			var script = document.createElement('script');
			var prior = beforeEl || document.getElementsByTagName('script')[0];
			script.async = true;
			script.defer = true;
			// eslint-disable-next-line shopify/prefer-early-return
			function onloadHander(_, isAbort) {
				if (
					isAbort ||
					!script.readyState ||
					/loaded|complete/.test(script.readyState)
				) {
					script.onload = null;
					script.onreadystatechange = null;
					script = undefined;

					if (isAbort) {
						reject();
					} else {
						resolve();
					}
				}
			}

			script.onload = onloadHander;
			script.onreadystatechange = onloadHander;

			script.src = source;
			prior.parentNode.insertBefore(script, prior);
		});
	}

	/* Based on the prepareTransition by Jonathan Snook */
	/* Jonathan Snook - MIT License - https://github.com/snookca/prepareTransition */
	static prepareTransition(element) {
		element.addEventListener(
			'transitionend',
			function(event) {
				event.currentTarget.classList.remove('is-transitioning');
			}, {
				once: true
			}
		);

		var properties = [
			'transition-duration',
			'-moz-transition-duration',
			'-webkit-transition-duration',
			'-o-transition-duration'
		];

		var duration = 0;

		properties.forEach(function(property) {
			var computedValue = getComputedStyle(element)[property];

			if (computedValue) {
				computedValue.replace(/\D/g, '');
				duration || (duration = parseFloat(computedValue));
			}
		});

		if (duration !== 0) {
			element.classList.add('is-transitioning');
			element.offsetWidth;
		}
	}

	/*!
	 * Serialize all form data into a SearchParams string
	 * (c) 2020 Chris Ferdinandi, MIT License, https://gomakethings.com
	 * @param {Node} form The form to serialize
	 * @return {String} The serialized form data
	 */
	static serialize(form) {
		var arr = [];
		Array.prototype.slice.call(form.elements).forEach(function(field) {
			if (
				!field.name ||
				field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1
			)
				return;
			if (field.type === 'select-multiple') {
				Array.prototype.slice.call(field.options).forEach(function(option) {
					if (!option.selected) return;
					arr.push(
						encodeURIComponent(field.name) +
						'=' +
						encodeURIComponent(option.value)
					);
				});
				return;
			}
			if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked)
				return;
			arr.push(
				encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value)
			);
		});
		return arr.join('&');
	}

	static cookiesEnabled() {
		var cookieEnabled = navigator.cookieEnabled;

		if (!cookieEnabled) {
			document.cookie = 'testcookie';
			cookieEnabled = document.cookie.indexOf('testcookie') !== -1;
		}

		return cookieEnabled;
	}

	static promiseStylesheet(stylesheet) {
		var stylesheetUrl = stylesheet || theme.stylesheet;

		if (typeof this.stylesheetPromise === 'undefined') {
			this.stylesheetPromise = new Promise(function(resolve) {
				var link = document.querySelector('link[href="' + stylesheetUrl + '"]');

				if (link.loaded) resolve();

				link.addEventListener('load', function() {
					setTimeout(resolve, 0);
				});
			});
		}

		return this.stylesheetPromise;
	}

	/**
	 * Get the query params in a Url
	 * Ex
	 * https://mysite.com/search?q=noodles&b
	 * getParameterByName('q') = "noodles"
	 * getParameterByName('b') = "" (empty value)
	 * getParameterByName('test') = null (absent)
	 */
	static getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	static resizeSelects(selects) {
		selects.forEach(function(select) {
			var arrowWidth = 55;

			var test = document.createElement('span');
			test.innerHTML = select.selectedOptions[0].label;

			document.querySelector('.site-footer').appendChild(test);

			var width = test.offsetWidth + arrowWidth;
			test.remove();

			select.style.width = width + 'px';
		});
	}

	static keyboardKeys() {
		return {
			TAB: 9,
			ENTER: 13,
			ESCAPE: 27,
			LEFTARROW: 37,
			RIGHTARROW: 39
		}
	}

	/**
	 * Wrap tables in a container div to make them scrollable when needed
	 *
	 * @param {object} options - Options to be used
	 * @param {NodeList} options.tables - Elements of the table(s) to wrap
	 * @param {string} options.tableWrapperClass - table wrapper class name
	 */
	static wrapTable(options) {
		options.tables.forEach(function(table) {
			var wrapper = document.createElement('div');
			wrapper.classList.add(options.tableWrapperClass);

			table.parentNode.insertBefore(wrapper, table);
			wrapper.appendChild(table);
		});
	}

	/**
	 * Wrap iframes in a container div to make them responsive
	 *
	 * @param {object} options - Options to be used
	 * @param {NodeList} options.iframes - Elements of the iframe(s) to wrap
	 * @param {string} options.iframeWrapperClass - class name used on the wrapping div
	 */
	static wrapIframe(options) {
		options.iframes.forEach(function(iframe) {
			var wrapper = document.createElement('div');
			wrapper.classList.add(options.iframeWrapperClass);

			iframe.parentNode.insertBefore(wrapper, iframe);
			wrapper.appendChild(iframe);

			iframe.src = iframe.src;
		});
	}
}
