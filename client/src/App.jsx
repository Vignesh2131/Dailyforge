import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import { Navigate } from "react-router-dom";
import JournalPage from "./pages/JournalPage";
import Task from "./pages/Task";
import Layout from "./Layout";
import Journals from "./pages/Journals";

import { useRecoilState } from "recoil";
import { authState } from "./atoms/authcheck";
import { useCallback, useEffect } from "react";
import axios from "axios";
function App() {
  const [auth, setAuth] = useRecoilState(authState);
  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/check`,
        { withCredentials: true }
      );
      setAuth(res.data)
    } catch (error) {
      console.log(error);
    }
  },[setAuth])
  useEffect(() => {
    checkAuth()
  },[checkAuth])
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={auth ? <Layout /> : <Navigate to="/signin" />}
          >
            <Route
              index
              element={auth ? <Task /> : <Navigate to="/signin" />}
            />
            <Route
              path="/journals"
              element={auth ? <Journals /> : <Navigate to="/signin" />}
            />
            <Route
              path="/journalpage/:id"
              element={auth ? <JournalPage /> : <Navigate to="/signin" />}
            />
          </Route>

          <Route
            path="/signup"
            element={!auth ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/signin"
            element={!auth ? <Signin /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App
