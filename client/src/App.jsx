import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import { AuthRoute,ProtectedRoute } from "./protectedRoutes";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
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
