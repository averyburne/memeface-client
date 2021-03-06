import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../shared/Layout'
import Comment from '../Comments/Comment'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../apiConfig'

const Meme = (props) => {
  const [meme, setMeme] = useState(null)
  const [deleted, setDeleted] = useState(false)
  let input

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
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (meme) {
    if (meme.owner === props.user._id) {
      input =
      <div>
        <button className="btn-danger deleteMeme" onClick={destroy}>Delete Meme</button>
        <Link to={`/memes/${props.match.params.id}/edit`}>
          <button className="btn-warning editMeme">Edit</button>
        </Link>
      </div>
    } else {
      input = ''
    }
  }

  if (!meme) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/memes', state: { msg: 'Meme succesfully deleted!' } }
    } />
  }

  return (
    <Layout>
      <h3>{meme.title}</h3>
      <h6>posted by: {props.user.email}</h6>
      <img src={`${meme.memeUrl}`} height="400" width="400" alt="meme"/>
      <Comment meme={meme} user={props.user}/>
      {input}
      <div>
        <Link to="/memes">Back to all memes</Link>
      </div>
    </Layout>
  )
}

export default Meme
