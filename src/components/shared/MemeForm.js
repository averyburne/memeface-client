import React from 'react'
import { Link } from 'react-router-dom'

const MemeForm = ({ meme, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit} encType="multipart/form-data">
    <label>Title</label>
    <input
      placeholder="A Wonderful Meme"
      value={meme.title}
      name="title"
      onChange={handleChange}
    />

    <label>Meme</label>
    <input
      type="file"
      // value={meme.memeUrl}
      name="avatar"
      // onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default MemeForm
