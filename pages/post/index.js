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
	console.log('loaded 12-20')
	const splitHero = new SplitText('[da="blog-title"]', {
		type: 'words',
	})

	const heroTl = gsap.timeline({ paused: true })
	heroTl.to('.header', {
		opacity: 1,
		duration: 0.5,
	})
	heroTl.to(
		'[da="blog-title"]',
		{
			opacity: 1,
			duration: 0.5,
		},
		'<'
	)
	heroTl.to(
		'[da="post-top"]',
		{
			opacity: 1,
			duration: 0.7,
			stagger: 0.1,
		},
		'<'
	)
	heroTl.from(
		splitHero.words,
		{
			opacity: 0,
			y: '50%',
			duration: 0.5,
			stagger: 0.05,
		},
		'<'
	)
	heroTl.to(
		'[da="post-image"]',
		{
			opacity: 1,
			y: '0%',
			duration: 0.5,
		},
		'<'
	)
	// Запускаем анимацию после полной загрузки страницы
	window.addEventListener('load', function () {
		heroTl.play()

		document.getElementById('copy-btn').addEventListener('click', function () {
			// Копируем ссылку страницы в буфер обмена
			const url = window.location.href
			navigator.clipboard.writeText(url).then(() => {
				// Показать сообщение
				const copyMessage = document.getElementById('copy-mess')
				// Анимация появления и скрытия с помощью GSAP
				gsap.to(copyMessage, { opacity: 1, duration: 0.5 })

				// Скрыть сообщение через 2 секунды
				setTimeout(() => {
					gsap.to(copyMessage, {
						opacity: 0,
						duration: 0.5,
					})
				}, 2000)
			})
		})
	})
}

document.addEventListener('DOMContentLoaded', init)
