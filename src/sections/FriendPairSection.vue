<script setup>
import { computed } from 'vue'
import SectionShell from '../components/SectionShell.vue'
import PhotoFrame from '../components/PhotoFrame.vue'
import { photosFrom } from '../photos'
import { textFrom } from '../texts'
import { usePhotoRatios } from '../composables/usePhotoRatios'

/**
 * Два поздравления из одной папки — рядом, но раздельно.
 * На широком экране это две колонки текста и общая фотография справа,
 * на узком всё перестраивается друг под другом.
 */
const props = defineProps({
  active: Boolean,
  step: Number,
  /** Папка пары, например '07-her-friends/Далила и Асхат' */
  folder: { type: String, required: true },
  /** [{ name, file }] — чей текст в каком файле */
  people: { type: Array, required: true },
})

const photos = photosFrom(props.folder)
const { ratios, ready } = usePhotoRatios(photos)

const columns = computed(() =>
  props.people.map((person) => ({
    name: person.name,
    paragraphs: textFrom(props.folder, person.file),
  })),
)

const shots = computed(() =>
  photos.map((photo) => ({
    ...photo,
    ratio: String(ratios.value[photo.name] ?? 1),
  })),
)
</script>

<template>
  <SectionShell :step="step" :active="active" label="Друзья">
    <template #full>
      <div class="pair" :class="{ 'has-photos': ready && shots.length }">
        <div v-for="column in columns" :key="column.name" class="pair__column">
          <h2 class="pair__name">{{ column.name }}</h2>
          <div v-if="column.paragraphs.length" class="prose prose--pair">
            <p v-for="(text, i) in column.paragraphs" :key="i">{{ text }}</p>
          </div>
        </div>

        <div v-if="ready && shots.length" class="pair__photos">
          <PhotoFrame
            v-for="shot in shots"
            :key="shot.name"
            :src="shot.src"
            alt=""
            :ratio="shot.ratio"
            fit="width"
          />
        </div>
      </div>
    </template>
  </SectionShell>
</template>

<style scoped>
/* Без фотографий — две равные колонки, с фотографиями к ним добавляется
   третья, более узкая. Пустого места под несуществующий снимок не остаётся. */
.pair {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: minmax(0, 1fr);
  gap: clamp(28px, 4vw, 72px);
  align-items: stretch;
}

.pair.has-photos {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 0.7fr);
}

/* Колонки одной высоты и с общей верхней линией — два поздравления
   читаются как пара, а не как случайные блоки разной длины */
.pair__column {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.pair__name {
  margin: 0;
  font-family: var(--serif);
  font-weight: 300;
  font-size: clamp(26px, 2.8vw, 44px);
  line-height: 1.02;
  letter-spacing: -0.01em;
}

/* Поздравления цитируются как есть, поэтому переносы строк сохраняются */
.prose--pair p {
  white-space: pre-line;
}

.pair__photos {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(14px, 1.6vw, 24px);
  align-items: flex-end;
}

@media (max-width: 900px) {
  .pair {
    display: block;
    overflow-y: auto;
    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch;
  }

  .pair__column {
    display: block;
  }

  .pair__column + .pair__column {
    margin-top: clamp(24px, 4vh, 40px);
  }

  .pair__photos {
    margin-top: clamp(24px, 4vh, 40px);
    align-items: center;
  }

  .pair__photos :deep(.frame) {
    max-width: min(100%, 62vw);
  }
}
</style>
