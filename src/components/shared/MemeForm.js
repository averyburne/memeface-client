import React from 'react'
import { Link } from 'react-router-dom'

const MemeForm = ({ meme, handleSubmit, onChange, cancelPath }) => (
  <form onSubmit={handleSubmit} encType="multipart/form-data">
    <label>Title</label>
    <input
      placeholder="Enter the title"
      value={meme.title}
      name="title"
      onChange={onChange}
    />

    <label>Meme</label>
    <input
      type="file"
      // value={meme.file}
      name="file"
      onChange={onChange}
      encType="multipart/form-data"
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default MemeForm
