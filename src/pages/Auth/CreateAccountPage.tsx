import React from "react";
import "./CreateAccountPage.css";
import InputWithLabel from "../../components/ui/InputWithLabel";
import Button from "../../components/ui/Button";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { FirebaseError } from "firebase/app";
import { firebaseErrorHandler } from "../../firebase/firebaseErrorHandler";
import { passwordTextSize } from "../../constants";
import Alert from "../../components/ui/error/Alert";

const CreateAccountPage = () => {
  //react router
  const navigate = useNavigate();

  //use state
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  //context api hook
  const { register } = useAuth();

  //form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const formData = {
        displayName,
        email,
        password,
        confirmPassword,
      };

      await register(formData);
      navigate("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        const firebaseErrorMessage = firebaseErrorHandler(err);
        setError(firebaseErrorMessage);
        console.error(firebaseErrorMessage);
        return;
      }

      setError("Algo deu errado, tente novamente mais tarde!");
      console.error(err);
    }
  };

  return (
    <section className="create-account container">
      <div className="container">
        {/* heading */}
        <div className="create-account-heading">
          <h1 className="text-center">Zerou</h1>
          <p className="description text-center">Crie uma conta para começar</p>
        </div>

        {/* inputs group */}
        <form className="create-account__form" onSubmit={handleSubmit}>
          {/* user name */}
          <div className="create-account-form-group">
            <InputWithLabel
              id="username"
              type="text"
              label="Digite seu nome"
              placeholder="Seu nome de usuário"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>

          {/* email */}
          <div className="create-account-form-group">
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
          <div className="create-account-form-group">
            <InputWithLabel
              id="password"
              type="password"
              label="Digite a sua senha"
              placeholder="Digite sua senha"
              minLength={passwordTextSize}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* confirm password */}
          <div className="create-account-form-group">
            <InputWithLabel
              id="confirmPassword"
              type="password"
              label="Confirme sua senha"
              placeholder="Digite novamente sua senha"
              minLength={passwordTextSize}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* error handler */}
          {error && <Alert message={error} onlyText />}

          {/* button */}
          <div className="create-account-submit-area">
            <Button title="Botão para criar conta" type="submit">
              Entrar <ArrowRight size={18} />
            </Button>
            <span>
              Já possui uma conta? <Link to="/login">Fazer login</Link>.
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateAccountPage;
