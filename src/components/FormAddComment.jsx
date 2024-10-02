import React, { useState } from 'react'
import axios from "axios"

export default function FormAddComment(props) {
  const [newComment, setNewComment] = useState("")
  const {getWatchList, movieId} = props

  const handleValueComment = (e) => {
    setNewComment(e.target.value)
  }

  const handleAddComment = async (e) => {
    e.preventDefault();
      try {
        await axios.patch(`${import.meta.env.VITE_SERVER_URL}/movies/${movieId}`, {"comment": newComment})

        getWatchList()
        setNewComment("");
      } catch (error) {
        console.log(error)
      }
  
    
  }
   

  return (
    <div>
        <label htmlFor="myTextArea">Write your comment here: </label>
        <textarea name="" id=""  onChange={handleValueComment} value={newComment}></textarea>
        <button onClick={handleAddComment}>Add</button>
    </div>
    
  )
}
