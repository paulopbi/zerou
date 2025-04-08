import { FirebaseError } from "firebase/app";

export const firebaseErrorHandler = (error: FirebaseError) => {
  let errorMessage = "Ocorreu um erro ao criar a conta.";

  switch (error.code) {
    case "auth/email-already-in-use":
      errorMessage = "Este e-mail já está cadastrado.";
      break;

    case "auth/invalid-email":
      errorMessage = "E-mail inválido.";
      break;

    case "auth/weak-password":
      errorMessage = "A senha deve ter pelo menos 6 caracteres.";
      break;

    case "auth/operation-not-allowed":
      errorMessage = "Operação não permitida.";
      break;

    case "auth/invalid-credential":
      errorMessage = "Usuário ou senha inválido!";
      break;

    case "auth/wrong-password":
      errorMessage = "Senha incorreta";
      break;

    case "auth/user-not-found":
      errorMessage = "Usuário não encontrado";
      break;

    default:
      errorMessage = `Erro do Banco de Dados: ${error.message}`;
      break;
  }

  return { errorMessage };
};
