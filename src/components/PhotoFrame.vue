<script setup>
/**
 * Фотография в чёрной рамке — общий визуальный элемент всего сайта.
 * Рамка сделана как «паспарту» печатной фотографии: плотное чёрное поле,
 * тонкий внутренний кант и мягкая тень от бумаги.
 */
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  /** Пропорции кадра, например '4 / 5' или '3 / 4' */
  ratio: { type: String, default: '4 / 5' },
  /** Ширина чёрного поля вокруг снимка */
  matting: { type: String, default: 'clamp(10px, 1.1vw, 18px)' },
})
</script>

<template>
  <figure class="frame" :style="{ '--matting': matting }">
    <div class="frame__plate" :style="{ aspectRatio: ratio }">
      <img class="frame__image" :src="src" :alt="alt" draggable="false" />
    </div>
    <figcaption v-if="$slots.default" class="frame__caption meta">
      <slot />
    </figcaption>
  </figure>
</template>

<style scoped>
/* Рамка всегда вписывается в отведённое ей место, а не в размер файла */
.frame {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
  max-width: 100%;
}

.frame__plate {
  position: relative;
  height: 100%;
  width: auto;
  max-width: 100%;
  padding: var(--matting);
  background: var(--frame);
  border-radius: 2px;
  box-shadow:
    0 1px 1px rgba(20, 18, 14, 0.16),
    0 14px 28px -14px rgba(20, 18, 14, 0.45),
    0 42px 60px -40px rgba(20, 18, 14, 0.5);
}

/* Тонкий кант между чёрным полем и снимком */
.frame__plate::after {
  content: '';
  position: absolute;
  inset: calc(var(--matting) - 1px);
  border: 1px solid rgba(255, 255, 255, 0.09);
  pointer-events: none;
}

.frame__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
}

.frame__caption {
  margin-top: 14px;
}
</style>
