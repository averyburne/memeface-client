import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../shared/Layout'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../apiConfig'

const Meme = (props) => {
  console.log(props)
  const [meme, setMeme] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/memes/${props.match.params.id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(res => setMeme(res.data.meme))
      .catch(console.error)
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/memes/${props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (!meme) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/', state: { msg: 'Meme succesfully deleted!' } }
    } />
  }

  return (
    <Layout>
      <h4>{meme.title}</h4>
      <img src={`${meme.memeUrl}`} alt="meme"/>
      <button onClick={destroy}>Delete Meme</button>
      <Link to={`/memes/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/memes">Back to all memes</Link>
    </Layout>
  )
}

export default Meme
