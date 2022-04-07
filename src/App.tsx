import { useEffect, useState } from 'react'
import GameSetup from './containers/GameSetup'

function App() {


  return (
    <div className="w-full h-screen bg-themeBackground">

      <main role="main" className="w-full flex flex-col h-screen content-center justify-center">

            <GameSetup />

      </main>

    </div>
  )
}

export default App
