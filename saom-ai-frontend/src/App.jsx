import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
// import Home from "./pages/Home";
// import Home1 from "./pages/Home1";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Forget from "./pages/Forget";

// Global styles
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            HOME
            Temporarily disabled
        ========================= */}

        {/* <Route path="/" element={<Home />} /> */}

        {/* <Route path="/home" element={<Home />} /> */}

        {/* <Route path="/home1" element={<Home1 />} /> */}


        {/* =========================
            AUTHENTICATION
        ========================= */}

        <Route
          path="/signin"
          element={<Signin />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<Forget />}
        />


        {/* =========================
            FALLBACK
        ========================= */}

        <Route
          path="*"
          element={<Navigate to="/signin" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;