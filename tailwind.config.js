module.exports = {
  content: [
    './*.html',        
    './src/**/*.css',      
    './*.js',              
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