import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Forget from "./pages/Forget";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Sign In */}
        <Route
          path="/signin"
          element={<Signin />}
        />

        {/* Sign Up + OTP */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Forgot Password + OTP + Reset Password */}
        <Route
          path="/forgot-password"
          element={<Forget />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Home />}
        />

        {/* Keep /home working as well */}
        <Route
          path="/home"
          element={<Home />}
        />

        {/* Default route */}
        <Route
          path="/"
          element={
            <Navigate
              to="/signin"
              replace
            />
          }
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={
            <Navigate
              to="/signin"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;