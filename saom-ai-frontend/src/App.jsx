import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/signup";
import Forgotp from "./pages/Forgotp";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/signin" element={<Signin />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/forgot" element={<Forgotp />} />
  <Route
  path="/reset-password"
  element={<ResetPassword />}
/>
</Routes>

    </BrowserRouter>
  );
}

export default App;