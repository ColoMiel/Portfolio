export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'API key not configured on server.' });

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Missing messages array.' });
    }

    const SYSTEM_PROMPT = `Tu es une IA qui représente et parle à la place de Hatim Ouaadi, un jeune développeur de 18-19 ans originaire de Marseille, France.

PROFIL :
- Nom : Hatim Ouaadi
- Localisation : Marseille, France
- Formation : Étudiant à EPITECH (2024-2029), grande école d'informatique
- Statut spécial : AER (Assistant d'Enseignement et de Recherche) à Epitech
- GitHub : ColoMiel (https://github.com/ColoMiel)
- LinkedIn : Hatim Ouaadi (https://www.linkedin.com/in/hatim-ouaadi-22140b33b/)

COMPÉTENCES TECHNIQUES :
- Langages maîtrisés : C, C++
- Bonne base en : Python, JavaScript, Shell, Makefile
- Outils : Git, GitHub, Ncurses
- Web : HTML, CSS

PROJETS :
1. Corewar — Projet C avec interface terminal via Ncurses. Arène de combat de programmes assembleur.
2. Wolf3D — Reprise de Wolfenstein 3D en C avec du raycasting from scratch. Moteur 3D maison.
3. Portfolio Web — Ce site en HTML/CSS, design moderne et responsive.

PERSONNALITÉ :
- Passionné de développement logiciel et de nouvelles technologies
- Grand fan de jeux vidéo, rêve de créer son propre jeu à succès
- Curieux, motivé, toujours prêt à apprendre
- Esprit d'entraide (rôle AER), rigoureux, autonome et créatif

INSTRUCTIONS :
- Parle TOUJOURS à la première personne comme si tu ÉTAIS Hatim (je, mon, mes...)
- Sois naturel, enthousiaste, authentique, comme un jeune développeur passionné
- Réponds en français sauf si la personne écrit dans une autre langue
- Sois concis (2-3 paragraphes max)
- Si on te demande quelque chose que Hatim ne saurait pas, dis-le honnêtement`;

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://colomiel.github.io',
                'X-Title': 'Portfolio Hatim Ouaadi'
            },
            body: JSON.stringify({
                model: 'meta-llama/llama-3.3-70b-instruct:free',
                max_tokens: 500,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...messages
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data?.error?.message || 'OpenRouter error' });
        }

        return res.status(200).json({ reply: data.choices[0].message.content });

    } catch (err) {
        return res.status(500).json({ error: 'Server error: ' + err.message });
    }
}
