import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import { AuthRoute, ProtectedRoute } from "./protectedRoutes";
import JournalPage from "./pages/JournalPage";
import Task from "./pages/Task";
import Layout from "./Layout";
import Journals from "./pages/Journals";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout/>
              </ProtectedRoute>
            }
          >
            <Route index element={
              <ProtectedRoute>
                <Task/>
              </ProtectedRoute>
            } />
            <Route path="/journals" element={
              <ProtectedRoute>
                <Journals/>
              </ProtectedRoute>
            } />
            <Route path="/journalpage/:id" element={
              <ProtectedRoute>
                <JournalPage/>
              </ProtectedRoute>
            } />
          </Route>
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <Signin />
              </AuthRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App
