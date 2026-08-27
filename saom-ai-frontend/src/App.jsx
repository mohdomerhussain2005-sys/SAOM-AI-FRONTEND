import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Forget from "./pages/Forget";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05080D",
        color: "#FEFED0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        fontSize: "32px",
        fontWeight: "600",
      }}
    >
      SAOM-AI Dashboard
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Sign In */}
        <Route
          path="/signin"
          element={<Signin />}
        />

        {/* Sign Up + Email OTP */}
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