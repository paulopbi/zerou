import "./AddGamePage.css";
import { Link, useNavigate } from "react-router";
import { FormEvent, useState } from "react";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { ToastType } from "@/types";
import { TIMEOUT_VALUE } from "@/contants";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import RichTextEditor from "@/components/RichTextEditor";
import Toast from "@/components/Toast";

const AddGamePage = () => {
  const [title, setTitle] = useState("");
  const [imageSource, setImageSource] = useState("");
  const [platform, setPlatform] = useState("");
  const [status, setStatus] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [systemMessage, setSystemMessage] = useState<ToastType>({
    message: "",
    variant: null,
  });

  const { user } = useAuth();
  const Navigate = useNavigate();

  const createGame = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSystemMessage({ message: "", variant: null });

    if (!title) {
      setSystemMessage({
        message: "O titulo é obrigatório",
        variant: "danger",
      });
      return;
    }

    if (platform.length === 0) {
      setSystemMessage({
        message: "Selecione a plataforma.",
        variant: "danger",
      });
      return;
    }

    if (status.length === 0) {
      setSystemMessage({
        message: "Selecione o status.",
        variant: "danger",
      });
      return;
    }

    if (!user) {
      setSystemMessage({
        message: "Algo deu errado com seu login, tente novamente.",
        variant: "danger",
      });
      return;
    }

    try {
      const gameCollectionRef = collection(db, "games");
      const newDocRef = doc(gameCollectionRef);

      const databaseSchema = {
        id: newDocRef.id,
        user_id: user.uid,
        title: title,
        image_source: imageSource,
        platform,
        status,
        description: editorContent,
        created_at: Timestamp.now(),
      };

      await setDoc(newDocRef, databaseSchema);
      setSystemMessage({
        message: "Jogo adicionado com sucesso!",
        variant: "success",
      });

      setTimeout(() => {
        setSystemMessage({ message: "", variant: null });
        Navigate("/");
      }, TIMEOUT_VALUE);
      setTitle("");
      setImageSource("");
      setPlatform("");
      setStatus("");
      setEditorContent("");
    } catch (error) {
      setSystemMessage({
        message: "Algo deu errado, tente novamente mais tarde.",
        variant: "danger",
      });
      console.error("erro: " + error);
    }
  };

  const handleEditorChange = (newContent: string) => {
    setEditorContent(newContent);
  };

  return (
    <>
      <Navbar />
      <section className="add-game container">
        <h5>Adicione Um Jogo</h5>

        <form className="add-game__form" onSubmit={createGame}>
          <input
            type="text"
            placeholder="Nome do jogo"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="url"
            placeholder="Digite a url da imagem"
            value={imageSource}
            onChange={(e) => setImageSource(e.target.value)}
          />

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="" disabled>
              Selecione a Plataforma
            </option>
            <option value="xbox">Xbox</option>
            <option value="pc">PC</option>
            <option value="playstation">Playstation</option>
            <option value="nintendo">Nintendo</option>
            <option value="mobile">Mobile</option>
            <option value="steam deck">Steam Deck</option>
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="" disabled>
              Selecione o Status
            </option>
            <option value="completed">Finalizado</option>
            <option value="playing">Jogando</option>
            <option value="wishlist">Na lista</option>
            <option value="replaying">Rejogando</option>
            <option value="dont started">Não começei</option>
          </select>

          <RichTextEditor
            content={editorContent}
            onChange={handleEditorChange}
          />

          <div className="add-game__form-buttons">
            <Button type="submit" variant="success">
              Salvar
            </Button>
            <Link to="/" className="button button--ghost">
              Voltar
            </Link>
          </div>
        </form>

        {systemMessage.message && systemMessage.variant && (
          <Toast variant={systemMessage.variant}>{systemMessage.message}</Toast>
        )}
      </section>
    </>
  );
};

export default AddGamePage;
