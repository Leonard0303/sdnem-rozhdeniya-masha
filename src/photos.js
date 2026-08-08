/**
 * Единая точка загрузки фотографий.
 *
 * Все изображения берутся автоматически из папки `import-image/`.
 * Чтобы поменять фотографию на странице — достаточно положить/заменить файл
 * в нужной папке. Код компонентов трогать не нужно.
 *
 * Порядок фотографий внутри папки — по имени файла (по алфавиту).
 * Если нужен свой порядок — переименуйте файлы: `1-...`, `2-...` и т.д.
 */

const modules = import.meta.glob('../import-image/**/*.{png,jpg,jpeg,webp,avif,gif,PNG,JPG,JPEG}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** { '01-hero': ['/path/a.png', ...], ... } */
const byFolder = {}

for (const path of Object.keys(modules).sort()) {
  const match = path.match(/import-image\/([^/]+)\//)
  if (!match) continue
  const folder = match[1]
  ;(byFolder[folder] ||= []).push({
    src: modules[path],
    name: path.split('/').pop(),
  })
}

/**
 * Фотографии одной секции.
 * @param {string} folder — имя папки в import-image, например '01-hero'
 * @returns {{src: string, name: string}[]}
 */
export function photosFrom(folder) {
  return byFolder[folder] ?? []
}

/**
 * Первая (единственная) фотография секции — для Hero и «От меня».
 * @param {string} folder
 * @returns {{src: string, name: string} | null}
 */
export function photoFrom(folder) {
  return photosFrom(folder)[0] ?? null
}
