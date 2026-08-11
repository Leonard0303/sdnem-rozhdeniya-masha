<script setup>
import { computed } from 'vue'
import SectionShell from '../components/SectionShell.vue'
import PhotoFrame from '../components/PhotoFrame.vue'
import { photosFrom } from '../photos'
import { textFrom } from '../texts'
import { usePhotoRatios } from '../composables/usePhotoRatios'

/**
 * Поздравление от одного человека: имя и текст слева, фотографии справа.
 * Всё содержимое берётся из его папки в import-image — и текст, и снимки,
 * поэтому новый друг добавляется одной строкой в реестре страниц.
 */
const props = defineProps({
  active: Boolean,
  step: Number,
  /** Имя-подпись над поздравлением */
  name: { type: String, required: true },
  /** Папка человека, например '07-her-friends/Лиза' */
  folder: { type: String, required: true },
})

const photos = photosFrom(props.folder)
const paragraphs = textFrom(props.folder)

// Пропорции берутся из самих файлов: ориентация не задаётся вручную
const { ratios, ready } = usePhotoRatios(photos)

const shots = computed(() =>
  photos.map((photo) => ({
    ...photo,
    ratio: String(ratios.value[photo.name] ?? 1),
  })),
)
</script>

<template>
  <SectionShell :step="step" :active="active" label="Друзья">
    <template #aside>
      <h2 class="friend__name">{{ name }}</h2>
      <div v-if="paragraphs.length" class="prose prose--friend">
        <p v-for="(text, i) in paragraphs" :key="i" :class="{ prose__lead: i === 0 }">
          {{ text }}
        </p>
      </div>
    </template>

    <template #visual>
      <div v-if="ready" class="friend__photos" :class="{ 'is-many': shots.length > 1 }">
        <div v-for="shot in shots" :key="shot.name" class="friend__photo">
          <!-- fit="height" — снимки делят высоту поровну и выглядят согласованно -->
          <PhotoFrame :src="shot.src" alt="" :ratio="shot.ratio" fit="height" />
        </div>
      </div>
    </template>
  </SectionShell>
</template>

<style scoped>
.friend__name {
  margin: 0;
  font-family: var(--serif);
  font-weight: 300;
  font-size: clamp(30px, 3.4vw, 54px);
  line-height: 1.02;
  letter-spacing: -0.01em;
}

/* Поздравления цитируются как есть, поэтому переносы строк внутри абзаца сохраняются */
.prose--friend p {
  white-space: pre-line;
}

.friend__photos {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: clamp(14px, 1.6vw, 24px);
}

.friend__photo {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 900px) {
  .friend__photos {
    align-items: center;
    justify-content: center;
  }

  /* Несколько снимков встают в ряд и делят ширину поровну */
  .friend__photos.is-many {
    flex-direction: row;
  }

  .friend__photo {
    min-width: 0;
    align-items: center;
    justify-content: center;
  }

  /* На узком экране кадр упирается в ширину, а не в высоту:
     по горизонтали места меньше, и иначе снимок пришлось бы подрезать */
  .friend__photo :deep(.frame) {
    width: 100%;
    height: auto;
  }

  .friend__photo :deep(.frame__plate) {
    width: 100%;
    height: auto;
    max-height: 100%;
  }

  .friend__photo :deep(.frame__image) {
    width: 100%;
    height: auto;
    max-width: 100%;
  }
}
</style>
