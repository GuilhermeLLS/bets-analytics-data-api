module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@handlers': './src/handlers',
        '@controllers': './src/controllers',
        '@routes': './src/routes'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
