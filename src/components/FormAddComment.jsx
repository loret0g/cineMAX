import React, { useState, useEffect } from 'react'
import axios from "axios"

export default function FormAddComment(props) {
  const {getWatchList, movieId, currentComment} = props
  const [newComment, setNewComment] = useState(currentComment || "")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setNewComment(currentComment);
  }, [currentComment]);

  const handleValueComment = (e) => {
    setNewComment(e.target.value)
  }

  const handleComment = async (e) => {
    e.preventDefault();
      try {
        await axios.patch(`${import.meta.env.VITE_SERVER_URL}/movies/${movieId}`, {"comment": newComment})
        getWatchList()
        setIsEditing(false);
        // setNewComment("");
      } catch (error) {
        console.log(error)
      }
  }
  
  const handleEditClick = () => {
    setIsEditing(true); // Activa el modo de edición
  };

  const handleEditComment = (e) => {
    e.preventDefault()
    
  }
   
  console.log(newComment)
  return (
    <div>
      {isEditing ? (
        <>
          <label htmlFor="myTextArea">Edit your comment: </label>
          <textarea
            id="myTextArea"
            onChange={handleValueComment}
            value={newComment}
          ></textarea>
          <button onClick={handleComment}>Save Changes</button>
        </>
      ) : (
        <>
          <p>{newComment ? newComment : 'No comment added yet.'}</p>
          <button onClick={handleEditClick}>Edit Comment</button>
        </>
      )}
    </div>
  )
}
