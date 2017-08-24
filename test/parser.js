import test from 'ava'
import parser from '../lib/parser'

test('parses rules', t => {
  const css = '.tomato{color:tomato}'
  t.deepEqual(parser(css), {
    tomato: ['.tomato{color:tomato}']
  })
})

test('parses media queries', t => {
  const css = '@media screen and (min-width: 30em){.aspect-ratio-ns{height:0;position:relative}}'
  t.deepEqual(parser(css), {
    'aspect-ratio-ns': ['@media screen and (min-width: 30em){.aspect-ratio-ns{height:0;position:relative}}']
  })
})

test('parses pseudo classes', t => {
  const css = '.tomato{color:tomato}.tomato:hover{color:orange}.cucumber:focus{color:green}.shadow::after{color:red}'
  t.deepEqual(parser(css), {
    tomato: ['.tomato{color:tomato}', '.tomato:hover{color:orange}'],
    cucumber: ['.cucumber:focus{color:green}'],
    shadow: ['.shadow::after{color:red}']
  })
})
