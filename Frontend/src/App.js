import "./App.css";
import NavBar from "./components/NavBar";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import AddCourse from "./pages/AddCourse";
import Messages from "./pages/Messages";
import AddUser from "./pages/AddUser";
import Registrations from "./pages/Registration";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider, useAuth } from "./components/AuthContext";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// 🔒 Protected route for admin access only
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { user } = useAuth(); // ✅ detect logged-in admin

  return (
    <>
      <NavBar />
      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* 🔐 Admin Routes */}
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addcourse"
          element={
            <ProtectedRoute>
              <AddCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adduser"
          element={
            <ProtectedRoute>
              <AddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registrations"
          element={
            <ProtectedRoute>
              <Registrations />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* 🦶 Hide footer for admin */}
      {!user && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
