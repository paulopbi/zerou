import "./CreateAccountPage.css";
import { Link, useNavigate } from "react-router";
import { FormEvent, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { PASSWORD_MIN_LENGTH, TIMEOUT_VALUE } from "@/contants";
import { firebaseErrorHandler } from "@/utils/firebaseErrorHandler";
import { FirebaseError } from "firebase/app";
import { ToastType } from "@/types";
import Button from "@/components/Button";
import Toast from "@/components/Toast";

const CreateAccountPage = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [systemMessage, setSystemMessage] = useState<ToastType>({
    message: "",
    variant: null,
  });

  const navigate = useNavigate();

  const handleCreateAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSystemMessage({ message: "", variant: null });

    if (!displayName || !email || !password || !confirmPassword) {
      setSystemMessage({
        message: "Todos os campos precisam ser preenchidos.",
        variant: "danger",
      });
      return;
    }

    if (
      password.length < PASSWORD_MIN_LENGTH ||
      confirmPassword.length < PASSWORD_MIN_LENGTH
    ) {
      setSystemMessage({
        message: `A senha precisa ter mais de ${PASSWORD_MIN_LENGTH} caracteres.`,
        variant: "danger",
      });
      return;
    }

    if (password !== confirmPassword) {
      setSystemMessage({
        message: "As senhas precisam ser iguais!",
        variant: "danger",
      });
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

      setSystemMessage({
        message: "Usuário criado com sucesso!",
        variant: "success",
      });

      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setSystemMessage({ message: "", variant: null });
        setIsLoading(false);
        navigate("/login");
      }, TIMEOUT_VALUE);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const firebaseReturnErrorMessage = firebaseErrorHandler(error);
        setSystemMessage({
          message: firebaseReturnErrorMessage,
          variant: "danger",
        });
        console.error("Algo deu errado: " + error);
        setIsLoading(false);
        return;
      }
      console.error("Algo deu errado: " + error);
      setSystemMessage({
        message: "Algo deu errado tente novamente mais tarde!",
        variant: "danger",
      });
      setIsLoading(false);
    }
  };

  return (
    <section className="create-account container">
      <div className="create-account__heading">
        <h1 className="title--brand">Zerou</h1>
        <p>Crie uma conta para acompanhar seus jogos zerados!</p>
      </div>

      <form className="create-account__form" onSubmit={handleCreateAccount}>
        <input
          name="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          type="text"
          placeholder="Nome de usuário"
          className="create-account__input"
        />
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="create-account__input"
        />
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Senha"
          className="create-account__input"
        />
        <input
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Repetir senha"
          className="create-account__input"
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Criando Conta..." : "Criar Conta"}
        </Button>
      </form>

      <p>
        Já tem uma conta?{" "}
        <Link to="/login" className="create-account__login-link">
          Fazer login
        </Link>
      </p>

      {systemMessage.message && systemMessage.variant && (
        <Toast variant={systemMessage.variant}>{systemMessage.message}</Toast>
      )}
    </section>
  );
};

export default CreateAccountPage;
