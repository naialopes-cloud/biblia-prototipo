import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Navegação mínima em cima da History API — sem dependências novas.
 *
 * Cada rota é um objeto simples ({ name, id }) guardado em history.state, de
 * modo que o botão físico "voltar" do celular funciona sozinho. A posição de
 * rolagem de cada tela é memorizada e devolvida ao voltar.
 */
const HOME = { name: "home" };

const keyOf = (route) => `${route.name}:${route.id ?? ""}`;

export function useRoute() {
  const [route, setRoute] = useState(
    () => window.history.state?.biblia ?? HOME
  );

  const rotaAtual = useRef(route);
  const rolagens = useRef(new Map());
  const profundidade = useRef(window.history.state?.bibliaDepth ?? 0);

  rotaAtual.current = route;

  const restaurarRolagem = useCallback((key) => {
    const y = rolagens.current.get(key) ?? 0;
    // dois quadros: o primeiro monta a tela, o segundo já tem a altura certa
    // (as imagens reservam proporção por width/height, então nada salta).
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        window.scrollTo({ top: y, behavior: "instant" })
      )
    );
  }, []);

  useEffect(() => {
    if (!window.history.state?.biblia) {
      window.history.replaceState({ biblia: HOME, bibliaDepth: 0 }, "");
    }

    const onPop = (event) => {
      rolagens.current.set(keyOf(rotaAtual.current), window.scrollY);
      const proxima = event.state?.biblia ?? HOME;
      profundidade.current = event.state?.bibliaDepth ?? 0;
      setRoute(proxima);
      restaurarRolagem(keyOf(proxima));
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [restaurarRolagem]);

  const navigate = useCallback(
    (proxima) => {
      if (keyOf(proxima) === keyOf(rotaAtual.current)) return;
      rolagens.current.set(keyOf(rotaAtual.current), window.scrollY);
      profundidade.current += 1;
      window.history.pushState(
        { biblia: proxima, bibliaDepth: profundidade.current },
        ""
      );
      setRoute(proxima);
      // tela nova começa no topo
      window.scrollTo({ top: 0, behavior: "instant" });
    },
    []
  );

  /** Volta pelo histórico quando ele é nosso; senão cai na Home. */
  const back = useCallback(() => {
    if (profundidade.current > 0) {
      window.history.back();
      return;
    }
    rolagens.current.set(keyOf(rotaAtual.current), window.scrollY);
    window.history.replaceState({ biblia: HOME, bibliaDepth: 0 }, "");
    setRoute(HOME);
    restaurarRolagem(keyOf(HOME));
  }, [restaurarRolagem]);

  /** Vai para a Home de qualquer tela, sem empilhar Home sobre Home. */
  const goHome = useCallback(() => {
    if (rotaAtual.current.name === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate(HOME);
    restaurarRolagem(keyOf(HOME));
  }, [navigate, restaurarRolagem]);

  return { route, navigate, back, goHome };
}
