import { onBeforeUnmount, onMounted, readonly, ref } from 'vue'

/**
 * Последовательное перелистывание полноэкранных страниц:
 * колесо мыши, стрелки вверх/вниз, свайп на тач-устройствах.
 *
 * Во время анимации перехода ввод блокируется, чтобы одно движение колеса
 * не пролистывало сразу несколько страниц.
 *
 * @param {import('vue').Ref<number> | { value: number }} total — количество страниц
 * @param {{ duration?: number }} [options]
 */
export function useDeck(total, options = {}) {
  const duration = options.duration ?? 900

  const index = ref(0)
  const isAnimating = ref(false)

  let unlockTimer = null
  let touchStartY = 0
  let touchTarget = null

  const count = () => (typeof total === 'number' ? total : total.value)

  function goTo(next) {
    if (isAnimating.value) return
    const target = Math.max(0, Math.min(count() - 1, next))
    if (target === index.value) return

    index.value = target
    isAnimating.value = true
    clearTimeout(unlockTimer)
    unlockTimer = setTimeout(() => {
      isAnimating.value = false
    }, duration)
  }

  const next = () => goTo(index.value + 1)
  const prev = () => goTo(index.value - 1)

  /**
   * Есть ли под курсором/пальцем блок, который сам ещё может прокрутиться
   * в нужную сторону. Длинные поздравления на узком экране прокручиваются
   * внутри страницы, и перелистывать её в этот момент нельзя.
   */
  function scrollableUnder(target, direction) {
    let el = target instanceof Element ? target : null

    while (el && el !== document.body) {
      const { overflowY } = getComputedStyle(el)
      if (
        (overflowY === 'auto' || overflowY === 'scroll') &&
        el.scrollHeight > el.clientHeight + 1
      ) {
        const room =
          direction > 0
            ? el.scrollHeight - el.clientHeight - el.scrollTop > 1
            : el.scrollTop > 1
        if (room) return true
      }
      el = el.parentElement
    }
    return false
  }

  function onWheel(event) {
    if (scrollableUnder(event.target, event.deltaY)) return
    event.preventDefault()
    if (isAnimating.value) return
    // порог, чтобы инерция тачпада не листала лишнего
    if (Math.abs(event.deltaY) < 12) return
    event.deltaY > 0 ? next() : prev()
  }

  function onKeydown(event) {
    switch (event.key) {
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        event.preventDefault()
        next()
        break
      case 'ArrowUp':
      case 'PageUp':
        event.preventDefault()
        prev()
        break
      case 'Home':
        event.preventDefault()
        goTo(0)
        break
      case 'End':
        event.preventDefault()
        goTo(count() - 1)
        break
    }
  }

  function onTouchStart(event) {
    touchStartY = event.touches[0].clientY
    touchTarget = event.target
  }

  function onTouchEnd(event) {
    const delta = touchStartY - event.changedTouches[0].clientY
    if (Math.abs(delta) < 60) return
    if (scrollableUnder(touchTarget, delta)) return
    delta > 0 ? next() : prev()
  }

  onMounted(() => {
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchend', onTouchEnd)
    clearTimeout(unlockTimer)
  })

  return {
    index: readonly(index),
    isAnimating: readonly(isAnimating),
    goTo,
    next,
    prev,
    duration,
  }
}
