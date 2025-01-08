import { gsap } from 'gsap'
import { SplitText } from 'gsap/all'
import audio from '../../assets/audio/leaping-audio.mp3'
const audioGitSrc = audio

function init() {
	gsap.registerPlugin(SplitText)
	console.log('loaded 13 01')
	const splitHero = new SplitText('[da="hero-heading"]', {
		type: 'words',
	})

	const heroTl = gsap.timeline({ paused: true })
	heroTl.to('[da="hero-heading"]', {
		opacity: 1,
		duration: 0.4,
	})
	heroTl.from(
		splitHero.words,
		{
			opacity: 0,
			y: '50%',
			duration: 0.4,
			stagger: 0.05,
		},
		0
	)
	heroTl.to(
		'[da="hero-text"]',
		{
			opacity: 1,
			duration: 0.4,
		},
		'<'
	)
	heroTl.to(
		'[da="hero-tag"]',
		{
			opacity: 1,
			y: '0%',
			duration: 0.4,
		},
		'<'
	)
	heroTl.to(
		'[da="hero-el"]',
		{
			opacity: 1,
			duration: 0.4,
			stagger: 0.1,
		},
		'<'
	)
	heroTl.to(
		'.hero-content',
		{
			opacity: 1,
			duration: 0.8,
			delay: 0.1,
		},
		'<'
	)
	heroTl.to(
		'.header',
		{
			opacity: 1,
			duration: 0.5,
		},
		'<'
	)
	// Запускаем анимацию после полной загрузки страницы
	window.addEventListener('load', function () {
		heroTl.play()
	})
}

document.addEventListener('DOMContentLoaded', init)
