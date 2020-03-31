import React from 'react'

import Nav from './Nav'
import Footer from './Footer'

const Layout = props => (
  <div>
    <h1>Best meme sharing format out there</h1>
    <Nav />

    {props.children}

    <Footer />
  </div>
)

export default Layout