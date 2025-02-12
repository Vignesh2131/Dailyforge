import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import JournalPage from "./pages/JournalPage";
import Task from "./pages/Task";
import Layout from "./Layout";
import Journals from "./pages/Journals";
import { useRecoilState } from "recoil";
import { authState } from "./atoms/authcheck";
import { useCallback, useEffect } from "react";
import { axiosInstance } from "./lib/axios";

function App() {
  const [auth, setAuth] = useRecoilState(authState);
  const checkAuth = useCallback(async () => {
    const auth = await axiosInstance.get(`/auth/checkAuth`);
    setAuth(auth.data);
  }, [setAuth]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={auth ? <Layout /> : <Navigate to="/signin" />}
          >
            <Route index element={<Task />} />
            <Route path="/journals" element={<Journals />} />
            <Route path="/journalpage/:id" element={<JournalPage />} />
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

export default App;
