const navToggle = document.querySelector('.toggle-button');
const primaryNav = document.querySelector('#primary-nav');
const featuresControlBtns = document.querySelectorAll('.features-tabs__tab-button');
const featureTabs = document.querySelectorAll('.features-tab');

/* navigation handling */
const handleNavToggle = e => {
	const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
	navToggle.setAttribute('aria-expanded', !isExpanded);
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

/* event listeners */
navToggle.addEventListener('click', handleNavToggle);
featuresControlBtns.forEach(ctrlBtn => ctrlBtn.addEventListener('click', handleFeaturesControlButton));

initFeaturesControlBtns();
