import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from '../src'

const Button = styled('a')`
f6 f5-ns fw6 dib ba
b--black-20 bg-blue white
ph3 ph4-ns pv2 pv3-ns br2
grow no-underline
`

storiesOf('Hello', module)
  .add('Basic', () => (
    <Button href='#!' mt4 mb4>
      Hello
    </Button>
  ))
