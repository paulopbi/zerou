import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__spinner">
        <div className="loading__spinner-dot"></div>
        <div className="loading__spinner-dot"></div>
        <div className="loading__spinner-dot"></div>
      </div>
      <p className="loading__text">Carregando...</p>
    </div>
  );
};

export default Loading;
