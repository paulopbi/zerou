import "./CreateAccountPage.css";
import { Link, useNavigate } from "react-router";
import { FormEvent, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { passwordMinLenght } from "@/contants";
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
  const [error, setError] = useState("");
  const [systemMessage, setSystemMessage] = useState<ToastType>({
    message: "",
    variant: null,
  });

  const navigate = useNavigate();
  const { loading } = useAuth();

  const handleCreateAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!displayName || !email || !password || !confirmPassword) {
      setError("Todos os campos precisam ser preenchidos.");
      return;
    }

    if (
      password.length < passwordMinLenght ||
      confirmPassword.length < passwordMinLenght
    ) {
      setError(`A senha precisa ter mais de ${passwordMinLenght} caracteres.`);
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais!");
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

      if (!newUser.user) {
        setError("Algo deu errado! Tente novamente.");
        return;
      }

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
      }, 2000);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const firebaseReturnErrorMessage = firebaseErrorHandler(error);
        setError(firebaseReturnErrorMessage);
        console.error(error);
        return;
      }
      console.error("Algo deu errado: " + error);
      setError("Algo deu errado tente novamente mais tarde!");
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

        {error && <p className="message-error text-left">{error}</p>}

        {loading ? (
          <Button type="submit" disabled={loading}>
            Criando usuário...
          </Button>
        ) : (
          <Button type="submit">Criar Conta</Button>
        )}
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
