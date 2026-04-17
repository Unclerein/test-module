import {
  NOMS, AGES,
  INSECTES, ANIMAUX_TETE, ANIMAUX_CORPS,
  COULEURS_YEUX, CHEVEUX_COULEUR, COULEURS_ECAILLES,
  TRAITS_DISTINCTIFS,
  TICS_LANGAGE,
  DETAILS_INTERESSANTS,
} from "./npc-data.js";

// ── Utilitaires ──────────────────────────────────────────────────────────────────
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ── Constantes ───────────────────────────────────────────────────────────────────
const RACES = ["humain","nain","elfe","drakeide","fee","animorphe","gueule_libre"];

const RACE_LABELS = {
  humain:       "Humain(e)",
  nain:         "Nain(e)",
  elfe:         "Elfe",
  drakeide:     "Drakeide",
  fee:          "Fée",
  animorphe:    "Animorphe",
  gueule_libre: "Gueule Libre",
};

// ── Génération de la description physique ────────────────────────────────────────
function buildDescription(race, sexe) {
  const e = sexe === "f" ? "e" : "";
  const il = sexe === "m" ? "Il" : "Elle";

  if (race === "gueule_libre") {
    const animal = pick(ANIMAUX_CORPS);
    const yeux   = pick(COULEURS_YEUX.gueule_libre);
    const pelage = pick(["sombre et lustré","clair et fourni","tacheté","strié de gris","d'un roux vif","uniforme et dense"]);
    return `${il} est un${e} ${animal} intelligent${e}, doué${e} de parole et d'une raison égale à celle des humanoïdes. Son pelage ou plumage est ${pelage}, et ses yeux ${yeux} trahissent une intelligence vive. ${il} se déplace avec une aisance surprenante, oscillant selon les situations entre instinct animal et posture civilisée.`;
  }

  if (race === "animorphe") {
    const animal  = pick(ANIMAUX_TETE);
    const feature = pick(["une queue touffue","des griffes rétractiles","des oreilles dressées très expressives","un pelage court sur les avant-bras","une fine fourrure sur la nuque"]);
    const trait   = pick(TRAITS_DISTINCTIFS);
    const yeux    = pick(COULEURS_YEUX.animorphe);
    return `Corps humanoïde athlétique surmonté d'une tête de ${animal} aux yeux ${yeux}. ${il} possède également ${feature}, héritage de sa nature animale. On remarque aussi ${trait}.`;
  }

  if (race === "fee") {
    const insecte = pick(INSECTES);
    const aile    = pick(["des ailes translucides aux reflets arc-en-ciel","une paire d'élytres rigides","de fines ailes membraneuses","des ailes tachetées comme celles d'un papillon","des ailes d'un noir profond"]);
    const detail  = pick(["des antennes sensibles qui frémissent en permanence","une carapace partielle sur les épaules et le dos","des reflets chitineux sur la peau","de fins membres supplémentaires atrophiés dans le dos"]);
    const yeux    = pick(COULEURS_YEUX.fee);
    const trait   = pick(TRAITS_DISTINCTIFS);
    return `Hybride humanoïde d'${insecte}, fluet${e} et d'une légèreté déconcertante. ${il} arbore ${aile} ainsi que ${detail}. Ses yeux sont ${yeux}. On remarque par ailleurs ${trait}.`;
  }

  if (race === "drakeide") {
    const ecailles = pick(COULEURS_ECAILLES);
    const yeux     = pick(COULEURS_YEUX.drakeide);
    const stature  = pick(["imposant"+e+" et musculeux(se)","massif"+e+" comme un roc","grand"+e+" et puissant"+e,"de stature intimidante"]);
    const trait    = pick(TRAITS_DISTINCTIFS);
    return `Drakeide ${stature}, aux écailles ${ecailles} et aux yeux ${yeux}. Sa queue et ses crêtes dorsales bougent légèrement selon son humeur. On note également ${trait}.`;
  }

  // Humain, nain, elfe
  const statures = {
    humain: ["de taille moyenne","grand"+e,"petit"+e,"de haute stature"],
    nain:   ["trapu"+e+" et robuste","compact"+e+" et musculeux(se)","court"+e+" sur pattes mais large d'épaules","solide comme un pilier"],
    elfe:   ["élancé"+e+" et gracieux(se)","d'une finesse presque irréelle","grand"+e+" et léger"+e+" comme une plume","mince et longiligne"],
  };

  const stature  = pick(statures[race] ?? statures.humain);
  const cheveux  = pick(CHEVEUX_COULEUR[race] ?? CHEVEUX_COULEUR.humain);
  const yeux     = pick(COULEURS_YEUX[race]   ?? COULEURS_YEUX.humain);
  const trait    = pick(TRAITS_DISTINCTIFS);
  return `Personnage ${stature}, aux cheveux ${cheveux} et aux yeux ${yeux}. On remarque ${trait}.`;
}

// ── Génération complète du PNJ ───────────────────────────────────────────────────
function generateNPC(sexePref, racePref) {
  const race     = racePref === "aleatoire" ? pick(RACES) : racePref;
  const sexe     = sexePref === "aleatoire" ? pick(["m","f"]) : sexePref;
  const sexeLabel = sexe === "m" ? "Masculin" : "Féminin";

  const pool = NOMS[race]?.[sexe] ?? NOMS.humain[sexe];
  const nom  = pick(pool);

  const ageRange = AGES[race] ?? AGES.humain;
  const age      = randInt(ageRange.min, ageRange.max);

  return {
    nom,
    race,
    raceLabel:  RACE_LABELS[race] ?? race,
    sexe,
    sexeLabel,
    age,
    description: buildDescription(race, sexe),
    tic:         pick(TICS_LANGAGE),
    detail:      pick(DETAILS_INTERESSANTS),
  };
}

// ── Création de l'entrée de journal ─────────────────────────────────────────────
async function createJournalEntry(npc) {
  const content = `\
<table>
  <tbody>
    <tr><td><strong>Sexe</strong></td><td>${npc.sexeLabel}</td></tr>
    <tr><td><strong>Race</strong></td><td>${npc.raceLabel}</td></tr>
    <tr><td><strong>Âge</strong></td><td>${npc.age} ans</td></tr>
  </tbody>
</table>

<h3>Apparence</h3>
<p>${npc.description}</p>

<h3>Manière de parler</h3>
<p>${npc.tic}</p>

<h3>Détail intéressant</h3>
<p>${npc.detail}</p>`;

  const entry = await JournalEntry.create({
    name: npc.nom,
    pages: [{
      name: npc.nom,
      type: "text",
      title: { show: false },
      text: { content, format: 1 },
    }],
  });

  entry.sheet.render(true);
  ui.notifications.info(`PNJ « ${npc.nom} » généré avec succès.`);
}

// ── Application ──────────────────────────────────────────────────────────────────
class NPCGeneratorApp extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id:       "daggerheart-npc-generator",
      title:    "Générateur de PNJ — Daggerheart",
      template: "modules/daggerheart-npc-generator/templates/generator.hbs",
      width:    360,
      height:   "auto",
      resizable: false,
    });
  }

  getData() {
    return {};
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find("#dhnpc-generate").on("click", async (ev) => {
      ev.preventDefault();
      const btn  = html.find("#dhnpc-generate");
      btn.prop("disabled", true).find("i").attr("class","fas fa-spinner fa-spin");

      try {
        const sexe = html.find('[name="sexe"]').val();
        const race = html.find('[name="race"]').val();
        await createJournalEntry(generateNPC(sexe, race));
      } finally {
        btn.prop("disabled", false).find("i").attr("class","fas fa-dice");
      }
    });
  }
}

// ── Ouvrir le générateur (singleton) ────────────────────────────────────────────
function openGenerator() {
  new NPCGeneratorApp().render(true);
}

// ── Injection du bouton dans la barre latérale ───────────────────────────────────
function addGeneratorButton(app, html) {
  if (!game.user.isGM) return;

  // html peut être un objet jQuery (v11/v12) ou un HTMLElement (v13+)
  const root = (html instanceof jQuery) ? html[0] : html;
  if (!root) return;
  if (root.querySelector(".dhnpc-btn")) return;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "dhnpc-btn";
  btn.innerHTML = `<i class="fas fa-user-plus"></i> Générer un PNJ`;
  btn.addEventListener("click", openGenerator);

  // Essai dans l'ordre : footer dédié → footer générique → boutons d'action → racine
  const target =
    root.querySelector(".directory-footer") ??
    root.querySelector("footer") ??
    root.querySelector(".header-actions") ??
    root.querySelector(".action-buttons") ??
    root;

  target.prepend(btn);
}

// ── Hooks ────────────────────────────────────────────────────────────────────────
Hooks.once("init", () => {
  console.log("Daggerheart NPC Generator | Initialisé.");

  // Raccourci clavier configurable (Contrôles → Daggerheart NPC Generator)
  game.keybindings.register("daggerheart-npc-generator", "openGenerator", {
    name: "Ouvrir le Générateur de PNJ",
    hint: "Ouvre le formulaire de génération de PNJ Daggerheart",
    editable: [{ key: "KeyG", modifiers: ["Alt"] }],
    onDown: () => {
      if (!game.user.isGM) return false;
      openGenerator();
      return true;
    },
    restricted: true,
    precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
  });
});

Hooks.once("ready", () => {
  game.daggerheartNPCGenerator = { open: openGenerator };
});

// v11/v12 : hook jQuery classique
Hooks.on("renderJournalDirectory", addGeneratorButton);
// v13+ : si la sidebar migre vers ApplicationV2
Hooks.on("renderJournalEntries", addGeneratorButton);
