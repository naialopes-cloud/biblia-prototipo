/**
 * Persistência APENAS DE DEMONSTRAÇÃO.
 *
 * Curtidas e comentários do protótipo ficam no localStorage do próprio
 * navegador para sobreviver à navegação da sessão. Não há backend, não há
 * sincronização e nada disso representa dados reais de usuários.
 * Limpar os dados do site remove tudo.
 *
 * Cada publicação grava sob a sua própria chave, derivada do id estável do
 * post: `biblia.demo.post.<id>.liked` e `biblia.demo.post.<id>.comments`.
 * Acrescentar publicações novas nunca toca nas chaves das já existentes.
 */
const PREFIX = "biblia.demo.";

export function readDemo(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeDemo(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* modo privado ou armazenamento bloqueado: segue sem persistir */
  }
}

export const likedKey = (postId) => `post.${postId}.liked`;
export const commentsKey = (postId) => `post.${postId}.comments`;
