import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails.jsx";
import Committees from "./pages/Committees";
import Board from "./pages/Board";
import ContactUs from "./pages/ContactUs";
import JoinUs from "./pages/JoinUs";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/committees" element={<Committees />} />
                <Route path="/board" element={<Board />} />
                <Route path="/eventdetails/:id" element={<EventDetails />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/joinus" element={<JoinUs />} />
              </Routes>
            </>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
