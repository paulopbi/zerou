import "./LoginPage.css";
import { Link, useNavigate } from "react-router";
import { FormEvent, useState } from "react";
import { PASSWORD_MIN_LENGTH, TIMEOUT_VALUE } from "@/contants";
import { FirebaseError } from "firebase/app";
import { firebaseErrorHandler } from "@/utils/firebaseErrorHandler";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { ToastType } from "@/types";
import Button from "@/components/Button";
import Toast from "@/components/Toast";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [systemMessage, setSystemMessage] = useState<ToastType>({
    message: "",
    variant: null,
  });

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSystemMessage({ message: "", variant: null });

    if (!email || !password) {
      setSystemMessage({
        message: "Todos os campos precisam ser preenchidos!",
        variant: "danger",
      });
      setIsLoading(false);
      return;
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      setSystemMessage({
        message: `A senha precisa ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres`,
        variant: "danger",
      });
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setSystemMessage({
        message: "Login feito com sucesso!",
        variant: "success",
      });

      setTimeout(() => {
        setSystemMessage({ message: "", variant: null });
        setIsLoading(false);
        navigate("/");
      }, TIMEOUT_VALUE);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const firebaseErrorResponse = firebaseErrorHandler(error);
        setSystemMessage({ message: firebaseErrorResponse, variant: "danger" });
        console.error(error);
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
    <section className="login container">
      <div className="login__heading">
        <h1 className="title--brand">zerou</h1>
        <p>Faça login para continuar!</p>
      </div>

      <form className="login__form" onSubmit={handleLogin}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="login__input"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Senha"
          className="login__input"
          required
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Entrar"}
        </Button>
      </form>

      <p>
        Não possui conta?{" "}
        <Link to="/criar-conta" className="login__create-account">
          Criar Conta
        </Link>
      </p>

      {systemMessage.message && systemMessage.variant && (
        <Toast variant={systemMessage.variant}>{systemMessage.message}</Toast>
      )}
    </section>
  );
};

export default LoginPage;
