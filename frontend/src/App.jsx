import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import SendMoney from "./Pages/SendMoney";
import Home from "./Pages/Home";

// Wrapped your application with BrowserRouter to enable routing
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Define routes for your pages */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/send" element={<SendMoney />} />

          {/* Catch-all route for unmatched paths, redirecting to home */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
