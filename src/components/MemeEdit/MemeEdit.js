import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

const MemeEdit = (props) => {
  // const [meme, setMeme] = useState({ title: '', memeUrl: '' })
  const [updated, setUpdated] = useState(false)

  // useEffect(() => {
  //   axios(`${apiUrl}/memes/${props.match.params.id}`)
  //     .then(res => setMeme(res.data.meme))
  //     .catch(console.error)
  // }, [])

  // const handleChange = event => {
  //   event.persist()
  //   setMeme(meme => ({ ...meme, [event.target.name]: event.target.value }))
  // }

  const handleSubmit = event => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    axios({
      url: `${apiUrl}/memes/${props.match.params.id}`,
      method: 'PATCH',
      data: formData,
      headers: {
        'content-type': 'multipart/form-data',
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
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h1>Update Your Meme</h1>
      <label>Title:</label>
      <input className="meme-title-update" placeholder="Enter your new title" type="text" name='name' required/>
      <button className="btn-primary submitUpdateButton" type="submit">Update</button>
    </form>
  )
}

export default MemeEdit
