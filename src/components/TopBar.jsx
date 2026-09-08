import { ChevronLeftIcon, ShareIcon } from "./icons.jsx";
import "./TopBar.css";

export default function TopBar({ title, onBack, onShare }) {
  return (
    <header className="topbar">
      <button
        type="button"
        className="topbar__action"
        onClick={onBack}
        aria-label="Voltar"
      >
        <ChevronLeftIcon width="22" height="22" />
      </button>

      <h1 className="topbar__title">{title}</h1>

      <button
        type="button"
        className="topbar__action"
        onClick={onShare}
        aria-label="Compartilhar perfil"
      >
        <ShareIcon width="22" height="22" />
      </button>
    </header>
  );
}
