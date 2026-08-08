<script setup>
/**
 * Общий каркас страницы: слева — текст, справа — фотографии.
 * Все страницы сайта используют его, поэтому композиция остаётся единой,
 * а новую страницу достаточно собрать из двух слотов.
 */
defineProps({
  /** Порядковый номер страницы (1, 2, 3, ...) */
  step: { type: Number, required: true },
  /** Короткая подпись рядом с номером */
  label: { type: String, default: '' },
  /** Страница сейчас на экране — по этому флагу проигрывается появление */
  active: { type: Boolean, default: false },
})
</script>

<template>
  <section class="shell" :class="{ 'is-active': active }">
    <header class="shell__index">
      <span class="shell__number">{{ String(step).padStart(2, '0') }}</span>
      <span class="shell__rule" aria-hidden="true"></span>
      <span v-if="label" class="meta">{{ label }}</span>
    </header>

    <div class="shell__grid">
      <div class="shell__aside">
        <slot name="aside" />
      </div>
      <div class="shell__visual">
        <slot name="visual" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.shell {
  position: relative;
  height: 100%;
  padding: var(--gutter);
  padding-top: clamp(64px, 9vh, 108px);
  padding-bottom: clamp(56px, 8vh, 96px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.shell__index {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 0 0 auto;
}

.shell__number {
  font-family: var(--serif);
  font-size: 15px;
  letter-spacing: 0.06em;
  color: var(--ink);
}

.shell__rule {
  width: clamp(28px, 4vw, 64px);
  height: 1px;
  background: var(--line);
}

.shell__grid {
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(32px, 5vw, 88px);
  align-items: center;
}

.shell__aside {
  max-width: 46ch;
}

.shell__visual {
  position: relative;
  align-self: stretch; /* колонка с фото занимает всю высоту строки сетки */
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* Появление содержимого страницы */
.shell__aside,
.shell__visual {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.85s var(--ease),
    transform 0.85s var(--ease);
}

.shell__visual {
  transform: translateY(26px);
  transition-delay: 0.08s;
}

.shell.is-active .shell__aside,
.shell.is-active .shell__visual {
  opacity: 1;
  transform: none;
}

@media (max-width: 900px) {
  .shell__grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, 1fr);
    align-content: center;
    gap: clamp(24px, 4vh, 40px);
  }

  .shell__visual {
    justify-content: center;
  }
}
</style>
