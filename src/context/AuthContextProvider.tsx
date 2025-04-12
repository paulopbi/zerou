import { signOut } from "firebase/auth";
import { useRegister } from "../hooks/useRegister";
import { useAuthObserver } from "../hooks/useAuthObserver";
import { auth } from "../firebase/firebaseConfig";
import { AuthContext } from "./AuthContext";
import { useLogin } from "../hooks/useLogin";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const logout = () => signOut(auth);
  const { login } = useLogin();
  const { register } = useRegister();
  const { user, loading } = useAuthObserver();
  return (
    <AuthContext.Provider value={{ user, register, logout, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
