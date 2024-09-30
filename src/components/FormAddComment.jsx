import React from 'react'

export default function FormAddComment() {
    const [text, setText] = useState()
    //let textoGuardado = ""

    const handleComment = (e) => {
        e.preventDefault()
        setText(e.target.value)

    }

    const handleAddComment = (e) => {
        e.preventDefault()
       // textoGuardado = text
        setText("")
        //necesitamos guardar el texto cuando se le de al botón para enviarselo al div de watchList
    }

  return (
    <div>
        <label htmlFor="myTextArea">Write your comment here: </label>
        <textarea name="" id=""  onChange={handleComment} value={text}></textarea>
        <button onClick={handleAddComment}>Add</button>
    </div>
    
  )
}
