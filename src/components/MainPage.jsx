import React from 'react'
import Home from './Home'
// import MidHeader from './MidHeader'
import ColorPicker from './ColorPicker'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainPage() {
  return (
    <>
      <ToastContainer />
      <Home />
      {/* <MidHeader /> */}
      <ColorPicker />
      <Footer />

    </>
  )
}

export default MainPage