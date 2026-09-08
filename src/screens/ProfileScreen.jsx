import TopBar from "../components/TopBar.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import BioCard from "../components/BioCard.jsx";
import CampaignCard from "../components/CampaignCard.jsx";
import PostCard from "../components/PostCard.jsx";
import { getStudent } from "../data/students.js";
import { getCampaignByStudent } from "../data/campaigns.js";
import { getPostsByStudent } from "../data/posts.js";

/**
 * Perfil público de um estudante. Mesma tela de sempre, agora recebendo
 * `studentId` em vez de apontar para Lucas fixo — o resto é idêntico.
 * A campanha aparece só aqui, nunca no feed.
 */
export default function ProfileScreen({
  studentId,
  interactions,
  commentsOf,
  onBack,
  onShare,
  onDonate,
  onOpenComments,
}) {
  const student = getStudent(studentId);
  const campaign = getCampaignByStudent(studentId);
  const posts = getPostsByStudent(studentId);
  const { byPost, toggleLike } = interactions;

  return (
    <>
      <div className="screen__top">
        <div className="screen__glow screen__glow--a" aria-hidden="true" />
        <div className="screen__glow screen__glow--b" aria-hidden="true" />
        <div className="screen__grain" aria-hidden="true" />

        <div className="screen__topContent">
          <TopBar title="Perfil" onBack={onBack} onShare={onShare} />
          <ProfileHeader student={student} />
          <BioCard student={student} onDonate={onDonate} />

          <p className="screen__disclaimer">
            Protótipo • Dados e interações fictícios
          </p>
        </div>
      </div>

      <main className="screen__bottom">
        {campaign && <CampaignCard campaign={campaign} />}

        {/* Publicações empilhadas na rolagem principal — sem área de
            rolagem própria, sem carrossel. */}
        {posts.map((post, index) => {
          const state = byPost[post.id];
          return (
            <PostCard
              key={post.id}
              post={post}
              authorName={student.name}
              liked={state.liked}
              // Alterna entre a base do dado e base + 1; nunca acumula.
              likeCount={post.likes + (state.liked ? 1 : 0)}
              commentCount={commentsOf(post).length}
              eager={index === 0}
              onToggleLike={() => toggleLike(post.id)}
              onOpenComments={() => onOpenComments(post.id)}
            />
          );
        })}
      </main>
    </>
  );
}
