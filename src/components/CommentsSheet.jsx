import { useRef, useState } from "react";
import Sheet from "./Sheet.jsx";
import "./CommentsSheet.css";

export default function CommentsSheet({ open, comments, onClose, onPublish }) {
  const [draft, setDraft] = useState("");
  const listRef = useRef(null);

  const canPublish = draft.trim().length > 0;

  const submit = (event) => {
    event.preventDefault();
    if (!canPublish) return; // comentário vazio não é publicado
    onPublish(draft.trim());
    setDraft("");
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  return (
    <Sheet
      open={open}
      title={`Comentários (${comments.length})`}
      onClose={onClose}
    >
      <ul className="comments__list" ref={listRef}>
        {comments.map((comment) => (
          <li className="comments__item" key={comment.id}>
            <span className="comments__avatar" aria-hidden="true">
              {comment.author.charAt(0)}
            </span>
            <div className="comments__bubble">
              <p className="comments__author">{comment.author}</p>
              <p className="comments__text">{comment.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <form className="comments__form" onSubmit={submit}>
        <label className="visually-hidden" htmlFor="comment-input">
          Escrever um comentário
        </label>
        <input
          id="comment-input"
          className="comments__input"
          type="text"
          placeholder="Escreva um comentário…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoComplete="off"
          enterKeyHint="send"
          maxLength={280}
        />
        <button
          type="submit"
          className="btnYellow comments__submit"
          disabled={!canPublish}
        >
          Publicar
        </button>
      </form>
    </Sheet>
  );
}
