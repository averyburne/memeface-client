import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
  <nav>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/memes'>Memes</NavLink>
    <NavLink to='/create-meme'>Create Meme</NavLink>
  </nav>
)

export default Nav
