import React, { useState, useEffect } from 'react'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../apiConfig'

const Comment = (props) => {
  const [comment, setComment] = useState(null)
  const [comments, setComments] = useState(null)

  useEffect(() => {
    axios({
      url: `${apiUrl}/comments`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(res => setComments(res.data.comments.filter(comment => item.content)))
      .catch(console.error)
  }, [])

  // if (comments) {
  //   const filteredComments = comments.filter(comment => c)
  // }

  const leaveComment = (event) => {
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
      .then(res => setComment(res.data.comment))
      .catch(console.error)
  }

  console.log(comments)

  return (
    <div>
      <p>Comments:</p>
      {comments}
      <form onSubmit={leaveComment}>
        <input type="text" placeholder="Leave a comment" name="content"/>
        <button className='btn-primary' type="submit">Leave Comment</button>
      </form>
      <div>{comment ? comment.content : ''}</div>
    </div>
  )
}

export default Comment
