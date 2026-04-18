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

// ── Noms des tables de tirage ─────────────────────────────────────────────────────
// 14 tables de noms (2 par race) + 7 tables de description (1 par race)
// + 1 table de tics + 1 table de détails = 23 tables au total
const TABLE_NAMES = {
  nom: {
    humain:       { m: "DHNPC | Noms | Humain | Masculin",       f: "DHNPC | Noms | Humain | Féminin"       },
    nain:         { m: "DHNPC | Noms | Nain | Masculin",         f: "DHNPC | Noms | Nain | Féminin"         },
    elfe:         { m: "DHNPC | Noms | Elfe | Masculin",         f: "DHNPC | Noms | Elfe | Féminin"         },
    drakeide:     { m: "DHNPC | Noms | Drakeide | Masculin",     f: "DHNPC | Noms | Drakeide | Féminin"     },
    fee:          { m: "DHNPC | Noms | Fée | Masculin",          f: "DHNPC | Noms | Fée | Féminin"          },
    animorphe:    { m: "DHNPC | Noms | Animorphe | Masculin",    f: "DHNPC | Noms | Animorphe | Féminin"    },
    gueule_libre: { m: "DHNPC | Noms | Gueule Libre | Masculin", f: "DHNPC | Noms | Gueule Libre | Féminin" },
  },
  description: {
    humain:       "DHNPC | Description | Humain",
    nain:         "DHNPC | Description | Nain",
    elfe:         "DHNPC | Description | Elfe",
    drakeide:     "DHNPC | Description | Drakeide",
    fee:          "DHNPC | Description | Fée",
    animorphe:    "DHNPC | Description | Animorphe",
    gueule_libre: "DHNPC | Description | Gueule Libre",
  },
  tic:    "DHNPC | Tics de Langage",
  detail: "DHNPC | Détails Intéressants",
};

// Liste à plat de tous les noms de tables
const ALL_TABLE_NAMES = [
  ...Object.values(TABLE_NAMES.nom).flatMap(r => [r.m, r.f]),
  ...Object.values(TABLE_NAMES.description),
  TABLE_NAMES.tic,
  TABLE_NAMES.detail,
];

// ── Création / recréation des tables de tirage ───────────────────────────────────
// Les noms sont lus depuis npc-data.js (constante NOMS).
// Les descriptions restent vides : à remplir dans l'interface Foundry.
// Pour mettre à jour les tables après avoir édité npc-data.js,
// cliquer sur « Recréer les tables » dans le formulaire du générateur.

function makeResults(entries) {
  const resultType = CONST.TABLE_RESULT_TYPES?.TEXT ?? 0;
  if (!entries?.length) {
    return [{ type: resultType, text: "—", range: [1, 1], drawn: false }];
  }
  return entries.map((text, i) => ({
    type: resultType, text, range: [i + 1, i + 1], drawn: false,
  }));
}

// Associe chaque nom de table à son contenu initial.
// ──────────────────────────────────────────────────────────────────────────────────
// Pour ajouter vos noms : éditez la constante NOMS dans scripts/npc-data.js,
// puis cliquez sur « Recréer les tables » dans le générateur.
// ──────────────────────────────────────────────────────────────────────────────────
function buildTableContents() {
  const contents = {};

  // Noms — remplis depuis NOMS dans npc-data.js
  for (const [race, genders] of Object.entries(TABLE_NAMES.nom)) {
    contents[genders.m] = NOMS[race]?.m ?? [];
    contents[genders.f] = NOMS[race]?.f ?? [];
  }

  // Descriptions — vides (à remplir manuellement dans Foundry)
  for (const name of Object.values(TABLE_NAMES.description)) {
    contents[name] = [];
  }

  // Tics et détails — remplis depuis npc-data.js
  contents[TABLE_NAMES.tic]    = TICS_LANGAGE;
  contents[TABLE_NAMES.detail] = DETAILS_INTERESSANTS;

  return contents;
}

async function ensureTables() {
  if (!game.user.isGM) return;

  let folder = game.folders.find(f => f.name === "Daggerheart NPC Generator" && f.type === "RollTable");
  if (!folder) {
    folder = await Folder.create({
      name: "Daggerheart NPC Generator",
      type: "RollTable",
      color: "#c9a84c",
    });
  }

  const existing = new Set(game.tables.map(t => t.name));
  const missing  = ALL_TABLE_NAMES.filter(name => !existing.has(name));
  if (!missing.length) return;

  const contents = buildTableContents();
  await RollTable.createDocuments(missing.map(name => {
    const results = makeResults(contents[name]);
    return {
      name,
      formula: `1d${results.length}`,
      folder: folder.id,
      replacement: true,
      displayRoll: false,
      results,
    };
  }));

  ui.notifications.info(
    `Daggerheart NPC Generator | ${missing.length} table(s) créée(s) dans « Daggerheart NPC Generator ».`
  );
}

// Supprime toutes les tables DHNPC puis les recrée depuis npc-data.js.
// À utiliser après avoir modifié les tableaux de noms dans le code.
async function recreateTables() {
  if (!game.user.isGM) return;
  const toDelete = game.tables.filter(t => ALL_TABLE_NAMES.includes(t.name));
  if (toDelete.length) {
    await RollTable.deleteDocuments(toDelete.map(t => t.id));
  }
  await ensureTables();
  ui.notifications.info("Daggerheart NPC Generator | Tables recréées depuis npc-data.js.");
}

// ── Tirage sur une table (retourne null si vide → fallback) ──────────────────────
async function rollTable(name) {
  const table = game.tables.find(t => t.name === name);
  if (!table || table.results.size === 0) return null;
  try {
    const { results } = await table.roll();
    const text = results?.[0]?.text?.trim();
    return (text && text !== "—") ? text : null;
  } catch {
    return null;
  }
}

// ── Génération de la description physique (fallback si table vide) ───────────────
function buildDescription(race, sexe) {
  const e  = sexe === "f" ? "e" : "";
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

  const statures = {
    humain: ["de taille moyenne","grand"+e,"petit"+e,"de haute stature"],
    nain:   ["trapu"+e+" et robuste","compact"+e+" et musculeux(se)","court"+e+" sur pattes mais large d'épaules","solide comme un pilier"],
    elfe:   ["élancé"+e+" et gracieux(se)","d'une finesse presque irréelle","grand"+e+" et léger"+e+" comme une plume","mince et longiligne"],
  };
  const stature = pick(statures[race] ?? statures.humain);
  const cheveux = pick(CHEVEUX_COULEUR[race] ?? CHEVEUX_COULEUR.humain);
  const yeux    = pick(COULEURS_YEUX[race]   ?? COULEURS_YEUX.humain);
  const trait   = pick(TRAITS_DISTINCTIFS);
  return `Personnage ${stature}, aux cheveux ${cheveux} et aux yeux ${yeux}. On remarque ${trait}.`;
}

// ── Génération complète du PNJ ───────────────────────────────────────────────────
// Chaque champ essaie la table de tirage correspondante en priorité.
// Si la table est vide (entrée "—") ou absente, fallback sur les données codées.
async function generateNPC(sexePref, racePref) {
  const race      = racePref === "aleatoire" ? pick(RACES) : racePref;
  const sexe      = sexePref === "aleatoire" ? pick(["m","f"]) : sexePref;
  const sexeLabel = sexe === "m" ? "Masculin" : "Féminin";

  const nom = await rollTable(TABLE_NAMES.nom[race]?.[sexe])
    ?? pick(NOMS[race]?.[sexe] ?? NOMS.humain[sexe]);

  const ageRange = AGES[race] ?? AGES.humain;
  const age      = randInt(ageRange.min, ageRange.max);

  const description = await rollTable(TABLE_NAMES.description[race])
    ?? buildDescription(race, sexe);

  const tic    = await rollTable(TABLE_NAMES.tic)    ?? pick(TICS_LANGAGE);
  const detail = await rollTable(TABLE_NAMES.detail) ?? pick(DETAILS_INTERESSANTS);

  return {
    nom, race, raceLabel: RACE_LABELS[race] ?? race,
    sexe, sexeLabel, age, description, tic, detail,
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

// ── Ouvrir le générateur ─────────────────────────────────────────────────────────
function openGenerator() {
  new NPCGeneratorApp().render(true);
}

// ── Application ──────────────────────────────────────────────────────────────────
class NPCGeneratorApp extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id:        "daggerheart-npc-generator",
      title:     "Générateur de PNJ — Daggerheart",
      template:  "modules/daggerheart-npc-generator/templates/generator.hbs",
      width:     360,
      height:    "auto",
      resizable: false,
    });
  }

  getData() { return {}; }

  activateListeners(html) {
    super.activateListeners(html);

    html.find("#dhnpc-generate").on("click", async (ev) => {
      ev.preventDefault();
      const btn = html.find("#dhnpc-generate");
      btn.prop("disabled", true).find("i").attr("class", "fas fa-spinner fa-spin");
      try {
        const sexe = html.find('[name="sexe"]').val();
        const race = html.find('[name="race"]').val();
        await createJournalEntry(await generateNPC(sexe, race));
      } finally {
        btn.prop("disabled", false).find("i").attr("class", "fas fa-dice");
      }
    });

    html.find("#dhnpc-recreate").on("click", async (ev) => {
      ev.preventDefault();
      const btn = html.find("#dhnpc-recreate");
      btn.prop("disabled", true).find("i").attr("class", "fas fa-spinner fa-spin");
      try {
        await recreateTables();
      } finally {
        btn.prop("disabled", false).find("i").attr("class", "fas fa-sync");
      }
    });
  }
}

// ── Injection du bouton dans la barre latérale ───────────────────────────────────
function addGeneratorButton(app, html) {
  if (!game.user.isGM) return;

  const root = (html instanceof jQuery) ? html[0] : html;
  if (!root) return;
  if (root.querySelector(".dhnpc-btn")) return;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "dhnpc-btn";
  btn.innerHTML = `<i class="fas fa-user-plus"></i> Générer un PNJ`;
  btn.addEventListener("click", openGenerator);

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

Hooks.once("ready", async () => {
  game.daggerheartNPCGenerator = { open: openGenerator };
  await ensureTables();
});

Hooks.on("renderJournalDirectory", addGeneratorButton);
Hooks.on("renderJournalEntries",   addGeneratorButton);
