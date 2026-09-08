import { HomeIcon, HandHeartIcon, BookIcon } from "./icons.jsx";
import "./BottomNav.css";

/**
 * Navegação inferior fixa.
 * "Início" e "Guia" ainda não fazem parte do protótipo e apenas avisam isso.
 * ESCOLHA PROVISÓRIA: "Doar" abre o mesmo painel demonstrativo da campanha,
 * porque a campanha do perfil visitado é a única doação existente nesta etapa.
 */
const items = [
  { id: "inicio", label: "Início", icon: HomeIcon },
  { id: "doar", label: "Doar", icon: HandHeartIcon },
  { id: "guia", label: "Guia", icon: BookIcon },
];

export default function BottomNav({ active = "inicio", onSelect }) {
  return (
    <nav className="bottomNav" aria-label="Navegação principal">
      <ul className="bottomNav__list">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = id === active;
          return (
            <li key={id} className="bottomNav__cell">
              <button
                type="button"
                className={`bottomNav__item${isActive ? " is-active" : ""}`}
                onClick={() => onSelect(id)}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Só o item ativo usa a versão preenchida do ícone. */}
                <Icon width="23" height="23" filled={isActive || undefined} />
                <span className="bottomNav__label">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
