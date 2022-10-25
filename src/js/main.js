const navToggle = document.querySelector('.toggle-button');
const primaryNav = document.querySelector('#primary-nav');

const handleNavToggle = e => {
	const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
	navToggle.setAttribute('aria-expanded', !isExpanded);
	primaryNav.toggleAttribute('data-expanded', !isExpanded);
};

navToggle.addEventListener('click', handleNavToggle);
