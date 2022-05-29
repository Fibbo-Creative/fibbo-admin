import "./App.css";
import { AdminNavbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Community } from "./pages/Community";
import { Artists } from "./pages/Artists";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AdminNavbar />
        <Routes>
          <Route path="/community" element={<Community />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
