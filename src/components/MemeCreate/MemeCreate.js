import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { post } from 'axios'
import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'
// import MemeForm from '../shared/MemeForm'

const MemeCreate = props => {
  // const [file, setFile] = useState([])
  const [createdMemeId, setCreatedMemeId] = useState(null)

  const onFormSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    const url = `${apiUrl}/memes`

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${props.user.token}`
      }
    }

    post(url, formData, config)
      .then((response) => {
        setCreatedMemeId(response.data.meme._id)
        console.log(response.data.meme)
      })
  }

  if (createdMemeId) {
    return <Redirect to={`/memes/${createdMemeId}`} />
  }

  return (
    <form onSubmit={onFormSubmit} encType="multipart/form-data">
      <h1>File Upload</h1>
      <input type="text" name='name' required/>
      <input type="file" name='file' />
      <button type="submit">Upload</button>
    </form>
  )
}

export default MemeCreate
