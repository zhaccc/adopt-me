import React from 'react'
import { render } from 'react-dom'
import Pet from './Pet';

const App = () => {

  return (
    <div>
      <h1>Adopt Me!</h1>
      <Pet name='Usha'
        animal='Dog'
        breed='Japanese Terrier' />
      <Pet name='Kali'
        animal='Dog'
        breed='Yard Runner' />
      <Pet name='Lee'
        animal='Cat'
        breed='Tabby' />
    </div>
  )
};

render(<App />, document.getElementById("root"));
