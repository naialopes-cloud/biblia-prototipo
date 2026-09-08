/**
 * Ícones em SVG, traçado contínuo, herdando cor e espessura do contexto.
 * Todos são decorativos: o nome acessível vive no botão que os contém.
 */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

/* Chevron e Compartilhar são desenhados com a mesma altura de traçado
   (17 unidades do viewBox) e centrados em (12,12) considerando o avanço
   de 0,85 das pontas arredondadas. Devem ser renderizados no mesmo tamanho. */
export const ChevronLeftIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M15.83 4.35 8.18 12l7.65 7.65" />
  </svg>
);

export const ShareIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 4.29v10.16" />
    <path d="m8.49 7.8 3.51-3.51 3.51 3.51" />
    <path d="M6 13.06v4.81a1.85 1.85 0 0 0 1.85 1.85h8.3a1.85 1.85 0 0 0 1.85-1.85V13.06" />
  </svg>
);

export const SchoolIcon = (p) => (
  <svg {...base} {...p}>
    <path d="m12 4 9 4.2-9 4.2-9-4.2L12 4Z" />
    <path d="M6.6 10.6v4.1c0 1.7 2.4 3 5.4 3s5.4-1.3 5.4-3v-4.1" />
  </svg>
);

export const PinIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s6.4-5.3 6.4-10.2A6.4 6.4 0 0 0 5.6 10.8C5.6 15.7 12 21 12 21Z" />
    <circle cx="12" cy="10.6" r="2.3" />
  </svg>
);

/** Missão: globo simples — contorno, equador e meridiano. */
export const MissionIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="7.5" />
    <path d="M4.5 12h15" />
    <path d="M12 4.5c1.95 2.05 3 4.7 3 7.5s-1.05 5.45-3 7.5c-1.95-2.05-3-4.7-3-7.5s1.05-5.45 3-7.5Z" />
  </svg>
);

/** Mão aberta segurando um coração. */
export const HandHeartIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 8.9c-.9-1.6-3.4-1.4-3.4.6 0 1.5 2 2.9 3.4 3.8 1.4-.9 3.4-2.3 3.4-3.8 0-2-2.5-2.2-3.4-.6Z" />
    <path d="M4 15.4h2.6l2.7 1.6h3.3a1 1 0 0 0 0-2h-2.2" />
    <path d="m13 16.6 4.6-1.7a1.4 1.4 0 0 1 1.7 2l-4.1 3a3 3 0 0 1-1.8.6H9.3L6.6 19H4" />
  </svg>
);

export const HomeIcon = ({ filled = false, ...p }) =>
  filled ? (
    <svg {...base} fill="currentColor" fillRule="evenodd" {...p}>
      <path d="M4 10.7 12 4.4l8 6.3v8a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 18.7v-8ZM9.6 20.3v-5.5h4.8v5.5Z" />
    </svg>
  ) : (
    <svg {...base} {...p}>
      <path d="M4 10.7 12 4.4l8 6.3v8a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 18.7v-8Z" />
      <path d="M9.6 20.3v-5.5h4.8v5.5" />
    </svg>
  );

export const BookIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 7.2C10.4 5.7 8.2 5 5.2 5.2A1 1 0 0 0 4.3 6.2v10.4a1 1 0 0 0 1.1 1c2.6-.2 4.7.4 6.6 1.9 1.9-1.5 4-2.1 6.6-1.9a1 1 0 0 0 1.1-1V6.2a1 1 0 0 0-.9-1c-3-.2-5.2.5-6.8 2Z" />
    <path d="M12 7.2v12.3" />
  </svg>
);

export const HeartIcon = ({ filled = false, ...p }) => (
  <svg {...base} fill={filled ? "currentColor" : "none"} {...p}>
    <path d="M12 20.3c-.4 0-.8-.1-1.1-.4C7.3 16.9 3.5 13.9 3.5 9.9a4.6 4.6 0 0 1 8.5-2.4 4.6 4.6 0 0 1 8.5 2.4c0 4-3.8 7-7.4 10a1.7 1.7 0 0 1-1.1.4Z" />
  </svg>
);

export const CommentIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M20.3 11.6c0 4-3.7 7.2-8.3 7.2a9.6 9.6 0 0 1-2.6-.35L4.6 20l1.2-3.4a6.9 6.9 0 0 1-2.1-5c0-4 3.7-7.2 8.3-7.2s8.3 3.2 8.3 7.2Z" />
  </svg>
);

/* Centrado pelo que se vê, não pelo cálculo: a caixa do traço já estava em
   (12,12), mas o cabo comprido puxava a leitura para baixo à direita e a
   lente ficava alta demais. O cabo foi encurtado e a lente aproximada do
   centro, de modo que ela — que é o que o olho lê como "a lupa" — fique
   sobre o eixo do círculo. Conferido por sobreposição do eixo no botão
   renderizado, não só por medida. */
export const SearchIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="11.65" cy="11.65" r="6.5" />
    <path d="m16.25 16.25 2.6 2.6" />
  </svg>
);

/** Marca Bibl.ia: o mesmo coração do ícone do aplicativo. */
export const BrandMarkIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M12 20.6c-.35 0-.7-.12-.97-.35C7.6 17.3 4.1 14.5 4.1 10.8a4.3 4.3 0 0 1 7.9-2.3 4.3 4.3 0 0 1 7.9 2.3c0 3.7-3.5 6.5-6.93 9.45-.27.23-.62.35-.97.35Z" />
  </svg>
);

export const CloseIcon = (p) => (
  <svg {...base} {...p}>
    <path d="m6.4 6.4 11.2 11.2M17.6 6.4 6.4 17.6" />
  </svg>
);
