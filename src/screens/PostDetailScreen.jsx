import TopBar from "../components/TopBar.jsx";
import PostCard from "../components/PostCard.jsx";
import { getPost } from "../data/posts.js";
import { getStudent } from "../data/students.js";
import "./PostDetailScreen.css";

/**
 * Detalhe de uma publicação — mesmo card, sozinho na tela.
 * Traz autor, escola, foto, ações, legenda e data; nenhum dado de campanha.
 */
export default function PostDetailScreen({
  postId,
  interactions,
  commentsOf,
  onBack,
  onShare,
  onOpenProfile,
  onOpenComments,
}) {
  const post = getPost(postId);
  const author = getStudent(post.studentId);
  const { byPost, toggleLike } = interactions;
  const state = byPost[post.id];

  return (
    <>
      <div className="screen__top screen__top--detail">
        <div className="screen__glow screen__glow--a" aria-hidden="true" />
        <div className="screen__grain" aria-hidden="true" />
        <div className="screen__topContent">
          <TopBar title="Publicação" onBack={onBack} onShare={onShare} />
        </div>
      </div>

      <main className="screen__bottom">
        <PostCard
          post={post}
          author={author}
          authorName={author.name}
          liked={state.liked}
          likeCount={post.likes + (state.liked ? 1 : 0)}
          commentCount={commentsOf(post).length}
          eager
          onToggleLike={() => toggleLike(post.id)}
          onOpenComments={() => onOpenComments(post.id)}
          onOpenAuthor={() => onOpenProfile(author.id)}
        />

        <p className="screen__disclaimerLight">
          Protótipo • Dados e interações fictícios
        </p>
      </main>
    </>
  );
}
