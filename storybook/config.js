import React from 'react'
import { configure, addDecorator } from '@storybook/react'
// import { createProvider } from 'refunk'
// import XRay from 'react-x-ray'
// import Provider from '../src/Provider'

// const hoc = createProvider({
//   xray: false
// })
//
// const toggleXRay = state => ({ xray: !state.xray })
//
// const Demo = hoc(props => (
//   <Provider>
//     <XRay disabled={!props.xray}>
//       <Box p={3}>
//         {props.story()}
//       </Box>
//     </XRay>
//     <button
//       onClick={e => props.update(toggleXRay)}
//       children='X-Ray'
//     />
//   </Provider>
// ))

// addDecorator(story => (
//   <Demo story={story} />
// ))

const req = require.context('.', true, /\.js$/)

const load = () => {
  req.keys().forEach(req)
}

configure(load, module)
