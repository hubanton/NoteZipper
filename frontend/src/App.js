import "./App.css";
import Header from "./Components/Header";
import { Footer } from "./Components/Footer";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./Pages/MyNotes/MyNotes";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { RegisterPage } from "./Pages/RegisterPage/RegisterPage";
import CreateNote from "./Pages/CreateNote/CreateNote";
import UpdateNote from "./Pages/UpdateNote/UpdateNote";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/notes" element={<MyNotes />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/createnote" element={<CreateNote />} />
            <Route path="/notes/:id" element={<UpdateNote />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
