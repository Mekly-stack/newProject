module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.css',
    './public/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}