/**
 * Загрузка поздравлений из текстовых файлов в `import-image/`.
 *
 * Текст берётся из .txt как есть — ничего не переписывается и не сокращается.
 * Чтобы поправить поздравление, достаточно отредактировать файл: код трогать не нужно.
 * Пустой файл означает, что поздравление ещё не прислали — блок просто останется
 * без текста, без ошибок и заглушек.
 */

const modules = import.meta.glob('../import-image/**/*.txt', {
  eager: true,
  query: '?raw',
  import: 'default',
})

/** { '07-her-friends/Лиза': [{ file, paragraphs }], ... } */
const byFolder = {}

for (const path of Object.keys(modules).sort()) {
  const match = path.match(/import-image\/(.+)\/([^/]+)$/)
  if (!match) continue
  const [, folder, file] = match

  ;(byFolder[folder] ||= []).push({
    file,
    paragraphs: toParagraphs(modules[path]),
  })
}

/**
 * Разбивает текст на абзацы по пустым строкам, сохраняя авторские формулировки.
 * @param {string} raw
 * @returns {string[]}
 */
function toParagraphs(raw) {
  return String(raw)
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
}

/**
 * Все поздравления из папки, по алфавиту имён файлов.
 * @param {string} folder — например '07-her-friends/Лиза'
 * @returns {{ file: string, paragraphs: string[] }[]}
 */
export function textsFrom(folder) {
  return byFolder[folder] ?? []
}

/**
 * Одно поздравление из папки — по части имени файла.
 * Например `textFrom('07-her-friends/Далила и Асхат', 'от_нее')`.
 * Без второго аргумента вернёт первое поздравление в папке.
 * @param {string} folder
 * @param {string} [fileMatch]
 * @returns {string[]} абзацы (пустой массив, если файла нет или он пуст)
 */
export function textFrom(folder, fileMatch) {
  const items = textsFrom(folder)
  const found = fileMatch ? items.find((item) => item.file.includes(fileMatch)) : items[0]
  return found?.paragraphs ?? []
}
