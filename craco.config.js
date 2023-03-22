const CracoAlias = require('craco-alias')

const path = require('path')
module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: './tsconfig.paths.json'
      }
    }
  ]
}
