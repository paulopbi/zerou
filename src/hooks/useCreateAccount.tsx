import { auth } from "@/config/firebase";
import { PASSWORD_MIN_LENGTH } from "@/constants";
import { ToastType } from "@/types";
import { firebaseErrorHandler } from "@/utils/firebaseErrorHandler";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

const useCreateAccount = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [systemMessage, setSystemMessage] = useState<ToastType>({
    message: "",
    variant: null,
  });

  const validateForm = () => {
    if (!displayName || !email || !password || !confirmPassword) {
      setSystemMessage({
        message: "Todos os campos precisam ser preenchidos.",
        variant: "danger",
      });
      return false;
    }

    if (
      password.length < PASSWORD_MIN_LENGTH ||
      confirmPassword.length < PASSWORD_MIN_LENGTH
    ) {
      setSystemMessage({
        message: `A senha precisa ter no mínimo ${PASSWORD_MIN_LENGTH} caractéres.`,
        variant: "danger",
      });
      return false;
    }

    if (password !== confirmPassword) {
      setSystemMessage({
        message: "As senhas precisam ser iguais!",
        variant: "danger",
      });
      return false;
    }

    return true;
  };

  const handleCreateAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(newUser.user);
      await updateProfile(newUser.user, { displayName });

      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsLoading(false);

      navigate("/login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setSystemMessage({
          message: firebaseErrorHandler(error),
          variant: "danger",
        });
        return;
      }
      setSystemMessage({
        message: "Algo deu errado eo criar a conta, tente novamente.",
        variant: "danger",
      });
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    displayName,
    email,
    password,
    confirmPassword,
    systemMessage,
    isLoading,
    handleCreateAccount,
    setEmail,
    setPassword,
    setConfirmPassword,
    setDisplayName,
  };
};

export default useCreateAccount;
