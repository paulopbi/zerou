import { Link, useNavigate } from "react-router";
import Button from "@/components/Button";
import "./CreateAccountPage.css";
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

const CreateAccountPage = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

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

      window.alert("Usuário criado com sucesso, faça login para continuar!");
      navigate("/login");
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
    <div className="create-account container">
      <h1 className="create-account__title">zerou</h1>
      <p className="create-account__subtitle">
        Crie uma conta para acompanhar seus jogos zerados!
      </p>
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
        {error && <p className="error-message text-left">{error}</p>}
        {loading ? (
          <Button type="submit" disabled={loading}>
            Criando usuário...
          </Button>
        ) : (
          <Button type="submit">Criar Conta</Button>
        )}
      </form>
      <p className="create-account__login-link">
        Já tem uma conta? <Link to="/login">Fazer login</Link>
      </p>
    </div>
  );
};

export default CreateAccountPage;
