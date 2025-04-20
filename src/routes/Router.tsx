import { BrowserRouter, Routes, Route } from "react-router";
import CreateAccountPage from "@/routes/Router";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-account" element={<CreateAccountPage />} />
        {/* outras rotas futuras aqui */}
      </Routes>
    </BrowserRouter>
  );
}
