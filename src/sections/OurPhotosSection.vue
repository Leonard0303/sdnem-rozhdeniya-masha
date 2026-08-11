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
      <div class="prose">
        <p class="prose__lead">Моменты, которые хочется хранить особенно бережно.</p>
        <p>
          Те самые маленькие мгновения, которые со временем становятся самыми дорогими.
          Улыбки, смех, случайные взгляды, тёплые разговоры и просто моменты, когда мы
          счастливы рядом друг с другом.
        </p>
        <p>
          Именно из них и складываются воспоминания, к которым хочется возвращаться снова
          и снова. ❤️
        </p>
      </div>
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

@media (max-width: 900px) {
  /* На узком экране сетка ограничена оставшейся высотой:
     ячейки делят её поровну, карточки заполняют ячейку целиком */
  .photos__grid {
    height: 100%;
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }

  .photos__item {
    min-height: 0;
  }

  .photos__item :deep(.frame),
  .photos__item :deep(.frame__plate) {
    width: 100%;
    height: 100%;
  }

  .photos__item :deep(.frame__image) {
    width: 100%;
    height: 100%;
  }
}
</style>
