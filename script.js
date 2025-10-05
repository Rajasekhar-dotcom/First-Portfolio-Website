// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(e) {
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			e.preventDefault();
			target.scrollIntoView({ behavior: 'smooth' });
		}
	});
});


// Contact form handling (demo only)
const form = document.getElementById('contact-form');
if (form) {
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		// Show inline confirmation message (accessible) instead of a blocking alert
		const confirmation = document.getElementById('form-confirmation');
		if (confirmation) {
			confirmation.textContent = 'Your request has been received. Thank you — I will get back to you soon!';
			confirmation.hidden = false;
			confirmation.classList.remove('hidden');
			// trigger reflow then add show to animate
			// eslint-disable-next-line no-unused-expressions
			confirmation.offsetHeight;
			confirmation.classList.add('show');
			// Move keyboard focus to the confirmation briefly for assistive tech
			confirmation.focus({ preventScroll: true });
			// Hide confirmation after 6 seconds
			setTimeout(() => {
				confirmation.classList.remove('show');
				confirmation.hidden = true;
			}, 6000);
		}
		form.reset();
	});
}

// Section fade-in transitions with graceful fallback
document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll('main section');
	sections.forEach(section => section.classList.add('fade-section'));
	const revealSection = (entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	};
	const observer = new window.IntersectionObserver(revealSection, {
		threshold: 0.15
	});
	sections.forEach(section => {
		observer.observe(section);
	});
});
