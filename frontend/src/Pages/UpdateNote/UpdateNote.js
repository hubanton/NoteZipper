import React, { useEffect, useState } from "react";
import { MainScreen } from "../../Components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";

import { useNavigate } from "react-router-dom";

import Loading from "../../Components/Loading";
import ErrorMessage from "../../Components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useParams } from "react-router";

function UpdateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [updateDate, setUpdateDate] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;
  const { id } = useParams();

  useEffect(() => {
    async function fetchNote() {
      console.log(id);
      const { data } = await axios.get(`/api/notes/${id}`);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setUpdateDate(data.updatedAt);
    }

    fetchNote();
  }, [id]);

  const handleDelete = (e) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
      navigate("/notes");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(title, content, category, id));
    if (!title || !content || !category) return;

    navigate("/notes");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Updated your Note">
      <Card border="info" className="bg-dark">
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
                <Card.Body style={{ color: "lightblue" }}>
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
                Update Note
              </Button>
            )}
            <Button className="mx-3" onClick={handleDelete} variant="danger">
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer>
          Last updated on - {new Date(updateDate).toLocaleDateString("de-DE")}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default UpdateNote;
