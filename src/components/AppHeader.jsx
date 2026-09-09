import { SearchIcon } from "./icons.jsx";
import marcaEscrita from "../assets/imagens/marca-biblia-escrita.png";
import "./AppHeader.css";

/** Cabeçalho compacto da Home: marca à esquerda, busca à direita. */
export default function AppHeader({ onSearch }) {
  return (
    <header className="appHeader">
      {/* O logotipo escrito identifica a marca sozinho. O nome acessível
          fica no grupo; a imagem entra decorativa para não duplicar.
          A imagem do livro segue em assets para outros usos. */}
      <div className="appHeader__brand" role="img" aria-label="Bibl.ia">
        <img
          className="appHeader__wordmark"
          src={marcaEscrita}
          alt=""
          aria-hidden="true"
        />
      </div>

      <button
        type="button"
        className="appHeader__action"
        onClick={onSearch}
        aria-label="Buscar estudantes"
      >
        <SearchIcon className="appHeader__searchIcon" />
      </button>
    </header>
  );
}
