module.exports = {
  npm: {
    styles: {
      slideout: ['index.css']
    }
  },

  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app)/,
        'app.js': /^app/
      }
    },
    stylesheets: {joinTo: 'app.css'}
  },

  plugins: {
    babel: {presets: ['es2015', 'react', 'stage-0']}
  }
}
