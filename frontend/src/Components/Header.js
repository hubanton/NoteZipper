import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

function Header() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
          {userInfo ? (
            <Nav style={{ marginLeft: "auto" }}>
              <Nav.Link
                onClick={() => {
                  handleNavigate("notes");
                }}
              >
                My Notes
              </Nav.Link>
              <NavDropdown title={userInfo?.name} id="collasible-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    handleNavigate("profile");
                  }}
                >
                  My profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  style={{ color: "tomato" }}
                  onClick={() => {
                    handleLogOut();
                  }}
                >
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav.Link
              onClick={() => {
                handleNavigate("login");
              }}
              style={{ marginLeft: "auto" }}
            >
              Log In
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
