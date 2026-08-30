import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Forget from "./pages/Forget";
import Home from "./pages/Home";
import Home1 from "./pages/Home1";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<Home1 />} />

        {/* Sign In */}
        <Route path="/signin" element={<Signin />} />

        {/* Sign Up + OTP */}
        <Route path="/signup" element={<Signup />} />

        {/* Forgot Password + OTP + Reset Password */}
        <Route path="/forgot-password" element={<Forget />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Home />} />

        {/* Keep /home working */}
        <Route path="/home" element={<Home />} />

        {/* Unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;