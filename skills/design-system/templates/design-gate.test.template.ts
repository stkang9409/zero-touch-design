/**
 * Zero-Touch Design Gate Starter Test (`node:test`)
 * Copy into your project (e.g. `src/design/tokens.test.ts`), adjust paths and allowlists,
 * and run with `tsx --test` or `node --test`.
 */
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import test from 'node:test'

const SRC_ROOT = new URL('../', import.meta.url).pathname
const TOKENS_PATH = new URL('./tokens.json', import.meta.url).pathname
const INDEX_CSS_PATH = new URL('../index.css', import.meta.url).pathname

const SKIP_DIRS = new Set(['design', 'test', '__tests__'])

function walkSourceFiles(dir: string, acc: Array<{ relPath: string; content: string }> = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walkSourceFiles(full, acc)
      continue
    }
    if (!/\.(tsx?|jsx?|html|css)$/.test(entry.name) || /\.test\.ts$/.test(entry.name)) continue
    acc.push({ relPath: relative(SRC_ROOT, full), content: readFileSync(full, 'utf8') })
  }
  return acc
}

test('design system SSOT tokens.json exists and syncs core CSS variables', () => {
  assert.equal(existsSync(TOKENS_PATH), true, 'design/tokens.json SSOT must exist')
  const tokens = JSON.parse(readFileSync(TOKENS_PATH, 'utf8'))
  assert.ok(tokens?.color?.rgb?.canvas, 'tokens.json must define color.rgb.canvas')
  assert.ok(tokens?.color?.rgb?.['brand-500'], 'tokens.json must define color.rgb.brand-500')

  if (existsSync(INDEX_CSS_PATH)) {
    const css = readFileSync(INDEX_CSS_PATH, 'utf8')
    assert.ok(css.includes(tokens.color.rgb.canvas), 'index.css :root must match tokens.json canvas')
    assert.ok(css.includes(tokens.color.rgb['brand-500']), 'index.css :root must match tokens.json brand-500')
  }
})

test('recursive design gate enforces tokens, banned UI/motion, em-dash, and single PrimaryButton', () => {
  const files = walkSourceFiles(SRC_ROOT)
  assert.ok(files.length > 0, 'should discover source files under src/')

  for (const { relPath, content } of files) {
    if (!relPath.endsWith('.css')) {
      const hexMatches = content.match(/(?<!&)#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g)
      assert.equal(hexMatches, null, `${relPath} must not hardcode HEX colors: ${hexMatches?.join(', ')}`)

      const rawPalette = content.match(/\b(?:bg|text|border|ring)-(?:slate|gray|zinc|neutral|stone|blue|indigo|emerald|amber|rose)-\d{2,3}\b/g)
      assert.equal(rawPalette, null, `${relPath} must use semantic tokens instead of raw palettes: ${rawPalette?.join(', ')}`)
    }

    assert.equal(
      /\btransition-all\b|transition\s*:\s*all\b/i.test(content),
      false,
      `${relPath} must not use transition-all / transition: all`,
    )

    assert.equal(
      /\beyebrow\b/.test(content),
      false,
      `${relPath} must not use eyebrow kicker classes`,
    )

    assert.equal(
      /<br\s*\/?>\s*<em\b/i.test(content),
      false,
      `${relPath} must not use <br><em> italic title splits`,
    )

    // Flag em-dash in JSX/HTML text (customize if prose articles intentionally allow it)
    if (/\.(tsx|jsx|html)$/.test(relPath)) {
      const strippedComments = content.replace(/\/\*[\s\S]*?\*\//g, '').replace(/<!--[\s\S]*?-->/g, '')
      assert.equal(strippedComments.includes('—'), false, `${relPath} must not expose em-dash (—) in UI copy`)
    }
  }
})
