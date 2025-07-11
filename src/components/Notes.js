import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  const context = useContext(noteContext)
  const { notes, getNotes, editNote } = context
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token")) {
        getNotes()
    } else {
        navigate("/login")
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  
  const updateNote = (currentNote) => {
    ref.current.click()
    const { _id, title, description, tag } = currentNote
    setNote({
        id: _id,
        editedtitle: title,
        editeddescription: description,
        editedtag: tag
    })
  }
  
  const [note, setNote] = useState({
    id: "",
    editedtitle: "",
    editeddescription: "",
    editedtag: ""
  })

  const handleClick = (e) => {
    e.preventDefault()
    editNote(note.id, note.editedtitle, note.editeddescription, note.editedtag)
    refClose.current.click()
    props.showAlert("Updated Successfully", "success")
  }

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <>
    <AddNote showAlert={props.showAlert}/>
    <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch modal</button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className='mb-3'>
                        <div className="mb-3">
                            <label htmlFor="editedtitle" className="form-label">Title</label>
                            <input type="text" className="form-control" id="editedtitle" name="editedtitle" value={note.editedtitle} aria-describedby="emailHelp" onChange={onChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="editeddescription" className="form-label">Description</label>
                            <input type="text" className="form-control" id="editeddescription" name="editeddescription" value={note.editeddescription} onChange={onChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="editedtag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="editedtag" name="editedtag" value={note.editedtag} onChange={onChange}/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={note.editedtitle.length < 3 || note.editeddescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                </div>
            </div>
        </div>
    </div>
    <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
            {notes.length===0 && "No notes to display!"}
        </div>
        {notes.map((note) => {
            return (
                <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
            )
        })}
    </div>
    </>
  )
}

export default Notes