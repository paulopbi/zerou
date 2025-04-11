//react
import React from "react";
//css
import styles from "./CreateAccount.module.css";
//components
import InputWithLabel from "../components/ui/InputWithLabel";
import Button from "../components/ui/Button";
//lib's
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const CreateAccount = () => {
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errors, setErros] = React.useState<null | Error>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordSize = 6;

    setErros(null);
    try {
      const formData = {
        displayName,
        email,
        password,
        confirmPassword,
      };

      if (password !== confirmPassword) {
        throw new Error("As senhas devem ser iguais");
      }

      if (password.length < passwordSize) {
        throw new Error(`A senha deve conter ${passwordSize} caracteres`);
      }

      //create a new user
      const newUser = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      //update the user info for new data
      const response = await updateProfile(newUser.user, {
        displayName: formData.displayName,
      });
      console.log(response);
    } catch (error) {
      if (error instanceof Error) {
        setErros(error);
      }
      console.error(error);
    }
  };
  return (
    <section className={styles.createAccount}>
      <div className="container">
        {/* heading */}
        <div>
          <h1 className="title--main text-center">Zerou</h1>
          <p className="description text-center">Crie uma conta para começar</p>
        </div>

        {/* inputs group */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* user name */}
          <div className={styles.formGroup}>
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
          {/* confirm password */}
          <div className={styles.formGroup}>
            <InputWithLabel
              id="confirmPassword"
              type="password"
              label="Confirme sua senha"
              placeholder="Digite novamente sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* error handler */}
          {errors && <p className="error">{errors.message}</p>}

          {/* button */}
          <div className={styles.formFooter}>
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

export default CreateAccount;
