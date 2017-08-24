const cssToObject = require('css-to-object')

const hyph = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()

const createDeclarations = obj => Object.keys(obj)
  .map(prop => {
    return hyph(prop) + ':' + obj[prop]
  }).join(';')

const parser = css => {
  const obj = cssToObject(css)

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
    .reduce((a, b) => Object.assign(a, { [b.key]: [b.value] }), {})

  const isPseudoClass = k => /:{1,2}(.*)$/.test(k)
  const getBaseClass = k => k.split(/:{1,2}(.*)$/)[0]

  Object.keys(parsed)
    .filter(isPseudoClass)
    .forEach(pseudo => {
      const baseClass = getBaseClass(pseudo)
      parsed[baseClass] = (parsed[baseClass] || []).concat(parsed[pseudo])
      delete parsed[pseudo]
    })

  return parsed
}

module.exports = parser
