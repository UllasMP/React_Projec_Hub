import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

function Layout({children}) {
  return (
    <div>
      <Navbar/>

      <div className="content">
        {children}</div>

      <Footer/>
    </div>
  )
}

{/* we used Layout  to make  footer and navbar remain constant for all pages , only the childern changes  */}

export default Layout
