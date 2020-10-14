/**
 * Variant Selection scripts
 * ------------------------------------------------------------------------------
 *
 * Handles change events from the variant inputs in any `cart/add` forms that may
 * exist. Also updates the master select and triggers updates when the variants
 * price or image changes.
 *
 * @namespace variants
 */

export default class Variants {
	/**
	 * Variant constructor
	 *
	 * @param {object} options - Settings from `product.js`
	 */
	constructor(options) {
		this.container = options.container;
		this.product = options.product;
		this.originalSelectorId = options.originalSelectorId;
		this.enableHistoryState = options.enableHistoryState;
		this.singleOptions = this.container.querySelectorAll(
			options.singleOptionSelector
		);
		this.currentVariant = this._getVariantFromOptions();

		this.singleOptions.forEach(
			function(option) {
				option.addEventListener('change', this._onSelectChange.bind(this));
			}.bind(this)
		);
	}

	/**
	 * Get the currently selected options from add-to-cart form. Works with all
	 * form input elements.
	 *
	 * @return {array} options - Values of currently selected variants
	 */
	_getCurrentOptions() {
		var result = [];

		this.singleOptions.forEach(function(option) {
			var type = option.getAttribute('type');
			var isRadioOrCheckbox = type === 'radio' || type === 'checkbox';

			if (!isRadioOrCheckbox || option.checked) {
				result.push({
					value: option.value,
					index: option.getAttribute('data-index')
				});
			}
		});

		return result;
	}

	/**
	 * Find variant based on selected values.
	 *
	 * @param {array} selectedValues - Values of variant inputs
	 * @return {object || undefined} found - Variant object from product.variants
	 */
	_getVariantFromOptions() {
		var selectedValues = this._getCurrentOptions();
		var variants = this.product.variants;

		var found = variants.find(function(variant) {
			return selectedValues.every(function(values) {
				return variant[values.index] === values.value;
			});
		});

		return found;
	}

	/**
	 * Event handler for when a variant input changes.
	 */
	_onSelectChange() {
		var variant = this._getVariantFromOptions();

		this.container.dispatchEvent(
			new CustomEvent('variantChange', {
				detail: {
					variant: variant
				},
				bubbles: true,
				cancelable: true
			})
		);

		if (!variant) {
			return;
		}

		this._updateMasterSelect(variant);
		this._updateImages(variant);
		this._updatePrice(variant);
		this._updateSKU(variant);
		this.currentVariant = variant;

		if (this.enableHistoryState) {
			this._updateHistoryState(variant);
		}
	}

	/**
	 * Trigger event when variant image changes
	 *
	 * @param {object} variant - Currently selected variant
	 * @return {event} variantImageChange
	 */
	_updateImages(variant) {
		var variantImage = variant.featured_image || {};
		var currentVariantImage = this.currentVariant.featured_image || {};

		if (
			!variant.featured_image ||
			variantImage.src === currentVariantImage.src
		) {
			return;
		}

		this.container.dispatchEvent(
			new CustomEvent('variantImageChange', {
				detail: {
					variant: variant
				},
				bubbles: true,
				cancelable: true
			})
		);
	}

	/**
	 * Trigger event when variant price changes.
	 *
	 * @param {object} variant - Currently selected variant
	 * @return {event} variantPriceChange
	 */
	_updatePrice(variant) {
		if (
			variant.price === this.currentVariant.price &&
			variant.compare_at_price === this.currentVariant.compare_at_price
		) {
			return;
		}

		this.container.dispatchEvent(
			new CustomEvent('variantPriceChange', {
				detail: {
					variant: variant
				},
				bubbles: true,
				cancelable: true
			})
		);
	}

	/**
	 * Trigger event when variant sku changes.
	 *
	 * @param {object} variant - Currently selected variant
	 * @return {event} variantSKUChange
	 */
	_updateSKU(variant) {
		if (variant.sku === this.currentVariant.sku) {
			return;
		}

		this.container.dispatchEvent(
			new CustomEvent('variantSKUChange', {
				detail: {
					variant: variant
				},
				bubbles: true,
				cancelable: true
			})
		);
	}

	/**
	 * Update history state for product deeplinking
	 *
	 * @param {variant} variant - Currently selected variant
	 * @return {k} [description]
	 */
	_updateHistoryState(variant) {
		if (!history.replaceState || !variant) {
			return;
		}

		var newurl =
			window.location.protocol +
			'//' +
			window.location.host +
			window.location.pathname +
			'?variant=' +
			variant.id;
		window.history.replaceState({
			path: newurl
		}, '', newurl);
	}

	/**
	 * Update hidden master select of variant change
	 *
	 * @param {variant} variant - Currently selected variant
	 */
	_updateMasterSelect(variant) {
		var masterSelect = this.container.querySelector(this.originalSelectorId);

		if (!masterSelect) return;
		masterSelect.value = variant.id;
	}
}
