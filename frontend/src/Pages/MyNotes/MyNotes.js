import "./MyNotes.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import { MainScreen } from "../../Components/MainScreen";
import { Accordion, Button, Card, Spinner } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listNotes } from "../../actions/notesActions";
import ErrorMessage from "../../Components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { deleteNoteAction } from "../../actions/notesActions";
import { Form } from "react-bootstrap";

function ContextAwareToggle({ note, eventKey, callback, notes }) {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteNoteAction(id));
  };

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  return (
    <div
      onClick={decoratedOnClick}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          marginRight: "auto",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        {note.title}
      </span>
      <div>
        <Link to={`/notes/${note._id}`}>
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

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);

  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);

  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);

  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  return (
    <>
      {userInfo && (
        <MainScreen title={`Hello ${userInfo?.name}!`}>
          <div style={{ textAlign: "right", marginBottom: "10px" }}>
            <Form className="d-flex mb-3">
              <Form.Control
                type="search"
                placeholder="Search Note"
                className="w-25 me-auto"
                aria-label="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <Link to="/createnote">
                <Button variant="success" size="lg">
                  Create new Note
                </Button>
              </Link>
            </Form>
          </div>
          {errorDelete && <ErrorMessage>{errorDelete}</ErrorMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {loading || loadingDelete ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner
                animation="border"
                variant="primary"
                style={{ width: "8rem", height: "8rem" }}
              ></Spinner>
            </div>
          ) : (
            notes && (
              <Accordion className="mt-3" defaultActiveKey={notes[0]?._id}>
                {notes
                  .filter((note) =>
                    note.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((note) => {
                    return (
                      <Card key={note._id} className="mb-4">
                        <Card.Header className="p-4 bg-dark">
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
                                {new Date(note.createdAt).toLocaleDateString(
                                  "de-DE"
                                )}
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
      )}
    </>
  );
};

export default MyNotes;
