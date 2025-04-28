import "./CreateAccountPage.css";
import { Link, useNavigate } from "react-router";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { PASSWORD_MIN_LENGTH, TIMEOUT_TO_REMOVE_TOAST } from "@/contants";
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

  const userInputRef = useRef<null | HTMLInputElement>(null);
  useEffect(() => {
    if (userInputRef.current) {
      userInputRef.current.focus();
    }
    return () => {};
  }, []);

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
      setIsLoading(false);
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
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setSystemMessage({
        message: "As senhas precisam ser iguais!",
        variant: "danger",
      });
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
        navigate("/login");
        setIsLoading(false);
      }, TIMEOUT_TO_REMOVE_TOAST);
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
      <h1 className="title--brand">Zerou</h1>

      <main className="create-account__main">
        <div className="create-account__heading">
          <h4 className="title">Criar Conta</h4>
          <p className="text-center">
            Crie uma conta para acompanhar seus jogos!
          </p>
        </div>

        <form className="create-account__form" onSubmit={handleCreateAccount}>
          <div className="create-account__form-group">
            <label htmlFor="user" className="create-account__label">
              Digite um nome de usuário
            </label>
            <input
              ref={userInputRef}
              id="user"
              name="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              type="text"
              placeholder="Digite sua identidade secreta"
              className="create-account__input"
            />
          </div>

          <div className="create-account__form-group">
            <label htmlFor="email" className="create-account__label">
              Digite um email
            </label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Digite o seu melhor email"
              className="create-account__input"
            />
          </div>

          <div className="create-account__form-group">
            <label htmlFor="password" className="create-account__label">
              Digite a uma senha
            </label>
            <input
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Digite o seu código secreto"
              className="create-account__input"
            />
          </div>

          <div className="create-account__form-group">
            <label htmlFor="confirm-password" className="create-account__label">
              Confirme a senha
            </label>
            <input
              id="confirm-password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Repita o seu código secreto"
              className="create-account__input"
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Criando Conta..." : "Criar Conta"}
          </Button>
        </form>
      </main>

      <p>
        Já possui uma conta?{" "}
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
