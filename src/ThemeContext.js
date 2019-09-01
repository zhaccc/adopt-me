import {createContext} from 'react';

// if we don't have a Provider (in useContext hooks case) we will return value='green' and empty function
// if we use Consumer we only need the defaultValue
// like: createContext('green')
const ThemeContext = createContext(['green', () => {}])

export default ThemeContext
