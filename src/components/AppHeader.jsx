import { SearchIcon, BrandMarkIcon } from "./icons.jsx";
import "./AppHeader.css";

/** Cabeçalho compacto da Home: marca à esquerda, busca à direita. */
export default function AppHeader({ onSearch }) {
  return (
    <header className="appHeader">
      <p className="appHeader__brand">
        <BrandMarkIcon className="appHeader__mark" width="20" height="20" />
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
