import React, { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { useCookies } from "react-cookie";
import Chat from "./pages/Chat";
import Users from "./pages/Users";
import jwt_decode from "jwt-decode";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  let token = cookies.jwt ? cookies.jwt : "";

  const checkUser = async () => {
    if (token) {
      try {
        var decoded_token = jwt_decode(token);
      } catch {
        removeCookie("jwt");
        return;
      }
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user/${decoded_token.id}`
    );
    if (response.status !== 200) {
      removeCookie("jwt");
    }
  };
  useEffect(() => {
    checkUser();
  }, [token]);
  return (
    <div>
      <Navbar token={token} />
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoute token={token}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute token={token}>
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute token={token}>
              <Users token={token} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute token={token}>
              <Chat token={token} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
