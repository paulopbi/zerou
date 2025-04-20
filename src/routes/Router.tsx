import { BrowserRouter, Routes, Route } from "react-router";
import CreateAccountPage from "@/pages/CreateAccountPage";
import LoginPage from "@/pages/LoginPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/criar-conta" element={<CreateAccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}
