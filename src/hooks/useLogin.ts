import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const useLogin = () => {
  const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  return { login };
};
