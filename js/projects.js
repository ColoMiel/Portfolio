// Source unique des projets : utilisée par la page Projets, l'accueil et le chat IA.
// Pour ajouter un projet, ajoute un objet dans ce tableau.
//   context : "epitech" ou "perso"
//   repo    : URL publique, ou null si le dépôt est privé
//   featured: true pour l'afficher sur la page d'accueil
const PROJECTS = [
  {
    id: "rtype",
    title: "R-Type",
    context: "epitech",
    module: "G-ING-500",
    year: 2026,
    team: 4,
    featured: true,
    summary:
      "Shoot'em up multijoueur en réseau, construit sur notre propre moteur de jeu. Chaque joueur a son client, relié à un serveur central qui fait autorité.",
    highlights: [
      "Moteur maison : ECS, événements, plugins, modules rendu / audio / réseau / physique",
      "Protocole binaire sur UDP (Asio) avec accusés de réception et heartbeat",
      "Règles du serveur scriptées en Python (pybind11), sans recompiler",
    ],
    stack: ["C++20", "Asio", "UDP", "Raylib", "pybind11", "CMake"],
    repo: null,
  },
  {
    id: "dashboard",
    title: "Dashboard",
    context: "epitech",
    module: "G-WEB-500",
    year: 2026,
    team: 2,
    featured: true,
    summary:
      "Tableau de bord personnalisable avec des widgets temps réel (météo, GitHub, Steam, Spotify, RSS, crypto), disponible sur Android, iOS, desktop et navigateur depuis un seul code.",
    highlights: [
      "Backend Ktor qui agrège plusieurs API externes",
      "Client Compose Multiplatform : 4 cibles, une seule base de code",
      "Comptes, e-mails transactionnels et panneau d'administration",
    ],
    stack: ["Kotlin", "Ktor", "Compose Multiplatform", "Docker"],
    repo: null,
  },
  {
    id: "sensai",
    title: "Sensai",
    context: "epitech",
    module: "G-AIA-500",
    year: 2026,
    team: 3,
    featured: true,
    summary:
      "Assistant IA pour streamer Twitch, écrit sans framework LLM et branché en local sur Ollama. Il se souvient des viewers et répond à partir de la FAQ de la chaîne ou du web.",
    highlights: [
      "RAG sur la FAQ, recherche web pour l'actualité",
      "Blocage des injections de prompt et masquage des données personnelles",
      "CLI streamer : compte-rendu de live, exports, veille planifiée, outils MCP",
    ],
    stack: ["Python", "Ollama", "RAG", "MCP", "Twitch", "OBS"],
    repo: null,
  },
  {
    id: "zappy",
    title: "Zappy",
    context: "epitech",
    module: "G-YEP-400",
    year: 2026,
    team: 5,
    featured: false,
    summary:
      "Jeu de survie en réseau où des équipes d'IA autonomes collectent des ressources et montent de niveau par incantations. Trois programmes indépendants qui communiquent en TCP.",
    highlights: [
      "Serveur de jeu en C++17",
      "Visualiseur 3D temps réel (raylib, ECS) en C++20",
      "Client IA en Python : règles + apprentissage par renforcement",
    ],
    stack: ["C++", "Python", "TCP", "raylib"],
    repo: "https://github.com/ColoMiel/Zappy",
  },
  {
    id: "raytracer",
    title: "Raytracer",
    context: "epitech",
    module: "G-OOP-400",
    year: 2026,
    team: null,
    featured: false,
    summary:
      "Moteur de rendu 3D en C++ par ray marching : primitives, lumières, ombres et caméra libre, avec des scènes décrites dans des fichiers de configuration.",
    highlights: [
      "Architecture orientée objet (primitives et lumières interchangeables)",
      "Caméra contrôlable en temps réel, capture d'écran avec F12",
    ],
    stack: ["C++", "SFML", "Ray marching"],
    repo: "https://github.com/ColoMiel/Raytracer",
  },
  {
    id: "mypgp",
    title: "my_pgp",
    context: "epitech",
    module: "G-CNA-500",
    year: 2026,
    team: 2,
    featured: false,
    summary:
      "Outil de chiffrement en ligne de commande : XOR, AES, RSA et PGP hybride, implémentés à la main.",
    highlights: [
      "AES-128/192/256, mode bloc ou flux",
      "Bonus : génération de clés RSA et second système asymétrique X25519",
    ],
    stack: ["Python", "Cryptographie"],
    repo: null,
  },
  {
    id: "persona",
    title: "Persona",
    context: "epitech",
    module: "G-AIA-410",
    year: 2026,
    team: 2,
    featured: false,
    summary:
      "Newsletter d'actualité personnalisée par IA : un chatbot inscrit l'utilisateur et note ses centres d'intérêt, puis un agent rédige et envoie sa newsletter à intervalle régulier.",
    highlights: [
      "Agent Mistral avec outils (inscription, pause, désinscription)",
      "Collecte GNews et NewsAPI, dédoublonnage, envoi par e-mail",
    ],
    stack: ["n8n", "Mistral AI", "Google Sheets", "Docker"],
    repo: null,
  },
  {
    id: "corewar",
    title: "Corewar",
    context: "epitech",
    module: null,
    year: 2025,
    team: null,
    featured: false,
    summary:
      "Machine virtuelle où des programmes écrits en assembleur s'affrontent en mémoire, avec une visualisation du combat dans le terminal.",
    highlights: [],
    stack: ["C", "Ncurses"],
    repo: "https://github.com/ColoMiel/Corewar",
  },
  {
    id: "wolf3d",
    title: "Wolf3D",
    context: "epitech",
    module: null,
    year: 2025,
    team: null,
    featured: false,
    summary:
      "Moteur de FPS en raycasting écrit de zéro en C : projection des murs et déplacements dans la carte, sans moteur 3D.",
    highlights: [],
    stack: ["C", "Raycasting"],
    repo: "https://github.com/ColoMiel/Wolf3D",
  },
  {
    id: "minishell",
    title: "Minishell",
    context: "epitech",
    module: null,
    year: 2025,
    team: null,
    featured: false,
    summary:
      "Shell Unix en C : exécution de commandes, gestion de l'environnement et des builtins.",
    highlights: [],
    stack: ["C", "Unix"],
    repo: "https://github.com/ColoMiel/Minishell1",
  },
  {
    id: "riftreport",
    title: "RiftReport",
    context: "perso",
    module: null,
    year: 2026,
    team: null,
    featured: false,
    summary:
      "Coach IA pour League of Legends : il analyse tes dernières parties et t'envoie des conseils sur Discord.",
    highlights: [
      "Workflow n8n relié à l'API Riot et à Mistral",
      "Rapports envoyés directement sur Discord",
    ],
    stack: ["n8n", "Mistral AI", "Riot API", "Discord"],
    repo: "https://github.com/ColoMiel/RiftReport",
  },
  {
    id: "marathon",
    title: "Plateforme Mohamed Ouaadi",
    context: "perso",
    module: null,
    year: 2026,
    team: null,
    featured: false,
    summary:
      "Site officiel d'un ancien marathonien international : biographie, palmarès, galerie, programmes d'entraînement et forum.",
    highlights: [
      "Authentification, base PostgreSQL et stockage via Supabase",
      "Panneau d'administration protégé par des règles RLS",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    repo: null,
  },
  {
    id: "portfolio",
    title: "Portfolio",
    context: "perso",
    module: null,
    year: 2025,
    team: null,
    featured: false,
    summary:
      "Ce site : HTML, CSS et JavaScript sans framework, avec un chat IA (Mistral) qui répond aux questions sur mon parcours.",
    highlights: [],
    stack: ["HTML", "CSS", "JavaScript", "Mistral AI"],
    repo: "https://github.com/ColoMiel/Portfolio",
  },
];

const ICON_GITHUB =
  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>';
const ICON_LOCK =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
const ICON_TEAM =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>';

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function projectCard(p) {
  const label = p.context === "epitech" ? "Epitech" : "Perso";
  const meta = [p.module, p.year].filter(Boolean).map(escapeHtml).join(" · ");
  const highlights = p.highlights.length
    ? `<ul class="card-points">${p.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>`
    : "";
  const team = p.team ? `<span class="card-team">${ICON_TEAM} ${p.team} devs</span>` : `<span class="card-team"></span>`;
  const link = p.repo
    ? `<a class="card-link" href="${escapeHtml(p.repo)}" target="_blank" rel="noopener">${ICON_GITHUB} Code source</a>`
    : `<span class="card-private" title="Dépôt hébergé dans l'organisation GitHub d'Epitech">${ICON_LOCK} Dépôt privé</span>`;

  return `
    <article class="card project-card" data-context="${p.context}">
      <div class="card-top">
        <span class="badge badge-${p.context}">${label}</span>
        <span class="card-meta">${meta}</span>
      </div>
      <h3 class="card-title">${escapeHtml(p.title)}</h3>
      <p class="card-text">${escapeHtml(p.summary)}</p>
      ${highlights}
      <ul class="tags">${p.stack.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
      <div class="card-foot">${team}${link}</div>
    </article>`;
}

function renderProjects(container, list) {
  container.innerHTML = list.map(projectCard).join("");
}

// Résumé texte pour le prompt du chat IA
function projectsAsText() {
  return PROJECTS.map((p, i) => {
    const where = p.context === "epitech" ? `Epitech${p.module ? " " + p.module : ""}` : "projet personnel";
    const repo = p.repo ? `GitHub : ${p.repo}` : "dépôt privé";
    return `${i + 1}. ${p.title} (${where}, ${p.year}${p.team ? `, équipe de ${p.team}` : ""})\n   ${p.summary}\n   Stack : ${p.stack.join(", ")}\n   ${repo}`;
  }).join("\n");
}

document.addEventListener("DOMContentLoaded", () => {
  const featured = document.getElementById("featuredProjects");
  if (featured) renderProjects(featured, PROJECTS.filter((p) => p.featured));

  const count = (ctx) => PROJECTS.filter((p) => ctx === "all" || p.context === ctx).length;
  document.querySelectorAll("[data-count]").forEach((el) => (el.textContent = count(el.dataset.count)));

  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const buttons = document.querySelectorAll(".filter-btn");
  const apply = (ctx) => {
    renderProjects(grid, PROJECTS.filter((p) => ctx === "all" || p.context === ctx));
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === ctx)));
  };
  buttons.forEach((b) => b.addEventListener("click", () => apply(b.dataset.filter)));
  apply("all");
});
