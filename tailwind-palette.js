const colors = require('tailwindcss/colors')

const colord = require('colord').colord
const alpha = (c, value) => colord(c).alpha(value).toRgbString()
const lighten = (c, value) => colord(c).lighten(value).toRgbString()
const darken = (c, value) => colord(c).darken(value).toRgbString()

const primary = {
  DEFAULT: colors.sky[900],
  hover: lighten(colors.sky[900], 0.07),
  alpha: colord(colors.sky[900]).alpha(0.5).toRgbString(),
}

/**
 * Project palette to import in Tailwind Preset (refer to theme > extend > colors in `tailwind-preset.js`).
 * Intended to be used with capital 'P' naming convention for _palette_ (e.g. 'text-P-heading').
 */
module.exports = {
  primary,
}
