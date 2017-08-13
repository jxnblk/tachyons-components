
# tachyons-components

React UI components powered by [Tachyons][tachyons]
with a [styled-components][sc] like API.

```sh
npm install tachyons-components
```

```js
import styled from 'tachyons-components'

const Button = styled('button')`
  f6 f5-ns fw6 dib ba
  b--black-20 bg-blue white
  ph3 ph4-ns pv2 pv3-ns br2
  grow no-underline
`
```

```jsx
<Button mr2>
  Hello
</Button>
```

## Functional styles

```js
const Heading = styled('h2')`
  m0
  ${props => props.big ? 'f1' : 'f2'}
`
```

[tachyons]: http://tachyons.io
[sc]: https://styled-components.com

[MIT License](LICENSE.md)
