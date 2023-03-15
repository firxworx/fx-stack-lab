/**
 * Target code blocks which may be colourized by a third-party library such as rehype and
 * disable tailwindcss within them. Handy for code blocks within tailwind `.prose` sections.
 */
module.exports.disableCodeBlockCss = {
  'code::before': false,
  'code::after': false,
  'blockquote p:first-of-type::before': false,
  'blockquote p:last-of-type::after': false,
  pre: false,
  code: false,
  'pre code': false,
  'code::before': false,
  'code::after': false,
}
