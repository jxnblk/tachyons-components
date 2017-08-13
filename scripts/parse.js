const fs = require('fs')
const path = require('path')
const cssToObject = require('css-to-object')

// todo: make this work for basscss too
// todo: merge pseudoclass rules

const filepath = path.join(__dirname, '..', 'node_modules/tachyons/css/tachyons.css')

const css = fs.readFileSync(filepath, 'utf8')

const obj = cssToObject(css)

const hyph = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()

const createDeclarations = obj => Object.keys(obj)
  .map(prop => {
    return hyph(prop) + ':' + obj[prop]
  }).join(';')

const parsed = Object.keys(obj)
  .filter(key => /^[@.]/.test(key))
  .map(key => ({
    key,
    value: obj[key]
  }))
  .map(({ key, value }) => {
    if (/^@/.test(key)) {
      return Object.keys(value).map(k => {
        return {
          key: k.replace(/^\./, ''),
          value: key + '{' + k + '{' + createDeclarations(value[k]) + '}}'
        }
      })
    }
    return {
      key: key.replace(/^\./, ''),
      value: key + '{' + createDeclarations(value) + '}'
    }
  })
  // flatten
  .reduce((a, b) => [
    ...a,
    ...(Array.isArray(b) ? b : [ b ])
  ], [])
  .reduce((a, b) => Object.assign(a, { [b.key]: b.value }), {})

const json = JSON.stringify(parsed, null, 2)

fs.writeFileSync(path.join(__dirname, '..', 'tachyons.json'), json)

console.log('parsed CSS to JSON')
