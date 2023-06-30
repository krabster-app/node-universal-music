import typography from '@tailwindcss/typography'
import plugin from 'tailwindcss/plugin'

const fadeEffectPlugin = plugin(({ matchUtilities, theme }) => {
  const getFadeProps = direction => value => ({
    'mask-image':
      'linear-gradient(' +
      `to ${direction},` +
      'black,' +
      `black calc(100% - ${value}),` +
      'transparent' +
      ')',
  })

  matchUtilities(
    {
      'fade-top': getFadeProps('top'),
      'fade-right': getFadeProps('right'),
      'fade-bottom': getFadeProps('bottom'),
      'fade-left': getFadeProps('left'),
    },
    {
      values: theme('inset'),
    },
  )
})

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    typography({
      modifiers: [],
    }),
    fadeEffectPlugin,
  ],
}
