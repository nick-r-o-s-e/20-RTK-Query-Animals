import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Animals from "./pages/Animals/Animals";
import Home from "./pages/Home/Home";
import NewAnimalForm from "./pages/NewAnimal/NewAnimalForm";
import { useState } from "react";

function App() {
  const [navArrow, setNavArrow] = useState(false);

  return (
    <div className="main-container">
      <Navbar navArrow={navArrow} />
      <Routes>
        <Route path="/" element={<Home setNavArrow={setNavArrow} />} />
        <Route
          path="/animals"
          element={<Animals setNavArrow={setNavArrow} />}
        />
        <Route
          path="/animals/:group"
          element={<Animals setNavArrow={setNavArrow} />}
        />
        <Route
          path="/new-animal"
          element={<NewAnimalForm setNavArrow={setNavArrow} />}
        />
      </Routes>
    </div>
  );
}

export default App;
