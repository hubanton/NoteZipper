import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

function Header() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  //const userLogin = useSelector((state) => state.userLogin);
  //const { userInfo } = userLogin;

  function handleNavigate(destiny) {
    navigate(`/${destiny}`);
  }

  function handleLogOut() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <Navbar
      className="shadow-lg"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand
          className=" text-success"
          style={{ fontSize: "26px", fontWeight: "bolder", cursor: "pointer" }}
          onClick={() => {
            handleNavigate("");
          }}
        >
          NoteZipper
        </Navbar.Brand>
        <Navbar.Toggle className="m-3" aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form className="d-flex ms-auto me-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-3"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav>
            <Nav.Link
              onClick={() => {
                handleNavigate("notes");
              }}
            >
              My Notes
            </Nav.Link>
            <NavDropdown title="User" id="collasible-nav-dropdown">
              <NavDropdown.Item>My profile</NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  handleLogOut();
                }}
              >
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
