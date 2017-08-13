let cache = {}
const rules = []
let insert = rule => rules.push(rule)

const css = rule => {
  if (cache[rule]) return
  insert(rule)
  cache[rule] = true
}

css.css = () => rules.join('')
css.reset = () => {
  cache = {}
  while (rules.length) rules.pop()
}

if (typeof document !== 'undefined') {
  const sheet = document.head.appendChild(
    document.createElement('style')
  ).sheet
  insert = rule => {
    rules.push(rule)
    sheet.insertRule(rule, sheet.cssRules.length)
  }
}

module.exports = css
