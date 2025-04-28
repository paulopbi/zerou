import { auth } from "@/config/firebase";
import { PASSWORD_MIN_LENGTH } from "@/constants";
import { ToastType } from "@/types";
import { firebaseErrorHandler } from "@/utils/firebaseErrorHandler";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

const useLoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [systemMessage, setSystemMessage] = useState<ToastType>({
    message: "",
    variant: null,
  });

  const validateForm = () => {
    if (!email || !password) {
      setSystemMessage({
        message: "Todos os campos precisam ser preenchidos!",
        variant: "danger",
      });
      return false;
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      setSystemMessage({
        message: `A senha precisa ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres`,
        variant: "danger",
      });
      return false;
    }

    return true;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSystemMessage({ message: "", variant: null });
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setEmail("");
      setPassword("");
      setIsLoading(false);

      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setSystemMessage({
          message: firebaseErrorHandler(error),
          variant: "danger",
        });
        setIsLoading(false);
        return;
      }
      setSystemMessage({
        message: "Não foi possível fazer login, tente novamente.",
        variant: "danger",
      });
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    email,
    password,
    systemMessage,
    setEmail,
    setPassword,
    setSystemMessage,
    handleLogin,
  };
};

export default useLoginForm;
