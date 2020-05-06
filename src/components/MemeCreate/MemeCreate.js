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
      })
  }

  if (createdMemeId) {
    return <Redirect to={`/memes/${createdMemeId}`} />
  }
  // <input type="file" name='file' />
  return (
    <form onSubmit={onFormSubmit} encType="multipart/form-data">
      <h1>File Upload</h1>
      <input placeholder="Enter a title" type="text" name='name' required/>
      <input className="fileSelect" type="file" name='file' required/>
      <button className="btn-primary" type="submit">Upload</button>
    </form>
  )
}

export default MemeCreate
