const plugin = require('tailwindcss/plugin')

/**
 * TailwindCSS plugin to ship alongside the tailwind-preset as a dependency and include in the `plugins`
 * array in the preset file.
 *
 * @see tailwind-preset.js
 * @see tailwind-palette.js
 *
 * @see {@link https://tailwindcss.com/docs/plugins}
 */
module.exports = {
  plugins: [
    plugin(function ({ addUtilities, addComponents, e, config }) {
      addComponents({
        // '.fx-nav-header': {
        //   '@apply ': {},
        // },
      })
    }),
  ],
}
