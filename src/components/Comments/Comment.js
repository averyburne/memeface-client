import React, { useState, useEffect } from 'react'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../apiConfig'

const Comment = (props) => {
  const [comments, setComments] = useState(null)
  const [deleted, setDeleted] = useState(null)
  let userEmail = props.user.email
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

  const checkForAnonymous = (event) => {
    if (event.target.checked) {
      userEmail = null
    } else {
      userEmail = props.user.email
    }
  }

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
      <div className="col-10 lg-col-6 comment-div" key={comment._id}>
        <li className="comment-item" key={comment._id}>
          {(comment.ownerEmail) ? <h5>{comment.ownerEmail}: </h5> : <h5>Anonymous: </h5>}  {comment.content}
        </li>
        {(comment.owner === props.user._id) &&
          <span className="comment-delete-section">
            <button value={comment._id} className="btn-danger deleteComment" onClick={destroy} >Delete Comment</button>
            {// <button className="btn-warning editMeme">Edit</button>
            }
          </span>
        }
      </div>
    ))
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
      ownerEmail: userEmail,
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
      .then(event.target.reset())
      .catch(console.error)
  }

  return (
    <div>
      <p className="comment-header">Comments:</p>
      {commentsJSX}
      <form className="comment-form" onSubmit={leaveComment}>
        <textarea type="text" className="comment-input" placeholder="Leave a comment" name="content"/>
        <button className='btn-primary comment-btn' type="submit">Leave Comment</button>
      </form>
      <div className="anonymous-div">
        <input type="checkbox" name="anonymous" className="anonymous-checkbox" onChange={checkForAnonymous}/>
        <label htmlFor="anonymous">Post Anonymously</label>
      </div>
    </div>
  )
}

export default Comment
