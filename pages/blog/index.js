import { gsap } from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'

function animateHeadings(selector) {
	const splitHeading = new SplitText(selector, {
		type: 'words',
	})
	return gsap.to(splitHeading.words, {
		opacity: 1,
		y: '0%',
		duration: 0.5,
		stagger: 0.05,
	})
}

function animateText(selector) {
	return gsap.from(selector, {
		opacity: 0,
		duration: 0.4,
	})
}
function animateTag(selector) {
	return gsap.to(selector, {
		opacity: 1,
		y: '0%',
		duration: 0.4,
	})
}

function init() {
	gsap.registerPlugin(SplitText, ScrollTrigger)
	console.log('loaded 13*11')
	const splitHero = new SplitText('[da="blog-title"]', {
		type: 'words',
	})

	const heroTl = gsap.timeline({ paused: true })
	heroTl.to('.header', {
		opacity: 1,
		duration: 0.5,
	})
	heroTl.to(
		'[da="blog-bg"]',
		{
			opacity: 1,
			duration: 0.7,
		},
		'<'
	)
	heroTl.to(
		'[da="blog-title"]',
		{
			opacity: 1,
			duration: 0.5,
		},
		'<'
	)
	heroTl.from(splitHero.words, {
		opacity: 0,
		y: '50%',
		duration: 0.5,
		stagger: 0.05,
	})
	heroTl.to(
		'[da="blog-tag"]',
		{
			opacity: 1,
			duration: 0.5,
		},
		'<'
	)
	// Запускаем анимацию после полной загрузки страницы
	window.addEventListener('load', function () {
		heroTl.play()

		// blog list

		const blogTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.section_blog-list',
				start: 'top bottom left',
				end: 'bottom bottom',
			},
		})
		blogTl.to('.blog-list_wrapper', {
			opacity: 1,
			duration: 0.5,
		})
		blogTl.from(
			'.blog_filter',
			{
				opacity: 0,
				duration: 0.5,
			},
			'<'
		)
		blogTl.from(
			'.blog_card',
			{
				opacity: 0,
				y: '20%',
				duration: 0.5,
				stagger: 0.1,
			},
			'<'
		)
	})
}

document.addEventListener('DOMContentLoaded', init)
