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
      <div class="prose">
        <p class="prose__lead">
          Маша, любимая моя, поздравляю тебя с днём рождения ❤️
        </p>
        <p>
          Желаю тебе успехов во всех твоих начинаниях, побольше интересных и счастливых
          моментов, которые ещё приготовила для тебя жизнь. Пусть будет больше улыбок и
          смеха, а разочарований — как можно меньше.
        </p>
        <p>
          Оставайся такой же открытой, любвеобильной и в меру строгой. И тебе совсем не
          обязательно быть лучшей из лучших — потому что для меня ты и так самая лучшая ❤️
        </p>
        <p>Будь счастлива, любимая. Я очень тебя люблю.</p>
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

.from-me__sign {
  margin: clamp(20px, 3.2vh, 40px) 0 0;
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

  /* На узком экране места по высоте меньше, чем по ширине,
     поэтому горизонтальный кадр упирается в высоту, а не в ширину */
  .from-me__photo :deep(.frame),
  .from-me__photo :deep(.frame__plate) {
    width: auto;
    height: 100%;
  }

  .from-me__photo :deep(.frame__image) {
    width: auto;
    height: 100%;
    max-width: 100%;
  }
}
</style>
