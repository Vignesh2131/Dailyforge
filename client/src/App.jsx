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
           
                <Layout/>
            }
          >
            <Route index element={
      
                <Task/>
       
            } />
            <Route path="/journals" element={
         
                <Journals/>
     
            } />
            <Route path="/journalpage/:id" element={
        
                <JournalPage/>
          
            } />
          </Route>
          <Route
            path="/signup"
            element={
           
                <Signup />
            
            }
          />
          <Route
            path="/signin"
            element={
          
                <Signin />
          
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App
