//react router
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContextProvider";
//pages
import HomePage from "./pages/Home/HomePage";
import CreateAccountPage from "./pages/Auth/CreateAccountPage";
import LoginPage from "./pages/Auth/LoginPage";
import PrivateRoute from "./pages/components/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/criar-conta" element={<CreateAccountPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
