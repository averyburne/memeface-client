import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import MemeForm from '../shared/MemeForm'

const MemeCreate = props => {
  // const [title, setTitle] = useState('')
  const [file, setFile] = useState([])
  const [createdMemeId, setCreatedMemeId] = useState(null)
  const formData = new FormData()

  const handleSubmit = (e) => {
    e.preventDefault()
    formData.append('file', file)
    // formData.append('title', title)
    fileUpload(file)
      .then((response) => {
        setCreatedMemeId(response.data.meme._id)
      })
  }

  const onChange = e => {
    // const form = e.target.files[0]
    // const data = new FormData(form)
    console.log(e.target.files[0])
    setFile(file => (e.target.files[0]))
    // setTitle(title:e.target.files[0].name)
  }

  if (createdMemeId) {
    return <Redirect to={`/memes/${createdMemeId}`} />
  }

  const fileUpload = data => {
    axios({
      url: `${apiUrl} + /memes`,
      method: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      headers: {
        Authorization: `Bearer ${props.user.token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  return (
    <Layout>
      <MemeForm
        // meme={meme}
        onChange={onChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </Layout>
  )
}

export default MemeCreate
