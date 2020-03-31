import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'

const Memes = props => {
  const [memes, setMemes] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/memes`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(res => setMemes(res.data.memes))
      // .then(console.log(memes))
      .catch(console.error)
  }, [])

  const memesJsx = memes.map(meme => (
    <li key={meme._id}>
      <Link to={`/memes/${meme._id}`}>{meme.title}</Link>
    </li>
  ))

  return (
    <Layout>
      <h4>Memes</h4>
      <ul>
        {memesJsx}
      </ul>
    </Layout>
  )
}

export default Memes
