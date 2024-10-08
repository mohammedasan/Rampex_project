import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import Quiz from "./components/Quiz.jsx";
import "./index.css";
import Aboutus from "./components/Aboutus.jsx";
import Howitoworks from "./components/Howitoworks.jsx";
import Login from "./components/Login.jsx"
import SignUp from "./components/SignUp.jsx"
function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="aboutus" element={<Aboutus />} />
          <Route path="howitworks" element={<Howitoworks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
