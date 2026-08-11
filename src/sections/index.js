import HeroSection from './HeroSection.vue'
import FromMeSection from './FromMeSection.vue'
import OurPhotosSection from './OurPhotosSection.vue'
import FriendSection from './FriendSection.vue'
import FriendPairSection from './FriendPairSection.vue'
import FinaleSection from './FinaleSection.vue'

/**
 * Порядок страниц сайта.
 * Чтобы добавить следующую страницу — создайте компонент рядом
 * и допишите сюда одну строку. Больше ничего менять не нужно:
 * навигация, нумерация и переходы подхватят её автоматически.
 *
 * Поздравления друзей собираются из папок в import-image: имя и текст
 * берутся из .txt, фотографии — из той же папки. Чтобы добавить ещё одного
 * человека, достаточно положить папку и дописать строку сюда.
 *
 * Дальше по плану: Наша история, Поздравления от родителей, Финал.
 */
export const sections = [
  { id: 'hero', title: 'Начало', component: HeroSection },
  { id: 'from-me', title: 'От меня', component: FromMeSection },
  { id: 'our-photos', title: 'Наши моменты', component: OurPhotosSection },
  {
    id: 'friend-liza',
    title: 'Лиза',
    component: FriendSection,
    props: { name: 'Лиза', folder: '07-her-friends/Лиза' },
  },
  {
    id: 'friend-vanya',
    title: 'Ваня',
    component: FriendSection,
    props: { name: 'Ваня', folder: '07-her-friends/Ваня' },
  },
  {
    id: 'friends-dalila-askhat',
    title: 'Далила и Асхат',
    component: FriendPairSection,
    props: {
      folder: '07-her-friends/Далила и Асхат',
      people: [
        { name: 'Далила', file: 'от_нее' },
        { name: 'Асхат', file: 'от_него' },
      ],
    },
  },
  {
    id: 'friend-sabina',
    title: 'Сабина',
    component: FriendSection,
    props: { name: 'Сабина', folder: '07-her-friends/Сабина' },
  },
  {
    id: 'friends-andrey-tamila',
    title: 'Андрей и Тамила',
    component: FriendPairSection,
    props: {
      folder: '07-her-friends/Андрей и Тамила',
      people: [
        { name: 'Андрей', file: 'от_андрея' },
        { name: 'Тамила', file: 'от_тамилы' },
      ],
    },
  },
  { id: 'finale', title: 'Финал', component: FinaleSection },
]
