import "./AddGamePage.css";
import { Link } from "react-router";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import RichTextEditor from "@/components/RichTextEditor";
import Toast from "@/components/Toast";
import useAddGame from "@/hooks/useAddGame";
import useFocus from "@/hooks/useFocus";

const AddGamePage = () => {
  const titleInputRef = useRef<null | HTMLInputElement>(null);
  useFocus(titleInputRef);

  const {
    handleAddGame,
    setTitle,
    setImageSource,
    setPlatform,
    setStatus,
    setEditorContent,
    isLoading,
    title,
    imageSource,
    platform,
    status,
    editorContent,
    systemMessage,
  } = useAddGame();

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

        <form className="add-game__form" onSubmit={handleAddGame}>
          {/* title group */}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* image group */}
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

          {/* platform group */}
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

          {/* status group */}
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

          {isLoading ? (
            <Button type="submit" variant="success" disabled>
              Salvando...
            </Button>
          ) : (
            <Button type="submit" variant="success">
              Salvar
            </Button>
          )}
          <Link to="/" className="button button--ghost">
            <ArrowLeft height={18} width={18} /> Voltar
          </Link>
        </form>
      </section>

      {systemMessage.message && systemMessage.variant && (
        <Toast variant={systemMessage.variant}>{systemMessage.message}</Toast>
      )}
    </>
  );
};

export default AddGamePage;
