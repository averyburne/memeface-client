import React, { useState, useEffect } from 'react'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../apiConfig'

const Upvote = (props) => {
  const [upvotes, setUpvotes] = useState(null)
  let upvoteId
  let numOfUpvotes = 0

  const getUpvotes = () => {
    axios({
      url: `${apiUrl}/upvotes`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(res => setUpvotes((res.data.upvotes).filter(upvote => upvote.meme === props.meme._id)))
      .catch(console.error)
  }
  useEffect(() => {
    getUpvotes()
  }, [])

  console.log(upvotes)

  if (upvotes) {
    upvoteId = (upvotes.filter(upvote => upvote.owner === props.user._id))
    console.log(upvoteId[0]._id)
  }

  const sendUpvote = (event) => {
    event.preventDefault()
    const data = {
      upvote: true,
      downvote: false,
      meme: props.meme._id,
      owner: props.user._id
    }
    if (upvoteId) {
      axios({
        url: `${apiUrl}/upvotes/${upvoteId[0]._id}`,
        method: 'PATCH',
        data: data,
        headers: {
          Authorization: `Bearer ${props.user.token}`
        }
      })
        .then(getUpvotes())
    } else {
      axios({
        url: `${apiUrl}/upvotes`,
        method: 'POST',
        data: data,
        headers: {
          Authorization: `Bearer ${props.user.token}`
        }
      })
        .then(getUpvotes())
    }
  }

  const sendDownvote = (event) => {
    event.preventDefault()
    const data = {
      upvote: false,
      downvote: true,
      meme: props.meme._id,
      owner: props.user._id
    }
    axios({
      url: `${apiUrl}/upvotes`,
      method: 'POST',
      data: data,
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(getUpvotes())
  }

  if (upvotes) {
    upvotes.forEach((upvote) => {
      if (upvote.upvote === true) {
        numOfUpvotes = numOfUpvotes + 1
      } else if (upvote.downvote === true) {
        numOfUpvotes = numOfUpvotes - 1
      }
    })
  }

  console.log(upvotes)
  console.log(numOfUpvotes)

  return (
    <div>
      <button className="upvote-btn" onClick={sendUpvote}>Upvote</button>
      <button className="downvote-btn" onClick={sendDownvote}>Downvote</button>
      {numOfUpvotes}
    </div>
  )
}

export default Upvote
