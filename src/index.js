const h = require('react').createElement
const css = require('./css')
const dict = require('../tachyons.json')

const flatten = arr =>
  arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? [...acc, ...flatten(val)] : [...acc, val],
    []
  )

const styled = type => (strings, ...tokens) => {
  const staticKeys = strings
    .map(str => str.split(/\s+/))
    .reduce((a, b) => [ ...a, ...b ], [])

  staticKeys.map(key => dict[key])
    .filter(n => n !== undefined)
    .forEach(css)

  const Component = props => {
    const keys = flatten(
      tokens
      .map(token => token(props))
      .filter(n => n !== null && n !== undefined)
      .map(n => n.split(/\s+/))
    )
    keys.map(key => dict[key])
      .filter(n => n !== undefined)
      .forEach(css)

    const next = parseProps(props)

    return h(type, Object.assign({}, next, {
      className: [
        next.className,
        ...staticKeys,
        ...keys,
      ].join(' ').trim()
    }))
  }

  return Component
}

const parseProps = props => {
  const next = {}
  const classNames = [ props.className || '' ]
  for (let key in props) {
    if (dict[key]) {
      css(dict[key])
      classNames.push(key)
      continue
    }
    next[key] = props[key]
  }

  next.className = classNames.join(' ').trim()

  return next
}

styled.css = css.css
styled.reset = css.reset

module.exports = styled
