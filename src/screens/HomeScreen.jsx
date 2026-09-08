import AppHeader from "../components/AppHeader.jsx";
import PostCard from "../components/PostCard.jsx";
import { getStudent } from "../data/students.js";
import { getFeedPosts } from "../data/posts.js";
import "./HomeScreen.css";

/**
 * Home: cabeçalho compacto + feed vertical com as publicações de todos os
 * estudantes, da mais recente para a mais antiga.
 * Nenhuma informação de campanha aparece aqui.
 */
export default function HomeScreen({
  interactions,
  commentsOf,
  onSearch,
  onOpenProfile,
  onOpenComments,
}) {
  const posts = getFeedPosts();
  const { byPost, toggleLike } = interactions;

  return (
    <>
      <div className="screen__top screen__top--home">
        <div className="screen__glow screen__glow--a" aria-hidden="true" />
        <div className="screen__glow screen__glow--b" aria-hidden="true" />
        <div className="screen__grain" aria-hidden="true" />

        <div className="screen__topContent">
          <AppHeader onSearch={onSearch} />
          <p className="home__intro">Caminhadas dos estudantes missionários</p>
        </div>
      </div>

      <main className="screen__bottom">
        {posts.map((post, index) => {
          const author = getStudent(post.studentId);
          const state = byPost[post.id];
          return (
            <PostCard
              key={post.id}
              post={post}
              author={author}
              authorName={author.name}
              liked={state.liked}
              likeCount={post.likes + (state.liked ? 1 : 0)}
              commentCount={commentsOf(post).length}
              eager={index === 0}
              onToggleLike={() => toggleLike(post.id)}
              onOpenComments={() => onOpenComments(post.id)}
              onOpenAuthor={() => onOpenProfile(author.id)}
            />
          );
        })}
      </main>
    </>
  );
}
