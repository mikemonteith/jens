
import React from 'react'
import ReactDOM from 'react-dom'

require('../../app/index.css')

import Button from '../../app/components/Button'

const App = () => (
  <div>
    <Button>Button</Button>
  </div>
)

ReactDOM.render(
  <App/>,
  document.getElementById('react-root')
);
