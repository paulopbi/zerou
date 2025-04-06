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
          <p className="description text-center">
            Organize sua jornada gamer, anote tudo de importante nas suas
            aventuras.
          </p>
        </div>

        {/* inputs group */}
        <form className={styles.form}>
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
              placeholder="sua senha super secreta"
            />
          </div>

          <div className={styles.formFooter}>
            <Button title="Botão para fazer login">
              Entrar <ArrowRight size={18} />
            </Button>
            <span className="">
              Ainda não possui uma conta? <Link to="/criar">Criar Conta</Link>.
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
