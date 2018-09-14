import test from 'ava'
import React from 'react'
import { create as render } from 'react-test-renderer'
import styled from '../src'

test.afterEach.always(() => {
  styled.reset()
})

test('exports a function', t => {
  t.is(typeof styled, 'function')
  t.is(typeof styled('h1'), 'function')
  t.is(typeof styled.css, 'function')
  t.is(typeof styled.reset, 'function')
})

test('renders', t => {
  const A = styled('div')``
  const json = render(<A />).toJSON()
  t.snapshot(json)
})

test('handles style props', t => {
  const A = styled('div')``
  const json = render(<A mb2 hello />).toJSON()
  t.is(json.props.className, 'mb2')
  t.is(json.props.hello, true)
  t.snapshot(json)
})

test('handles template tokens', t => {
  const A = styled('div')`
    ${props => props.foo ? 'bg-blue' : null}
  `
  const a = render(<A />).toJSON()
  const b = render(<A foo />).toJSON()
  t.is(a.props.className, '')
  t.is(b.props.className, 'bg-blue')
})

test('combines classNames returned from function', t => {
  const A = styled('div')`
    ${props => props.hello ? 'f6 blue' : null}
  `
  const a = render(<A hello />).toJSON()
  t.is(a.props.className, 'f6 blue')
})
