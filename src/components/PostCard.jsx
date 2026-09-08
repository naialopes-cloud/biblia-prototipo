import { HeartIcon, CommentIcon } from "./icons.jsx";
import Avatar from "./Avatar.jsx";
import { formatPostDate } from "../data/posts.js";
import "./PostCard.css";

/**
 * Publicação. É o mesmo card no feed da Home, no perfil e no detalhe.
 *
 * `author` só é passado onde o autor precisa ser identificado (Home e
 * detalhe); dentro do perfil o cabeçalho é dispensável, porque a tela
 * inteira já é daquele estudante.
 *
 * Nunca exibe dado financeiro: campanha e valores vivem no perfil.
 */
export default function PostCard({
  post,
  author = null,
  authorName,
  liked,
  likeCount,
  commentCount,
  eager = false,
  onToggleLike,
  onOpenComments,
  onOpenAuthor,
  onOpenPhoto,
}) {
  // width/height reservam a proporção antes do download e evitam saltos.
  const media = (
    <img
      className="post__image"
      src={post.image}
      alt={post.imageAlt}
      width={post.width}
      height={post.height}
      loading={eager ? "eager" : "lazy"}
      decoding={eager ? "sync" : "async"}
      fetchPriority={eager ? "high" : "auto"}
    />
  );

  // Quando existe uma versão WebP, ela é preferida; o original é a alternativa.
  const figura = post.imageWebp ? (
    <picture>
      <source srcSet={post.imageWebp} type="image/webp" />
      {media}
    </picture>
  ) : (
    media
  );

  return (
    <article className="post" aria-label={`Publicação de ${authorName}`}>
      {author && (
        <div className="post__head">
          <button
            type="button"
            className="post__authorBtn"
            onClick={onOpenAuthor}
            aria-label={`Abrir o perfil de ${author.name}`}
          >
            <Avatar student={author} size={40} />
            <span className="post__headText">
              <span className="post__headName">{author.name}</span>
              <span className="post__headSchool">{author.school}</span>
            </span>
          </button>
        </div>
      )}

      {onOpenPhoto ? (
        <button
          type="button"
          className="post__media"
          onClick={onOpenPhoto}
          aria-label={`Abrir a publicação ${post.title} de ${authorName}`}
        >
          {figura}
        </button>
      ) : (
        figura
      )}

      <div className="post__body">
        <div className="post__actions">
          {/* Ícone e número formam um único botão em cada ação. */}
          <button
            type="button"
            className={`post__action post__action--withCount${
              liked ? " is-liked" : ""
            }`}
            onClick={onToggleLike}
            aria-pressed={liked}
            aria-label={
              liked
                ? `Remover curtida da publicação ${post.title}. ${likeCount} curtidas`
                : `Curtir a publicação ${post.title}. ${likeCount} curtidas`
            }
          >
            <HeartIcon filled={liked} width="25" height="25" />
            <span className="post__count">{likeCount}</span>
          </button>

          <button
            type="button"
            className="post__action post__action--withCount"
            onClick={onOpenComments}
            aria-label={
              commentCount === 1
                ? `Ver 1 comentário da publicação ${post.title}`
                : `Ver os ${commentCount} comentários da publicação ${post.title}`
            }
          >
            <CommentIcon width="25" height="25" />
            <span className="post__count">{commentCount}</span>
          </button>
        </div>

        <p className="post__caption">
          <span className="post__author">{authorName}</span> {post.caption}
        </p>

        {/* Data absoluta, nunca relativa, e não é um controle. */}
        <time className="post__date" dateTime={post.date}>
          {formatPostDate(post.date)}
        </time>
      </div>
    </article>
  );
}
