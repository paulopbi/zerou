import { Link } from "react-router";
import Button from "@/components/Button";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login container">
      <h1 className="login__title">zerou</h1>
      <p className="login__subtitle">Faça login para continuar!</p>
      <form className="login__form">
        <input type="email" placeholder="Email" className="login__input" />
        <input type="password" placeholder="Senha" className="login__input" />
        <Button type="submit">Entrar</Button>
      </form>
      <p className="login__login-link">
        Não possui conta? <Link to="/criar-conta">Criar Conta</Link>
      </p>
    </div>
  );
};

export default LoginPage;
