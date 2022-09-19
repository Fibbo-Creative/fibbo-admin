import "./App.css";
import { AdminNavbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Community } from "./pages/Community";
import { Artists } from "./pages/Artists";
import { GasStation } from "./pages/GasStation";
import { useStateContext } from "./context/StateProvider";
import { Login } from "./pages/Login";
import { useEffect, useState } from "react";
import { useApi } from "./api";
import { actionTypes } from "./context/stateReducer";
import { Market } from "./pages/Market";

function App() {
  const [loading, setLoading] = useState(false);
  const { loginUserByToken } = useApi();

  const [{ auth }, dispatch] = useStateContext();

  useEffect(() => {
    const fetchData = async () => {
      const token = window.localStorage.getItem("authToken");
      if (token) {
        const dbUser = await loginUserByToken(token);
        if (dbUser) {
          dispatch({
            type: actionTypes.LOGIN_USER,
          });
        }
      }
      setLoading(false);
    };

    fetchData();
  });
  return (
    <div className="App w-screen">
      {!loading && (
        <BrowserRouter>
          {auth ? (
            <>
              <AdminNavbar />
              <Routes>
                <Route path="/community" element={<Community />} />
                <Route path="/artists" element={<Artists />} />
                <Route path="/gasStation" element={<GasStation />} />
                <Route path="/market" element={<Market />} />

                <Route path="" element={<Home />} />
              </Routes>
            </>
          ) : (
            <Login />
          )}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
