<script setup>
import { computed } from 'vue'
import SectionShell from '../components/SectionShell.vue'
import PhotoFrame from '../components/PhotoFrame.vue'
import { photoFrom } from '../photos'
import { usePhotoRatios } from '../composables/usePhotoRatios'

defineProps({ active: Boolean, step: Number })

const photo = photoFrom('02-from-me')

// Рамка повторяет пропорции самой фотографии: горизонтальный кадр — горизонтальная рамка
const { ratios, ready } = usePhotoRatios(photo ? [photo] : [])
const ratio = computed(() => String(ratios.value[photo?.name] ?? 1))
</script>

<template>
  <SectionShell :step="step" :active="active" label="Лично">
    <template #aside>
      <h2 class="from-me__title">От меня <span class="from-me__heart">❤️</span></h2>
      <div class="from-me__text">
        <p>Есть вещи, которые не всегда получается сказать вслух.</p>
        <p>Просто знай — я очень тебя люблю.</p>
      </div>
      <p class="from-me__sign meta">С любовью</p>
    </template>

    <template #visual>
      <div class="from-me__photo">
        <PhotoFrame v-if="photo && ready" :src="photo.src" alt="" :ratio="ratio" />
      </div>
    </template>
  </SectionShell>
</template>

<style scoped>
.from-me__title {
  margin: 0;
  font-family: var(--serif);
  font-weight: 300;
  font-size: clamp(38px, 4.6vw, 74px);
  line-height: 1.02;
  letter-spacing: -0.01em;
}

.from-me__heart {
  font-size: 0.5em;
  vertical-align: 0.35em;
  margin-left: 0.12em;
}

.from-me__text {
  margin-top: clamp(22px, 3.6vh, 38px);
  max-width: 100%;
  border-top: 1px solid var(--line);
  padding-top: clamp(18px, 3vh, 28px);
}

.from-me__text p {
  margin: 0 0 0.85em;
  font-family: var(--serif);
  font-size: clamp(17px, 1.4vw, 22px);
  line-height: 1.6;
  color: var(--ink-soft);
}

.from-me__text p:last-child {
  margin-bottom: 0;
}

.from-me__sign {
  margin: clamp(26px, 4vh, 44px) 0 0;
}

.from-me__photo {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

@media (max-width: 900px) {
  .from-me__photo {
    justify-content: center;
  }
}
</style>
