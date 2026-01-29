import { useState } from 'react'
import './App.css'
import Edit from "./components/edit/Edit"
import Header from "./components/header/Header"
import Curriculum from "./components/curriculum/Curriculum"

function App() {
  return (
    <>
      <Header />
      <Edit />
      <Curriculum />
    </>
  )
}

export default App
