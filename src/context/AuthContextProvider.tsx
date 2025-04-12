import { signOut } from "firebase/auth";
import { useRegister } from "../hooks/useRegister";
import { useAuthObeserver } from "../hooks/useAuthObserver";
import { auth } from "../firebase/firebaseConfig";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const logout = () => signOut(auth);
  const { register } = useRegister();
  const { user, loading } = useAuthObeserver();

  return (
    <AuthContext.Provider value={{ user, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
