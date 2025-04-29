import "./LoginPage.css";
import { Link } from "react-router";
import { useRef } from "react";
import Button from "@/components/Button";
import Toast from "@/components/Toast";
import useLoginForm from "@/hooks/useLoginForm";
import useFocus from "@/hooks/useFocus";

const LoginPage = () => {
  const loginInputRef = useRef<null | HTMLInputElement>(null);
  useFocus(loginInputRef);

  const {
    handleLogin,
    setEmail,
    email,
    setPassword,
    password,
    systemMessage,
    isLoading,
  } = useLoginForm();

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
              autoComplete="email"
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
              autoComplete="current-password"
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
