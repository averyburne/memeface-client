import React, { useState, useEffect } from 'react'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../apiConfig'

const Comment = (props) => {
  const [comments, setComments] = useState(null)
  const [deleted, setDeleted] = useState(null)
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

  const destroy = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/comments/${event.target.value}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (comments) {
    commentsJSX = comments.map(comment => (
      <div key={comment._id}>
        <li className="col-6 comment-item" key={comment._id}>
          {comment.content}
        </li>
        {(comment.owner === props.user._id) &&
          <span>
            <button value={comment._id} className="btn-danger deleteMeme" onClick={destroy} >Delete Comment</button>
            <button className="btn-warning editMeme">Edit</button>
          </span>
        }
      </div>
    ))
    console.log(comments)
    console.log(props.user._id)
  }

  if (deleted) {
    getComments()
    setDeleted(null)
  }

  const leaveComment = (event) => {
    event.preventDefault()
    const data = {
      content: event.target.content.value,
      meme: props.meme._id,
      owner: props.user._id
    }
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
      <p className="comment-header">Comments:</p>
      {commentsJSX}
      <form onSubmit={leaveComment}>
        <input type="text" className="comment-input" placeholder="Leave a comment" name="content"/>
        <button className='btn-primary comment-btn' type="submit">Leave Comment</button>
      </form>
    </div>
  )
}

export default Comment