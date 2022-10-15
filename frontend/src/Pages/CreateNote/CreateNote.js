import React, { useEffect, useState } from "react";
import { MainScreen } from "../../Components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";

import { useNavigate } from "react-router-dom";

import Loading from "../../Components/Loading";
import ErrorMessage from "../../Components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error } = noteCreate;
  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/notes");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Note">
      <Card className="bg-dark" border="success">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title" className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content" className="mb-2">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card className="bg-dark">
                <Card.Header>Note Preview</Card.Header>
                <Card.Body style={{ color: "lightgreen" }}>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content" className="mb-4">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading ? (
              <Loading />
            ) : (
              <Button type="submit" variant="primary">
                Create Note
              </Button>
            )}
            <Button className="mx-3" onClick={resetHandler} variant="danger">
              Reset Fields
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer>
          Creation Date - {new Date().toLocaleDateString("de-DE")}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
