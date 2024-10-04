import React, { useState, useEffect } from 'react'
import axios from "axios"

import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

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
      } catch (error) {
        console.log(error)
      }
  }
  
  const handleEditClick = () => {
    setIsEditing(true); // Activa el modo de edición
  };
   
  return (
    <Accordion style={{backgroundColor: "#red !important"}}>
      <Accordion.Item eventKey="0">
      <Accordion.Header  >Show comment</Accordion.Header>
        <Accordion.Body  style={{backgroundColor: "#abc"}}>
        {isEditing ? (
          <>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Edit your comment:</Form.Label>
            <Form.Control as="textarea" rows={3} 
              id="myTextArea"
              onChange={handleValueComment}
              value={newComment} />
          </Form.Group>
          </Form>
            <button onClick={handleComment}>Save Changes</button>
          </>
        ) : (
          <>
            <p>{newComment ? newComment : 'No comment added yet.'}</p>
            <button onClick={handleEditClick}>{newComment ? "Edit Comment" : "Add Comment"}</button>
          </>
        )}
        </Accordion.Body>
        
      </Accordion.Item>
      
    </Accordion>
  )
}
