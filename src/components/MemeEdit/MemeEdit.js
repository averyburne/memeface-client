import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import MemeForm from '../shared/MemeForm'
import Layout from '../shared/Layout'

const MemeEdit = (props) => {
  const [meme, setMeme] = useState({ title: '', memeUrl: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/memes/${props.match.params.id}`)
      .then(res => setMeme(res.data.meme))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setMeme(meme => ({ ...meme, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/memes/${props.match.params.id}`,
      method: 'PATCH',
      data: { meme },
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={`/memes/${props.match.params.id}`} />
  }

  return (
    <Layout>
      <MemeForm
        meme={meme}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/memes/${props.match.params.id}`}
      />
    </Layout>
  )
}

export default MemeEdit
