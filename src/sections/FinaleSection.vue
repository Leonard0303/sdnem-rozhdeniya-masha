<script setup>
/**
 * Финальная сцена: только одна фраза на пустом экране.
 * Без номера страницы, метки и подписей — здесь сайт заканчивается
 * и начинается сам подарок.
 *
 * Появление собрано на CSS и привязано к `active`, поэтому сцена
 * проигрывается заново каждый раз, когда на неё возвращаются.
 */
defineProps({
  active: Boolean,
  step: Number,
})
</script>

<template>
  <section class="finale" :class="{ 'is-active': active }">
    <p class="finale__phrase">
      <span class="finale__line finale__line--first">Теперь можешь приступать</span>
      <span class="finale__line finale__line--last">
        распаковывать подарки <span class="finale__heart">❤️</span>
      </span>
    </p>
  </section>
</template>

<style scoped>
.finale {
  position: relative;
  height: 100%;
  padding: var(--gutter);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

/* Фон сцены проступает мягко, отдельно от текста */
.finale::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--paper-deep);
  opacity: 0;
  transition: opacity 1.6s var(--ease);
}

.finale.is-active::before {
  opacity: 1;
}

.finale__phrase {
  position: relative;
  margin: 0;
  max-width: 22ch;
  font-family: var(--serif);
  font-weight: 300;
  font-size: clamp(30px, 4.4vw, 72px);
  line-height: 1.24;
  letter-spacing: -0.01em;
}

.finale__line {
  display: block;
  opacity: 0;
  transform: translateY(14px);
}

.finale__line--first {
  font-size: 0.62em;
  line-height: 1.35;
  color: var(--ink-soft);
}

.finale__line--last {
  margin-top: 0.42em;
  font-style: italic;
  color: var(--ink);
}

.finale__heart {
  display: inline-block;
  font-style: normal;
}

/* Строки проступают по очереди, уже после фона */
.finale.is-active .finale__line {
  animation: finale-line 1.3s var(--ease) forwards;
}

.finale.is-active .finale__line--first {
  animation-delay: 0.6s;
}

.finale.is-active .finale__line--last {
  animation-delay: 1.25s;
}

/* Сердечко дышит еле заметно и только когда фраза уже собралась */
.finale.is-active .finale__heart {
  animation: finale-heart 4.8s ease-in-out 2.9s infinite;
}

@keyframes finale-line {
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes finale-heart {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>
