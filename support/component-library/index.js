
import React from 'react'
import ReactDOM from 'react-dom'

require('../../app/index.css')

import Button from '../../app/components/Button'
import Text from '../../app/components/Text'
import TextInput from '../../app/components/TextInput'
import Window from '../../app/components/Window'
import Loading from '../../app/components/Loading'

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

    <Text>Regular text input:</Text>
    <TextInput placeholder='Some text input'/>

    <Text>Disabled text input:</Text>
    <TextInput disabled placeholder='Disabled input' />

    <Text>Input with validation warning:</Text>
    <TextInput error='Invalid email address' defaultValue='Malformed text' />

    <Text>Loading spinner</Text>
    <Loading progress={60} />
  </Window>
)

ReactDOM.render(
  <App/>,
  document.getElementById('react-root')
);
