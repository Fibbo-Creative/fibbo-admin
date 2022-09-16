import "./App.css";
import { AdminNavbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Community } from "./pages/Community";
import { Artists } from "./pages/Artists";
import { GasStation } from "./pages/GasStation";

function App() {
  return (
    <div className="App w-screen">
      <BrowserRouter>
        <AdminNavbar />
        <Routes>
          <Route path="/community" element={<Community />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/gasStation" element={<GasStation />} />

          <Route path="" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
