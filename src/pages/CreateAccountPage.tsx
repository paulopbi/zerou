import "./CreateAccountPage.css";
import { Link } from "react-router";
import { useRef } from "react";
import Button from "@/components/Button";
import Toast from "@/components/Toast";
import useCreateAccount from "@/hooks/useCreateAccount";
import useFocus from "@/hooks/useFocus";

const CreateAccountPage = () => {
  const userInputRef = useRef<null | HTMLInputElement>(null);
  useFocus(userInputRef);

  const {
    handleCreateAccount,
    setDisplayName,
    setPassword,
    setConfirmPassword,
    setEmail,
    email,
    password,
    confirmPassword,
    displayName,
    isLoading,
    systemMessage,
  } = useCreateAccount();

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
