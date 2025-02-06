import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Cart from '../Cart/Cart'
import Home from '../Home/Home'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<Home />} />
      <Route path='/cart' element={<Cart/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
