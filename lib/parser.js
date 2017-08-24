const cssToObject = require('css-to-object')

// todo: merge pseudoclass rules

const hyph = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()

const createDeclarations = obj => Object.keys(obj)
  .map(prop => {
    return hyph(prop) + ':' + obj[prop]
  }).join(';')

const parser = css => {
  const obj = cssToObject(css)

  return Object.keys(obj)
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
    .reduce((a, b) => Object.assign(a, { [b.key]: [b.value] }), {})
}

module.exports = parser
