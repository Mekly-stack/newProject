module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.css',
    './public/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'custom-violet': '#8B5CF6',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}