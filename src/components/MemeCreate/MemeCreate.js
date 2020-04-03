import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { post } from 'axios'
import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'
// import MemeForm from '../shared/MemeForm'

const MemeCreate = props => {
  const [file, setFile] = useState([])
  const [createdMemeId, setCreatedMemeId] = useState(null)

  const onFormSubmit = (e) => {
    e.preventDefault()
    fileUpload(file)
      .then((response) => {
        setCreatedMemeId(response.data.meme._id)
      })
  }

  const onChange = function (e) {
    setFile({ file: e.target.files[0] })
    console.log(e.target.files[0].type)
  }

  if (createdMemeId) {
    return <Redirect to={`/memes/${createdMemeId}`} />
  }

  const fileUpload = file => {
    const url = `${apiUrl}/memes`
    const formData = new FormData()
    formData.append('file', file)

    const config = {
      headers: {
        Authorization: `Bearer ${props.user.token}`,
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config)
  }

  return (
    <form onSubmit={onFormSubmit}>
      <h1>File Upload</h1>
      <input type="file" onChange={onChange} />
      <button type="submit">Upload</button>
    </form>
  )
}

export default MemeCreate
