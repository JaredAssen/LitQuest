/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js, jsx}"],
  theme: {
    extend: {
      backgroundImage: {
      'hero-pattern': "url('https://helios-i.mashable.com/imagery/articles/06qvPfjkNRMAmTvVoPDDflf/hero-image.fill.size_1248x702.v1661351758.jpg')",
      'footer-texture': "url('/img/footer-texture.png')",
    },

  }
  },
  plugins: [],
}