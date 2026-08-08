<script setup>
import { computed } from 'vue'
import SectionShell from '../components/SectionShell.vue'
import PhotoFrame from '../components/PhotoFrame.vue'
import { photosFrom } from '../photos'

defineProps({ active: Boolean, step: Number })

/**
 * Заранее просчитанная раскладка «разложенных на столе» снимков.
 * Позиция задаётся центром фотографии (x, y в % контейнера), размер — высотой,
 * поэтому композиция не выходит за пределы экрана при любой ширине.
 * Если фотографий больше, чем раскладок, раскладки повторяются по кругу.
 */
const LAYOUT = [
  { x: 22, y: 34, h: 54, rotate: -4, z: 3, ratio: '4 / 5' },
  { x: 52, y: 21, h: 44, rotate: 3.5, z: 5, ratio: '3 / 4' },
  { x: 40, y: 70, h: 42, rotate: -2, z: 4, ratio: '5 / 4' },
  { x: 76, y: 56, h: 56, rotate: 4, z: 6, ratio: '4 / 5' },
  { x: 84, y: 18, h: 30, rotate: -6, z: 2, ratio: '1 / 1' },
  { x: 14, y: 76, h: 34, rotate: 6, z: 1, ratio: '3 / 4' },
]

const photos = photosFrom('03-our-photos')

const countLabel = computed(() => {
  const n = photos.length
  const teens = n % 100 >= 11 && n % 100 <= 14
  const last = n % 10
  let word = 'фотографий'
  if (!teens && last === 1) word = 'фотография'
  else if (!teens && last >= 2 && last <= 4) word = 'фотографии'
  return `${n} ${word}`
})

const arranged = computed(() =>
  photos.map((photo, i) => {
    const slot = LAYOUT[i % LAYOUT.length]
    return {
      ...photo,
      ratio: slot.ratio,
      style: {
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        height: `${slot.h}%`,
        zIndex: slot.z,
        '--rotate': `${slot.rotate}deg`,
        '--delay': `${0.12 + i * 0.09}s`,
      },
    }
  }),
)
</script>

<template>
  <SectionShell :step="step" :active="active" label="Память">
    <template #aside>
      <h2 class="photos__title">Наши<br /><em>моменты</em></h2>
      <p class="photos__text">Несколько дней, которые хочется оставить себе.</p>
      <p class="photos__count meta">{{ countLabel }}</p>
    </template>

    <template #visual>
      <div class="photos__stack">
        <div
          v-for="photo in arranged"
          :key="photo.name"
          class="photos__item"
          :style="photo.style"
        >
          <PhotoFrame :src="photo.src" alt="" :ratio="photo.ratio" matting="clamp(7px, 0.7vw, 12px)" />
        </div>
      </div>
    </template>
  </SectionShell>
</template>

<style scoped>
.photos__title {
  margin: 0;
  font-family: var(--serif);
  font-weight: 300;
  font-size: clamp(38px, 4.6vw, 74px);
  line-height: 1;
  letter-spacing: -0.01em;
}

.photos__title em {
  font-style: italic;
  color: var(--ink-soft);
}

.photos__text {
  margin: clamp(22px, 3.6vh, 38px) 0 0;
  max-width: 26ch;
  border-top: 1px solid var(--line);
  padding-top: clamp(18px, 3vh, 28px);
  font-family: var(--serif);
  font-size: clamp(17px, 1.4vw, 22px);
  line-height: 1.6;
  color: var(--ink-soft);
}

.photos__count {
  margin: clamp(24px, 3.5vh, 40px) 0 0;
}

.photos__stack {
  position: relative;
  width: 100%;
  height: 100%;
}

.photos__item {
  position: absolute;
  transform: translate(-50%, -50%) rotate(var(--rotate));
  transition: transform 0.55s var(--ease);
  will-change: transform;
}

.photos__item:hover {
  transform: translate(-50%, -50%) rotate(var(--rotate)) translateY(-8px) scale(1.015);
  z-index: 10;
}

.photos__item :deep(.frame) {
  align-items: center;
}

/* Снимки выкладываются по очереди, когда страница появляется на экране */
.shell.is-active .photos__item {
  /* backwards, а не both: после выкладки управление возвращается обычным стилям,
     иначе анимация перебивала бы transform при наведении */
  animation: photo-lay 0.75s var(--ease) backwards;
  animation-delay: var(--delay);
}

@keyframes photo-lay {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(calc(var(--rotate) * 2.2)) translateY(26px) scale(0.965);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--rotate));
  }
}

@media (max-width: 900px) {
  .photos__item:hover {
    transform: translate(-50%, -50%) rotate(var(--rotate));
  }
}
</style>
