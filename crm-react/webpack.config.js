// webpack.config.js
const path = require('path');

module.exports = {
  // ... outras configurações
  output: {
    path: path.resolve(__dirname, 'dist'), // Pasta de saída
    filename: 'bundle.js',
    publicPath: '/' // Se você estiver servindo os arquivos da raiz
  },
  // ...
};