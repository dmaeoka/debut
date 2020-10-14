/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 *
 *
 * @namespace a11y
 */
export default class A11y {
	constructor() {
		this.state = {
			firstFocusable: null,
			lastFocusable: null
		}
	}

	/**
	 * For use when focus shifts to a container rather than a link
	 * eg for In-page links, after scroll, focus shifts to content area so that
	 * next `tab` is where user expects
	 *
	 * @param {HTMLElement} element - The element to be acted upon
	 */
	static pageLinkFocus(element) {
		if (!element) return;
		var focusClass = 'js-focus-hidden';

		element.setAttribute('tabIndex', '-1');
		element.focus();
		element.classList.add(focusClass);
		element.addEventListener('blur', callback, {
			once: true
		});

		function callback() {
			element.classList.remove(focusClass);
			element.removeAttribute('tabindex');
		}
	}

	/**
	 * Traps the focus in a particular container
	 *
	 * @param {object} options - Options to be used
	 * @param {HTMLElement} options.container - Container to trap focus within
	 * @param {HTMLElement} options.elementToFocus - Element to be focused when focus leaves container
	 */
	static trapFocus(options) {
		var focusableElements = Array.from(
			options.container.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex^="-"])'
			)
		).filter(function(element) {
			var width = element.offsetWidth;
			var height = element.offsetHeight;

			return (
				width !== 0 &&
				height !== 0 &&
				getComputedStyle(element).getPropertyValue('display') !== 'none'
			);
		});

		this.state.firstFocusable = focusableElements[0];
		this.state.lastFocusable = focusableElements[focusableElements.length - 1];

		if (!options.elementToFocus) {
			options.elementToFocus = options.container;
		}

		options.container.setAttribute('tabindex', '-1');
		options.elementToFocus.focus();

		this._setupHandlers();

		document.addEventListener('focusin', this._onFocusInHandler);
		document.addEventListener('focusout', this._onFocusOutHandler);
	}

	_setupHandlers() {
		if (!this._onFocusInHandler) {
			this._onFocusInHandler = this._onFocusIn.bind(this);
		}

		if (!this._onFocusOutHandler) {
			this._onFocusOutHandler = this._onFocusIn.bind(this);
		}

		if (!this._manageFocusHandler) {
			this._manageFocusHandler = this._manageFocus.bind(this);
		}
	}

	_onFocusOut() {
		document.removeEventListener('keydown', this._manageFocusHandler);
	}

	_onFocusIn(evt) {
		if (
			evt.target !== this.state.lastFocusable &&
			evt.target !== this.state.firstFocusable
		)
			return;

		document.addEventListener('keydown', this._manageFocusHandler);
	}

	_manageFocus(evt) {
		if (evt.keyCode !== Helpers.keyboardKeys.TAB) return;

		/**
		 * On the last focusable element and tab forward,
		 * focus the first element.
		 */
		if (evt.target === this.state.lastFocusable && !evt.shiftKey) {
			evt.preventDefault();
			this.state.firstFocusable.focus();
		}
		/**
		 * On the first focusable element and tab backward,
		 * focus the last element.
		 */
		if (evt.target === this.state.firstFocusable && evt.shiftKey) {
			evt.preventDefault();
			this.state.lastFocusable.focus();
		}
	}

	/**
	 * Removes the trap of focus in a particular container
	 *
	 * @param {object} options - Options to be used
	 * @param {HTMLElement} options.container - Container to trap focus within
	 */
	static removeTrapFocus(options) {
		if (options.container) {
			options.container.removeAttribute('tabindex');
		}
		document.removeEventListener('focusin', this._onFocusInHandler);
	}

	/**
	 * Add aria-describedby attribute to external and new window links
	 *
	 * @param {object} options - Options to be used
	 * @param {object} options.messages - Custom messages to be used
	 * @param {HTMLElement} options.links - Specific links to be targeted
	 */
	static accessibleLinks(options) {
		var body = document.querySelector('body');

		var idSelectors = {
			newWindow: 'a11y-new-window-message',
			external: 'a11y-external-message',
			newWindowExternal: 'a11y-new-window-external-message'
		};

		if (options.links === undefined || !options.links.length) {
			options.links = document.querySelectorAll(
				'a[href]:not([aria-describedby])'
			);
		}

		function generateHTML(customMessages) {
			if (typeof customMessages !== 'object') {
				customMessages = {};
			}

			var messages = Object.assign({
					newWindow: 'Opens in a new window.',
					external: 'Opens external website.',
					newWindowExternal: 'Opens external website in a new window.'
				},
				customMessages
			);

			var container = document.createElement('ul');
			var htmlMessages = '';

			for (var message in messages) {
				htmlMessages +=
					'<li id=' + idSelectors[message] + '>' + messages[message] + '</li>';
			}

			container.setAttribute('hidden', true);
			container.innerHTML = htmlMessages;

			body.appendChild(container);
		}

		function _externalSite(link) {
			var hostname = window.location.hostname;

			return link.hostname !== hostname;
		}

		options.links.forEach(function(link) {
			var target = link.getAttribute('target');
			var rel = link.getAttribute('rel');
			var isExternal = _externalSite(link);
			var isTargetBlank = target === '_blank';

			if (isExternal) {
				link.setAttribute('aria-describedby', idSelectors.external);
			}

			if (isTargetBlank) {
				if (!rel || rel.indexOf('noopener') === -1) {
					var relValue = rel === undefined ? '' : rel + ' ';
					relValue = relValue + 'noopener';
					link.setAttribute('rel', relValue);
				}

				link.setAttribute('aria-describedby', idSelectors.newWindow);
			}

			if (isExternal && isTargetBlank) {
				link.setAttribute('aria-describedby', idSelectors.newWindowExternal);
			}
		});

		generateHTML(options.messages);
	}
}
