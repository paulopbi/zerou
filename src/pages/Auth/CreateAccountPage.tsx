//default export
import React from "react";
import InputWithLabel from "../../components/ui/InputWithLabel";
import styles from "./LoginPage.module.css";
import Button from "../../components/ui/Button";

//named export
import {
  emailErrorMessage,
  maxPasswordErrorMessage,
  maxPasswordLetter,
  minPasswordErrorMessage,
  minPasswordLetter,
  minUserNameLetter,
  userNameErrorMessage,
} from "../../constants";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { firebaseErrorHandler } from "../../firebase/firebaseErrorHandler";
import { FirebaseError } from "firebase/app";
import ErrorMessage from "../../components/ErrorMessage";

const CreateAccountPage = () => {
  /* use state hook */
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);
  /* zod */
  const formSchema = z
    .object({
      userName: z.string().min(minUserNameLetter, userNameErrorMessage),
      email: z.string().email(emailErrorMessage),
      password: z
        .string()
        .min(minPasswordLetter, minPasswordErrorMessage)
        .max(maxPasswordLetter, maxPasswordErrorMessage),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    });

  type CreateUserFormDataType = z.infer<typeof formSchema>;

  /* navigate hook */
  const navigate = useNavigate();

  /* react hook form */
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormDataType>({
    resolver: zodResolver(formSchema),
  });

  /* create account submit function */
  const onSubmit = async (data: CreateUserFormDataType) => {
    try {
      const { email, password } = data;
      await createUserWithEmailAndPassword(auth, email, password);
      reset();
      navigate("/login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        const { errorMessage } = firebaseErrorHandler(error);
        setErrorMessage(errorMessage);
      }
    }
  };

  return (
    <section className={styles.login}>
      <div className={styles.loginContent}>
        {/* heading */}
        <div className="loginHeading">
          <h1 className="title--main text-center">Zerou</h1>
          <p className="description text-center">Crie uma conta para começar</p>
        </div>

        {/* inputs group */}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {/* user name */}
          <div className={styles.inputGroup}>
            <InputWithLabel
              id="username"
              type="text"
              label="Digite seu nome"
              placeholder="Seu nome de usuário"
              error={errors.userName?.message}
              {...register("userName")}
            />
          </div>
          {/* email */}
          <div className={styles.inputGroup}>
            <InputWithLabel
              id="email"
              type="email"
              label="Digite seu email"
              placeholder="exemplo@gmail.com"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
          {/* password */}
          <div className={styles.inputGroup}>
            <InputWithLabel
              id="password"
              type="password"
              label="Digite a sua senha"
              placeholder="Digite sua senha"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>
          {/* confirm password */}
          <div className={styles.inputGroup}>
            <InputWithLabel
              id="confirmPassword"
              type="password"
              label="Confirme sua senha"
              placeholder="Digite novamente sua senha"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </div>
          {/* error message handler component */}
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {/* button */}
          <div className={styles.formFooter}>
            <Button
              title="Botão para criar conta"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Criando conta..." : "Criar Conta"}{" "}
              <ArrowRight size={18} />
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
