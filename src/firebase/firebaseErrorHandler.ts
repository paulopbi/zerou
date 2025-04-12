import { FirebaseError } from "firebase/app";

export const firebaseErrorHandler = (error: FirebaseError) => {
  let systemErrorMessage = "";

  switch (error.code) {
    case "auth/wrong-password":
      systemErrorMessage = "Senha incorreta";
      break;
    case "auth/invalid-credential":
      systemErrorMessage = "Os dados inseridos estão incorretos";
      break;
    case "auth/user-not-found":
      systemErrorMessage = "A conta não foi encontrada, tente novamente";
      break;
    case "auth/email-already-in-use":
      systemErrorMessage = "O email ja foi cadastrado, tente novamente";
      break;
    default:
      systemErrorMessage = "Ocorreu um erro, tente novamente";
  }

  return systemErrorMessage;
};
