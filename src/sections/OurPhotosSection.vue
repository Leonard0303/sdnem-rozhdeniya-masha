<script setup>
import SectionShell from '../components/SectionShell.vue'
import PhotoFrame from '../components/PhotoFrame.vue'
import { photosFrom } from '../photos'

defineProps({ active: Boolean, step: Number })

/**
 * Все карточки одного размера и одних пропорций — 4:3.
 * Горизонтальные снимки (их большинство) попадают в карточку кадр в кадр,
 * вертикальный вписывается через object-fit: cover, без искажения пропорций.
 */
const CARD_RATIO = '4 / 3'

const photos = photosFrom('03-our-photos')
</script>

<template>
  <SectionShell :step="step" :active="active" label="Память">
    <template #aside>
      <h2 class="photos__title">Наши<br /><em>моменты</em></h2>
      <p class="photos__text">Моменты, которые хочется хранить особенно бережно. ❤️</p>
    </template>

    <template #visual>
      <div class="photos__grid">
        <div
          v-for="(photo, i) in photos"
          :key="photo.name"
          class="photos__item"
          :style="{ '--delay': `${0.1 + i * 0.07}s` }"
        >
          <PhotoFrame :src="photo.src" alt="" :ratio="CARD_RATIO" />
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
  max-width: 100%;
  border-top: 1px solid var(--line);
  padding-top: clamp(18px, 3vh, 28px);
  font-family: var(--serif);
  font-size: clamp(17px, 1.4vw, 22px);
  line-height: 1.6;
  color: var(--ink-soft);
}

/* Ровная сетка 2×2: одинаковые ячейки, одинаковые промежутки,
   никаких поворотов, наложений и перекрытий */
.photos__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(14px, 1.6vw, 26px);
  width: 100%;
  max-height: 100%;
  margin-left: auto;
}

.photos__item {
  min-width: 0;
}

/* Карточки появляются по очереди — ровно, без сдвигов по горизонтали */
.shell.is-active .photos__item {
  animation: photo-appear 0.7s var(--ease) backwards;
  animation-delay: var(--delay);
}

@keyframes photo-appear {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
