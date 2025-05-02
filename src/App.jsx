import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Manage from './components/Manage'

function App() {

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#2dd4bf_100%)]"></div>
      <Header />
      <div className="flex flex-col min-h-[95vh]">
        <main className="flex-grow">
          <Manage />
        </main>
        <Footer />
      </div>
    </>
  )
}
export default App
