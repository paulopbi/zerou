//default export
import InputWithLabel from "../../components/ui/InputWithLabel";
import styles from "./LoginPage.module.css";
import Button from "../../components/ui/Button";

//named export
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import {
  emailErrorMessage,
  maxPasswordErrorMessage,
  maxPasswordLetter,
  minPasswordErrorMessage,
  minPasswordLetter,
} from "../../constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { firebaseErrorHandler } from "../../firebase/firebaseErrorHandler";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import React from "react";
import ErrorMessage from "../../components/ErrorMessage";

const LoginPage = () => {
  /* navigate hook */
  const navigate = useNavigate();
  /* use state hook */
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);
  /* zod */
  const loginSchema = z.object({
    email: z.string().email(emailErrorMessage).nonempty(),
    password: z
      .string()
      .nonempty()
      .min(minPasswordLetter, minPasswordErrorMessage)
      .max(maxPasswordLetter, maxPasswordErrorMessage),
  });

  type LoginSchemaType = z.infer<typeof loginSchema>;

  /* react hook form */
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });

  /* login submit function */
  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const { email, password } = data;
      console.log(data);
      await signInWithEmailAndPassword(auth, email, password);
      reset();
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        const { errorMessage } = firebaseErrorHandler(error);
        setErrorMessage(errorMessage);
      }
      console.error(error);
    }
  };
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
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputGroup}>
            <InputWithLabel
              id="email"
              type="email"
              label="Digite seu email"
              title="Utilize este input para digitar seu e-mail"
              placeholder="exemplo@gmail.com"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
          <div className={styles.inputGroup}>
            <InputWithLabel
              id="password"
              type="password"
              label="Digite a sua senha"
              title="Utilize este input para digitar sua senha"
              placeholder="sua senha super secreta"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>
          {/* error message handler component */}
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {/* button */}
          <div className={styles.formFooter}>
            <Button
              title="Botão para fazer login"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Fazendo login..." : "Entrar"}
              <ArrowRight size={18} />
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
