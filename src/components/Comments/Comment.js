import React, { useState, useEffect } from 'react'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../apiConfig'

const Comment = (props) => {
  const [comments, setComments] = useState(null)
  let commentsJSX

  const getComments = () => {
    axios({
      url: `${apiUrl}/comments`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(res => setComments((res.data.comments).filter(comment => comment.meme === props.meme._id)))
      .catch(console.error)
  }

  useEffect(() => {
    getComments()
  }, [])

  if (comments) {
    commentsJSX = comments.map(comment => (
      <li key={comment._id}>
        {comment.content}
      </li>
    ))
  }

  const leaveComment = (event) => {
    event.preventDefault()
    const data = {
      content: event.target.content.value,
      meme: props.meme._id,
      owner: props.user._id
    }
    console.log(data)
    axios({
      url: `${apiUrl}/comments`,
      method: 'POST',
      data: data,
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(getComments())
      .catch(console.error)
  }

  return (
    <div>
      <p>Comments:</p>
      {commentsJSX}
      <form onSubmit={leaveComment}>
        <input type="text" className="comment-input" placeholder="Leave a comment" name="content"/>
        <button className='btn-primary comment-btn' type="submit">Leave Comment</button>
      </form>
    </div>
  )
}

export default Comment
