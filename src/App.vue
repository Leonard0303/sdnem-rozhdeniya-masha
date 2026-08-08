<script setup>
import { computed } from 'vue'
import { sections } from './sections'
import { useDeck } from './composables/useDeck'

const { index, goTo, next, prev, duration } = useDeck(sections.length, { duration: 900 })

const total = sections.length
const offset = computed(() => `translate3d(0, ${-index.value * 100}%, 0)`)
const atStart = computed(() => index.value === 0)
const atEnd = computed(() => index.value === total - 1)
const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
  <main class="deck">
    <div
      class="deck__track"
      :style="{ transform: offset, transitionDuration: duration + 'ms' }"
    >
      <div v-for="(section, i) in sections" :key="section.id" class="deck__slide">
        <component :is="section.component" :step="i + 1" :active="i === index" />
      </div>
    </div>

    <!-- Нумерация страниц -->
    <nav class="deck__pager" aria-label="Страницы">
      <button
        v-for="(section, i) in sections"
        :key="section.id"
        class="deck__dot"
        :class="{ 'is-current': i === index }"
        type="button"
        :aria-label="`${pad(i + 1)} — ${section.title}`"
        :aria-current="i === index ? 'true' : undefined"
        @click="goTo(i)"
      >
        <span class="deck__dot-line"></span>
      </button>
      <span class="deck__counter meta">{{ pad(index + 1) }} / {{ pad(total) }}</span>
    </nav>

    <!-- Управление -->
    <div class="deck__controls">
      <button class="deck__arrow" type="button" :disabled="atStart" aria-label="Назад" @click="prev">
        <span aria-hidden="true">↑</span>
      </button>
      <button class="deck__arrow" type="button" :disabled="atEnd" aria-label="Дальше" @click="next">
        <span aria-hidden="true">↓</span>
      </button>
    </div>

    <p class="deck__hint meta" :class="{ 'is-hidden': !atStart }">Листайте вниз</p>
  </main>
</template>

<style scoped>
.deck {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.deck__track {
  height: 100%;
  transition-property: transform;
  transition-timing-function: var(--ease);
  will-change: transform;
}

.deck__slide {
  height: 100%;
}

/* Нумерация — вертикальной колонкой слева */
.deck__pager {
  position: fixed;
  left: calc(var(--gutter) / 2);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 20;
}

.deck__dot {
  padding: 6px 4px;
  border: 0;
  background: none;
  cursor: pointer;
  line-height: 0;
}

.deck__dot-line {
  display: block;
  width: 1px;
  height: 16px;
  background: var(--line);
  transition:
    height 0.5s var(--ease),
    background-color 0.5s var(--ease);
}

.deck__dot.is-current .deck__dot-line {
  height: 34px;
  background: var(--ink);
}

.deck__counter {
  margin-top: 8px;
  writing-mode: vertical-rl;
  font-size: 10px;
}

/* Стрелки — снизу справа */
.deck__controls {
  position: fixed;
  right: var(--gutter);
  bottom: clamp(20px, 3.5vh, 36px);
  display: flex;
  gap: 8px;
  z-index: 20;
}

.deck__arrow {
  width: 40px;
  height: 40px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  color: var(--ink);
  font-size: 14px;
  cursor: pointer;
  transition:
    background-color 0.35s var(--ease),
    color 0.35s var(--ease),
    border-color 0.35s var(--ease),
    opacity 0.35s var(--ease);
}

.deck__arrow:hover:not(:disabled) {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--paper);
}

.deck__arrow:disabled {
  opacity: 0.28;
  cursor: default;
}

.deck__hint {
  position: fixed;
  left: var(--gutter);
  bottom: clamp(20px, 3.5vh, 36px);
  margin: 0;
  z-index: 20;
  transition: opacity 0.5s var(--ease);
}

.deck__hint.is-hidden {
  opacity: 0;
}

@media (max-width: 900px) {
  .deck__pager {
    display: none;
  }

  .deck__hint {
    display: none;
  }
}
</style>
