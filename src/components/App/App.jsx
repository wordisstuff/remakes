import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Cart from '../Cart/Cart'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path='/cart' element={<Cart/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
