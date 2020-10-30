import React, { useState, useEffect } from "react"
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useAppContext } from "../libs/contextLib"
import { onError } from "../libs/errorLib"
import { API } from "aws-amplify"
import { Link } from "react-router-dom"
import "./Home.css"

export default function Home() {
  const [notes, setNotes] = useState([])
  const { isAuthenticated } = useAppContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const onLoad = async () => {
      if (!isAuthenticated) {
        return
      }

      try {
        const notes = await getNotes()
        setNotes(notes)
      } catch (error) {
        onError(error)
      }

      setIsLoading(false)
    }

    onLoad()
  }, [isAuthenticated])

  const getNotes = () => {
    return API.get("notes", "/notes")
  }

  const renderNotesList = (notes) => {
    // console.log(notes);
    return [{}].concat(notes).map((note, index) =>
      index !== 0 ? (
        <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
          <ListGroupItem header={note.content.trim().split("\n")[0]}>
            {`Created: ${new Date(note.createdAt).toLocaleString()}`}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/notes/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b>Create a new note
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    )
  }

  const renderLandingPage = () => {
    return (
      <div className="lander">
        <h1>Mana Notes</h1>
        <p>A simple serverless note taking app</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    )
  }

  const renderNotes = () => {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
      </div>
    )
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLandingPage()}
    </div>
  )
}
