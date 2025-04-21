import { FirebaseError } from "firebase/app";

export const firebaseErrorHandler = (error: FirebaseError) => {
  let systemErrorMessage = "";

  switch (error.code) {
    case "auth/wrong-password":
      systemErrorMessage = "Senha incorreta. Verifique e tente novamente.";
      break;
    case "auth/user-not-found":
      systemErrorMessage =
        "Conta não encontrada. Verifique o e-mail ou crie uma nova conta.";
      break;
    case "auth/invalid-credential":
      systemErrorMessage =
        "E-mail ou senha inválidos. Confira os dados e tente novamente.";
      break;
    case "auth/email-already-in-use":
      systemErrorMessage =
        "Este e-mail já está cadastrado. Faça login ou recupere a senha.";
      break;
    case "auth/invalid-email":
      systemErrorMessage =
        "E-mail inválido. Verifique o formato e tente novamente.";
      break;
    case "auth/weak-password":
      systemErrorMessage = "A senha deve ter pelo menos 6 caracteres.";
      break;
    case "auth/too-many-requests":
      systemErrorMessage =
        "Muitas tentativas. Por segurança, tente novamente mais tarde.";
      break;
    case "auth/network-request-failed":
      systemErrorMessage =
        "Problemas de conexão. Verifique sua internet e tente de novo.";
      break;
    case "auth/popup-closed-by-user":
      systemErrorMessage =
        "Login cancelado. Você fechou a janela antes de concluir.";
      break;
    case "auth/user-disabled":
      systemErrorMessage =
        "Essa conta foi desativada. Entre em contato com o suporte.";
      break;
    default:
      systemErrorMessage =
        "Ocorreu um erro inesperado. Tente novamente mais tarde.";
  }

  return systemErrorMessage;
};
