import React from 'react'

export default function FormAddComment() {
    const [text, setText] = useState()

    const handleComment = (e) => {
        e.preventDefault()
        setText(e.target.value)

    }

  return (
    <div>
        <label htmlFor="myTextArea">Write your comment here: </label>
        <textarea name="" id=""></textarea>
        <button>Add</button>
    </div>
    
  )
}
