//import { useState } from 'react'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import ProfileCard from './compenents/card/profilecard/profilecard'

function App() {

  return (
      <ChakraProvider>
    <div>
      <ProfileCard />
    </div>
    </ChakraProvider>
  )
}

export default App
