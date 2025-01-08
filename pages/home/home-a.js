import { gsap } from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import audio from '../../assets/audio/leaping-audio.mp3'
const audioGitSrc = audio
// Функция для классических аккордеонов
function faqAnimation(selector, content, icon, duration = 0.5) {
	const cards = document.querySelectorAll(selector)

	cards.forEach((card, index) => {
		const cardContent = card.querySelector(content)
		const cardIcon = card.querySelector(icon)

		gsap.set(cardContent, {
			height: 0,
		})

		let clickCount = 0

		card.addEventListener('click', () => {
			clickCount++

			if (clickCount === 1) {
				// Открытие таба
				gsap.to(cardContent, {
					height: 'auto',
					duration: duration,
					onComplete: () => {
						// Устанавливаем высоту 'auto' после анимации для корректного отображения контента
						gsap.set(cardContent, { height: 'auto' })
					},
				})
				gsap.to(cardIcon, {
					rotation: 180,
					duration: duration,
				})
			} else if (clickCount === 2) {
				// Закрытие таба
				gsap.to(cardContent, {
					height: 0,
					duration: duration,
				})
				gsap.to(cardIcon, {
					rotation: 0,
					duration: duration,
				})
				clickCount = 0 // Сбрасываем счётчик кликов
			}
		})
	})

	// // Программно кликаем на первый таб, чтобы его открыть
	// if (cards.length > 0) {
	// 	cards[0].click()
	// }
}

// Функция для табов с анимацией картинки
function tabsAnimate(selector, content, icon, duration = 0.3) {
	const mm = gsap.matchMedia() // Инициализируем GSAP matchMedia

	mm.add(
		{
			// Указываем условия медиазапроса
			isMobile: '(max-width: 479px)',
			isDesktop: '(min-width: 480px)',
		},
		context => {
			const { isMobile } = context.conditions // Получаем текущие условия

			const cards = document.querySelectorAll(selector)
			const windowContent = document.querySelector('.features_window img')

			let activeCard = null

			cards.forEach((card, index) => {
				const cardContent = card.querySelector(content)
				const cardIcon = card.querySelector(icon)

				gsap.set(cardContent, {
					height: 0,
				})
				gsap.set(cardIcon, {
					rotation: 0,
				})

				if (index === 0) {
					activeCard = card
					gsap.set(cardContent, {
						height: 'auto',
					})
					gsap.set(cardIcon, {
						rotation: 180,
					})
					const initialSrc = isMobile
						? card.getAttribute('data-src-mob')
						: card.getAttribute('data-src')
					windowContent.setAttribute('src', initialSrc)
				}

				card.addEventListener('click', () => {
					if (card === activeCard) return

					if (activeCard) {
						const prevContent = activeCard.querySelector(content)
						const prevIcon = activeCard.querySelector(icon)
						gsap.to(prevContent, {
							height: 0,
							duration: duration,
						})
						gsap.to(prevIcon, {
							rotation: 0,
							duration: duration,
						})
					}

					activeCard = card
					gsap.to(cardContent, {
						height: 'auto',
						duration: duration,
						onComplete: () => {
							// Устанавливаем высоту 'auto' после анимации для корректного отображения контента
							gsap.set(cardContent, { height: 'auto' })
						},
					})
					gsap.to(cardIcon, {
						rotation: 180,
						duration: duration,
					})

					const src = isMobile
						? card.getAttribute('data-src-mob')
						: card.getAttribute('data-src')
					if (src) {
						gsap.to(windowContent, {
							opacity: 0,
							duration: 0.5,
							onComplete: () => {
								windowContent.setAttribute('src', src)
								gsap.to(windowContent, {
									opacity: 1,
									duration: 0.5,
								})
							},
						})
					}
				})
			})
		}
	)
}

function animateHeadings(selector) {
	const splitHeading = new SplitText(selector, {
		type: 'words',
	})
	return gsap.from(splitHeading.words, {
		opacity: 0,
		y: '50%',
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
	return gsap.from(selector, {
		opacity: 0,
		y: '50%',
		duration: 0.4,
	})
}
function init() {
	gsap.registerPlugin(SplitText, ScrollTrigger)
	console.log('loaded 13 01')
	const audioFile =
		'https://pavel-khenkin-webflow.github.io/leaping-ai/assets/audio/leaping-audio.mp3'

	// Создаем аудио элемент с использованием постоянного URL
	const audioElement = new Audio(audioFile)

	// Установите громкость аудио
	audioElement.volume = 1 // Установите громкость на максимум

	// Получаем необходимые элементы
	const audioTrack = document.querySelector('.audio_track-active')
	const audioBtn = document.querySelector('.audio_btn')
	const audioBtnIcon = audioBtn ? audioBtn.querySelector('img') : null

	// Переменная для отслеживания состояния (играет ли аудио)
	let isPlaying = false
	let animation

	// Функция для смены иконки
	function toggleIcon() {
		if (!audioBtnIcon) {
			return
		}

		const iconSrc = isPlaying
			? 'https://cdn.prod.website-files.com/66c4854a57225481f4ba26fd/66cf1e90e32f8a0dbda4fff9_icon-pause.svg'
			: 'https://cdn.prod.website-files.com/66c4854a57225481f4ba26fd/66ce06dbd88c0891eaf396d3_btn-icon-audio.svg'

		gsap.to(audioBtnIcon, {
			opacity: 0,
			duration: 0.1,
			onComplete: function () {
				audioBtnIcon.setAttribute('src', iconSrc)
				gsap.to(audioBtnIcon, {
					opacity: 1,
					duration: 0.1,
				})
			},
		})
	}

	// Функция для запуска анимации
	function startAnimation() {
		// Останавливаем предыдущую анимацию, если она была
		if (animation) {
			animation.kill()
		}

		// Рассчитываем оставшееся время для анимации
		const remainingTime = audioElement.duration - audioElement.currentTime

		// Запускаем новую анимацию с учетом оставшегося времени
		animation = gsap.to(audioTrack, {
			width: '100%',
			duration: remainingTime, // Используем оставшееся время для синхронизации анимации
			ease: 'linear',
			onComplete: function () {
				isPlaying = false
				toggleIcon()
				gsap.set(audioTrack, { width: '0%' })
			},
		})
	}

	// Событие клика по кнопке
	if (audioBtn) {
		audioBtn.addEventListener('click', () => {
			if (isPlaying) {
				audioElement.pause()
				animation.pause()
			} else {
				audioElement
					.play()
					.then(() => {
						startAnimation() // Запускаем анимацию при воспроизведении
					})
					.catch(error => {
						console.error('Не удалось воспроизвести аудио:', error)
					})
			}

			isPlaying = !isPlaying
			toggleIcon()
		})
	}

	// Событие окончания аудио
	audioElement.addEventListener('ended', () => {
		isPlaying = false
		toggleIcon()
		gsap.set(audioTrack, { width: '0%' })
	})

	// Событие для обновления анимации при паузе и возобновлении
	audioElement.addEventListener('pause', () => {
		if (animation) {
			animation.pause()
		}
	})

	audioElement.addEventListener('play', () => {
		if (animation) {
			animation.resume()
		}
	})

	// logos section

	const logosTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_clients',
			start: 'top bottom',
			end: 'bottom center',
		},
	})
	logosTl.add(animateHeadings('[da="logos-title"]'))
	logosTl.from(
		'.clients_line',
		{
			opacity: 0,
			duration: 0.7,
		},
		'<'
	)

	// section_mind

	const mindTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_mind',
			start: 'top center',
			end: 'bottom center',
		},
	})
	mindTl.from('[da="mind-bg"]', {
		opacity: 0,
		duration: 0.7,
	})
	mindTl.add(animateHeadings('[da="mind-title"]'))
	mindTl.add(animateText('[da="mind-text"]'), '<')

	// features

	const featuresTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_features',
			start: 'top center',
			end: 'bottom center',
		},
	})
	featuresTl.add(animateTag('[da="f-tag"]'))
	featuresTl.add(animateHeadings('[da="f-title"]'), '<')
	featuresTl.from(
		'.features_tab',
		{
			opacity: 0,
			duration: 0.7,
			y: '50%',
			stagger: 0.2,
		},
		'<'
	)
	featuresTl.from(
		'.features_window',
		{
			opacity: 0,
			duration: 0.7,
			delay: 0.1,
		},
		'<'
	)

	faqAnimation('.faq_card', '.faq_card-content', '[data-icon="faq-icon"]', 0.3)
	tabsAnimate(
		'.features_tab',
		'.features_tab-content',
		'[data-icon="features-icon"]',
		0.3
	)

	// about section
	const aboutTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_about',
			start: 'top center',
			end: 'bottom center',
		},
	})
	aboutTl.from('[da="about-bg"]', {
		opacity: 0,
		duration: 0.7,
	})
	aboutTl.add(animateTag('[da="about-tag"]'))
	aboutTl.add(animateHeadings('[da="about-title"]'), '<')
	aboutTl.add(animateText('[da="about-text"]'), '<')
	aboutTl.from(
		'.about_card',
		{
			opacity: 0,
			y: '50%',
			duration: 0.7,
			stagger: 0.1,
			delay: 0.05,
		},
		'<'
	)

	// industry

	const industryTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_industry',
			start: 'top center',
			end: 'bottom center',
		},
	})
	industryTl.add(animateTag('[da="i-tag"]'))
	industryTl.add(animateHeadings('[da="i-title"]'), '<')
	industryTl.from(
		'.industry_card',
		{
			opacity: 0,
			y: '50%',
			duration: 0.7,
			stagger: 0.1,
			delay: 0.05,
		},
		'<'
	)

	// services tl

	const servicesTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_services',
			start: 'top center',
			end: 'bottom center',
		},
	})
	servicesTl.from('.services_card', {
		opacity: 0,
		y: '50%',
		duration: 0.7,
		stagger: 0.1,
	})

	// reviews animation

	const reviewTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_reviews',
			start: 'top center',
			end: 'bottom center',
		},
	})
	reviewTl.add(animateTag('[da="r-tag"]'))
	reviewTl.add(animateHeadings('[da="r-title"]'), '<')
	reviewTl.from(
		'.reviews_nav',
		{
			opacity: 0,
			duration: 0.7,
		},
		'<'
	)
	reviewTl.from(
		'.reviews_card',
		{
			opacity: 0,
			y: '50%',
			duration: 0.7,
			stagger: 0.1,
			delay: 0.05,
		},
		'<'
	)

	// Reviews slider

	const reviewsSlider = new Swiper('.reviews_slider', {
		slidesPerView: 1,
		spaceBetween: 20,
		modules: [Navigation, Pagination],
		navigation: {
			nextEl: '[data-slider="r-btn-next"]',
			prevEl: '[data-slider="r-btn-prev"]',
		},
		breakpoints: {
			480: {
				slidesPerView: 3,
				spaceBetween: 12,
			},
		},
	})

	// calc animate

	const calcTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_calculate',
			start: 'top center',
			end: 'bottom center',
		},
	})
	calcTl.from('.calculate_content', {
		opacity: 0,
		y: '50%',
		duration: 0.7,
	})
	calcTl.add(animateHeadings('[da="calc-title"]'), '<')
	calcTl.from(
		'[da="calc-el"]',
		{
			opacity: 0,
			duration: 0.7,
		},
		'<'
	)

	// calculator
	const inputCalls = document.getElementById('input-calls')
	const inputPercent = document.getElementById('ai-percent')
	const inputTime = document.getElementById('input-time')
	const textCalls = document.querySelector('[data-calc="calls"]')
	const textPercent = document.querySelector('[data-calc="percent"]')
	const textTime = document.querySelector('[data-calc="time"]')
	const result = document.getElementById('calculate-result')

	// Функция для обновления фона слайдера
	function updateSliderBackground(slider) {
		const value =
			((slider.value - slider.min) / (slider.max - slider.min)) * 100 // Расчет процента заполнения
		slider.style.background = `linear-gradient(to right, var(--primary) ${value}%, var(--border--gray) ${value}%)` // Обновляем фон слайдера
	}

	// Функция для пересчета экономии
	function calculateSavings() {
		const callsValue = +inputCalls.value
		const percentValue = +inputPercent.value / 100 // Преобразование значения процента от 0 до 100 в десятичное
		const timeValue = +inputTime.value

		// Обновляем текстовые значения для каждого инпута
		textCalls.textContent = `${callsValue}`
		textPercent.textContent = `${inputPercent.value}%`
		textTime.textContent = `${timeValue} min`

		// Константы
		const humanCostPerMinute = 0.5 // Стоимость звонка человеком в евро за минуту
		const aiCostPerMinute = 0.2 // Стоимость звонка ИИ в евро за минуту

		// Расчет экономии по формуле
		const savings =
			callsValue *
			timeValue *
			percentValue *
			((humanCostPerMinute - aiCostPerMinute) / humanCostPerMinute)

		// Обновляем результат — выводим только число
		result.textContent = `${Math.round(savings)}`

		// Обновляем фон слайдеров
		updateSliderBackground(inputCalls)
		updateSliderBackground(inputPercent)
		updateSliderBackground(inputTime)
	}

	// Инициализация значений при загрузке страницы
	calculateSavings()

	// Добавляем обработчики событий для инпутов
	inputCalls.addEventListener('input', calculateSavings)
	inputPercent.addEventListener('input', calculateSavings)
	inputTime.addEventListener('input', calculateSavings)

	const tricker = document.querySelectorAll(`[wb-data="line-01"]`)

	// from animate

	const ctaTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_cta',
			start: 'top center',
			end: 'bottom center',
		},
	})
	ctaTl.add(animateTag('[da="cta-tag"]'))
	ctaTl.add(animateHeadings('[da="cta-title"]'), '<')
	ctaTl.from(
		'.cta_form',
		{
			opacity: 0,
			duration: 0.7,
		},
		'<'
	)
	ctaTl.from(
		'.cta_window',
		{
			opacity: 0,
			duration: 0.7,
		},
		'<'
	)

	// faq animate

	const faqTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_faq',
			start: 'top center',
			end: 'bottom center',
		},
	})
	faqTl.add(animateTag('[da="faq-tag"]'))
	faqTl.add(animateHeadings('[da="faq-title"]'), '<')
	faqTl.from(
		'.faq_card',
		{
			opacity: 0,
			y: '50%',
			duration: 0.7,
			stagger: 0.1,
			delay: 0.05,
		},
		'<'
	)

	// footer animation

	gsap.from('.footer', {
		opacity: 0,
		duration: 0.7,
		scrollTrigger: {
			trigger: '.footer',
			start: 'top bottom',
			end: 'bottom bottom',
		},
	})

	// run line

	tricker.forEach(trick => {
		const duration = trick.getAttribute('duration') || 20
		const trickContent = trick.firstChild

		if (!trick) {
			return
		}

		const trickContentClone = trickContent.cloneNode(true)
		trick.append(trickContentClone)

		let tween

		const playLine = () => {
			let progress = tween ? tween.progress() : 0
			tween && tween.progress(0).kill()
			const width = parseInt(
				getComputedStyle(trickContent).getPropertyValue('width'),
				10
			)
			const gap = parseInt(
				getComputedStyle(trickContent).getPropertyValue('column-gap'),
				10
			)

			const distanceToTranslate = -1 * (gap + width)

			tween = gsap.fromTo(
				trick.children,
				{ x: 0 },
				{ x: distanceToTranslate, duration, ease: 'none', repeat: -1 }
			)
			tween.progress(progress)
			console.log({ width })
		}
		playLine()

		function debounce(func) {
			var timer
			return function (event) {
				if (timer) clearTimeout(timer)
				timer = setTimeout(
					() => {
						func()
					},
					500,
					event
				)
			}
		}

		window.addEventListener('resize', debounce(playLine))
	})
}

document.addEventListener('DOMContentLoaded', init)
