const navToggle = document.querySelector('.toggle-button');
const primaryNav = document.querySelector('#primary-nav');

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

navToggle.addEventListener('click', handleNavToggle);
