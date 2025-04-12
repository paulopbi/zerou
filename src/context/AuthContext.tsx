import React from "react";
import { User } from "firebase/auth";
import { FormDataProps } from "../hooks/useRegister";

export type AuthContextProps = {
  loading: boolean;
  user: User | null;
  logout: () => void;
  register: (formData: FormDataProps) => void;
};

export const AuthContext = React.createContext<AuthContextProps | null>(null);
