import "./MyNotes.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import { MainScreen } from "../../Components/MainScreen";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap";
import axios from "axios";

function ContextAwareToggle({ note, eventKey, callback, notes }) {
  function handleDelete(noteID) {
    notes.filter((e) => e._id !== noteID);
    console.log("Hello");
  }

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        onClick={decoratedOnClick}
        style={{
          marginRight: "auto",
          cursor: "pointer",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        {note.title}
      </span>
      <div>
        <Link to={`note/${note._id}`}>
          <Button size="sm" className="me-1" variant="info">
            Edit
          </Button>
        </Link>

        <Button
          size="sm"
          onClick={() => {
            handleDelete(note._id);
          }}
          className="ms-2"
          variant="danger"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

const MyNotes = () => {
  const [notes, setNotes] = useState();

  useEffect(() => {
    async function fetchNotes() {
      const { data } = await axios.get("/api/notes");
      console.log(data);
      console.log("Hello");
      setNotes(data);
    }
    fetchNotes();
  }, []);

  return (
    <MainScreen title="My Notes">
      <div style={{ textAlign: "right" }}>
        <Link to="/createnote">
          <Button variant="success" size="lg">
            Create new Note
          </Button>
        </Link>
      </div>
      {notes && (
        <Accordion className="mt-3" defaultActiveKey={notes[0]._id || 0}>
          {notes.map((note) => {
            return (
              <Card key={note._id} className="mb-4">
                <Card.Header className="p-4">
                  <ContextAwareToggle
                    eventKey={note._id}
                    note={note}
                    notes={notes}
                  />
                </Card.Header>
                <Accordion.Collapse eventKey={note._id}>
                  <Card.Body className="p-4">
                    <Badge variant="success" className="mb-2">
                      Category - {note.category}
                    </Badge>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created on {Date.now()}
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>
      )}
    </MainScreen>
  );
};

export default MyNotes;
