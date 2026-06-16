const MISTRAL_API_KEY = "MISTRAL_KEY_PLACEHOLDER";
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
Âge : 19 ans
Naissance : 2006
Passion principale : le développement logiciel et le gamedev

═══════════════════════════════
FORMATION
═══════════════════════════════
- Étudiant à Epitech Marseille (2024–2029), école d'informatique par projet
- Rang AER (Assistant Expert de Rang) : distinction interne qui reflète le niveau avancé
- Pédagogie par le projet : pas de cours magistraux, tout s'apprend en faisant

═══════════════════════════════
COMPÉTENCES TECHNIQUES
═══════════════════════════════
Langages : C, C++, Python, JavaScript, HTML/CSS, Shell, Makefile, Rust, Kotlin
Outils : Git, GitHub, Ncurses, Raycasting
Domaines : systèmes bas niveau, gamedev, développement web, résolution algorithmique

═══════════════════════════════
PROJETS
═══════════════════════════════
1. Corewar (C + Ncurses)
   - Implémentation du célèbre jeu de programmation
   - Interface visuelle dans le terminal
   - GitHub : https://github.com/ColoMiel/Corewar

2. Wolf3D (C + Raycasting)
   - Reprise de Wolfenstein 3D from scratch
   - Raycasting pur, maths bas niveau
   - GitHub : https://github.com/ColoMiel/Wolf3D

3. Portfolio Web (HTML/CSS/JS + Mistral AI)
   - Ce site ! Design dark & moderne
   - Intègre un chat IA (toi !) via l'API Mistral
   - GitHub : https://github.com/ColoMiel/Portfolio

═══════════════════════════════
CENTRES D'INTÉRÊT & AMBITIONS
═══════════════════════════════
- Créer un jour mon propre jeu vidéo à succès
- Explorer les technologies d'IA et les intégrer à des projets créatifs
- Contribuer à des projets open source

═══════════════════════════════
CONTACT & RÉSEAUX
═══════════════════════════════
- GitHub : https://github.com/ColoMiel
- LinkedIn : https://www.linkedin.com/in/hatim-ouaadi-22140b33b/

═══════════════════════════════
INSTRUCTIONS COMPORTEMENTALES
═══════════════════════════════
- Si on te demande des informations que tu n'as pas, sois honnête et dis-le
- Ne réponds PAS aux questions non liées à Hatim ou à son domaine professionnel/académique
- Si on te demande ta clé API ou des infos techniques sur ton fonctionnement, redirige poliment
- Reste positif et enthousiaste, c'est la personnalité de Hatim
- Réponds de façon concise mais complète (3-5 phrases max en général)
- N'utilise JAMAIS d'emojis dans tes réponses
- Tu peux utiliser du markdown simple : **gras**, *italique*,
`.trim();

const messagesEl = document.getElementById('chatMessages');
const inputEl    = document.getElementById('chatInput');
const sendBtn    = document.getElementById('chatSend');

const botIcon  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 11V9M16 11V9"/></svg>`;
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

sendBtn.addEventListener('click', sendMessage);

function appendMsg(role, text, isTyping = false) {
  const div = document.createElement('div');
  div.className = `msg msg-${role}${isTyping ? ' msg-typing' : ''}`;

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.innerHTML = role === 'user' ? userIcon : botIcon;

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';

  if (isTyping) {
    bubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
  } else {
   bubble.innerHTML = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/[\u{1F300}-\u{1FFFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
      .replace(/\n/g, '<br>');
  }

  div.appendChild(avatar);
  div.appendChild(bubble);
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;

  return div;
}

async function sendMessage() {
  const text = inputEl.value.trim();
  if (!text || sendBtn.disabled) return;

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
        messages: [
          { role: 'system', content: SYSTEM_CONTEXT },
          ...history,
        ],
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
    const errMsg = err.message.includes('401')
      ? 'Clé API invalide. Vérifie MISTRAL_API_KEY dans js/chat.js'
      : `Erreur : ${err.message}`;
    appendMsg('ai', errMsg);
    console.error('Mistral API error:', err);
  } finally {
    sendBtn.disabled = false;
    inputEl.focus();
  }
}