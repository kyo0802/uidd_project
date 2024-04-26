const pug = require('pug');

const compiledFunction = pug.compileFile('aboutus.pug');

console.log(compiledFunction({
  name: 'Wannn'
}));