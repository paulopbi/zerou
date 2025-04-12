// hooks/useRegister.ts
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export type FormDataProps = {
  email: string;
  password: string;
  displayName: string;
};

export const useRegister = () => {
  const register = async (formData: FormDataProps) => {
    const { email, password, displayName } = formData;

    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(newUser.user, { displayName });

    return newUser;
  };

  return { register };
};
