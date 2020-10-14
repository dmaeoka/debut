import Helpers from "./helpers";
import A11y from "./a11y";

var classes = {
	mobileNavOpenIcon: 'mobile-nav--open',
	mobileNavCloseIcon: 'mobile-nav--close',
	navLinkWrapper: 'mobile-nav__item',
	navLink: 'mobile-nav__link',
	subNavLink: 'mobile-nav__sublist-link',
	return: 'mobile-nav__return-btn',
	subNavActive: 'is-active',
	subNavClosing: 'is-closing',
	navOpen: 'js-menu--is-open',
	subNavShowing: 'sub-nav--is-open',
	thirdNavShowing: 'third-nav--is-open',
	subNavToggleBtn: 'js-toggle-submenu'
};

var cache = {};
var isTransitioning;
var activeSubNav;
var activeTrigger;
var menuLevel = 1;
var mediumUpQuery = '(min-width: ' + theme.breakpoints.medium + 'px)';
var mql = window.matchMedia(mediumUpQuery);

export default class MobileNav {
	constructor() {

	}

	init() {
		this.cacheSelectors();

		cache.mobileNavToggle.addEventListener('click', this.toggleMobileNav);

		cache.subNavToggleBtns.forEach(element => {
			element.addEventListener('click', this.toggleSubNav);
		});

		mql.addListener(this.initBreakpoints);
	}

	initBreakpoints() {
		if (
			mql.matches &&
			cache.mobileNavContainer.classList.contains(classes.navOpen)
		) {
			this.closeMobileNav();
		}
	}

	toggleMobileNav() {
		var mobileNavIsOpen = cache.mobileNavToggle.classList.contains(
			classes.mobileNavCloseIcon
		);

		if (mobileNavIsOpen) {
			this.closeMobileNav();
		} else {
			this.openMobileNav();
		}
	}

	cacheSelectors() {
		cache = {
			pageContainer: document.querySelector('#PageContainer'),
			siteHeader: document.querySelector('.site-header'),
			mobileNavToggle: document.querySelector('.js-mobile-nav-toggle'),
			mobileNavContainer: document.querySelector('.mobile-nav-wrapper'),
			mobileNav: document.querySelector('#MobileNav'),
			sectionHeader: document.querySelector('#shopify-section-header'),
			subNavToggleBtns: document.querySelectorAll('.' + classes.subNavToggleBtn)
		};
	}

	openMobileNav() {
		var translateHeaderHeight = cache.siteHeader.offsetHeight;

		Helpers.prepareTransition(cache.mobileNavContainer);
		cache.mobileNavContainer.classList.add(classes.navOpen);

		cache.mobileNavContainer.style.transform =
			'translateY(' + translateHeaderHeight + 'px)';

		cache.pageContainer.style.transform =
			'translate3d(0, ' + cache.mobileNavContainer.scrollHeight + 'px, 0)';

		A11y.trapFocus({
			container: cache.sectionHeader,
			elementToFocus: cache.mobileNavToggle
		});

		cache.mobileNavToggle.classList.add(classes.mobileNavCloseIcon);
		cache.mobileNavToggle.classList.remove(classes.mobileNavOpenIcon);
		cache.mobileNavToggle.setAttribute('aria-expanded', true);

		window.addEventListener('keyup', this.keyUpHandler);
	}

	keyUpHandler(event) {
		if (event.which === 27) {
			this.closeMobileNav();
		}
	}

	closeMobileNav() {
		Helpers.prepareTransition(cache.mobileNavContainer);
		cache.mobileNavContainer.classList.remove(classes.navOpen);
		cache.mobileNavContainer.style.transform = 'translateY(-100%)';
		cache.pageContainer.setAttribute('style', '');

		A11y.trapFocus({
			container: document.querySelector('html'),
			elementToFocus: document.body
		});

		cache.mobileNavContainer.addEventListener(
			'transitionend',
			this.mobileNavRemoveTrapFocus, {
				once: true
			}
		);

		cache.mobileNavToggle.classList.add(classes.mobileNavOpenIcon);
		cache.mobileNavToggle.classList.remove(classes.mobileNavCloseIcon);
		cache.mobileNavToggle.setAttribute('aria-expanded', false);
		cache.mobileNavToggle.focus();

		window.removeEventListener('keyup', keyUpHandler);
		window.scrollTo(0, 0);
	}

	mobileNavRemoveTrapFocus() {
		A11y.removeTrapFocus({
			container: cache.mobileNav
		});
	}

	toggleSubNav(event) {
		if (isTransitioning) return;

		var toggleBtn = event.currentTarget;
		var isReturn = toggleBtn.classList.contains(classes.return);

		isTransitioning = true;

		if (isReturn) {
			var subNavToggleBtn = document.querySelectorAll(
				'.' + classes.subNavToggleBtn + "[data-level='" + (menuLevel - 1) + "']"
			);

			subNavToggleBtn.forEach(function(element) {
				element.classList.remove(classes.subNavActive);
			});

			if (activeTrigger) {
				activeTrigger.classList.remove(classes.subNavActive);
			}
		} else {
			toggleBtn.classList.add(classes.subNavActive);
		}

		activeTrigger = toggleBtn;

		this.goToSubnav(toggleBtn.getAttribute('data-target'));
	}

	goToSubnav(target) {
		var targetMenu = target ?
			document.querySelector(
				'.mobile-nav__dropdown[data-parent="' + target + '"]'
			) :
			cache.mobileNav;

		menuLevel = targetMenu.dataset.level ? Number(targetMenu.dataset.level) : 1;

		if (activeSubNav) {
			Helpers.prepareTransition(activeSubNav);
			activeSubNav.classList.add(classes.subNavClosing);
		}

		activeSubNav = targetMenu;

		var translateMenuHeight = targetMenu.offsetHeight;

		var openNavClass =
			menuLevel > 2 ? classes.thirdNavShowing : classes.subNavShowing;

		cache.mobileNavContainer.style.height = translateMenuHeight + 'px';
		cache.mobileNavContainer.classList.remove(classes.thirdNavShowing);
		cache.mobileNavContainer.classList.add(openNavClass);

		if (!target) {
			cache.mobileNavContainer.classList.remove(
				classes.thirdNavShowing,
				classes.subNavShowing
			);
		}

		/* if going back to first subnav, focus is on whole header */
		var container = menuLevel === 1 ? cache.sectionHeader : targetMenu;

		cache.mobileNavContainer.addEventListener(
			'transitionend',
			trapMobileNavFocus, {
				once: true
			}
		);

		function trapMobileNavFocus() {
			A11y.trapFocus({
				container: container
			});

			cache.mobileNavContainer.removeEventListener(
				'transitionend',
				trapMobileNavFocus
			);

			isTransitioning = false;
		}

		// Match height of subnav
		cache.pageContainer.style.transform =
			'translateY(' + translateMenuHeight + 'px)';

		activeSubNav.classList.remove(classes.subNavClosing);
	}

	unload() {
		mql.removeListener(this.initBreakpoints);
	}
}
