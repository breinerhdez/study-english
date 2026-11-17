/* Tema 01. Sirve también como plantilla: para crear otro tema copia este archivo en
   content/topics/, cambia el `id`, `title` y `order`, y ejecuta:  node tools/sync.js  (ver README.md) */
(function () {
const Q = App.Q;

App.defineTopic({
  id: "to-be-present",
  order: 1,
  unit: "Fundamentos",
  title: "Verb to be: am, is, are",
  level: "A1",
  minutes: 25,
  summary: "El verbo más importante del inglés: para decir quién eres, de dónde eres, cómo estás y dónde estás.",

  /* Palabras propias del tema que no estén en el diccionario base: palabra: [IPA, significado] */
  words: {
    "ana": ["ˈænə", "Ana (nombre)"],
    "tom": ["tɑːm", "Tom (nombre)"],
    "colombia": ["kəˈlʌmbiə", "Colombia"],
    "canada": ["ˈkænədə", "Canadá"],
    "spain": ["speɪn", "España"],
    "medellin": ["ˌmɛdəˈjiːn", "Medellín"],
    "nurse": ["nɝs", "enfermero/a"],
    "kind": ["kaɪnd", "amable"]
  },

  sections: [
    /* ───────────────────────── 1. CONCEPTO ───────────────────────── */
    {
      id: "concept", title: "Concepto",
      blocks: [
        { type: "p", es: "El verbo **to be** significa **ser** y **estar** al mismo tiempo. Lo usas para decir *quién eres*, *de dónde eres*, *cómo te sientes*, *dónde estás* y *qué edad tienes*. Es el verbo más usado del inglés: sin él no puedes presentarte ni describir nada.\n\nEjemplo: {{I am from Colombia.}} (soy de Colombia) · {{I am tired.}} (estoy cansado)." },
        { type: "formula", title: "Estructura básica", parts: [{ t: "Sujeto", s: "I, you, he…" }, { t: "am / is / are", s: "según el sujeto", c: "b" }, { t: "Complemento", s: "quién, cómo, dónde", c: "c" }], note: "En inglés el sujeto es obligatorio. En español dices “Estoy cansado”; en inglés siempre “I am tired”." },
        { type: "table", title: "Qué forma uso con cada sujeto", head: ["Sujeto", "Verbo", "Forma corta", "Ejemplo"], rows: [
          ["I", "**am**", "I'm", "{{I am happy.}}"], ["you", "**are**", "you're", "{{You are kind.}}"], ["he / she / it", "**is**", "he's · she's · it's", "{{She is a nurse.}}"],
          ["we", "**are**", "we're", "{{We are friends.}}"], ["they", "**are**", "they're", "{{They are at home.}}"]] },
        { type: "callout", kind: "key", title: "Truco para recordar", es: "Solo hay **tres formas**: *am* (solo con I), *is* (un solo él/ella/eso) y *are* (todo lo demás: you, we, they y plurales)." },
        { type: "h", h: "Negativo y pregunta" },
        { type: "p", es: "**Negativo:** añade **not** después del verbo. {{She is not tired.}} → forma corta: {{She isn't tired.}}\n\n**Pregunta:** pon el verbo **antes** del sujeto. {{Are you ready?}} · {{Is she a teacher?}}" },
        { type: "callout", kind: "warn", title: "Cuidado con la edad", es: "En inglés la edad se dice con *to be*, no con *tener*: {{I am 25 years old.}} (no “I have 25”)." },
        { type: "callout", kind: "tip", title: "¿Para qué sirve en la vida real?", es: "Presentarte (*I am Ana*), decir de dónde eres (*I am from Colombia*), el estado de ánimo (*I am happy*), el clima (*It is cold*) y la hora (*It is five o'clock*)." }
      ]
    },

    /* ───────────────────────── 2. EJEMPLOS ───────────────────────── */
    {
      id: "examples", title: "Ejemplos",
      blocks: [
        { type: "examples", title: "Afirmativo", intro: "Toca ▶ para escuchar, o 🐢 para oírlo más lento. Toca cualquier palabra para ver su IPA.", items: [
          { en: "I am a student.", es: "Soy estudiante.", note: "**I** siempre va con **am**." },
          { en: "She is from Spain.", es: "Ella es de España." },
          { en: "We are very happy.", es: "Estamos muy felices." },
          { en: "It is cold today.", es: "Hoy hace frío.", note: "Para el clima usamos **it is**, no “is cold”." },
          { en: "They are at home.", es: "Ellos están en casa.", note: "Aquí *are* significa **estar** (lugar)." }] },
        { type: "examples", title: "Negativo y preguntas", items: [
          { en: "He is not tired.", es: "Él no está cansado." },
          { en: "They aren't late.", es: "Ellos no llegan tarde." },
          { en: "Are you ready?", es: "¿Estás listo?" },
          { en: "Is she a nurse?", es: "¿Ella es enfermera?" },
          { en: "Where are you from?", es: "¿De dónde eres?" }] },
        { type: "pron", title: "Pronunciación", intro: "Las formas de *to be* casi nunca se pronuncian con fuerza: son palabras débiles dentro de la frase.", groups: [
          { sym: "/æm/", name: "am", tip: "En la frase suele sonar débil: {{I'm}} → /aɪm/.", words: ["am", { w: "I'm", ipa: "aɪm" }] },
          { sym: "/ɪz/", name: "is", tip: "La “s” suena como /z/.", words: ["is", "he's", "she's"] },
          { sym: "/ɑːr/", name: "are", tip: "En una frase se reduce a /ɚ/: “you are” → /jʊɚ/.", words: ["are", "you're", "they're"] }] }
      ]
    },

    /* ───────────────────────── 3. LECTURA ───────────────────────── */
    {
      id: "reading", title: "Lectura",
      blocks: [
        { type: "reading", dialogue: true, title: "Meeting someone new", intro: "Un diálogo corto. Pulsa **Escuchar todo** para oírlo completo, o ▶ en un párrafo para empezar desde ahí.", paragraphs: [
          { speaker: "Ana", en: "Hi! I am Ana. What is your name?", es: "¡Hola! Soy Ana. ¿Cómo te llamas?" },
          { speaker: "Tom", en: "Hello, Ana. I am Tom. Nice to meet you!", es: "Hola, Ana. Soy Tom. ¡Mucho gusto!" },
          { speaker: "Ana", en: "Nice to meet you too. Where are you from?", es: "Igualmente. ¿De dónde eres?" },
          { speaker: "Tom", en: "I am from Canada. And you? Are you from Colombia?", es: "Soy de Canadá. ¿Y tú? ¿Eres de Colombia?" },
          { speaker: "Ana", en: "Yes, I am. My family is in Medellin. We are very happy there.", es: "Sí. Mi familia está en Medellín. Allá somos muy felices." },
          { speaker: "Tom", en: "That is great! Are you a student?", es: "¡Qué bien! ¿Eres estudiante?" },
          { speaker: "Ana", en: "No, I am not. I am a teacher. My students are very kind.", es: "No. Soy profesora. Mis estudiantes son muy amables." }] }
      ]
    },

    /* ───────────────────────── 4. FRASES ───────────────────────── */
    {
      id: "phrases", title: "Frases",
      blocks: [
        { type: "drill", title: "Escucha y repite", repeats: 3, intro: "Aquí lo importante es **repetir**. Cada frase se reproduce varias veces; en el modo *Escuchar y repetir* hay una pausa para que la digas en voz alta. Imita el ritmo, no solo las palabras.", phrases: [
          { en: "I am a student.", es: "Soy estudiante." },
          { en: "She is from Spain.", es: "Ella es de España." },
          { en: "We are friends.", es: "Somos amigos." },
          { en: "It is cold today.", es: "Hoy hace frío." },
          { en: "They are at home.", es: "Ellos están en casa." },
          { en: "Are you ready?", es: "¿Estás listo?" },
          { en: "He is not tired.", es: "Él no está cansado." },
          { en: "Where are you from?", es: "¿De dónde eres?" }] }
      ]
    },

    /* ───────────────────────── 5. PRÁCTICA ───────────────────────── */
    {
      id: "practice", title: "Práctica",
      blocks: [
        { type: "exercises", id: "set1", title: "1 · Elige am, is o are", intro: "Si fallas, te explicamos por qué.", items: [
          Q.mcq("I ___ a student.", ["am", "is", "are"], 0, "Con **I** siempre se usa **am**."),
          Q.mcq("She ___ from Spain.", ["am", "is", "are"], 1, "**She** es una sola persona (3.ª persona singular) → **is**."),
          Q.mcq("They ___ my friends.", ["am", "is", "are"], 2, "**They** es plural → **are**."),
          Q.mcq("It ___ cold today.", ["am", "is", "are"], 1, "**It** (clima, objetos, animales) → **is**."),
          Q.mcq("We ___ ready.", ["am", "is", "are"], 2, "**We** es plural → **are**."),
          Q.mcq("My brother ___ a doctor.", ["am", "is", "are"], 1, "“My brother” se puede cambiar por **he** → **is**."),
          Q.mcq("You ___ very kind.", ["am", "is", "are"], 2, "**You** siempre usa **are** (tanto para uno como para varios)."),
          Q.mcq("The books ___ on the table.", ["am", "is", "are"], 2, "“The books” = **they** (plural) → **are**.")
        ] },
        { type: "exercises", id: "set2", title: "2 · Escribe la forma correcta", intro: "Escribe la respuesta. Las formas cortas (isn't, I'm…) también valen.", items: [
          Q.fill("I ___ tired.", "am", "**I** → **am**.", { hint: "Va con “I”." }),
          Q.fill("My parents ___ at home.", "are", "“My parents” = **they** → **are**."),
          Q.fill("___ he your brother?", "Is", "En preguntas el verbo va **antes** del sujeto: *Is he…?*"),
          Q.fill("Where ___ you from?", "are", "**you** → **are**, también en preguntas."),
          Q.fill("I ___ not hungry.", "am", "Con **I** no existe “amn't”: se dice *I am not* o *I'm not*."),
          Q.fill("Escribe en negativo: She is happy.", ["She is not happy", "She isn't happy", "She's not happy"], "Negativo = verbo + **not**: *She is not happy.*", { hint: "is + not" }),
          Q.fill("Escribe en negativo: They are late.", ["They are not late", "They aren't late", "They're not late"], "*They are not late* o *They aren't late*."),
          Q.fill("Haz una pregunta: You are ready.", "Are you ready", "En preguntas se invierte: **Are you** ready?", { hint: "Verbo primero." }),
          Q.fill("Haz una pregunta: She is a nurse.", "Is she a nurse", "Se invierte el orden: **Is she** a nurse?")
        ] },
        { type: "exercises", id: "set3", title: "3 · Ordena, une y escucha", intro: "Mezcla de tipos para memorizar mejor.", items: [
          Q.order("Yo soy estudiante", "I am a student", "Sujeto + verbo + complemento: *I + am + a student*."),
          Q.order("Ella no está cansada", "She is not tired", "Negativo: sujeto + verbo + **not** + complemento.", { alt: ["She isn't tired"], extra: ["are"] }),
          Q.order("¿Eres de Colombia?", "Are you from Colombia", "En preguntas el verbo va primero.", { extra: ["is"] }),
          Q.order("Ellos son mis amigos", "They are my friends", "**They** → **are**."),
          Q.match("Une cada frase con su significado", [["I'm from Colombia", "Soy de Colombia"], ["She is a doctor", "Ella es doctora"], ["We are tired", "Estamos cansados"], ["It is cold", "Hace frío"], ["They are at home", "Ellos están en casa"]], "Recuerda: *to be* sirve para *ser* y para *estar*; el clima usa **it is**."),
          Q.dictate("She is at home.", "**She** → **is**; *at home* = en casa."),
          Q.dictate("Are you ready?", "Pregunta: verbo (**Are**) antes del sujeto (**you**)."),
          Q.hear("He is my brother.", ["He is my brother.", "She is my sister.", "He is my father."], 0, "Escucha con atención: *he*, *brother*."),
          Q.hear("Are you tired?", ["Is she tired?", "Are you tired?", "Are you late?"], 1, "Era una pregunta con *you* y *tired*."),
          Q.tf("En inglés puedes decir “Am tired” sin decir “I”.", false, "El sujeto es **obligatorio** en inglés: *I am tired* (o *I'm tired*).")
        ] }
      ]
    }
  ]
});
})();
