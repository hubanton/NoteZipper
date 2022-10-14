import "./MyNotes.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import { MainScreen } from "../../Components/MainScreen";
import { Accordion, Button, Card } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listNotes } from "../../actions/notesActions";
import Loading from "../../Components/Loading";
import ErrorMessage from "../../Components/ErrorMessage";
import { useNavigate } from "react-router-dom";

function ContextAwareToggle({ note, eventKey, callback, notes }) {
  function handleDelete(noteID) {
    notes.filter((e) => e._id !== noteID);
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
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);

  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <MainScreen title="My Notes">
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <Link to="/createnote">
          <Button variant="success" size="lg">
            Create new Note
          </Button>
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading ? (
        <Loading />
      ) : (
        notes && (
          <Accordion className="mt-3" defaultActiveKey={notes[0]?._id}>
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
                      <span
                        style={{ backgroundColor: "green" }}
                        className="mb-2 badge"
                      >
                        Category - {note.category}
                      </span>
                      <blockquote className="blockquote mb-0">
                        <p>{note.content}</p>
                        <footer className="blockquote-footer">
                          Created on{" "}
                          {new Date(note.createdAt).toLocaleDateString("de-DE")}
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })}
          </Accordion>
        )
      )}
    </MainScreen>
  );
};

export default MyNotes;
