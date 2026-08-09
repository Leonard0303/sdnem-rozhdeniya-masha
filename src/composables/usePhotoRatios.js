import { onMounted, ref } from 'vue'

/**
 * Узнаёт настоящие пропорции фотографий, чтобы рамка подстраивалась под кадр,
 * а не кадр под рамку. Благодаря этому вертикальные и горизонтальные снимки
 * показываются целиком и без искажений — даже если файлы позже заменят.
 *
 * @param {{ src: string, name: string }[]} photos
 * @returns {{ ratios: import('vue').Ref<Record<string, number>>, ready: import('vue').Ref<boolean> }}
 *          ratios — отношение ширины к высоте (>= 1 — горизонтальная фотография)
 */
export function usePhotoRatios(photos) {
  const ratios = ref({})
  const ready = ref(photos.length === 0)

  onMounted(() => {
    let pending = photos.length
    if (!pending) return

    for (const photo of photos) {
      const probe = new Image()
      const settle = (value) => {
        ratios.value = { ...ratios.value, [photo.name]: value }
        if (--pending === 0) ready.value = true
      }
      probe.onload = () => settle(probe.naturalWidth / probe.naturalHeight)
      probe.onerror = () => settle(1)
      probe.src = photo.src
    }
  })

  return { ratios, ready }
}
