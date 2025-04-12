import React from "react";
import { User, UserCredential } from "firebase/auth";
import { FormDataProps } from "../hooks/useRegister";

export type AuthContextProps = {
  loading: boolean;
  user: User | null;
  logout: () => void;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (formData: FormDataProps) => Promise<UserCredential>;
};

export const AuthContext = React.createContext<AuthContextProps | null>(null);
