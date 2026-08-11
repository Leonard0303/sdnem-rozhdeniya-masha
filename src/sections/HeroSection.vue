<script setup>
import SectionShell from '../components/SectionShell.vue'
import PhotoFrame from '../components/PhotoFrame.vue'
import { photoFrom } from '../photos'

defineProps({ active: Boolean, step: Number })

const photo = photoFrom('01-hero')
</script>

<template>
  <SectionShell :step="step" :active="active" label="Начало">
    <template #aside>
      <p class="hero__over meta">Сегодня</p>
      <h1 class="hero__title">
        С днём<br />
        <em>рождения</em>
      </h1>
      <div class="prose">
        <p class="prose__lead">Есть дни, которые хочется запомнить. Сегодня — один из них. ❤️</p>
        <p>
          Твой день, твоя улыбка, твои мечты и всё самое прекрасное, что ещё ждёт тебя
          впереди.
        </p>
        <p>
          Пусть этот новый год твоей жизни будет наполнен счастьем, любовью и моментами,
          которые захочется сохранить навсегда.
        </p>
      </div>
    </template>

    <template #visual>
      <div class="hero__photo">
        <PhotoFrame v-if="photo" :src="photo.src" alt="" ratio="4 / 5" />
      </div>
    </template>
  </SectionShell>
</template>

<style scoped>
.hero__over {
  margin: 0 0 clamp(18px, 3vh, 30px);
}

.hero__title {
  margin: 0;
  font-family: var(--serif);
  font-weight: 300;
  font-size: clamp(46px, 6.4vw, 104px);
  line-height: 0.96;
  letter-spacing: -0.015em;
}

.hero__title em {
  font-style: italic;
  color: var(--ink-soft);
}

.hero__photo {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

@media (max-width: 900px) {
  .hero__photo {
    justify-content: center;
  }
}
</style>
