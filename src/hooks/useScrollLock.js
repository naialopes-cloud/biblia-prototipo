import { useEffect, useRef } from "react";

/**
 * Trava a rolagem da página enquanto um painel está aberto e devolve
 * exatamente a mesma posição de rolagem ao fechar.
 */
export function useScrollLock(active) {
  const savedY = useRef(0);

  useEffect(() => {
    if (!active) return;

    savedY.current = window.scrollY;
    document.body.style.top = `-${savedY.current}px`;
    document.body.classList.add("is-locked");

    return () => {
      document.body.classList.remove("is-locked");
      document.body.style.top = "";
      window.scrollTo({ top: savedY.current, behavior: "instant" });
    };
  }, [active]);
}
