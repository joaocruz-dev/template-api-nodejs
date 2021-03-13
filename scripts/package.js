const fs = require('fs')

fs.readFile('../package.json', 'utf8', (err, data) => {
  if (err) return console.log(err)
  const package = JSON.parse(data)
  package.scripts = {
    start: 'NODE_ENV=production node server.js'
  }
  delete package.devDependencies
  const json = JSON.stringify({ private: true, ...package })
  fs.writeFile('../dist/package.json', json, 'utf8', () => {
    console.log('Arquivo criado com sucesso')
  })
})
