import React from 'react'
import { Link } from 'react-router-dom'

const MemeForm = ({ meme, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder="A Wonderful Film"
      value={meme.title}
      name="title"
      onChange={handleChange}
    />

    <label>Url</label>
    <input
      placeholder="www.memeaddress.com"
      value={meme.memeUrl}
      name="memeUrl"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default MemeForm
