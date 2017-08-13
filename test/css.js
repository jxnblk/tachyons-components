import test from 'ava'
import css from '../src/css'

test.afterEach.always(() => {
  css.reset()
})

test('css adds rules', t => {
  css('.tomato{color:tomato}')
  t.is(typeof css.css(), 'string')
  t.is(css.css(), '.tomato{color:tomato}')
})

test('css dedupes', t => {
  css('.tomato{color:tomato}')
  css('.tomato{color:tomato}')
  t.is(css.css(), '.tomato{color:tomato}')
})

test('css resets', t => {
  css('.tomato{color:tomato}')
  css.reset()
  t.is(css.css(), '')
})
