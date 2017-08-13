import test from 'ava'
import browser from 'browser-env'

browser()

const styled = require('../src')

test.afterEach.always(() => {
  styled.reset()
})

test('creates a style tag', t => {
  const tag = document.querySelector('style')
  t.truthy(tag)
})

test('adds rules to stylesheet', t => {
  const { sheet } = document.querySelector('style')
  styled('div')`bg-blue`
  t.true(styled.css().length > 0)
  t.is(sheet.cssRules.length, 1)
})
