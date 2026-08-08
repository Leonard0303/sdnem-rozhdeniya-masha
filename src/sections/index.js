import HeroSection from './HeroSection.vue'
import FromMeSection from './FromMeSection.vue'
import OurPhotosSection from './OurPhotosSection.vue'

/**
 * Порядок страниц сайта.
 * Чтобы добавить следующую страницу — создайте компонент рядом
 * и допишите сюда одну строку. Больше ничего менять не нужно:
 * навигация, нумерация и переходы подхватят её автоматически.
 *
 * Дальше по плану: 04 Наша история, 05 Поздравления от родителей,
 * 06 Поздравления от моих друзей, 07 Поздравления от её друзей, 08 Финал.
 */
export const sections = [
  { id: 'hero', title: 'Начало', component: HeroSection },
  { id: 'from-me', title: 'От меня', component: FromMeSection },
  { id: 'our-photos', title: 'Наши моменты', component: OurPhotosSection },
]
