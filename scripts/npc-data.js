// ── Noms par race et sexe ────────────────────────────────────────────────────────
export const NOMS = {
  humain: {
    m: ["Aldric","Armand","Bastien","Bernard","Corvin","Dagobert","Edouard","Émile","Faolan","Gareth","Hugo","Ivar","Joris","Luca","Mathis","Noël","Oskar","Pierre","Quentin","Renaud","Sébastien","Thierry","Ulric","Vincent","Wulfric"],
    f: ["Adèle","Ambre","Béatrice","Brigitte","Céleste","Coralie","Diane","Doriane","Élise","Émeline","Fauna","Gisèle","Héloïse","Iris","Jana","Katell","Léonie","Margot","Nadia","Odile","Pauline","Renée","Solène","Thérèse","Vivienne"],
  },
  nain: {
    m: ["Bofur","Brumdar","Dolgrin","Falgur","Gromnir","Grimnir","Haldor","Harbek","Kettrar","Kildrak","Lodur","Morgran","Morndin","Norgrim","Orsik","Peldur","Ragnor","Thordak","Ulaar","Veit"],
    f: ["Amber","Bofri","Brunhild","Dagnal","Freydis","Geira","Gunnloda","Helga","Hilda","Ingrid","Kathra","Kjerstin","Lodrun","Mardred","Marta","Nargra","Oda","Riswynn","Torbera","Vistra"],
  },
  elfe: {
    m: ["Adran","Aelar","Aelius","Caelum","Calandor","Enialis","Erevain","Filarion","Galandel","Hadarai","Ilphelkiir","Immeral","Laucian","Mindartis","Paelias","Quarion","Rolen","Soveliss","Thamior","Varis"],
    f: ["Adrie","Aelindra","Alteria","Birel","Caelynn","Caladwen","Drusilia","Enna","Eriadne","Faral","Galadhiel","Illyria","Irann","Keyleth","Leshanna","Naivara","Quelenna","Sariel","Theirastra","Valanthe"],
  },
  drakeide: {
    m: ["Arjhan","Balasar","Bharash","Donaar","Draxis","Ghesh","Heskan","Kriv","Medrash","Mehen","Nadarr","Pandjed","Patrin","Rhogar","Shamash","Torinn","Vrinn","Xathos","Yazoth","Zeraan"],
    f: ["Akra","Biri","Daar","Daxara","Farideh","Harann","Havilar","Jheri","Kava","Korinn","Mishann","Nala","Perra","Raiann","Sora","Surina","Thava","Uadjit","Vanifer","Zara"],
  },
  fee: {
    m: ["Antèle","Brindal","Chitine","Chrysale","Diaphon","Élytron","Filion","Frisson","Gosselin","Lumen","Nectaire","Phaléon","Sérion","Tergal","Velox"],
    f: ["Antella","Brindille","Chitine","Chrysalie","Diaphane","Élytria","Filicelle","Frisselle","Gossamine","Lustrine","Mélisse","Nervure","Pétale","Sérène","Velours"],
  },
  animorphe: {
    m: ["Aldrac","Beron","Corvin","Dravec","Fauvel","Grimaude","Hurlon","Imrak","Joval","Krenn","Lunard","Mordrel","Nagrel","Orval","Perdrix"],
    f: ["Aldra","Berna","Corvine","Dravelle","Fauvelle","Grimelle","Hurla","Imrelle","Jovale","Krenna","Lunarde","Modrelle","Nagrelle","Orvale","Perdrine"],
  },
  gueule_libre: {
    m: ["Croc","Vieux-Os","Pelage","Longue-Oreille","Plume-Noire","Œil-Vif","Queue-Rousse","Museau","Croc-Franc","Poil-Ras","Langue-Vive","Patte-Grise"],
    f: ["Griffe-Fine","Plume","Croc-Blanc","Patte-Vive","Museau-Doux","Queue-Touffue","Œil-d'Or","Oreille-Légère","Douce-Morsure","Langue-Fine"],
  },
};

// ── Tranches d'âge par race ──────────────────────────────────────────────────────
export const AGES = {
  humain:       { min: 15,  max: 70  },
  nain:         { min: 40,  max: 350 },
  elfe:         { min: 100, max: 750 },
  drakeide:     { min: 12,  max: 75  },
  fee:          { min: 20,  max: 250 },
  animorphe:    { min: 14,  max: 65  },
  gueule_libre: { min: 3,   max: 22  },
};

// ── Animaux pour fées et animorphes ─────────────────────────────────────────────
export const INSECTES = [
  "fourmi","abeille","guêpe","papillon","scarabée",
  "mante religieuse","libellule","grillon","phasme","luciole","frelon","cigale",
];

export const ANIMAUX_TETE = [
  "loup","ours","renard","cerf","lapin","corbeau","chat","rat",
  "cheval","tigre","sanglier","lynx","bouc","aigle","loutre",
];

export const ANIMAUX_CORPS = [
  "chien","chat","rat","corbeau","renard","ours","serpent",
  "aigle","tortue","singe","lièvre","blaireau","castor","loutre","écureuil",
];

// ── Éléments de description physique ────────────────────────────────────────────
export const COULEURS_ECAILLES = ["vertes","rouges","bleues","noires","dorées","argentées","violettes","brunes","cuivrées","blanc nacré"];

export const COULEURS_YEUX = {
  humain:    ["bruns","verts","bleus","gris","noisette","noirs"],
  nain:      ["marron foncé","noirs","gris acier","ambre","brun doré"],
  elfe:      ["dorés","violets","argentés","bleu glacier","vert émeraude","bleu-gris","ambre pâle"],
  drakeide:  ["rouges","oranges","jaunes à pupille fendue","ambre","dorés à pupille fendue"],
  fee:       ["à facettes iridescentes","noirs et brillants comme des perles","composés et multicolores","d'un bleu électrique"],
  animorphe: ["perçants et animaux","d'un jaune vif","d'un brun profond","noirs et expressifs"],
  gueule_libre: ["vifs et intelligents","d'un ambre chaud","noirs et brillants","d'un vert lumineux"],
};

export const CHEVEUX_COULEUR = {
  humain:    ["noirs","châtains","blonds","roux","gris","blancs","bruns foncés","poivre et sel"],
  nain:      ["noirs","châtains","roux flamboyants","poivre et sel","blancs","brun foncé"],
  elfe:      ["argentés","dorés","noirs de jais","blanc platine","blond vénitien","cuivrés","noir bleuté"],
};

export const TRAITS_DISTINCTIFS = [
  "une longue cicatrice qui barre le visage",
  "des tatouages tribaux sur les avant-bras",
  "un œil de verre d'une couleur inhabituelle",
  "trois doigts manquants à la main gauche",
  "des cheveux prématurément blancs",
  "une légère claudication",
  "des taches de naissance formant une constellation sur le cou",
  "des dents en or",
  "une oreille partiellement arrachée",
  "des mains couvertes de brûlures anciennes",
  "un nez cassé mal ressoudé",
  "des yeux de deux couleurs différentes",
  "des lunettes épaisses retenues par une ficelle",
  "un sourire auquel il manque une dent de devant",
  "des runes tatouées sur tout le corps",
  "des rides profondes qui témoignent d'une vie difficile",
  "une perruque mal ajustée portée avec fierté",
  "des ongles toujours impeccablement manucurés malgré tout",
  "une voix inhabituellement grave pour son apparence",
  "un unique sourcil broussailleux barrant son front",
];

// ── Tics de langage ──────────────────────────────────────────────────────────────
export const TICS_LANGAGE = [
  "Ponctue chaque affirmation d'un « n'est-ce pas ? » en fixant l'interlocuteur dans les yeux.",
  "Parle d'elle/lui-même à la troisième personne sans s'en rendre compte.",
  "Ne termine jamais vraiment ses phrases, laissant un silence gêné à la place…",
  "Utilise des métaphores liées à la mer dans toutes les situations, même en pleine forêt.",
  "Siffle légèrement sur les 's' à cause d'un écart entre ses dents.",
  "Commence chaque phrase par « En vérité… » même pour les banalités les plus banales.",
  "Rit nerveusement entre chaque information importante.",
  "Répète le dernier mot de son interlocuteur avant de répondre.",
  "Ponctue ses explications de proverbes souvent mal cités ou purement inventés.",
  "Parle très lentement, comme si chaque mot coûtait une pièce d'or.",
  "Marmonne entre deux phrases audibles, l'air de tenir un dialogue intérieur animé.",
  "Utilise régulièrement le mauvais mot à la place du bon, sans s'en apercevoir.",
  "Fait de longues pauses dramatiques avant de dire des choses parfaitement anodines.",
  "Chuchote quand il/elle est enthousiaste et parle fort quand il/elle est calme.",
  "Conclut toute conversation par « Mais c'est votre problème, pas le mien. »",
  "Désigne toujours les gens par leur métier plutôt que leur prénom.",
  "Pose une question, puis se répond à lui/elle-même avant que l'autre puisse ouvrir la bouche.",
  "Emploie un vocabulaire très soutenu de façon aléatoire dans un discours par ailleurs très familier.",
  "Parle en rimes de façon inconsciente, et se trouble quand on le lui fait remarquer.",
  "Ponctue ses phrases d'un discret claquement de langue lorsqu'il/elle réfléchit.",
];

// ── Détails intéressants ─────────────────────────────────────────────────────────
export const DETAILS_INTERESSANTS = [
  "Collectionne les dents de toutes les créatures qu'il/elle a vaincues — et les porte en collier.",
  "Refuse catégoriquement de dormir sous un toit depuis un incident qu'il/elle ne raconte jamais.",
  "Est secrètement l'héritier(ère) d'une famille noble complètement ruinée.",
  "Peut lire sur les lèvres mais fait semblant de ne pas le savoir.",
  "Doit une somme astronomique à une organisation très dangereuse et pense que ça ne se saura jamais.",
  "A une peur panique des pigeons depuis l'enfance, sans aucune explication rationnelle.",
  "Tient un journal codé dans une écriture inventée dont il/elle est le/la seul(e) à connaître la clé.",
  "A un sosie parfait quelque part dans le monde — une situation qui lui a déjà causé de sérieux ennuis.",
  "Parle couramment six langues mais prétend n'en maîtriser que deux.",
  "A survécu à quelque chose que personne ne devrait survivre, et n'en parle jamais.",
  "Cuisine à merveille, ce qui détonne totalement avec son apparence intimidante.",
  "Entretient un accord tacite avec une organisation criminelle locale : ils se laissent tranquilles mutuellement.",
  "Cherche discrètement quelqu'un depuis des années, sans jamais l'expliquer.",
  "A perdu toute mémoire des cinq dernières années et reconstruit sa vie brique par brique.",
  "Est connu(e) sous un tout autre nom dans une ville voisine, pour des raisons qu'il/elle préfère taire.",
  "Possède un objet apparemment banal auquel il/elle tient davantage qu'à sa propre vie.",
  "Entretient une correspondance secrète avec quelqu'un dont il/elle ignore l'identité réelle.",
  "A autrefois trahi quelqu'un de proche et cherche à se racheter sans jamais l'admettre ouvertement.",
  "Connaît le moment et le lieu de sa propre mort d'après une prophétie qu'il/elle prend au sérieux.",
  "Peut identifier n'importe quelle plante ou champignon rien qu'à l'odeur, avec une précision déconcertante.",
];
