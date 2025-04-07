import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import InputWithLabel from "../../components/ui/InputWithLabel";
import styles from "./LoginPage.module.css";
import Button from "../../components/ui/Button";

const LoginPage = () => {
  return (
    <section className={styles.login}>
      <div className={styles.loginContent}>
        {/* heading */}
        <div className="loginHeading">
          <h1 className="title--main text-center">Zerou</h1>
          <p className="description text-center">Crie uma conta para começar</p>
        </div>

        {/* inputs group */}
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <InputWithLabel
              id="email"
              type="text"
              label="Digite seu nome"
              title="Utilize este input para digitar seu nome de usuário"
              placeholder="exemplo@gmail.com"
            />
          </div>
          <div className={styles.inputGroup}>
            <InputWithLabel
              id="email"
              type="email"
              label="Digite seu email"
              title="Utilize este input para digitar seu e-mail"
              placeholder="exemplo@gmail.com"
            />
          </div>
          <div className={styles.inputGroup}>
            <InputWithLabel
              id="password"
              type="password"
              label="Digite a sua senha"
              title="Utilize este input para digitar sua senha"
              placeholder="Digite sua senha"
            />
          </div>
          <div className={styles.inputGroup}>
            <InputWithLabel
              id="password"
              type="password"
              label="Digite a sua senha novamente"
              title="Utilize este input para digitar novamente sua senha"
              placeholder="digite novamente sua senha"
            />
          </div>
          <div className={styles.formFooter}>
            <Button title="Botão para fazer login">
              Criar Conta <ArrowRight size={18} />
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

export default LoginPage;
