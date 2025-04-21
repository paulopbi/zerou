import "./LoginPage.css";
import Button from "@/components/Button";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { FormEvent, useState } from "react";
import { passwordMinLenght } from "@/contants";
import { FirebaseError } from "firebase/app";
import { firebaseErrorHandler } from "@/utils/firebaseErrorHandler";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { loading } = useAuth();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Todos os campos precisam ser preenchidos!");
    }

    if (password.length < passwordMinLenght) {
      setError(`A senha precisa ter no mínimo ${passwordMinLenght} caracteres`);
    }

    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);

      if (!resp.user) {
        setError("Algo deu errado! Tente novamente.");
        return;
      }

      window.alert("Login feito com sucesso!");
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        const firebaseErrorResponse = firebaseErrorHandler(error);
        setError(firebaseErrorResponse);
        console.error(error);
        return;
      }

      console.error("Algo deu errado: " + error);
      setError("Algo deu errado tente novamente mais tarde!");
    }
  };
  return (
    <div className="login container">
      <h1 className="login__title">zerou</h1>
      <p className="login__subtitle">Faça login para continuar!</p>
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
        {error && <p className="error-message text-left">{error}</p>}
        {loading ? (
          <Button type="submit" disabled>
            Carregando...
          </Button>
        ) : (
          <Button type="submit">Entrar</Button>
        )}
      </form>
      <p className="login__login-link">
        Não possui conta? <Link to="/criar-conta">Criar Conta</Link>
      </p>
    </div>
  );
};

export default LoginPage;
