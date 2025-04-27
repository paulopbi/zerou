import "./AddGamePage.css";
import { Link, useNavigate } from "react-router";
import { FormEvent, useEffect, useRef, useState } from "react";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { ToastType } from "@/types";
import { TIMEOUT_VALUE } from "@/contants";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import RichTextEditor from "@/components/RichTextEditor";
import Toast from "@/components/Toast";

const AddGamePage = () => {
  const [title, setTitle] = useState("");
  const [imageSource, setImageSource] = useState("");
  const [platform, setPlatform] = useState("xbox");
  const [status, setStatus] = useState("completed");
  const [editorContent, setEditorContent] = useState("");
  const [systemMessage, setSystemMessage] = useState<ToastType>({
    message: "",
    variant: null,
  });

  const titleInputRef = useRef<null | HTMLInputElement>(null);
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);
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
        <div className="add-game__heading">
          <h4 className="title--brand text-center">Preencha os dados</h4>
          <p className="text-center">
            Quando finalizar o e salvar, o jogo irá para a sua lista.
          </p>
        </div>

        <form className="add-game__form" onSubmit={createGame}>
          <div className="add-game__form-group">
            <label htmlFor="name" className="add-game__label">
              Nome do jogo
            </label>
            <input
              ref={titleInputRef}
              className="add-game__input"
              id="name"
              type="text"
              placeholder="Fallout 4, The Witcher, GTA..."
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="add-game__form-group">
            <label htmlFor="image" className="add-game__label">
              Digite a url da imagem
            </label>
            <input
              className="add-game__input"
              id="image"
              type="url"
              placeholder="https://www.imagem.com/foto-1.png"
              value={imageSource}
              onChange={(e) => setImageSource(e.target.value)}
            />
          </div>

          <div className="add-game__form-group">
            <label htmlFor="platform" className="add-game__label">
              Selecione a plataforma
            </label>
            <select
              className="add-game__select"
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="xbox">Xbox</option>
              <option value="pc">PC</option>
              <option value="playstation">Playstation</option>
              <option value="nintendo">Nintendo</option>
              <option value="mobile">Mobile</option>
              <option value="steam deck">Steam Deck</option>
            </select>
          </div>

          <div className="add-game__form-group">
            <label htmlFor="status" className="add-game__label">
              Selecione o status
            </label>
            <select
              className="add-game__select"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="completed">Finalizado</option>
              <option value="playing">Jogando</option>
              <option value="wishlist">Na lista</option>
              <option value="replaying">Rejogando</option>
              <option value="dont started">Não começei</option>
            </select>
          </div>

          <RichTextEditor
            content={editorContent}
            onChange={handleEditorChange}
          />

          <Button type="submit" variant="success">
            Salvar
          </Button>
          <Link to="/" className="button button--ghost">
            <ArrowLeft height={18} width={18} /> Voltar
          </Link>
        </form>

        {systemMessage.message && systemMessage.variant && (
          <Toast variant={systemMessage.variant}>{systemMessage.message}</Toast>
        )}
      </section>
    </>
  );
};

export default AddGamePage;
