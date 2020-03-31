import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => (
  <nav>
    <Link to='/'>Home</Link>
    <Link to='/memes'>Memes</Link>
    <Link to='/create-meme'>Create Meme</Link>
  </nav>
)

export default Nav
