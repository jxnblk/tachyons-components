
# tachyons-components

[![Build Status][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
![Experimental](https://img.shields.io/badge/status-experimental-orange.svg?style=flat-square)

[build-badge]: https://img.shields.io/travis/jxnblk/tachyons-components/master.svg?style=flat-square
[build]: https://travis-ci.org/jxnblk/tachyons-components
[coverage-badge]: https://img.shields.io/codecov/c/github/jxnblk/tachyons-components.svg?style=flat-square
[coverage]: https://codecov.io/github/jxnblk/tachyons-components

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
