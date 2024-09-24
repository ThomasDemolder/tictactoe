//import { useState } from 'react'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import ProfileCard from './compenents/card/profilecard/profilecard'
import Tictactoe from './compenents/game/tictactoe'

function App() {

  return (
      <ChakraProvider>
    <div>
      <ProfileCard />
      <Tictactoe />
    </div>
    </ChakraProvider>
  )
}

export default App
