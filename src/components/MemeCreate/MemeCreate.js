import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import MemeForm from '../shared/MemeForm'

const MemeCreate = props => {
  const [meme, setMeme] = useState({ title: '', memeUrl: '' })
  const [createdMemeId, setCreatedMemeId] = useState(null)

  const handleChange = event => {
  // const updatedField = { [event.target.name]: event.target.value }
  // const editedMeme = Object.assign(meme, updatedField)
    setMeme({ ...meme, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/memes`,
      method: 'POST',
      data: { meme },
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(res => console.log(res.data.meme._id))
      .then(res => setCreatedMemeId(res.data.meme.id))
      .catch(console.error)
  }
  if (createdMemeId) {
    return <Redirect to={`/memes/${createdMemeId}`} />
  }

  return (
    <Layout>
      <MemeForm
        meme={meme}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </Layout>
  )
}

export default MemeCreate
