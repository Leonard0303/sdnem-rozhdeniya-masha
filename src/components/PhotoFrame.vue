<script setup>
import { computed } from 'vue'

/**
 * Фотография в чёрной рамке — общий визуальный элемент всего сайта.
 * Рамка сделана как «паспарту» печатной фотографии: плотное чёрное поле,
 * тонкий внутренний кант и мягкая тень от бумаги.
 */
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  /** Пропорции кадра: '4 / 5', '3 / 4' или число ('1.3333') */
  ratio: { type: String, default: '4 / 5' },
  /** Ширина чёрного поля вокруг снимка */
  matting: { type: String, default: 'clamp(10px, 1.1vw, 18px)' },
  /**
   * Во что упирается кадр:
   * 'auto' — по ориентации снимка, 'height' — всегда в высоту места,
   * 'width' — всегда в ширину. 'height' нужен, когда несколько фотографий
   * делят высоту поровну и должны выглядеть согласованно.
   */
  fit: { type: String, default: 'auto' },
})

/**
 * Вертикальная рамка упирается в высоту контейнера, горизонтальная — в ширину.
 * Иначе горизонтальный кадр обрезался бы до вертикального.
 */
const isWide = computed(() => {
  if (props.fit === 'height') return false
  if (props.fit === 'width') return true

  const [w, h] = props.ratio.split('/')
  const value = h === undefined ? Number(w) : Number(w) / Number(h)
  return Number.isFinite(value) && value >= 1
})
</script>

<template>
  <figure class="frame" :class="isWide ? 'is-wide' : 'is-tall'" :style="{ '--matting': matting }">
    <div class="frame__plate">
      <img
        class="frame__image"
        :src="src"
        :alt="alt"
        :style="{ aspectRatio: ratio }"
        draggable="false"
      />
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

.frame.is-wide {
  width: 100%;
}

.frame__plate {
  position: relative;
  padding: var(--matting);
  background: var(--frame);
  border-radius: 2px;
  box-shadow:
    0 1px 1px rgba(20, 18, 14, 0.16),
    0 14px 28px -14px rgba(20, 18, 14, 0.45),
    0 42px 60px -40px rgba(20, 18, 14, 0.5);
}

/* Чёрное поле обтягивает снимок: вертикальный упирается в высоту места,
   горизонтальный — в ширину. Кадр при этом не обрезается. */
.is-tall .frame__plate {
  height: 100%;
}

.is-wide .frame__plate {
  width: 100%;
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
  object-fit: cover;
  user-select: none;
}

.is-tall .frame__image {
  height: 100%;
  width: auto;
  max-width: 100%;
}

.is-wide .frame__image {
  width: 100%;
  height: auto;
}

.frame__caption {
  margin-top: 14px;
}
</style>
