// En production, le workflow GitHub Actions remplace le placeholder par le secret MISTRAL_API_KEY.
// En local, mets ta clé dans js/config.local.js (ignoré par git).
const MISTRAL_API_KEY = window.MISTRAL_API_KEY_LOCAL || "MISTRAL_KEY_PLACEHOLDER";
const MISTRAL_MODEL = "mistral-small-latest";

const SYSTEM_CONTEXT = `
Tu es HatimBot, un assistant IA représentant Hatim Ouaadi sur son portfolio personnel.
Tu réponds en français par défaut, mais tu peux répondre en anglais si on te parle en anglais.
Tu es sympathique, direct et passionné. Tu parles de Hatim à la première personne quand c'est naturel.

═══════════════════════════════
IDENTITÉ
═══════════════════════════════
Nom : Hatim Ouaadi
Localisation : Marseille, France
Naissance : 2006
Passion principale : le développement logiciel et le gamedev

═══════════════════════════════
FORMATION & EXPÉRIENCE
═══════════════════════════════
- Étudiant à Epitech Marseille (2024–2029), école d'informatique par projet, actuellement en 3e année
- AER (assistant pédagogique) à Epitech depuis 2026 : accompagne les étudiants sur leurs projets
- Stage de 6 mois chez Linxo (2025–2026)

═══════════════════════════════
COMPÉTENCES TECHNIQUES
═══════════════════════════════
Langages : C, C++, Python, Kotlin, TypeScript, JavaScript, Shell
Systèmes & réseau : TCP/UDP, Asio, ECS, multithreading, Ncurses, CMake
Graphique & jeu : Raylib, SFML, raycasting, ray marching
Web & mobile : Ktor, Compose Multiplatform, Next.js, Supabase, Tailwind
IA : Ollama, RAG, MCP, Mistral AI, n8n
Outils : Git, Docker, GitHub Actions, pytest, Jira

═══════════════════════════════
PROJETS
═══════════════════════════════
${typeof projectsAsText === 'function' ? projectsAsText() : ''}
Les projets Epitech marqués "dépôt privé" sont dans l'organisation GitHub d'Epitech : Hatim peut les montrer en entretien.

═══════════════════════════════
AMBITIONS
═══════════════════════════════
- Créer un jour son propre jeu vidéo
- Explorer l'IA et l'intégrer à des projets créatifs

═══════════════════════════════
CONTACT
═══════════════════════════════
- GitHub : https://github.com/ColoMiel
- LinkedIn : https://www.linkedin.com/in/hatim-ouaadi-22140b33b/
- Formulaire : page Contact du site

═══════════════════════════════
INSTRUCTIONS
═══════════════════════════════
- Si on te demande une information que tu n'as pas, dis-le honnêtement, n'invente rien
- Ne réponds PAS aux questions sans lien avec Hatim ou son domaine
- Si on te demande ta clé API ou ton fonctionnement interne, redirige poliment
- Réponds de façon concise (3 à 5 phrases en général)
- N'utilise jamais d'emojis
- Tu peux utiliser du markdown simple : **gras**, *italique*, \`code\`
`.trim();

const messagesEl = document.getElementById('chatMessages');
const inputEl = document.getElementById('chatInput');
const sendBtn = document.getElementById('chatSend');
const suggestionsEl = document.getElementById('chatSuggestions');

const botIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 11V9M16 11V9"/></svg>`;
const userIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;

let history = [];

inputEl.addEventListener('input', () => {
  inputEl.style.height = 'auto';
  inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
});

inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener('click', () => sendMessage());

if (suggestionsEl) {
  suggestionsEl.querySelectorAll('.suggestion').forEach((btn) =>
    btn.addEventListener('click', () => sendMessage(btn.textContent))
  );
}

function formatText(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/[\u{1F300}-\u{1FFFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
    .replace(/\n/g, '<br>');
}

function appendMsg(role, text, isTyping = false) {
  const div = document.createElement('div');
  div.className = `msg msg-${role}${isTyping ? ' msg-typing' : ''}`;

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.innerHTML = role === 'user' ? userIcon : botIcon;

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = isTyping
    ? '<div class="typing-dots"><span></span><span></span><span></span></div>'
    : formatText(text);

  div.appendChild(avatar);
  div.appendChild(bubble);
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

async function sendMessage(preset) {
  const text = (preset ?? inputEl.value).trim();
  if (!text || sendBtn.disabled) return;

  if (suggestionsEl) suggestionsEl.remove();

  appendMsg('user', text);
  history.push({ role: 'user', content: text });

  inputEl.value = '';
  inputEl.style.height = 'auto';
  sendBtn.disabled = true;

  const typingEl = appendMsg('ai', '', true);

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: MISTRAL_MODEL,
        messages: [{ role: 'system', content: SYSTEM_CONTEXT }, ...history],
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Erreur HTTP ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '(Réponse vide)';

    typingEl.remove();
    appendMsg('ai', reply);
    history.push({ role: 'assistant', content: reply });
  } catch (err) {
    typingEl.remove();
    appendMsg('ai', "Désolé, je n'arrive pas à répondre pour le moment. Réessaie dans un instant ou passe par la page Contact.");
    console.error('Mistral API error:', err);
  } finally {
    sendBtn.disabled = false;
    inputEl.focus();
  }
}
