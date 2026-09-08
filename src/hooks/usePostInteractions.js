import { useCallback, useEffect, useState } from "react";
import {
  readDemo,
  writeDemo,
  likedKey,
  commentsKey,
} from "./demoStorage.js";

/**
 * Curtidas e comentários de várias publicações, cada uma isolada da outra.
 *
 * O estado vive em um mapa `postId -> { liked, extraComments }`, mas é gravado
 * em uma chave por publicação (ver demoStorage.js), de modo que os dados já
 * salvos de um post continuam válidos quando novos posts entram no feed.
 */
export function usePostInteractions(posts) {
  const [byPost, setByPost] = useState(() => {
    const initial = {};
    for (const post of posts) {
      initial[post.id] = {
        liked: readDemo(likedKey(post.id), false),
        extraComments: readDemo(commentsKey(post.id), []),
      };
    }
    return initial;
  });

  // Persiste fora do ciclo de renderização, o que mantém o estado como única
  // fonte de verdade e evita gravações duplicadas.
  useEffect(() => {
    for (const [postId, entry] of Object.entries(byPost)) {
      writeDemo(likedKey(postId), entry.liked);
      writeDemo(commentsKey(postId), entry.extraComments);
    }
  }, [byPost]);

  const toggleLike = useCallback((postId) => {
    setByPost((prev) => ({
      ...prev,
      [postId]: { ...prev[postId], liked: !prev[postId].liked },
    }));
  }, []);

  const addComment = useCallback((postId, text) => {
    const trimmed = text.trim();
    if (!trimmed) return; // comentário vazio não é publicado
    setByPost((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        extraComments: [
          ...prev[postId].extraComments,
          { id: `local-${postId}-${Date.now()}`, author: "Você", text: trimmed },
        ],
      },
    }));
  }, []);

  return { byPost, toggleLike, addComment };
}
