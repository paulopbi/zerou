import { BrowserRouter, Routes, Route } from "react-router";
import CreateAccountPage from "@/pages/CreateAccountPage";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import PrivateRoute from "./PrivateRoute";
import AddGamePage from "@/pages/AddGamePage";
import DetailedGame from "@/pages/DetailedGame";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/criar-conta" element={<CreateAccountPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/adicionar"
          element={
            <PrivateRoute>
              <AddGamePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/jogo/:id"
          element={
            <PrivateRoute>
              <DetailedGame />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h1>Não existe</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
