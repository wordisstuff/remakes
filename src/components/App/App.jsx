import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}></Route>
    </Routes>
    </>
  )
}

export default App
