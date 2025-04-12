//react
import React from "react";
//css
import styles from "./LoginPage.module.css";
//components
import InputWithLabel from "../../components/ui/InputWithLabel";
import Button from "../../components/ui/Button";
//lib's
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { FirebaseError } from "firebase/app";
import { firebaseErrorHandler } from "../../firebase/firebaseErrorHandler";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  //react router
  const navigate = useNavigate();

  //use state
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErros] = React.useState("");

  //context api hook
  const { login } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErros("");

    try {
      const formData = {
        email,
        password,
      };

      if (!formData.email || !formData.password) {
        throw new Error("Todos os campos devem ser preenchidos");
      }

      login(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErros(firebaseErrorHandler(error));
        console.error(error.code);
        return;
      }
      console.error(error);
      setErros("Algo deu errado, tente novamente mais tarde!");
    }
  };
  return (
    <section className={styles.login}>
      <div className="container">
        {/* heading */}
        <div className={styles.heading}>
          <h1 className="title--main text-center">Zerou</h1>
          <p className="description text-center">
            Organize sua jornada, anote tudo de importante nas suas aventuras.{" "}
          </p>
        </div>

        {/* inputs group */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* email */}
          <div className={styles.formGroup}>
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
          <div className={styles.formGroup}>
            <InputWithLabel
              id="password"
              type="password"
              label="Digite a sua senha"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* error handler */}
          {errors && <p className="error">{errors}</p>}

          {/* button */}
          <div className={styles.formFooter}>
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
