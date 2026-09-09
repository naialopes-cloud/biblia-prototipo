import { useCallback, useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import SearchScreen from "./screens/SearchScreen.jsx";
import PostDetailScreen from "./screens/PostDetailScreen.jsx";
import BottomNav from "./components/BottomNav.jsx";
import DonateSheet from "./components/DonateSheet.jsx";
import CommentsSheet from "./components/CommentsSheet.jsx";
import Toast from "./components/Toast.jsx";
import CampaignsDrawer from "./components/CampaignsDrawer.jsx";
import { getStudent } from "./data/students.js";
import { getCampaignByStudent } from "./data/campaigns.js";
import { posts, getPost } from "./data/posts.js";
import { usePostInteractions } from "./hooks/usePostInteractions.js";
import { useRoute } from "./hooks/useRoute.js";
import "./App.css";

/** Título do navegador por rota — muda também ao usar o botão voltar. */
const TITULOS = {
  home: "Início",
  search: "Buscar estudantes",
  profile: "Perfil",
  post: "Publicação",
};

export default function App() {
  const { route, navigate, back, goHome } = useRoute();

  useEffect(() => {
    document.title = `Bibl.ia — ${TITULOS[route.name] ?? "Início"}`;
  }, [route]);

  // Um único estado de curtidas/comentários para TODAS as publicações, para
  // que Home, perfil e detalhe mostrem sempre o mesmo número.
  const interactions = usePostInteractions(posts);
  const { byPost, addComment } = interactions;

  const [donateOpen, setDonateOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const MENU_ID = "painel-missoes";
  const [openCommentsFor, setOpenCommentsFor] = useState(null);
  const [toast, setToast] = useState("");

  // Comentários iniciais do post + os enviados como "Você" naquele post.
  const commentsOf = useCallback(
    (post) => [...post.comments, ...(byPost[post.id]?.extraComments ?? [])],
    [byPost]
  );

  const activePost = openCommentsFor ? getPost(openCommentsFor) : null;

  // A campanha do painel de doação só existe dentro de um perfil.
  const campaignEmContexto =
    route.name === "profile" ? getCampaignByStudent(route.id) : null;

  const openProfile = (studentId) => navigate({ name: "profile", id: studentId });

  /** Devolve o foco ao botão do menu ao fechar o painel. */
  const closeMenu = () => {
    setMenuOpen(false);
    requestAnimationFrame(() =>
      document.querySelector(".appHeader__icon--menu")?.focus()
    );
  };

  /** Do painel para o perfil, já posicionado na campanha. */
  const openStudentFromMenu = (studentId) => {
    setMenuOpen(false);
    openProfile(studentId);
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        document.querySelector(".campaign")?.scrollIntoView({
          block: "center",
          behavior: suave ? "smooth" : "instant",
        })
      )
    );
  };
  // A rota de detalhe da publicação segue implementada (PostDetailScreen),
  // mas hoje nada navega até ela: a fotografia é apenas imagem.
  // eslint-disable-next-line no-unused-vars
  const openPost = (postId) => navigate({ name: "post", id: postId });

  const handleShare = async () => {
    const alvo =
      route.name === "profile" ? getStudent(route.id)?.name : "Bibl.ia";
    const shareData = {
      title: `${alvo} — Bibl.ia`,
      text: `Acompanhe as caminhadas dos estudantes missionários no Bibl.ia.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return; // o próprio sistema já confirma
      }
      await navigator.clipboard.writeText(window.location.href);
      setToast("Link copiado.");
    } catch {
      // Cancelamento ou falha: nenhuma confirmação é exibida.
    }
  };

  const handleNav = (id) => {
    if (id === "inicio") {
      goHome();
      return;
    }
    if (id === "doar") {
      setDonateOpen(true);
      return;
    }
    // ESCOLHA PROVISÓRIA: o Guia ainda não foi definido; nada de recursos
    // bíblicos ou de IA foi inventado aqui.
    setToast("Guia ainda não faz parte deste protótipo.");
  };

  return (
    <div className="screen">
      {route.name === "home" && (
        <HomeScreen
          interactions={interactions}
          commentsOf={commentsOf}
          onSearch={() => navigate({ name: "search" })}
          onOpenMenu={() => setMenuOpen(true)}
          menuOpen={menuOpen}
          menuId={MENU_ID}
          onOpenProfile={openProfile}
          onOpenComments={setOpenCommentsFor}
        />
      )}

      {route.name === "search" && (
        <SearchScreen onBack={back} onOpenProfile={openProfile} />
      )}

      {route.name === "profile" && (
        <ProfileScreen
          studentId={route.id}
          interactions={interactions}
          commentsOf={commentsOf}
          onBack={back}
          onShare={handleShare}
          onDonate={() => setDonateOpen(true)}
          onOpenComments={setOpenCommentsFor}
        />
      )}

      {route.name === "post" && (
        <PostDetailScreen
          postId={route.id}
          interactions={interactions}
          commentsOf={commentsOf}
          onBack={back}
          onShare={handleShare}
          onOpenProfile={openProfile}
          onOpenComments={setOpenCommentsFor}
        />
      )}

      <BottomNav
        active={route.name === "home" ? "inicio" : null}
        onSelect={handleNav}
      />

      <CampaignsDrawer
        id={MENU_ID}
        open={menuOpen}
        onClose={closeMenu}
        onOpenStudent={openStudentFromMenu}
      />

      <DonateSheet
        open={donateOpen}
        campaign={campaignEmContexto}
        onClose={() => setDonateOpen(false)}
      />

      <CommentsSheet
        open={Boolean(activePost)}
        comments={activePost ? commentsOf(activePost) : []}
        onClose={() => setOpenCommentsFor(null)}
        onPublish={(text) => addComment(activePost.id, text)}
      />

      <Toast message={toast} onDismiss={() => setToast("")} />
    </div>
  );
}
