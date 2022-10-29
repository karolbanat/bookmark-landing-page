/* navigation elements */
const primaryNavigation = document.querySelector('.primary-navigation');
const navToggle = primaryNavigation.querySelector('.toggle-button');
const primaryNav = primaryNavigation.querySelector('#primary-nav');
/* feature tabs elements */
const featuresControlBtns = document.querySelectorAll('.features-tabs__tab-button');
const featureTabs = document.querySelectorAll('.features-tab');
/* accordion elements */
const accordion = document.querySelector('.accordion');
const accordionBtns = accordion.querySelectorAll('.accordion__control');
/* form elements */
const optInForm = document.querySelector('.opt-in-form');
const optInFormInputBox = optInForm.querySelector('.opt-in-form__input-box');
const optInFormInput = optInForm.querySelector('.opt-in-form__input[type="email"]');
const optInFormSubmitBtn = optInForm.querySelector('button[type="submit"]');
const optInFormMessage = optInForm.querySelector('.opt-in-form__message');

const EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* kay mapping */
const KEY_CODES = {
	end: 35,
	home: 36,
	arrowUp: 38,
	arrowDown: 40,
};

/* navigation handling */
const handleNavToggle = e => {
	const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
	navToggle.setAttribute('aria-expanded', !isExpanded);
	primaryNavigation.toggleAttribute('data-nav-expanded', !isExpanded);
	navigationExpanding(!isExpanded);
};

const navigationExpanding = shouldExpand => {
	if (shouldExpand) {
		primaryNav.setAttribute('data-expanded', true);
		primaryNav.classList.add('slide-in');
		primaryNav.addEventListener('animationend', () => primaryNav.classList.remove('slide-in'), { once: true });
	} else {
		primaryNav.classList.add('slide-out');
		primaryNav.addEventListener(
			'animationend',
			() => {
				primaryNav.classList.remove('slide-out');
				primaryNav.removeAttribute('data-expanded');
			},
			{ once: true }
		);
	}
};

/* features tabs handling */
const handleFeaturesControlButton = e => {
	const button = e.target;
	/* if clicked on current expanded tab, return */
	if (button.getAttribute('aria-expanded') === 'true') return;

	/* hide all tabs and collapse all buttons */
	collapseAllFeaturesBtns();
	hideAllFeaturesTabs();
	/* update buttons and current button */
	updateUnderlineOrigin(parseInt(button.dataset.index));
	button.setAttribute('aria-expanded', true);
	/* get tab targeted by the button and update it */
	const targetTabId = '#' + button.getAttribute('aria-controls');
	const targetTabElement = document.querySelector(targetTabId);
	targetTabElement.classList.add('active');
	targetTabElement.classList.add('showing');
	targetTabElement.addEventListener('animationend', () => targetTabElement.classList.remove('showing'), { once: true });
};

const collapseAllFeaturesBtns = () => {
	for (const ctrlBtn of featuresControlBtns) {
		ctrlBtn.setAttribute('aria-expanded', false);
	}
};

const updateUnderlineOrigin = pivotIdx => {
	featuresControlBtns.forEach((ctrlBtn, idx) => {
		/* if the current overlooked index, change direction depending on previous direction */
		if (idx === pivotIdx)
			ctrlBtn.dataset.undelineOrigin === 'left'
				? (ctrlBtn.dataset.undelineOrigin = 'right')
				: (ctrlBtn.dataset.undelineOrigin = 'left');
		/* else change depending on the positioning to the current index */
		if (idx < pivotIdx) ctrlBtn.setAttribute('data-underline-origin', 'right');
		if (idx > pivotIdx) ctrlBtn.setAttribute('data-underline-origin', 'left');
	});
};

const hideAllFeaturesTabs = () => {
	featureTabs.forEach(tab => tab.classList.remove('active'));
};

/* initialization for tabs */
const initFeaturesControlBtns = () => {
	featuresControlBtns.forEach((ctrlBtn, idx) => ctrlBtn.setAttribute('data-index', idx));
};

/* accordion handling */
const handleKeyPress = e => {
	const keyCode = e.keyCode;
	const idx = Array.from(accordionBtns).findIndex(btn => btn === e.target);
	switch (keyCode) {
		case KEY_CODES.arrowUp:
			e.preventDefault();
			moveFocusUp(idx);
			break;
		case KEY_CODES.arrowDown:
			e.preventDefault();
			moveFocusDown(idx);
			break;
		case KEY_CODES.home:
			e.preventDefault();
			moveFocusToFirstElement();
			break;
		case KEY_CODES.end:
			e.preventDefault();
			moveFocusToLastElement();
			break;
	}
};

const moveFocusUp = idx => {
	const prevIdx = (accordionBtns.length + idx - 1) % accordionBtns.length;
	accordionBtns[prevIdx].focus();
	return prevIdx;
};

const moveFocusDown = idx => {
	const nextIdx = (idx + 1) % accordionBtns.length;
	accordionBtns[nextIdx].focus();
	return nextIdx;
};

const moveFocusToFirstElement = _ => {
	accordionBtns[0].focus();
	return 0;
};

const moveFocusToLastElement = _ => {
	accordionBtns[accordionBtns.length - 1].focus();
	return accordionBtns.length - 1;
};

/* form handling */
const handleOptInSubmit = e => {
	e.preventDefault();
	const value = optInFormInput.value;

	if (isBlank(value)) showMessage('error', 'This field cannot be empty');
	else if (!isValidEmail(value)) showMessage('error', "Whoops, make sure it's an email");
	else showMessage('success', 'Successfully registered. Check your email box.');
};

const showMessage = (status, message) => {
	optInFormInputBox.setAttribute('data-status', status);
	optInFormMessage.innerText = message;
};

const isValidEmail = email => EMAIL_REGEX.test(email);

const isBlank = value => value === '';

/* event listeners */
navToggle.addEventListener('click', handleNavToggle);
featuresControlBtns.forEach(ctrlBtn => ctrlBtn.addEventListener('click', handleFeaturesControlButton));
accordionBtns.forEach(btn => btn.addEventListener('keydown', handleKeyPress));
optInFormSubmitBtn.addEventListener('click', handleOptInSubmit);

initFeaturesControlBtns();
