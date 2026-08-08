<script setup>
import SectionShell from '../components/SectionShell.vue'
import PhotoFrame from '../components/PhotoFrame.vue'
import { photoFrom } from '../photos'

defineProps({ active: Boolean, step: Number })

const photo = photoFrom('02-from-me')
</script>

<template>
  <SectionShell :step="step" :active="active" label="Лично">
    <template #aside>
      <h2 class="from-me__title">От меня <span class="from-me__heart">❤️</span></h2>
      <div class="from-me__text">
        <p>Здесь будет то, что я давно хотел сказать тебе вслух.</p>
        <p>Пусть этот день будет только твоим — и пусть он будет тёплым.</p>
      </div>
      <p class="from-me__sign meta">С любовью</p>
    </template>

    <template #visual>
      <div class="from-me__photo">
        <PhotoFrame v-if="photo" :src="photo.src" alt="" ratio="3 / 4" />
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
  max-width: 32ch;
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
