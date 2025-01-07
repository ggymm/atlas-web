import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx|mdx?|html)($|\?)/]
    }
  },
  presets: [presetUno(), presetAttributify(), presetRemToPx({ baseFontSize: 4 })],
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['flex-col', 'flex flex-col'],
    ['flex-row', 'flex flex-row'],
    ['flex-center', 'flex justify-center items-center']
  ]
})
