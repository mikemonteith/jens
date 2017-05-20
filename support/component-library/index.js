
import React from 'react'
import ReactDOM from 'react-dom'

require('../../app/index.css')

import Button from '../../app/components/Button'
import Text from '../../app/components/Text'
import Window from '../../app/components/Window'

const App = () => (
  <Window>
    <Button>Primary Button</Button>
    <Button type='secondary'>Secondary Button</Button>
    <Button type='warning'>Warning Button</Button>
    <Button disabled={true}>Disabled Primary Button</Button>

    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </Text>
  </Window>
)

ReactDOM.render(
  <App/>,
  document.getElementById('react-root')
);
