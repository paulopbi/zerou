import { Link } from "react-router";
import Button from "@/components/Button";
import "./CreateAccountPage.css";

const CreateAccountPage = () => {
  return (
    <div className="create-account container">
      <h1 className="create-account__title">zerou</h1>
      <p className="create-account__subtitle">
        Crie uma conta para acompanhar seus jogos zerados!
      </p>
      <form className="create-account__form">
        <input
          type="text"
          placeholder="Nome de usuário"
          className="create-account__input"
        />
        <input
          type="email"
          placeholder="Email"
          className="create-account__input"
        />
        <input
          type="password"
          placeholder="Senha"
          className="create-account__input"
        />
        <input
          type="password"
          placeholder="Repetir senha"
          className="create-account__input"
        />
        <Button type="submit">Criar Conta</Button>
      </form>
      <p className="create-account__login-link">
        Já tem uma conta? <Link to="/login">Fazer login</Link>
      </p>
    </div>
  );
};

export default CreateAccountPage;
