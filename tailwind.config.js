module.exports = {
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Nunito'],
      'serif': ['Nunito'],
      'mono': ['Nunito'],
      'display': ['Nunito'],
      'body': ['Nunito']
    },
    extend: {
      colors: {
        'brand': '#efefef',
        'brand-dark': '#1a1a1a',
        'highlight': '#FEDE00',
      },
      backgroundImage: {
        ribbon: 'url(/icons/ribbon.svg)',
        header1: 'url(/events/header1.png)',
        header2: 'url(/events/header2.png)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
