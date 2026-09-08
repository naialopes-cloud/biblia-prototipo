import { SearchIcon } from "./icons.jsx";
import marcaBiblia from "../assets/imagens/marca-biblia.png";
import "./AppHeader.css";

/** Cabeçalho compacto da Home: marca à esquerda, busca à direita. */
export default function AppHeader({ onSearch }) {
  return (
    <header className="appHeader">
      <p className="appHeader__brand">
        {/* Decorativa: o texto ao lado já identifica a marca. */}
        <span className="appHeader__markWrap">
          <img className="appHeader__mark" src={marcaBiblia} alt="" aria-hidden="true" />
        </span>
        <span className="appHeader__word">
          Bibl<span className="appHeader__dot">.</span>ia
        </span>
      </p>

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
