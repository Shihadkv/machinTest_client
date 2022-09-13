import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notes from "./Home/Notes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Notes/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
