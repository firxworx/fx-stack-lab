const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

// const colors = require('tailwindcss/colors')
const palette = require('./tailwind-palette')

const { disableCodeBlockCss } = require('./tailwind-utils')

const colord = require('colord').colord
const alpha = (c, value) => colord(c).alpha(value).toRgbString()
const lighten = (c, value) => colord(c).lighten(value).toRgbString()
const darken = (c, value) => colord(c).darken(value).toRgbString()

module.exports = {
  // future: { ... }
  theme: {
    // fontFamily: { mono: [ ...defaultTheme.fontFamily.mono ], sans: [], serif: [] },
    screens: {
      // the smallest smartphones clock in ~320px
      xxs: '315px',
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      // refer to inline plugin `Utilities` below for addition of animation delay utilities
      animation: {
        'bouncy-opacity': 'bouncy-opacity 0.75s infinite alternate',
      },
      keyframes: {
        'bouncy-opacity': {
          from: {
            opacity: 0.8,
            transform: 'translate3d(0, 0.5rem, 0)',
          },
          to: {
            opacity: 0.1,
            transform: 'translate3d(0, -0.5rem, 0)',
          },
        },
      },
      backgroundImage: {
        // mesher.org is a cool gradient generator for here...
      },
      spacing: {
        1.25: '0.3125rem',
      },
      padding: {
        '1/3': '33.33333%',
        '2/3': '66.66666%',
      },
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      fontSize: {
        xxs: '.625rem',
      },
      opacity: {
        // add opacity values in steps of 1 from 1-9
        ...Array.from({ length: 9 }, (_, i) => 1 + i).reduce((acc, curr) => ({ ...acc, [curr]: `0.0${curr}` })),
        85: '0.85',
      },
      grayscale: {
        25: '25%',
        50: '50%',
        75: '75%',
      },
      // add zIndex values in steps of 10 from 60-100
      zIndex: Array.from({ length: 5 }, (_, i) => (6 + i) * 10).reduce(
        (acc, curr) => ({ ...acc, [curr]: String(curr) }),
        {},
      ),
      colors: {
        P: {
          ...palette,
        },
      },
      // typography can also be customized inline: prose-headings, prose-strong, prose-em, etc
      // documentation: https://github.com/tailwindcss/typography
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.800'),
              // scrollMarginTop: theme('spacing.36'),
            },
            a: {
              color: theme('colors.sky.700'),
              '&:hover': {
                color: theme('colors.sky.600'),
              },
            },
            strong: {
              color: theme('colors.gray.800'),
              fontWeight: 500,
            },
            blockquote: {
              color: theme('colors.gray.600'),
              borderColor: alpha(theme('colors.gray.800'), 0.5),
            },
            'ul > li::marker': {
              backgroundColor: theme('colors.gray.600'),
            },
            'ol > li::marker': {
              color: theme('colors.gray.600'),
            },
            ...disableCodeBlockCss,
          },
        },
        ...['sm', 'lg', 'xl', '2xl'].reduce((acc, curr) => {
          return {
            ...acc,
            [curr]: {
              css: { ...disableCodeBlockCss },
            },
          }
        }, {}),
      }),
    },
  },
  plugins: [
    // common tailwindcss plugins
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),

    // headlessui tailwindcss plugin - adds modifiers for headlessui including ui-open:*, ui-active:*, etc
    require('@headlessui/tailwindcss'),

    // project custom plugin
    require('./tailwind-plugin'),

    // add custom styles via inline custom plugin
    plugin(function ({ addBase, addComponents, addVariant, addUtilities }) {
      const webkitSearchInputXIconTarget =
        'input[type="search"]::-webkit-search-decoration, input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-results-button, input[type="search"]::-webkit-search-results-decoration'

      const ieSearchInputXIconTarget =
        'input.hide-clear[type=search]::-ms-clear, input.hide-clear[type=search]::-ms-reveal'

      // selectors to match and override the selector used by the @tailwindcss/forms plugin
      const formInputTargets = `[type='text']:not(.fx-custom-input), [type='email'], [type='url'], [type='password'], [type='number'], [type='date'], [type='datetime-local'], [type='month'], [type='search'], [type='tel'], [type='time'], [type='week'], [multiple], textarea, select`
      // const formInputFocusTargets = `[type='text']:focus:not(.fx-custom-input), [type='email']:focus, [type='url']:focus, [type='password']:focus, [type='number']:focus, [type='date']:focus, [type='datetime-local']:focus, [type='month']:focus, [type='search']:focus, [type='tel']:focus, [type='time']:focus, [type='week']:focus, [multiple]:focus, textarea:focus, select:focus`
      // const buttonTargets = `button, [type='button'], [type='reset'], [type='submit']`

      addBase({
        // always show scrollbar to help avoid horizontal jank especially on Win/PC's during loading/modals/transitions
        body: {
          overflowY: 'scroll',
          scrollBehavior: 'smooth',
          backgroundColor: 'white',
        },
        main: {
          '@apply text-gray-700': {},
        },
        strong: {
          '@apply text-gray-800': {},
        },
        // remove spinner on number inputs for chrome/safari/edge/opera
        'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: '0',
        },
        // remove spinner on number inputs for firefox
        'input[type="number"]': {
          '-moz-appearance': 'textfield',
        },
        // remove cancel 'x' icon from input type=search on webkit-based browsers
        [webkitSearchInputXIconTarget]: {
          '-webkit-appearance': 'none',
        },
        // remove cancel 'x' icon from input type=search on IE
        [ieSearchInputXIconTarget]: {
          display: 'none',
          width: 0,
          height: 0,
        },
      })
      addComponents({
        '.fx-modal-body-shadow': {
          '@apply shadow-[0_0_24px_8px_rgba(51,65,85,0.5)]': {}, // gray-700 50% opacity
        },
        // add modal body shadow to ::after pseudo element, to transition in after modal body renders for performance
        // usage: add conditional styles `after:opacity-0` when !hasEntered + `after:opacity-100` when hasEntered
        '.fx-modal-body-after-shadow': {
          '@apply relative after:pointer-events-none': {},
          "@apply after:absolute after:top-0 after:left-0 after:w-full after:h-full after:content-['']": {},
          '@apply after:rounded-md after:shadow-[0_0_24px_8px_rgba(51,65,85,0.5)]': {}, // gray-700 50% opacity
          '@apply after:transition-opacity after:duration-100': {},
        },
      })
      addUtilities({
        // add animation-delay-100 to animation-delay-900
        ...Array.from({ length: 9 }, (_, i) => i).reduce(
          (acc, i) => ({ ...acc, [`.animation-delay-${i * 100}`]: { animationDelay: `0.${i}s` } }),
          {},
        ),
        // custom scrollbar class
        '.fx-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '20px',
          },

          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },

          '&::-webkit-scrollbar-thumb': {
            '@apply bg-P-scrollbar transition-all': {},
            borderRadius: '20px',
            border: '6px solid transparent',
            backgroundClip: 'content-box',
            '&:hover': {
              '@apply bg-gray-800': {},
            },
          },
        },
      })
      // custom variants -- `variant-name:tailwind-css-rule-name` e.g. `not-first:bg-gray-100`
      addVariant('hocus', ['&:hover', '&:focus'])
      addVariant('optional', '&:optional')
      addVariant('not-first', '&:not(:first-child)')
      addVariant('not-last', '&:not(:last-child)')
      addVariant('not-first-not-last', '&:not(:first-child):not(:last-child)')
      addVariant('inverted-colors', '@media (inverted-colors: inverted)')
    }),
  ],
}
