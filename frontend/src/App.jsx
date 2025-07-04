import { Flex } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NewTaskPage from "./pages/NewTaskPage.jsx";

function App() {
  return (
    <Flex bg={"#F2F2F2"} minH={"100vh"} w={"full"} direction={"row"}>
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navbar />
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Navbar />
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-task"
          element={
            <ProtectedRoute>
              <Navbar />
              <NewTaskPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Flex>
  );
}

export default App;
