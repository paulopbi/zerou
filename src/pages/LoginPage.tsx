import "./LoginPage.css";
import { Link, useNavigate } from "react-router";
import { FormEvent, useEffect, useRef, useState } from "react";
import { PASSWORD_MIN_LENGTH, TIMEOUT_TO_REMOVE_TOAST } from "@/contants";
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

  const loginInputRef = useRef<null | HTMLInputElement>(null);
  useEffect(() => {
    if (loginInputRef.current) {
      loginInputRef.current.focus();
    }
  }, []);

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
      }, TIMEOUT_TO_REMOVE_TOAST);
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
      <h1 className="title--brand">Zerou</h1>

      <main className="login__main">
        <div className="login__heading">
          <h4 className="title">Fazer Login</h4>
          <p className="text-center">
            Digite seu email e senha para acessar sua conta.
          </p>
        </div>

        <form className="login__form" onSubmit={handleLogin}>
          <div className="login__form-group">
            <label htmlFor="email" className="login__label">
              Digite seu email
            </label>
            <input
              ref={loginInputRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="Digite seu melhor email"
              className="login__input"
              required
            />
          </div>

          <div className="login__form-group">
            <label htmlFor="password" className="login__label">
              Digite a sua senha
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Digite sua senha secreta"
              className="login__input"
              required
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Carregando..." : "Entrar"}
          </Button>
        </form>
      </main>

      <p>
        Ainda não possui conta?{" "}
        <Link to="/criar-conta" className="login__create-link">
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
