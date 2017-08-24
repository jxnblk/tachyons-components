const fs = require('fs')
const path = require('path')
const parser = require('../lib/parser')

// todo: make this work for basscss too

const filepath = path.join(__dirname, '..', 'node_modules/tachyons/css/tachyons.css')

const css = fs.readFileSync(filepath, 'utf8')

const parsed = parser(css)

const json = JSON.stringify(parsed, null, 2)

fs.writeFileSync(path.join(__dirname, '..', 'tachyons.json'), json)

console.log('parsed CSS to JSON')
