/* Tema 03 · When to use "THE" — basado en la lección "When to Use THE" (Modern English Classes · NeuroEnglish® Method).
   Ruta: entender → pronunciar → leer → repetir → practicar de menor a mayor dificultad. */
(function () {
const Q = App.Q;

/* Ayudantes de escritura */
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const fullOf = (s, w) => cap(s.replace("___", w).replace(/\s+/g, " ").trim());
/* E("I (am studying/study) for the exam")  → todas las variantes válidas; "(/to )" = parte opcional */
const E = (s) => {
  const re = /\(([^()]*)\)/; let outs = [s];
  while (outs.some(x => re.test(x))) outs = outs.flatMap(x => re.test(x) ? x.match(re)[1].split("/").map(a => x.replace(re, a)) : [x]);
  return [...new Set(outs.map(x => x.replace(/\s+/g, " ").trim()))];
};
/* GE: ¿general o específico? */
const GE = (s, general, why) => Q.mcq(s, ["General (sin the)", "Específico (con the)"], general ? 0 : 1, why, { fixed: true, full: s });
/* T: ¿the o nada? */
const T = (s, the, why) => Q.mcq(s, ["the", "— (nada)"], the ? 0 : 1, why, { fixed: true, full: fullOf(s, the ? "the" : "") });
/* ART: a / an / the / nada */
const ART = (s, w, why) => Q.mcq(s, ["a", "an", "the", "— (nada)"], { a: 0, an: 1, the: 2, "": 3 }[w], why, { fixed: true, full: fullOf(s, w) });
/* F: completar escribiendo */
const F = (s, w, why, hint) => Q.fill(s, [w], why, { full: fullOf(s, w), hint });
/* P: elegir entre dos frases completas */
const P = (q, good, bad, why) => { const first = Math.random() < 0.5; return Q.mcq(q, first ? [good, bad] : [bad, good], first ? 0 : 1, why, { fixed: true, full: good }); };

App.defineTopic({
  id: "when-to-use-the",
  order: 3,
  unit: "Gramática avanzada",
  title: "When to use THE",
  level: "A2–B2",
  minutes: 75,
  summary: "General o específico: cuándo SÍ y cuándo NO usar the. Por qué en español decimos «la vida» y en inglés solo Life, y cómo decidir en segundos con una sola pregunta.",

  words: {
    "lifelong": ["ˈlaɪflɔːŋ", "de toda la vida"],
    "loyal": ["ˈlɔɪəl", "leal"],
    "biology": ["baɪˈɑːlədʒi", "biología"],
    "politics": ["ˈpɑːlətɪks", "política"],
    "election": ["ɪˈlɛkʃən", "elección"],
    "accident": ["ˈæksɪdənt", "accidente"],
    "Netherlands": ["ˈnɛðɚləndz", "Países Bajos"],
    "Philippines": ["ˈfɪləpiːnz", "Filipinas"],
    "Pacific": ["pəˈsɪfɪk", "Pacífico"],
    "Amazon": ["ˈæməzɑːn", "Amazonas"],
    "Caribbean": ["ˌkærəˈbiːən", "Caribe"],
    "mayor": ["ˈmeɪɚ", "alcalde"],
    "united": ["juˈnaɪtəd", "unido"],
    "states": ["steɪts", "estados"],
    "umbrella": ["ʌmˈbrɛlə", "paraguas"],
    "university": ["ˌjuːnəˈvɝːsəti", "universidad"],
    "honest": ["ˈɑːnəst", "honesto"],
    "hour": ["ˈaʊɚ", "hora"],
    "engineer": ["ˌɛndʒəˈnɪr", "ingeniero/a"],
    "airport": ["ˈɛrpɔːrt", "aeropuerto"],
    "concert": ["ˈkɑːnsɚt", "concierto"],
    "vacation": ["veɪˈkeɪʃən", "vacaciones"],
    "manager": ["ˈmænɪdʒɚ", "gerente"],
    "nurse": ["nɝːs", "enfermero/a"],
    "importance": ["ɪmˈpɔːrtns", "importancia"],
    "education": ["ˌɛdʒuˈkeɪʃən", "educación"],
    "vocabulary": ["voʊˈkæbjəlɛri", "vocabulario"],
    "confidence": ["ˈkɑːnfɪdəns", "confianza (en uno mismo)"],
    "specific": ["spəˈsɪfɪk", "específico"],
    "general": ["ˈdʒɛnrəl", "general"],
    "section": ["ˈsɛkʃən", "sección"],
    "exam": ["ɪɡˈzæm", "examen"],
    "homework": ["ˈhoʊmwɝːk", "tarea"],
    "pizza": ["ˈpiːtsə", "pizza"],
    "tennis": ["ˈtɛnɪs", "tenis"],
    "soccer": ["ˈsɑːkɚ", "fútbol"],
    "breakfast": ["ˈbrɛkfəst", "desayuno"],
    "dinner": ["ˈdɪnɚ", "cena"],
    "math": ["mæθ", "matemáticas"],
    "traffic": ["ˈtræfɪk", "tráfico"],
    "internet": ["ˈɪntɚnɛt", "internet"],
    "amazing": ["əˈmeɪzɪŋ", "increíble; asombroso"],
    "bitter": ["ˈbɪtɚ", "amargo"],
    "bright": ["braɪt", "brillante"],
    "cali": ["ˈkɑːli", "Cali (ciudad de Colombia)"],
    "degree": ["dɪˈɡriː", "título; grado"],
    "favorite": ["ˈfeɪvərɪt", "favorito"],
    "finish": ["ˈfɪnɪʃ", "terminar"],
    "noisy": ["ˈnɔɪzi", "ruidoso"],
    "ocean": ["ˈoʊʃən", "océano"],
    "useful": ["ˈjuːsfəl", "útil"]
  },

  sections: [
    /* ═════════════ 1. IDEA CENTRAL ═════════════ */
    {
      id: "idea", title: "Idea central",
      blocks: [
        { type: "p", es: "En español usamos *el, la, los, las* casi todo el tiempo, **incluso cuando hablamos de ideas en general**: *la vida es dura, me gusta el café, el inglés es importante*. Tu cerebro, que piensa en español, pone **the** en cada una. Pero el inglés **no hace eso**." },
        { type: "h", h: "Tu cerebro y el “the”" },
        { type: "table", head: ["Lo que dices en español", "Lo que arma tu cerebro", "Lo que dice el inglés"], rows: [
          ["La vida es dura", "✗ {{The life is hard}}", "✓ **{{Life is hard}}**"],
          ["Me gusta el café", "✗ {{I like the coffee}}", "✓ **{{I like coffee}}**"],
          ["El inglés es importante", "✗ {{The English is important}}", "✓ **{{English is important}}**"],
          ["Hablar inglés es difícil", "✗ {{The speaking English is difficult}}", "✓ **{{Speaking English is difficult}}**"]] },
        { type: "callout", kind: "key", title: "Idea central", es: "En español el artículo acompaña casi todo. En inglés **the se reserva para algo específico**: uno concreto que tú y yo ya sabemos cuál es. Si hablas de la idea **en general**, no lleva nada." },
        { type: "callout", kind: "note", title: "No es un error de inteligencia", es: "Tu versión se entiende perfectamente, pero **suena a traducción**. Lo que ocurre es que tu cerebro usa el *paquete del español*. Aquí aprenderás el *paquete nuevo*." },
        { type: "h", h: "Mira la diferencia: misma palabra, dos significados" },
        { type: "table", head: ["General (sin the)", "Específico (con the)"], rows: [
          ["{{Life is hard.}} — la vida, en general", "{{The life of a nurse is hard.}} — la vida de **esa** enfermera"],
          ["{{I like coffee.}} — me gusta el café, el sabor, la bebida", "{{I like the coffee in this café.}} — **ese** café concreto"],
          ["{{Dogs are loyal animals.}} — los perros, como especie", "{{The dogs next door are noisy.}} — **esos** perros, los de al lado"]] },
        { type: "exercises", id: "chk1", title: "Comprueba: la idea central", intro: "5 preguntas rápidas antes de seguir.", items: [
          Q.mcq("¿Cómo se dice «La vida es dura» (en general)?", ["The life is hard.", "Life is hard."], 1, "Idea **general** → sin *the*.", { fixed: true, full: "Life is hard." }),
          Q.mcq("¿Cómo se dice «Me gusta el café» (en general)?", ["I like the coffee.", "I like coffee."], 1, "Gusto **general** → sin *the*.", { fixed: true, full: "I like coffee." }),
          Q.mcq("¿Para qué se reserva **the** en inglés?", ["Para todos los sustantivos", "Para algo específico que ambos conocemos", "Para los verbos en -ing"], 1, "**The** = uno concreto que los dos sabemos cuál es."),
          Q.tf("«The English is important» es la forma natural de decir que el inglés es importante.", false, "Debe ser *English is important*: los idiomas van **sin the**."),
          Q.mcq("¿Por qué «suena a traducción» una frase como *The life is hard*?", ["Porque tiene errores de vocabulario", "Porque tu cerebro usa el paquete del español", "Porque falta un verbo"], 1, "No hay error de vocabulario: es el **paquete del español** (artículo en todo).")
        ] }
      ]
    },

    /* ═════════════ 2. LA REGLA DE ORO ═════════════ */
    {
      id: "rule", title: "La regla de oro",
      blocks: [
        { type: "h", h: "Antes de escribir the, una sola pregunta" },
        { type: "callout", kind: "key", title: "Pregunta de control: ¿cuál?", es: "¿Podría alguien preguntarme **«¿cuál?»** y yo respondería con **uno en concreto que los dos conocemos**?\n\n✓ **Sí**, es uno concreto → **the**\n✗ **No**, hablo de la idea en general → **sin the**" },
        { type: "h", h: "Las 4 situaciones en que sí va THE" },
        { type: "table", head: ["Situación", "Ejemplo", "Significado"], rows: [
          ["1. Ya lo mencionamos", "{{I have a dog. The dog is friendly.}}", "tengo un perro. **El** perro (ese) es amigable"],
          ["2. La misma frase dice cuál", "{{The book on the table is mine.}}", "el libro (el que está en la mesa) es mío"],
          ["3. Solo hay uno", "{{The sun is bright.}} · {{The internet is down.}}", "el sol · el internet"],
          ["4. Los dos sabemos cuál (la situación lo dice)", "{{Please close the door.}}", "cierra la puerta (la de este lugar)"]] },
        { type: "callout", kind: "tip", title: "Un truco: la primera vez, a; la segunda, the", es: "{{I have a dog.}} (primera vez, uno cualquiera) → {{The dog is friendly.}} (segunda vez, ya sabemos cuál)." },
        { type: "h", h: "Tres opciones, no dos" },
        { type: "p", es: "Para decidir bien hay **tres** posibilidades, no solo «the» o «nada»:" },
        { type: "table", head: ["Opción", "Cuándo", "Ejemplo"], rows: [
          ["**the**", "algo específico (uno concreto que ambos conocemos)", "{{I closed the window.}}"],
          ["**a / an**", "uno cualquiera, singular y contable (aún no específico)", "{{I need a pen.}} · {{She has an idea.}}"],
          ["**nada**", "idea general: plural, incontable o abstracto", "{{Dogs are loyal.}} · {{Coffee is bitter.}}"]] },
        { type: "callout", kind: "note", title: "a o an: importa el sonido", es: "Usamos **an** delante de **sonido de vocal**: {{an apple}}, {{an hour}} (la *h* no suena). Usamos **a** delante de **sonido de consonante**: {{a university}} (suena “yu”), {{a one-hour class}} (suena “w”)." },
        { type: "exercises", id: "chk2", title: "Comprueba: la regla de oro", items: [
          Q.mcq("¿Cuál es la pregunta de control?", ["¿Es singular o plural?", "¿Podrían preguntarme «¿cuál?» y yo respondería con uno concreto que ambos conocemos?", "¿Empieza con vocal?"], 1, "Si sabes **cuál**, *the*. Si es la idea en general, nada."),
          Q.mcq("En «I have a dog. ___ dog is friendly.», ¿por qué lleva **the**?", ["Ya lo mencionamos", "Solo hay uno en el mundo", "Porque es plural"], 0, "Situación 1: **ya lo mencionamos**.", { full: "I have a dog. The dog is friendly." }),
          Q.mcq("En «The sun is bright», ¿por qué lleva **the**?", ["La frase dice cuál", "Solo hay uno", "Ya lo mencionamos"], 1, "Situación 3: **solo hay uno**.", { full: "The sun is bright." }),
          Q.mcq("En «Please close the door», ¿por qué lleva **the**?", ["Los dos sabemos cuál (la situación lo dice)", "Porque es un objeto", "Porque es un imperativo"], 0, "Situación 4: la situación dice cuál puerta."),
          Q.mcq("¿Cuál de estas opciones es para ideas generales en plural?", ["the", "a / an", "nada (sin artículo)"], 2, "Plural o incontable general → **sin artículo**: *Dogs are loyal.*"),
          Q.mcq("¿Cuándo se usa **a / an**?", ["Con algo concreto que ambos conocemos", "Con uno cualquiera, singular y contable", "Con ideas generales en plural"], 1, "**a / an** = uno cualquiera, aún no específico: *I need a pen.*")
        ] }
      ]
    },

    /* ═════════════ 3. IDEAS GENERALES ═════════════ */
    {
      id: "general", title: "Ideas generales",
      blocks: [
        { type: "h", h: "Ideas generales: sin THE" },
        { type: "p", es: "Cuando hablas de algo **en general** (plural, incontable o abstracto) no se usa artículo. Compara:" },
        { type: "table", head: ["General (sin the)", "Español", "Específico (con the)"], rows: [
          ["{{Life is hard.}}", "La vida es dura", "{{The life of a nurse is hard.}}"],
          ["{{I like coffee.}}", "Me gusta el café", "{{I like the coffee in this café.}}"],
          ["{{Music helps me relax.}}", "La música me ayuda a relajarme", "{{The music at the party was loud.}}"],
          ["{{People are usually kind.}}", "La gente suele ser amable", "{{The people in my building are kind.}}"],
          ["{{Stress is bad for health.}}", "El estrés es malo para la salud", "{{The stress of the exam was huge.}}"],
          ["{{Dogs are loyal animals.}}", "Los perros son animales leales", "{{The dogs next door are noisy.}}"]] },
        { type: "callout", kind: "key", title: "Cómo notar la diferencia", es: "Cuando el sustantivo va seguido de **«de este / de la fiesta / del examen / de mi edificio»**, ya es **específico** y lleva *the*. Si no hay nada que lo concrete, es general." },
        { type: "h", h: "Lo que casi siempre va sin THE" },
        { type: "table", head: ["Tipo", "Ejemplos"], rows: [
          ["Idiomas", "{{I speak English and Spanish.}}"],
          ["Deportes", "{{He plays soccer.}} · {{She loves tennis.}}"],
          ["Comidas del día", "{{I have breakfast at seven.}} · {{Let's have dinner.}}"],
          ["Materias", "{{She studies math and biology.}}"],
          ["Gustos con verbos (like, love, hate, prefer)", "{{I love music.}} · {{I hate traffic.}} · {{I prefer tea.}}"],
          ["Países y ciudades (casi todos)", "{{I live in Colombia.}} · {{I work in Cali.}}"]] },
        { type: "callout", kind: "warn", title: "Cuidado: comida concreta", es: "Si la comida es **una en concreto**, vuelve *the*: {{The dinner we had yesterday was delicious.}} (la cena de ayer). Pero en general: {{Let's have dinner.}}" },
        { type: "exercises", id: "chk3", title: "Comprueba: ideas generales", items: [
          Q.mcq("«Me gusta la música» (en general) se dice…", ["I like the music.", "I like music."], 1, "Gusto general → sin *the*.", { fixed: true, full: "I like music." }),
          Q.mcq("«La música de la fiesta estaba alta» se dice…", ["Music at the party was loud.", "The music at the party was loud."], 1, "Música **concreta** (la de la fiesta) → *the*.", { fixed: true, full: "The music at the party was loud." }),
          Q.mcq("¿Cuál de estas va **sin the**?", ["los idiomas", "el sol", "el presidente"], 0, "Idiomas: *I speak English*. Sol y presidente son únicos: *the sun, the president*."),
          Q.mcq("«Tomo desayuno a las siete» se dice…", ["I have breakfast at seven.", "I have the breakfast at seven."], 0, "Comidas del día: sin *the*.", { fixed: true, full: "I have breakfast at seven." }),
          Q.mcq("«Ella ama el tenis» se dice…", ["She loves tennis.", "She loves the tennis."], 0, "Deportes: sin *the*.", { fixed: true, full: "She loves tennis." }),
          Q.mcq("¿Cuándo vuelve a llevar the una comida?", ["Nunca", "Cuando es una en concreto: *The dinner we had yesterday*", "Cuando es plural"], 1, "Comida **concreta** → *the*.")
        ] }
      ]
    },

    /* ═════════════ 4. SUJETOS EN -ING ═════════════ */
    {
      id: "ing", title: "Sujetos en -ing",
      blocks: [
        { type: "h", h: "Sujetos que empiezan con -ing" },
        { type: "p", es: "En español dices *Hablar inglés es difícil* (infinitivo). En inglés ese sujeto es un **gerundio** (verbo + *-ing*) y se trata como **una idea general**." },
        { type: "callout", kind: "key", title: "La regla", es: "• Palabra con **-ing** al inicio = idea general → **sin the**.\n• Se trata como **un solo bloque (it)**: el verbo va en singular → *is, helps, makes*.\n• Funciona igual aunque lo que viene después sea plural: *Learning languages is useful.*" },
        { type: "examples", items: [
          { en: "Speaking English is difficult at first.", es: "Hablar inglés es difícil al principio." },
          { en: "Learning languages helps develop confidence.", es: "Aprender idiomas ayuda a desarrollar confianza." },
          { en: "Practicing helps reduce stress.", es: "Practicar ayuda a reducir el estrés." },
          { en: "Reading every day helps improve vocabulary.", es: "Leer todos los días ayuda a mejorar el vocabulario." },
          { en: "Walking is good for health.", es: "Caminar es bueno para la salud." }] },
        { type: "h", h: "Cuando el sujeto es específico, cambia" },
        { type: "table", head: ["General (-ing sin the)", "Específico (the + sustantivo)"], rows: [
          ["{{Speaking English is hard.}}", "{{The speaking section of the exam was hard.}}"],
          ["{{Reading helps improve vocabulary.}}", "{{The reading for tomorrow is long.}}"],
          ["{{Learning is a lifelong process.}}", "{{The learning we did in class was useful.}}"]] },
        { type: "callout", kind: "tip", title: "Truco para recordarlo", es: "Si el **-ing** habla de la **actividad en general** → sin the. Si habla de **esa parte, tarea o experiencia concreta** → **the**." },
        { type: "callout", kind: "warn", title: "Dos gerundios = plural", es: "Si el sujeto son **dos** gerundios, ya es plural: {{Reading and writing are important.}} (no *is*)." },
        { type: "exercises", id: "chk4", title: "Comprueba: sujetos en -ing", items: [
          Q.mcq("¿Cuál es correcta?", ["The speaking English is difficult.", "Speaking English is difficult."], 1, "-ing al inicio = general → **sin the**.", { fixed: true, full: "Speaking English is difficult." }),
          Q.mcq("Practicing ___ reduce stress.", ["help", "helps"], 1, "El gerundio como sujeto = *it* → **helps**."),
          Q.mcq("Learning languages ___ useful.", ["is", "are"], 0, "Aunque *languages* es plural, el sujeto es **Learning** (un solo bloque) → *is*."),
          Q.mcq("Reading and writing ___ important.", ["is", "are"], 1, "**Dos** gerundios = plural → *are*."),
          Q.mcq("«La lectura de mañana es larga» (esa lectura concreta).", ["Reading for tomorrow is long.", "The reading for tomorrow is long."], 1, "Es **esa** tarea concreta → *the*.", { fixed: true, full: "The reading for tomorrow is long." })
        ] }
      ]
    },

    /* ═════════════ 5. PREPOSICIONES ═════════════ */
    {
      id: "preps", title: "Preposiciones",
      blocks: [
        { type: "h", h: "Las variaciones: to the, of the, for the, with the…" },
        { type: "p", es: "La preposición **no cambia la regla**. La pregunta sigue siendo la misma: **¿es general o es uno concreto?** Si es concreto: *to the, of the, for the…* Si es general, la preposición va **sola**." },
        { type: "table", head: ["Preposición", "General (sin the)", "Específico (con the)"], rows: [
          ["to", "{{I go to school every day.}} (soy estudiante)", "{{I went to the school to talk to the teacher.}} · {{I'm going to the store.}}"],
          ["of", "{{the importance of education}} · {{the history of music}}", "{{the end of the movie}} · {{the name of the teacher}}"],
          ["for", "{{Sleep is important for health.}} · {{I'm studying for life.}}", "{{This gift is for the teacher who helped me.}} · {{I'm studying for the exam.}}"],
          ["with", "{{My job is to work with children.}} · {{I like working with numbers.}}", "{{I'm working with the children in room 5.}} · {{I'm talking with the manager.}}"],
          ["in", "{{I believe in hard work.}} · {{She is in class.}}", "{{The keys are in the kitchen.}} · {{He's in the classroom next door.}}"],
          ["on", "{{I saw it on TV.}} · {{We're on vacation.}}", "{{The book is on the table.}} · {{It's on the second floor.}}"],
          ["at", "{{I'm at home.}} · {{She's at work.}}", "{{We met at the airport.}} · {{I'm at the party.}}"],
          ["about", "{{We talked about politics.}} · {{I read about history.}}", "{{We talked about the election.}} · {{I read about the accident.}}"],
          ["from", "{{I'm from Colombia.}} · {{She works from home.}}", "{{I got it from the store.}} · {{The message is from the boss.}}"]] },
        { type: "callout", kind: "note", title: "Para que no se te enrede", es: "Unas frases son **expresiones fijas y sin the** aunque tu mente quiera ponerlo: **go to school, go to work, go to bed, at home, at work, in class, by car, on TV**. Cuando te refieres al **lugar o edificio concreto**, sí lleva the: {{I went to the school to talk to the teacher.}}" },
        { type: "examples", title: "Mismo lugar, dos significados", items: [
          { en: "I go to school every day.", es: "Voy a la escuela todos los días (soy estudiante).", note: "**Sin the**: voy a estudiar; me refiero a la actividad." },
          { en: "I went to the school to talk to the teacher.", es: "Fui a la escuela a hablar con la profesora.", note: "**Con the**: voy al **edificio** concreto, no a estudiar." }] },
        { type: "exercises", id: "chk5", title: "Comprueba: preposiciones", items: [
          Q.mcq("Soy estudiante: «Voy a la escuela todos los días».", ["I go to school every day.", "I go to the school every day."], 0, "Expresión fija: *go to school* (actividad de estudiar).", { fixed: true, full: "I go to school every day." }),
          Q.mcq("Fui al edificio de la escuela a hablar con la profesora.", ["I went to school to talk to the teacher.", "I went to the school to talk to the teacher."], 1, "Edificio **concreto** → *the school*.", { fixed: true, full: "I went to the school to talk to the teacher." }),
          Q.mcq("«Estoy estudiando para el examen».", ["I'm studying for exam.", "I'm studying for the exam."], 1, "Examen **concreto** → *the exam*.", { fixed: true, full: "I'm studying for the exam." }),
          Q.mcq("«El sueño es importante para la salud».", ["Sleep is important for health.", "Sleep is important for the health."], 0, "Salud en general → sin *the*.", { fixed: true, full: "Sleep is important for health." }),
          Q.mcq("¿Cuál NO es una expresión fija sin the?", ["at home", "at work", "at the airport"], 2, "*At the airport*: un lugar concreto, lleva *the*."),
          Q.mcq("¿La preposición cambia la regla del the?", ["Sí, siempre hay que usar the", "No: la pregunta sigue siendo ¿general o concreto?", "Sí, nunca se usa the"], 1, "La preposición **no cambia la regla**.")
        ] }
      ]
    },

    /* ═════════════ 6. LOS QUE SÍ LLEVAN THE + ERRORES ═════════════ */
    {
      id: "always", title: "Sí llevan THE y errores",
      blocks: [
        { type: "h", h: "Los que sí llevan THE" },
        { type: "p", es: "Algunas palabras llevan *the* casi siempre porque son **únicas** o porque son nombres **plurales** o de organizaciones:" },
        { type: "table", head: ["Grupo", "Ejemplos"], rows: [
          ["Cosas únicas", "{{the sun}} · {{the moon}} · {{the world}} · {{the internet}}"],
          ["Países en plural o con «united / republic»", "{{the United States}} · {{the Netherlands}} · {{the Philippines}}"],
          ["Océanos, ríos, mares", "{{the Pacific}} · {{the Amazon}} · {{the Caribbean}}"],
          ["Cargos únicos", "{{the president}} · {{the mayor}}"],
          ["Superlativos", "{{the best}} · {{the most important}} · {{the first}}"]] },
        { type: "callout", kind: "note", title: "Un contraste que se aprende en bloque", es: "**Colombia** sin the, pero **the United States** con the. Es de las cosas que se aprenden **como bloque**, no se deducen." },
        { type: "h", h: "Errores típicos de hispanohablantes (y su arreglo)" },
        { type: "table", head: ["Lo que sale por traducir", "Cómo se dice", "Por qué"], rows: [
          ["✗ The life is hard", "✓ {{Life is hard}}", "Idea general, sin *the*"],
          ["✗ I like the coffee (en general)", "✓ {{I like coffee}}", "Gusto general"],
          ["✗ The English is important", "✓ {{English is important}}", "Idioma sin *the*"],
          ["✗ The speaking English is difficult", "✓ {{Speaking English is difficult}}", "-ing al inicio = general"],
          ["✗ The people are kind (en general)", "✓ {{People are kind}}", "Plural general, sin *the*"],
          ["✗ I go to the school every day (soy estudiante)", "✓ {{I go to school every day}}", "Expresión fija: *go to school*"],
          ["✗ I have the breakfast at seven", "✓ {{I have breakfast at seven}}", "Comidas del día sin *the*"],
          ["✗ The Colombia is beautiful", "✓ {{Colombia is beautiful}}", "País sin *the*"],
          ["✗ Practicing help reduce the stress", "✓ {{Practicing helps reduce stress}}", "Gerundio sujeto → *helps*; estrés general"]] },
        { type: "callout", kind: "note", title: "Un recordatorio amable", es: "Antes de decir “está mal”, piensa: *tu cerebro está usando el paquete del español; este es el paquete nuevo*." },
        { type: "callout", kind: "key", title: "El resumen que quiero que recuerdes", es: "• **THE** = algo específico: uno concreto que ambos sabemos cuál es.\n• Idea general = **sin the**: *Life is hard · I like coffee · People are kind*.\n• **-ing al inicio** = general, sin the, con verbo en singular: *Speaking English is difficult*.\n• La preposición no cambia la regla: *to school / to the school · for health / for the exam*.\n• Idiomas, deportes, comidas y casi todos los países: **sin the**.\n• Pregunta de control: **¿cuál?** Si sé cuál, the. Si es la idea en general, nada." },
        { type: "exercises", id: "chk6", title: "Comprueba: los que sí llevan the", items: [
          Q.mcq("¿Cuál lleva **the**?", ["Colombia", "United States", "Cali"], 1, "*the United States*: nombre con «united». Colombia y Cali, sin *the*."),
          Q.mcq("«El sol es brillante» → ___ sun is bright.", ["The", "—"], 0, "Cosa **única** → *the sun*.", { fixed: true, full: "The sun is bright." }),
          Q.mcq("¿Cuál se dice con the?", ["the Pacific", "Spanish", "soccer"], 0, "Océanos, ríos y mares llevan *the*: *the Pacific*."),
          Q.mcq("«Ella es la mejor estudiante» → She is ___ best student.", ["the", "—"], 0, "**Superlativos** llevan *the*.", { fixed: true, full: "She is the best student." }),
          Q.tf("«The Colombia is beautiful» es correcta.", false, "Los países (casi todos) van **sin the**: *Colombia is beautiful*.")
        ] }
      ]
    },

    /* ═════════════ 7. PRONUNCIACIÓN ═════════════ */
    {
      id: "pron", title: "Pronunciación",
      blocks: [
        { type: "p", es: "Para quien lo dice como “de” o “di”: **the** lleva el sonido **/ð/**. Pon la **lengua entre los dientes** y deja salir el aire **con vibración** (como si zumbara). Además **cambia según la palabra que sigue**. Toca cada palabra para escucharla." },
        { type: "table", head: ["Si la siguiente palabra empieza con…", "THE suena…", "Ejemplos"], rows: [
          ["sonido de **consonante**", "`/ðə/` (“dë”, rápido y corto)", "{{the book}} `/ðə bʊk/` · {{the teacher}} `/ðə ˈtiːtʃɚ/`"],
          ["sonido de **vocal**", "`/ði/` (“dii”)", "{{the apple}} `/ði ˈæpəl/` · {{the idea}} `/ði aɪˈdiə/` · {{the hour}} `/ði ˈaʊɚ/`"]] },
        { type: "callout", kind: "warn", title: "Ojo: importa el sonido, no la letra", es: "**Hour** empieza con *h* pero suena a vocal: por eso *the hour* `/ði/`. Y **university** empieza con *u* pero suena “yu” (consonante): *the university* `/ðə/`." },
        { type: "pron", title: "El sonido /ð/", groups: [
          { sym: "/ð/", name: "lengua entre los dientes + vibración", tip: "No es *d*. Pon la lengua **entre los dientes** y haz vibrar la voz. ✗ no “de”, no “di”.", words: ["the", "this", "that", "they", "them", "there", "these", "those", "then", "mother", "brother", "other"] }] },
        { type: "pron", title: "THE delante de consonante: /ðə/", groups: [
          { sym: "/ðə/", name: "the + consonante", tip: "Corto y relajado: “dë”. La *e* es una vocal muy débil.", words: [{ w: "the book", ipa: "ðə bʊk" }, { w: "the teacher", ipa: "ðə ˈtiːtʃɚ" }, { w: "the house", ipa: "ðə haʊs" }, { w: "the window", ipa: "ðə ˈwɪndoʊ" }, { w: "the university", ipa: "ðə ˌjuːnəˈvɝːsəti" }, { w: "the one", ipa: "ðə wʌn" }] }] },
        { type: "pron", title: "THE delante de vocal: /ði/", groups: [
          { sym: "/ði/", name: "the + vocal", tip: "Más largo: “dii”. Se une suave a la vocal siguiente.", words: [{ w: "the apple", ipa: "ði ˈæpəl" }, { w: "the idea", ipa: "ði aɪˈdiə" }, { w: "the hour", ipa: "ði ˈaʊɚ" }, { w: "the egg", ipa: "ði ɛɡ" }, { w: "the end", ipa: "ði ɛnd" }, { w: "the umbrella", ipa: "ði ʌmˈbrɛlə" }, { w: "the honest man", ipa: "ði ˈɑːnəst mæn" }] }] },
        { type: "callout", kind: "tip", title: "Ritmo natural", es: "En una frase real, **the no se acentúa**: *the* y la palabra siguiente suenan como **una sola unidad**: {{the book}} casi como “dë-BUK”. Intenta decirlo **sin pausa** entre las dos." }
      ]
    },

    /* ═════════════ 8. LECTURA ═════════════ */
    {
      id: "reading", title: "Lectura",
      blocks: [
        { type: "reading", title: "General y específico en un día", intro: "Observa cuándo aparece **the** y cuándo no. Escúchalo completo, luego frase por frase, y toca las palabras que no conozcas.", paragraphs: [
          { en: "I love music, and I listen to it every day. Music helps me relax. Yesterday I went to a concert. The music at the concert was amazing, and the people next to me were very friendly. I speak English and Spanish, so I talked with them about life, sports and politics. I think speaking another language helps connect people.", es: "Amo la música y la escucho todos los días. La música me ayuda a relajarme. Ayer fui a un concierto. La música del concierto fue increíble y la gente a mi lado era muy amigable. Hablo inglés y español, así que hablé con ellos de la vida, los deportes y la política. Creo que hablar otro idioma ayuda a conectar a las personas." }] },
        { type: "reading", title: "Una vez, y la segunda vez", intro: "La primera vez usamos **a**; la segunda, **the**.", paragraphs: [
          { en: "I have a dog. The dog is friendly. We go to the park every afternoon. The park is near my house. I get home at six, I have dinner and then I read. Reading helps me improve my vocabulary. Tomorrow I have an exam, so I am studying for the exam tonight.", es: "Tengo un perro. El perro es amigable. Vamos al parque todas las tardes. El parque está cerca de mi casa. Llego a casa a las seis, ceno y luego leo. Leer me ayuda a mejorar mi vocabulario. Mañana tengo un examen, así que esta noche estoy estudiando para el examen." }] },
        { type: "reading", title: "Escuela, trabajo y preposiciones", intro: "Mira cómo cambian **school / the school** y **work / the office**.", paragraphs: [
          { en: "I go to school every day because I am a student. Yesterday I went to the school to talk to the teacher about the exam. She works with children, and she says that learning languages helps develop confidence. My brother is at work now. He works from home on Fridays, but today he went to the office to meet the manager.", es: "Voy a la escuela todos los días porque soy estudiante. Ayer fui a la escuela a hablar con la profesora sobre el examen. Ella trabaja con niños y dice que aprender idiomas ayuda a desarrollar confianza. Mi hermano está en el trabajo ahora. Trabaja desde casa los viernes, pero hoy fue a la oficina a reunirse con el gerente." }] }
      ]
    },

    /* ═════════════ 9. FRASES (REPETICIÓN) ═════════════ */
    {
      id: "phrases", title: "Frases",
      blocks: [
        { type: "p", es: "Aquí el valor está en **repetir**. Cada frase se reproduce varias veces y, en el modo *Escuchar y repetir*, hay una pausa para decirla en voz alta. Dilas **en parejas**: primero la general, luego la específica." },
        { type: "drill", title: "1 · Sin the: ideas generales", repeats: 3, phrases: [
          { en: "Life is hard.", es: "La vida es dura." }, { en: "I like coffee.", es: "Me gusta el café." }, { en: "Music helps me relax.", es: "La música me ayuda a relajarme." },
          { en: "People are usually kind.", es: "La gente suele ser amable." }, { en: "Stress is bad for health.", es: "El estrés es malo para la salud." }, { en: "Dogs are loyal animals.", es: "Los perros son animales leales." }, { en: "Time is money.", es: "El tiempo es dinero." }] },
        { type: "drill", title: "2 · Con the: algo específico", repeats: 3, phrases: [
          { en: "The life of a nurse is hard.", es: "La vida de una enfermera es dura." }, { en: "I like the coffee in this café.", es: "Me gusta el café de esta cafetería." }, { en: "The music at the party was loud.", es: "La música de la fiesta estaba alta." },
          { en: "The people in my building are kind.", es: "La gente de mi edificio es amable." }, { en: "The stress of the exam was huge.", es: "El estrés del examen fue enorme." }, { en: "The dogs next door are noisy.", es: "Los perros de al lado son ruidosos." }] },
        { type: "drill", title: "3 · Sujetos con -ing", repeats: 3, phrases: [
          { en: "Speaking English is difficult at first.", es: "Hablar inglés es difícil al principio." }, { en: "Learning languages helps develop confidence.", es: "Aprender idiomas ayuda a desarrollar confianza." }, { en: "Practicing helps reduce stress.", es: "Practicar ayuda a reducir el estrés." },
          { en: "Reading every day helps improve vocabulary.", es: "Leer todos los días ayuda a mejorar el vocabulario." }, { en: "Walking is good for health.", es: "Caminar es bueno para la salud." }, { en: "The speaking section of the exam was hard.", es: "La parte oral del examen fue difícil." }, { en: "The reading for tomorrow is long.", es: "La lectura de mañana es larga." }] },
        { type: "drill", title: "4 · Preposiciones, con y sin the", repeats: 3, phrases: [
          { en: "I go to school every day.", es: "Voy a la escuela todos los días (soy estudiante)." }, { en: "I went to the school to talk to the teacher.", es: "Fui a la escuela a hablar con la profesora." }, { en: "Sleep is important for health.", es: "El sueño es importante para la salud." },
          { en: "I'm studying for the exam.", es: "Estoy estudiando para el examen." }, { en: "I like working with numbers.", es: "Me gusta trabajar con números." }, { en: "I'm working with the children in room 5.", es: "Estoy trabajando con los niños del salón 5." },
          { en: "We talked about politics.", es: "Hablamos de política." }, { en: "We talked about the election.", es: "Hablamos de la elección." }, { en: "I'm at home.", es: "Estoy en casa." }, { en: "We met at the airport.", es: "Nos encontramos en el aeropuerto." }] },
        { type: "drill", title: "5 · Siempre con the", repeats: 3, phrases: [
          { en: "The sun is bright.", es: "El sol está brillante." }, { en: "The internet is down.", es: "El internet no funciona." }, { en: "She lives in the United States.", es: "Ella vive en Estados Unidos." },
          { en: "The Pacific is a huge ocean.", es: "El Pacífico es un océano enorme." }, { en: "The president spoke last night.", es: "El presidente habló anoche." }, { en: "This is the best day of my life.", es: "Este es el mejor día de mi vida." }] },
        { type: "drill", title: "6 · Sin the: idiomas, deportes, comidas y países", repeats: 3, phrases: [
          { en: "I speak English and Spanish.", es: "Hablo inglés y español." }, { en: "He plays soccer.", es: "Él juega fútbol." }, { en: "Let's have dinner.", es: "Cenemos." },
          { en: "She studies math and biology.", es: "Ella estudia matemáticas y biología." }, { en: "I live in Colombia.", es: "Vivo en Colombia." }, { en: "I work in Cali.", es: "Trabajo en Cali." }] },
        { type: "drill", title: "7 · El paquete nuevo (sin errores)", repeats: 3, phrases: [
          { en: "Practicing helps reduce stress.", es: "Practicar ayuda a reducir el estrés." }, { en: "I have breakfast at seven.", es: "Tomo el desayuno a las siete." }, { en: "I study English every day.", es: "Estudio inglés todos los días." },
          { en: "Colombia is beautiful.", es: "Colombia es hermosa." }, { en: "People are kind.", es: "La gente es amable." }, { en: "I like pizza.", es: "Me gusta la pizza." }] }
      ]
    },

    /* ═════════════ 10. PRÁCTICA: SETS DE MENOR A MAYOR DIFICULTAD ═════════════ */
    {
      id: "practice", title: "Práctica",
      blocks: [
        { type: "callout", kind: "key", title: "Cómo practicar", es: "Los sets van de **fácil a difícil**. No pases al siguiente hasta sacar **70 % o más** (verás tu mejor resultado en cada tarjeta). Si fallas, lee la explicación y usa **Repetir las falladas**. Los ejercicios que falles quedan guardados en **Práctica › Corregir mis errores**." },

        { type: "h", h: "Fase 1 · Reconocer" },
        { type: "exercises", id: "p1", title: "1 · ¿General o específico?", intro: "Nivel inicial: mira si la frase habla de la idea en general o de algo concreto.", items: [
          GE("Life is hard.", true, "Idea general: sin *the*."),
          GE("I like the coffee in this café.", false, "*Ese* café concreto (*in this café*)."),
          GE("Speaking English is difficult.", true, "-ing al inicio = general."),
          GE("The teacher gave us homework.", false, "El profesor de **esta** clase."),
          GE("Dogs are loyal animals.", true, "Plural general."),
          GE("Please close the door.", false, "La puerta de **aquí**: los dos sabemos cuál."),
          GE("Exercise helps reduce stress.", true, "Ejercicio en general."),
          GE("The stress of the exam was huge.", false, "**Ese** estrés (el del examen)."),
          GE("Music helps me relax.", true, "Música en general."),
          GE("The music at the party was loud.", false, "**Esa** música (la de la fiesta)."),
          GE("Reading helps improve vocabulary.", true, "-ing = general."),
          GE("The reading for tomorrow is long.", false, "**Esa** lectura concreta."),
          GE("People are usually kind.", true, "Plural general."),
          GE("The people in my building are kind.", false, "La gente **de mi edificio**: específica.")
        ] },
        { type: "exercises", id: "p2", title: "2 · ¿THE o nada?", intro: "Decide si la frase lleva the o va sin artículo.", items: [
          T("___ English is important in business.", false, "Idioma: sin *the*."),
          T("Please open ___ window.", true, "La ventana de este lugar: los dos sabemos cuál."),
          T("___ people are usually kind.", false, "Plural general: sin *the*."),
          T("___ people in my building are very kind.", true, "Gente **específica** (la de mi edificio) → *the*."),
          T("I love ___ coffee.", false, "Gusto general con *love*: sin *the*."),
          T("___ coffee you made is delicious.", true, "El café **que tú hiciste**: concreto."),
          T("___ practicing helps reduce stress.", false, "-ing al inicio = general."),
          T("___ speaking section of the test was easy.", true, "**Esa** parte del examen: específica."),
          T("___ time is money.", false, "Idea general: *Time is money*."),
          T("___ time of the meeting changed.", true, "**El** horario de **esa** reunión: específico."),
          T("She plays ___ tennis every weekend.", false, "Deporte: sin *the*."),
          T("I have ___ breakfast at seven.", false, "Comida del día: sin *the*."),
          T("Look at ___ sun!", true, "Cosa **única**: *the sun*."),
          T("___ Colombia is beautiful.", false, "País (casi todos): sin *the*.")
        ] },
        { type: "exercises", id: "p3", title: "3 · Las 4 situaciones y la pregunta de control", intro: "¿Por qué lleva the?", items: [
          Q.mcq("En «I have a dog. The dog is friendly.», ¿por qué **the dog**?", ["Ya lo mencionamos", "La misma frase dice cuál", "Solo hay uno", "La situación lo dice"], 0, "Situación 1: **ya lo mencionamos**.", { fixed: true, full: "I have a dog. The dog is friendly." }),
          Q.mcq("En «The book on the table is mine.», ¿por qué **the book**?", ["Ya lo mencionamos", "La misma frase dice cuál (*on the table*)", "Solo hay uno", "La situación lo dice"], 1, "Situación 2: la misma frase dice **cuál** libro.", { fixed: true, full: "The book on the table is mine." }),
          Q.mcq("En «The sun is bright.», ¿por qué **the sun**?", ["Ya lo mencionamos", "La misma frase dice cuál", "Solo hay uno", "La situación lo dice"], 2, "Situación 3: **solo hay uno**.", { fixed: true, full: "The sun is bright." }),
          Q.mcq("En «Please close the door.», ¿por qué **the door**?", ["Ya lo mencionamos", "La misma frase dice cuál", "Solo hay uno", "La situación lo dice"], 3, "Situación 4: los dos sabemos cuál **por la situación**.", { fixed: true, full: "Please close the door." }),
          Q.mcq("En «The internet is down.», ¿por qué **the internet**?", ["Ya lo mencionamos", "La misma frase dice cuál", "Solo hay uno", "La situación lo dice"], 2, "**Solo hay uno**.", { fixed: true, full: "The internet is down." }),
          ART("I have a car. ___ car is red.", "the", "La segunda vez que mencionamos el carro, ya sabemos cuál: *the car*."),
          ART("We watched a movie. ___ movie was long.", "the", "Ya mencionamos la película: *the movie*."),
          Q.tf("En «I like coffee» hablo de un café concreto.", false, "Es el café **en general**: sin *the*."),
          Q.tf("«The sun is bright» lleva the porque solo hay un sol.", true, "Cosa **única** → *the*."),
          Q.mcq("Hablas de una idea en general. ¿Qué decides?", ["Usar the", "No usar artículo", "Usar a / an"], 1, "Idea general → **sin artículo**."),
          Q.mcq("¿Qué pregunta de control te haces?", ["¿Es singular?", "¿Empieza con vocal?", "¿Podrían preguntarme «¿cuál?» y yo respondería con uno concreto?"], 2, "Si sabes **cuál**, *the*. Si es la idea en general, nada.")
        ] },
        { type: "exercises", id: "p4", title: "4 · Pronunciación: /ðə/ o /ði/", intro: "Importa el **sonido** de la palabra siguiente, no la letra.", items: [
          Q.mcq("¿Cómo suena THE en «the book»?", ["/ðə/", "/ði/"], 0, "*book* empieza con consonante → **/ðə/**.", { fixed: true, full: "the book" }),
          Q.mcq("¿Cómo suena THE en «the apple»?", ["/ðə/", "/ði/"], 1, "*apple* empieza con vocal → **/ði/**.", { fixed: true, full: "the apple" }),
          Q.mcq("¿Cómo suena THE en «the teacher»?", ["/ðə/", "/ði/"], 0, "Consonante → **/ðə/**.", { fixed: true, full: "the teacher" }),
          Q.mcq("¿Cómo suena THE en «the idea»?", ["/ðə/", "/ði/"], 1, "Vocal → **/ði/**.", { fixed: true, full: "the idea" }),
          Q.mcq("¿Cómo suena THE en «the hour»?", ["/ðə/", "/ði/"], 1, "*Hour* suena a vocal (la *h* es muda) → **/ði/**.", { fixed: true, full: "the hour" }),
          Q.mcq("¿Cómo suena THE en «the university»?", ["/ðə/", "/ði/"], 0, "*University* suena “yu” (consonante) → **/ðə/**.", { fixed: true, full: "the university" }),
          Q.mcq("¿Cómo suena THE en «the egg»?", ["/ðə/", "/ði/"], 1, "Vocal → **/ði/**.", { fixed: true, full: "the egg" }),
          Q.mcq("¿Cómo suena THE en «the house»?", ["/ðə/", "/ði/"], 0, "Aquí la *h* sí suena → consonante → **/ðə/**.", { fixed: true, full: "the house" }),
          Q.mcq("¿Cómo suena THE en «the umbrella»?", ["/ðə/", "/ði/"], 1, "Vocal → **/ði/**.", { fixed: true, full: "the umbrella" }),
          Q.mcq("¿Cómo suena THE en «the one»?", ["/ðə/", "/ði/"], 0, "*One* suena “wan” (consonante) → **/ðə/**.", { fixed: true, full: "the one" }),
          Q.mcq("¿Cómo suena THE en «the honest man»?", ["/ðə/", "/ði/"], 1, "*Honest* tiene *h* muda → vocal → **/ði/**.", { fixed: true, full: "the honest man" }),
          Q.mcq("¿Cómo suena THE en «the end»?", ["/ðə/", "/ði/"], 1, "Vocal → **/ði/**.", { fixed: true, full: "the end" })
        ] },

        { type: "h", h: "Fase 2 · Elegir en contexto" },
        { type: "exercises", id: "p5", title: "5 · a, an, the o nada", intro: "Tres opciones, no dos. Recuerda: **an** delante de sonido de vocal.", items: [
          ART("I need ___ pen.", "a", "Uno cualquiera, singular, sonido de consonante: *a pen*."),
          ART("She has ___ idea.", "an", "Sonido de vocal: *an idea*."),
          ART("___ dogs are loyal.", "", "Plural general: sin artículo."),
          ART("He is ___ engineer.", "an", "*Engineer* empieza con sonido de vocal."),
          ART("Close ___ door, please.", "the", "La puerta que los dos conocemos."),
          ART("I want ___ apple.", "an", "Sonido de vocal."),
          ART("___ coffee is bitter.", "", "Incontable general: sin artículo."),
          ART("She is ___ teacher.", "a", "Profesión, singular: *a teacher*."),
          ART("We need ___ hour to finish.", "an", "*Hour* suena a vocal (la *h* es muda): *an hour*."),
          ART("He wants ___ university degree.", "a", "*University* suena “yu” (consonante): *a university*."),
          ART("She has ___ umbrella.", "an", "Sonido de vocal."),
          ART("___ moon is beautiful tonight.", "the", "Solo hay una: *the moon*."),
          ART("I like ___ music.", "", "Gusto general con *like*: sin artículo."),
          ART("I saw ___ accident on the road.", "an", "*Accident* empieza con sonido de vocal.")
        ] },
        { type: "exercises", id: "p6", title: "6 · Sujetos con -ing", intro: "Sin the, y con el verbo en singular.", items: [
          P("¿Cuál es correcta?", "Speaking English is difficult at first.", "The speaking English is difficult at first.", "-ing al inicio = general → **sin the**."),
          P("¿Cuál es correcta?", "Learning languages is useful.", "The learning languages is useful.", "General → sin *the*."),
          Q.mcq("Practicing ___ reduce stress.", ["help", "helps"], 1, "El gerundio como sujeto = *it* → **helps**.", { full: "Practicing helps reduce stress." }),
          Q.mcq("Reading every day ___ improve vocabulary.", ["help", "helps"], 1, "Un solo bloque (*it*) → **helps**.", { full: "Reading every day helps improve vocabulary." }),
          Q.mcq("Walking ___ good for health.", ["is", "are"], 0, "Gerundio = singular → **is**.", { full: "Walking is good for health." }),
          Q.mcq("Learning languages ___ useful.", ["is", "are"], 0, "El sujeto es **Learning** (singular), no *languages*.", { full: "Learning languages is useful." }),
          Q.mcq("Reading and writing ___ important.", ["is", "are"], 1, "**Dos** gerundios = plural → *are*.", { full: "Reading and writing are important." }),
          P("«La parte oral del examen fue difícil.»", "The speaking section of the exam was hard.", "Speaking section of the exam was hard.", "**Esa** parte concreta → *the*."),
          Q.mcq("___ for tomorrow is long. (esa tarea de lectura)", ["Reading", "The reading"], 1, "Tarea **concreta** → *the reading*.", { fixed: true, full: "The reading for tomorrow is long." }),
          Q.mcq("___ is a lifelong process. (aprender en general)", ["Learning", "The learning"], 0, "General → *Learning is a lifelong process.*", { fixed: true, full: "Learning is a lifelong process." }),
          Q.mcq("___ we did in class was useful. (lo que hicimos)", ["Learning", "The learning"], 1, "Experiencia **concreta** → *the learning*.", { fixed: true, full: "The learning we did in class was useful." }),
          Q.mcq("Swimming ___ my favorite sport.", ["is", "are"], 0, "Gerundio = singular → **is**.", { full: "Swimming is my favorite sport." })
        ] },
        { type: "exercises", id: "p7", title: "7 · Preposiciones: general o específico", intro: "La preposición no cambia la regla.", items: [
          Q.mcq("I go to ___ every morning. I'm a student.", ["school", "the school"], 0, "Expresión fija: *go to school*.", { fixed: true, full: "I go to school every morning." }),
          Q.mcq("I went to ___ to talk to my son's teacher.", ["school", "the school"], 1, "Edificio **concreto**.", { fixed: true, full: "I went to the school to talk to my son's teacher." }),
          Q.mcq("Sleep is important for ___.", ["health", "the health"], 0, "Salud en general.", { fixed: true, full: "Sleep is important for health." }),
          Q.mcq("This gift is for ___ who helped me.", ["teacher", "the teacher"], 1, "Un profesor **concreto** (el que me ayudó).", { fixed: true, full: "This gift is for the teacher who helped me." }),
          Q.mcq("My job is to work with ___.", ["children", "the children"], 0, "Niños en general.", { fixed: true, full: "My job is to work with children." }),
          Q.mcq("I'm working with ___ in room 5. They are six.", ["children", "the children"], 1, "Niños **concretos** (los del salón 5).", { fixed: true, full: "I'm working with the children in room 5." }),
          Q.mcq("The importance of ___ is clear to everyone.", ["education", "the education"], 0, "Educación en general.", { fixed: true, full: "The importance of education is clear to everyone." }),
          Q.mcq("We talked about ___ yesterday. It's on Friday.", ["exam", "the exam"], 1, "Examen **concreto**.", { fixed: true, full: "We talked about the exam yesterday. It's on Friday." }),
          Q.mcq("She is at ___ now.", ["work", "the work"], 0, "Expresión fija: *at work*.", { fixed: true, full: "She is at work now." }),
          Q.mcq("We met at ___ at six.", ["airport", "the airport"], 1, "Lugar **concreto**: *the airport*.", { fixed: true, full: "We met at the airport at six." }),
          Q.mcq("I saw it on ___.", ["TV", "the TV"], 0, "Expresión fija: *on TV*.", { fixed: true, full: "I saw it on TV." }),
          Q.mcq("The book is on ___.", ["table", "the table"], 1, "Mesa **concreta**.", { fixed: true, full: "The book is on the table." }),
          Q.mcq("He is in ___ now. The lesson started.", ["class", "the class"], 0, "Expresión fija: *in class*.", { fixed: true, full: "He is in class now. The lesson started." }),
          Q.mcq("We talked about ___ at dinner.", ["politics", "the politics"], 0, "Tema en general: *politics*.", { fixed: true, full: "We talked about politics at dinner." })
        ] },
        { type: "exercises", id: "p8", title: "8 · Idiomas, deportes, comidas, países y únicos", intro: "Los que casi siempre van sin the… y los que sí llevan.", items: [
          T("I speak ___ Spanish and English.", false, "Idiomas: sin *the*."),
          T("He plays ___ soccer on Sundays.", false, "Deportes: sin *the*."),
          T("Let's have ___ dinner at eight.", false, "Comidas del día: sin *the*."),
          T("She studies ___ biology.", false, "Materias: sin *the*."),
          T("I live in ___ Colombia.", false, "Países (casi todos): sin *the*."),
          T("She lives in ___ United States.", true, "Nombre con «united»: *the United States*."),
          T("We visited ___ Netherlands last year.", true, "País en plural: *the Netherlands*."),
          T("___ Pacific is a huge ocean.", true, "Océanos llevan *the*."),
          T("___ Amazon is a long river.", true, "Ríos llevan *the*."),
          T("___ president spoke on TV.", true, "Cargo único: *the president*."),
          T("I work in ___ Cali.", false, "Ciudades: sin *the*."),
          T("___ internet is down.", true, "Cosa única: *the internet*."),
          T("She is ___ best student in the class.", true, "Superlativo: *the best*."),
          T("I prefer ___ tea.", false, "Gusto con *prefer*: sin *the*."),
          T("___ world is big.", true, "Cosa única: *the world*.")
        ] },

        { type: "h", h: "Fase 3 · Escribir" },
        { type: "exercises", id: "p9", title: "9 · Escribe the, a o an", intro: "Escribe solo la palabra que falta.", items: [
          F("Please open ___ window.", "the", "La ventana de este lugar.", "the, a o an"),
          F("___ sun is bright today.", "the", "Solo hay un sol."),
          F("I need ___ pen.", "a", "Uno cualquiera, sonido de consonante.", "a o an"),
          F("She has ___ idea.", "an", "Sonido de vocal.", "a o an"),
          F("___ people in my building are kind.", "the", "Gente **concreta** (la de mi edificio)."),
          F("I have a dog. ___ dog is friendly.", "the", "Ya lo mencionamos."),
          F("___ coffee you made is delicious.", "the", "El café **que hiciste**: concreto."),
          F("I went to ___ store to buy milk.", "the", "La tienda a la que siempre vamos / concreta."),
          F("He is ___ engineer.", "an", "*Engineer* suena a vocal.", "a o an"),
          F("Close ___ door, please.", "the", "La puerta que los dos conocemos."),
          F("We need ___ hour to finish.", "an", "*Hour* suena a vocal.", "a o an"),
          F("___ speaking section was easy.", "the", "**Esa** parte concreta.")
        ] },
        { type: "exercises", id: "p10", title: "10 · Corrige el error", intro: "Todas hablan **en general**. Escribe la frase corregida completa.", items: [
          Q.fill("The life is hard. →", ["Life is hard."], "Idea general: sin *the*."),
          Q.fill("The speaking English is difficult. →", ["Speaking English is difficult."], "-ing al inicio = general."),
          Q.fill("I like the pizza. →", ["I like pizza."], "Gusto general."),
          Q.fill("Practicing help reduce the stress. →", ["Practicing helps reduce stress."], "Gerundio sujeto → *helps*; estrés general."),
          Q.fill("I study the English every day. →", ["I study English every day."], "Idioma: sin *the*."),
          Q.fill("The people are kind. →", ["People are kind."], "Plural general."),
          Q.fill("I go to the school every day. (soy estudiante) →", ["I go to school every day."], "Expresión fija: *go to school*."),
          Q.fill("I have the breakfast at seven. →", ["I have breakfast at seven."], "Comidas del día sin *the*."),
          Q.fill("The Colombia is beautiful. →", ["Colombia is beautiful."], "País sin *the*."),
          Q.fill("The learning languages is useful. →", ["Learning languages is useful."], "-ing = general."),
          Q.fill("She plays the tennis every weekend. →", ["She plays tennis every weekend."], "Deporte sin *the*."),
          Q.fill("I love the music. (en general) →", ["I love music."], "Gusto general."),
          Q.fill("The money is important. (en general) →", ["Money is important."], "Incontable general: sin *the*.")
        ] },
        { type: "exercises", id: "p11", title: "11 · Ordena la frase", intro: "Toca las palabras en el orden correcto. Ojo: puede sobrar alguna.", items: [
          Q.order("La vida es dura.", "Life is hard.", "Idea general: sin *the*.", { extra: ["The"] }),
          Q.order("Me gusta el café.", "I like coffee.", "Gusto general.", { extra: ["the"] }),
          Q.order("El café de esta cafetería es delicioso.", "The coffee in this café is delicious.", "Café concreto: *the*."),
          Q.order("Hablar inglés es difícil.", "Speaking English is difficult.", "-ing = general.", { extra: ["The"] }),
          Q.order("La gente es amable.", "People are kind.", "Plural general.", { extra: ["The"] }),
          Q.order("La gente de mi edificio es amable.", "The people in my building are kind.", "Gente concreta: *the*."),
          Q.order("Voy a la escuela todos los días.", "I go to school every day.", "Soy estudiante: *go to school*.", { extra: ["the"] }),
          Q.order("Fui a la escuela para hablar con la profesora.", "I went to the school to talk to the teacher.", "Edificio y persona concretos: *the*."),
          Q.order("El final de la película fue increíble.", "The end of the movie was amazing.", "Final concreto: *the end of the movie*."),
          Q.order("Aprender idiomas ayuda a desarrollar confianza.", "Learning languages helps develop confidence.", "Gerundio sujeto → *helps*.", { extra: ["The"] }),
          Q.order("La importancia de la educación es enorme.", "The importance of education is huge.", "*The importance* (concreto) + *education* (general)."),
          Q.order("Tomo el desayuno a las siete.", "I have breakfast at seven.", "Comidas del día: sin *the*.", { extra: ["the"] })
        ] },
        { type: "exercises", id: "p12", title: "12 · Traduce al inglés", intro: "Piensa en el paquete, no palabra por palabra. Se aceptan sinónimos naturales.", items: [
          Q.fill("«Hablar inglés es difícil, pero practicar ayuda a mejorar.»", E("Speaking English is (hard/difficult), but practicing helps (/to )improve."), "-ing general, sin *the*; *practicing helps*."),
          Q.fill("«La vida es corta.»", ["Life is short."], "Idea general: sin *the*."),
          Q.fill("«Me gusta el café.»", ["I like coffee."], "Gusto general."),
          Q.fill("«El café de esta cafetería es delicioso.»", E("The coffee in this (café/coffee shop) is delicious."), "Café concreto → *the*."),
          Q.fill("«La gente es amable.»", E("People are (kind/nice/friendly)."), "Plural general."),
          Q.fill("«La gente de mi edificio es amable.»", E("The people in my building are (kind/nice/friendly)."), "Gente concreta → *the*."),
          Q.fill("«Aprender idiomas ayuda a desarrollar confianza.»", E("Learning languages helps (/to )develop confidence."), "-ing sujeto → *helps*."),
          Q.fill("«El ejercicio ayuda a reducir el estrés.»", E("Exercise helps (/to )reduce stress."), "Ideas generales, sin *the*."),
          Q.fill("«Fui a la escuela para hablar con la profesora.»", E("I went to the school to (talk/speak) (to/with) the teacher."), "Edificio y persona concretos → *the*."),
          Q.fill("«Voy a la escuela todos los días.» (soy estudiante)", ["I go to school every day."], "Expresión fija."),
          Q.fill("«El final de la película fue increíble.»", E("The end of the movie was (amazing/incredible)."), "Final concreto → *the*."),
          Q.fill("«La importancia de la educación es enorme.»", E("The importance of education is (huge/enormous/great)."), "*The importance* + *education* (general).")
        ] },

        { type: "h", h: "Fase 4 · Escuchar" },
        { type: "exercises", id: "p13", title: "13 · ¿Qué oración escuchas?", intro: "Escucha con atención si hay **the** o no. Es el truco para entrenar el oído.", items: [
          Q.hear("Life is hard.", ["Life is hard.", "The life is hard."], 0, "Idea general: sin *the*."),
          Q.hear("I like coffee.", ["I like coffee.", "I like the coffee."], 0, "Gusto general."),
          Q.hear("I like the coffee in this café.", ["I like the coffee in this café.", "I like coffee in this café."], 0, "Café concreto: *the coffee*."),
          Q.hear("The people in my building are kind.", ["People in my building are kind.", "The people in my building are kind."], 1, "Gente concreta: *the people*."),
          Q.hear("Speaking English is difficult.", ["Speaking English is difficult.", "The speaking English is difficult."], 0, "-ing = general."),
          Q.hear("I go to school every day.", ["I go to school every day.", "I go to the school every day."], 0, "Soy estudiante: *go to school*."),
          Q.hear("I went to the school to talk to the teacher.", ["I went to school to talk to teacher.", "I went to the school to talk to the teacher."], 1, "Edificio y persona concretos."),
          Q.hear("Please close the door.", ["Please close door.", "Please close the door."], 1, "La puerta de aquí: *the door*."),
          Q.dictate("Life is hard.", "Idea general: sin *the*."),
          Q.dictate("I like coffee.", "Gusto general."),
          Q.dictate("The sun is bright.", "Cosa única: *the sun*."),
          Q.dictate("Learning languages helps develop confidence.", "-ing sujeto → *helps*."),
          Q.dictate("I went to the school to talk to the teacher.", "Edificio y persona concretos."),
          Q.dictate("The importance of education is huge.", "*The importance* + *education* (general).")
        ] },

        { type: "h", h: "Fase 5 · Nivel avanzado" },
        { type: "exercises", id: "p14", title: "14 · ¿Cuál suena natural?", intro: "Lee el contexto y elige la versión correcta.", items: [
          P("Quieres decir en general: la vida es dura.", "Life is hard.", "The life is hard.", "Idea general → sin *the*."),
          P("Quieres decir que desayunas a las siete.", "I have breakfast at seven.", "I have the breakfast at seven.", "Comidas del día: sin *the*."),
          P("Hablas del trabajo desde casa.", "She works from home.", "She works from the home.", "*Work from home*: expresión fija."),
          P("Hablas de un tema en general.", "We talked about politics.", "We talked about the politics.", "Tema general: sin *the*."),
          P("Quieres decir en general que leer mejora el vocabulario.", "Reading helps improve vocabulary.", "The reading helps improve the vocabulary.", "-ing general, sin *the*."),
          P("Hablas de la lectura concreta de mañana.", "The reading for tomorrow is long.", "Reading for tomorrow is long.", "Tarea concreta → *the*."),
          P("Dices que estudias inglés todos los días.", "I study English every day.", "I study the English every day.", "Idioma: sin *the*."),
          P("Hablas del presidente del país.", "The president spoke last night.", "President spoke last night.", "Cargo único: *the president*."),
          P("Dices dónde vives.", "I live in the United States.", "I live in United States.", "Nombre con «united»: *the*."),
          P("Hablas del trabajo con niños en general.", "My job is to work with children.", "My job is to work with the children.", "General: sin *the*."),
          P("Hablas de los niños de tu salón 5.", "I'm working with the children in room 5.", "I'm working with children in room 5.", "Niños **concretos** → *the*."),
          Q.mcq("Quieres decir que practicar ayuda a reducir el estrés (en general).", ["Practicing helps reduce stress.", "Practicing help reduce stress.", "Practicing helps reduce the stress."], 0, "Gerundio sujeto → *helps*; estrés general, sin *the*.", { fixed: true, full: "Practicing helps reduce stress." }),
          P("Hablas del estrés del examen que acabas de hacer.", "The stress of the exam was huge.", "Stress of the exam was huge.", "Estrés **concreto** (el del examen) → *the*."),
          P("Dices que Colombia es hermosa.", "Colombia is beautiful.", "The Colombia is beautiful.", "País sin *the*.")
        ] },
        { type: "exercises", id: "p15", title: "15 · Reto final: traducciones más largas", intro: "Mezcla todo lo aprendido: general, específico, -ing, preposiciones y países. Se aceptan sinónimos naturales.", items: [
          Q.fill("«La música de la fiesta estaba muy alta.»", E("The music at the party was (very /)loud."), "Música concreta → *the music*."),
          Q.fill("«Me gusta la música, pero la música de esa fiesta era demasiado fuerte.»", E("I like music, but the music at (that/the) party was too loud."), "General (*music*) y concreto (*the music at that party*)."),
          Q.fill("«Caminar es bueno para la salud.»", ["Walking is good for health."], "-ing general + *for health*."),
          Q.fill("«Leer todos los días ayuda a mejorar el vocabulario.»", E("Reading every day helps (/to )improve (your /)vocabulary."), "-ing sujeto → *helps*."),
          Q.fill("«El inglés es importante en los negocios.»", ["English is important in business."], "Idioma y negocios en general."),
          Q.fill("«Estoy estudiando para el examen de mañana.»", E("I (am studying/study) for the exam tomorrow."), "Examen concreto → *the exam*."),
          Q.fill("«El libro que está en la mesa es mío.»", ["The book on the table is mine."], "La frase dice cuál: *The book on the table*."),
          Q.fill("«Estamos de vacaciones.»", ["We are on vacation."], "Expresión fija: *on vacation*."),
          Q.fill("«Ella trabaja desde casa.»", ["She works from home."], "Expresión fija: *from home*."),
          Q.fill("«Hablamos de política.»", ["We talked about politics."], "Tema general: sin *the*."),
          Q.fill("«La vida de una enfermera es dura.»", ["The life of a nurse is hard."], "*Of a nurse* concreta la vida → *the life*."),
          Q.fill("«Aprender es un proceso de toda la vida.»", ["Learning is a lifelong process."], "-ing general, sin *the*.")
        ] }
      ]
    }
  ]
});
})();
