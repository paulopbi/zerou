//react
import React from "react";
//css
import "./LoginPage.css";
//components
import InputWithLabel from "../../components/ui/InputWithLabel";
import Button from "../../components/ui/Button";
//lib's
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../../hooks/useAuth";
import Alert from "../../components/ui/error/Alert";
import { firebaseErrorHandler } from "../../firebase/firebaseErrorHandler";
import { passwordTextSize } from "../../constants";

const LoginPage = () => {
  //react router
  const navigate = useNavigate();

  //use state
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  //context api hook
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        const errorHandler = firebaseErrorHandler(err);
        setError(errorHandler);
        console.error(errorHandler);
        return;
      }

      setError("Algo deu errado, tente novamente.");
      console.error(error);
    }
  };
  return (
    <section className="login">
      <div className="container">
        {/* heading */}
        <div className="login-heading">
          <h1 className="text-center">Zerou</h1>
          <p className="description text-center">
            Organize sua jornada, anote tudo de importante nas suas aventuras.{" "}
          </p>
        </div>

        {/* inputs group */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* email */}
          <div className="login-form-group">
            <InputWithLabel
              id="email"
              type="email"
              label="Digite seu email"
              placeholder="exemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* password */}
          <div className="login-form-group">
            <InputWithLabel
              id="password"
              type="password"
              label="Digite a sua senha"
              placeholder="Sua senha secreta"
              minLength={passwordTextSize}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* error handler */}
          {error && <Alert message={error} onlyText />}

          {/* button */}
          <div className="login-submit-area">
            <Button title="Botão para criar conta" type="submit">
              Entrar <ArrowRight size={18} />
            </Button>
            <span>
              Ainda não possui uma conta?{" "}
              <Link to="/criar-conta">Criar Conta</Link>.
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
