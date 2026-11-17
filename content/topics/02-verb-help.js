/* Tema 02 · The Verb HELP — basado en la lección "The Verb HELP" (Modern English Classes · NeuroEnglish® Method).
   Ruta pedagógica: entender → pronunciar → leer → repetir → practicar de menor a mayor dificultad. */
(function () {
const Q = App.Q;

/* Ayudantes para aceptar todas las respuestas válidas al traducir:
   B("reduce")  → acepta "reduce" y "to reduce" (con o sin TO es correcto)
   G("Exercise helps |improve health{ a lot}")  → "|" = lugar opcional de "to ";  {texto} = parte opcional */
const B = v => [v, "to " + v];
const G = (s) => {
  let outs = [s].flatMap(x => x.includes("|") ? [x.replace("|", ""), x.replace("|", "to ")] : [x]);
  const re = /\{([^{}]*)\}/;
  while (outs.some(x => re.test(x))) outs = outs.flatMap(x => re.test(x) ? [x.replace(re, ""), x.replace(re, "$1")] : [x]);
  return [...new Set(outs.map(x => x.replace(/\s+/g, " ").trim()))];
};

App.defineTopic({
  id: "verb-help",
  order: 2,
  unit: "Gramática avanzada",
  title: "The Verb HELP",
  level: "B1–C1",
  minutes: 90,
  summary: "Cómo usar HELP sin TO y construir frases largas: por qué tu cerebro pone TO y THE donde el inglés no los quiere, y cómo cambiarlo con paquetes de frases naturales.",

  /* Palabras nuevas de este tema (IPA americano) */
  words: {
    "achieve": ["əˈtʃiːv", "lograr; alcanzar"],
    "advantage": ["ədˈvæntɪdʒ", "ventaja"],
    "ahead": ["əˈhɛd", "adelante"],
    "anxiety": ["æŋˈzaɪəti", "ansiedad"],
    "app": ["æp", "aplicación"],
    "apps": ["æps", "aplicaciones"],
    "approach": ["əˈproʊtʃ", "enfoque"],
    "attract": ["əˈtrækt", "atraer"],
    "memory": ["ˈmɛməri", "memoria"],
    "constant": ["ˈkɑːnstənt", "constante"],
    "explanation": ["ˌɛkspləˈneɪʃən", "explicación"],
    "solution": ["səˈluːʃən", "solución"],
    "avoids": ["əˈvɔɪdz", "evita"],
    "bare": ["bɛr", "desnudo"],
    "barriers": ["ˈbæriɚz", "barreras"],
    "base": ["beɪs", "base"],
    "budget": ["ˈbʌdʒɪt", "presupuesto"],
    "café": ["kæˈfeɪ", "cafetería"],
    "care": ["kɛr", "cuidado; importar"],
    "clear": ["klɪr", "claro"],
    "clearly": ["ˈklɪrli", "con claridad"],
    "clients": ["ˈklaɪənts", "clientes"],
    "communicate": ["kəˈmjuːnɪkeɪt", "comunicar(se)"],
    "communication": ["kəˌmjuːnɪˈkeɪʃən", "comunicación"],
    "communities": ["kəˈmjuːnətiz", "comunidades"],
    "complex": ["kəmˈplɛks", "complejo"],
    "confidence": ["ˈkɑːnfɪdəns", "confianza (en uno mismo)"],
    "connect": ["kəˈnɛkt", "conectar"],
    "conversation": ["ˌkɑːnvɚˈseɪʃən", "conversación"],
    "course": ["kɔːrs", "curso"],
    "critical": ["ˈkrɪtɪkəl", "crítico"],
    "cultures": ["ˈkʌltʃɚz", "culturas"],
    "customers": ["ˈkʌstəmɚz", "clientes (de tienda)"],
    "daily": ["ˈdeɪli", "diario"],
    "decisions": ["dɪˈsɪʒənz", "decisiones"],
    "develop": ["dɪˈvɛləp", "desarrollar"],
    "easier": ["ˈiːziɚ", "más fácil"],
    "education": ["ˌɛdʒuˈkeɪʃən", "educación"],
    "effectively": ["ɪˈfɛktɪvli", "con eficacia"],
    "encouraging": ["ɪnˈkɝɪdʒɪŋ", "animando"],
    "energy": ["ˈɛnɚdʒi", "energía"],
    "expand": ["ɪkˈspænd", "expandir; ampliar"],
    "explain": ["ɪkˈspleɪn", "explicar"],
    "explaining": ["ɪkˈspleɪnɪŋ", "explicando"],
    "express": ["ɪkˈsprɛs", "expresar"],
    "finished": ["ˈfɪnɪʃt", "terminó; terminado"],
    "fluency": ["ˈfluːənsi", "fluidez"],
    "goals": ["ɡoʊlz", "metas; objetivos"],
    "grammar": ["ˈɡræmɚ", "gramática"],
    "habit": ["ˈhæbɪt", "hábito"],
    "habits": ["ˈhæbɪts", "hábitos"],
    "healthier": ["ˈhɛlθiɚ", "más saludable"],
    "healthy": ["ˈhɛlθi", "saludable"],
    "improve": ["ɪmˈpruːv", "mejorar"],
    "increase": ["ɪnˈkriːs", "aumentar"],
    "infinitive": ["ɪnˈfɪnətɪv", "infinitivo"],
    "joke": ["dʒoʊk", "chiste"],
    "levels": ["ˈlɛvəlz", "niveles"],
    "lifestyle": ["ˈlaɪfstaɪl", "estilo de vida"],
    "maintain": ["meɪnˈteɪn", "mantener"],
    "method": ["ˈmɛθəd", "método"],
    "mind": ["maɪnd", "mente"],
    "native": ["ˈneɪtɪv", "nativo"],
    "noun": ["naʊn", "sustantivo"],
    "operating": ["ˈɑːpəreɪtɪŋ", "operativo"],
    "opportunities": ["ˌɑːpɚˈtuːnətiz", "oportunidades"],
    "organize": ["ˈɔːrɡənaɪz", "organizar"],
    "organizing": ["ˈɔːrɡənaɪzɪŋ", "organizando"],
    "outcome": ["ˈaʊtkʌm", "resultado"],
    "overcome": ["ˌoʊvɚˈkʌm", "superar"],
    "participants": ["pɑːrˈtɪsɪpənts", "participantes"],
    "performance": ["pɚˈfɔːrməns", "rendimiento"],
    "practical": ["ˈpræktɪkəl", "práctico"],
    "practice": ["ˈpræktɪs", "práctica; practicar"],
    "practicing": ["ˈpræktɪsɪŋ", "practicando; practicar"],
    "prepare": ["prɪˈpɛr", "preparar(se)"],
    "process": ["ˈprɑːsɛs", "proceso"],
    "professional": ["prəˈfɛʃənəl", "profesional"],
    "program": ["ˈproʊɡræm", "programa"],
    "pronunciation": ["prəˌnʌnsiˈeɪʃən", "pronunciación"],
    "providing": ["prəˈvaɪdɪŋ", "proporcionando; dando"],
    "quality": ["ˈkwɑːləti", "calidad"],
    "reduce": ["rɪˈduːs", "reducir"],
    "reducing": ["rɪˈduːsɪŋ", "reduciendo"],
    "regular": ["ˈrɛɡjələr", "regular"],
    "relationships": ["rɪˈleɪʃənʃɪps", "relaciones"],
    "relax": ["rɪˈlæks", "relajarse"],
    "results": ["rɪˈzʌlts", "resultados"],
    "risk": ["rɪsk", "riesgo"],
    "rules": ["ruːlz", "reglas"],
    "sales": ["seɪlz", "ventas"],
    "schedule": ["ˈskɛdʒuːl", "horario; agenda"],
    "services": ["ˈsɝvɪsɪz", "servicios"],
    "situation": ["ˌsɪtʃuˈeɪʃən", "situación"],
    "situations": ["ˌsɪtʃuˈeɪʃənz", "situaciones"],
    "skills": ["skɪlz", "habilidades"],
    "solve": ["sɑːlv", "resolver"],
    "speakers": ["ˈspiːkɚz", "hablantes"],
    "strategy": ["ˈstrætədʒi", "estrategia"],
    "stress": ["strɛs", "estrés"],
    "struggle": ["ˈstrʌɡəl", "tener dificultades; luchar"],
    "succeed": ["səkˈsiːd", "tener éxito"],
    "success": ["səkˈsɛs", "éxito"],
    "teamwork": ["ˈtiːmwɝk", "trabajo en equipo"],
    "technology": ["tɛkˈnɑːlədʒi", "tecnología"],
    "trust": ["trʌst", "confianza (en otros)"],
    "value": ["ˈvæljuː", "valor"],
    "vocabulary": ["voʊˈkæbjəlɛri", "vocabulario"],
    "waste": ["weɪst", "desperdicio"],
    "worrying": ["ˈwɝiɪŋ", "preocuparse; preocupándose"]
  },

  sections: [
    /* ═════════════ 1. IDEA CENTRAL ═════════════ */
    {
      id: "idea", title: "Idea central",
      blocks: [
        { type: "p", es: "Aquí no se trata de memorizar reglas sueltas. Vas a entender **por qué tu cerebro, que piensa en español, pone TO y THE donde el inglés no los quiere**, y cómo cambiar ese hábito con **paquetes de frases** que sí suenan naturales.\n\nCuando hablas inglés probablemente haces esto: piensas en español, traduces palabra por palabra y luego ordenas en inglés. Ahí aparecen los errores. No es falta de inteligencia ni de estudio: estás usando el *mapa del español* en un territorio que es inglés." },
        { type: "h", h: "Tu cerebro no está fallando" },
        { type: "table", title: "Una frase que todos queremos decir", head: ["Lo que piensas en español", "Lo que tu cerebro arma", "Lo que dice el inglés natural"], rows: [["El ejercicio ayuda a reducir el estrés", "{{Exercise helps to reduce the stress}}", "**{{Exercise helps reduce stress}}**"]] },
        { type: "p", es: "Tu versión no es un desastre: se entiende perfecto. Pero **suena a traducción**. Y fíjate que desaparecieron dos piezas: **TO** y **THE**." },
        { type: "callout", kind: "key", title: "Idea central", es: "Tu mente no traduce mal: traduce **piezas sueltas**. El inglés funciona con **paquetes** (*helps reduce stress*), no con piezas. Cuando aprendes el paquete completo, el error desaparece solo." },
        { type: "h", h: "Los 3 paquetes que tu cerebro debe cambiar" },
        { type: "table", head: ["Paquete en español (el que ya tienes)", "Paquete en inglés (el nuevo)", "¿Qué cambió?"], rows: [
          ["ayuda **a** reducir", "{{helps reduce}}", "La *a* **no** se convierte en *to*"],
          ["**el** estrés · **la** vida · **el** café", "{{stress}} · {{life}} · {{coffee}}", "Ideas generales: **sin the**"],
          ["Practicar ayuda", "{{Practicing helps}}", "Gerundio como sujeto, verbo con **-s**"]] },
        { type: "callout", kind: "tip", title: "No traduzcas pieza por pieza", es: "En vez de pensar *ayuda + a + reducir + el + estrés*, memoriza **una sola pieza**: {{helps reduce stress}}, como si fuera una canción." },
        { type: "h", h: "Cada verbo trae su propio “enchufe”" },
        { type: "p", es: "Esta es la regla que más confusión quita. En español casi todo se conecta con *a* o *de*. En inglés **cada verbo trae su propio enchufe y tú no lo eliges: lo aprendes**. No puedes adivinar si lleva *TO*, *-ING* o nada traduciendo desde el español." },
        { type: "table", head: ["Verbo", "Enchufe", "Ejemplo", "Tu mente en español dice…"], rows: [
          ["want", "to + verbo", "{{I want to learn.}}", "quiero aprender"], ["need", "to + verbo", "{{I need to study.}}", "necesito estudiar"],
          ["decide", "to + verbo", "{{She decided to leave.}}", "decidió irse"], ["enjoy", "verbo + -ing", "{{I enjoy learning.}}", "disfruto aprender"],
          ["avoid", "verbo + -ing", "{{He avoids driving.}}", "evita conducir"], ["finish", "verbo + -ing", "{{We finished working.}}", "terminamos de trabajar"],
          ["suggest", "verbo + -ing", "{{She suggested waiting.}}", "sugirió esperar"], ["can", "verbo base", "{{I can swim.}}", "puedo nadar"],
          ["help", "verbo base (o con to)", "{{This helps improve.}}", "esto ayuda a mejorar"]] },
        { type: "callout", kind: "note", title: "Para que no se te enrede", es: "Mira la última columna: en español todos usan una forma parecida (*querer + infinitivo*, *disfrutar + infinitivo*). En inglés **cambian**. Por eso la traducción palabra por palabra falla: el español te esconde las diferencias." },
        { type: "exercises", id: "chk1", title: "Comprueba: la idea central", intro: "5 preguntas rápidas antes de seguir.", items: [
          Q.mcq("¿Por qué falla traducir palabra por palabra?", ["Porque el inglés es más difícil", "Porque el inglés funciona con paquetes y cada verbo trae su propio enchufe", "Porque el español no tiene verbos"], 1, "El inglés se arma con **paquetes** (*helps reduce stress*) y cada verbo pide su propio enchufe. El español te esconde esas diferencias."),
          Q.mcq("¿Qué enchufe usa el verbo **enjoy**?", ["to + verbo", "verbo + -ing", "verbo base"], 1, "*I enjoy learning.* **Enjoy** pide **-ing**.", { full: "I enjoy learning." }),
          Q.mcq("¿Qué enchufe usa el verbo **need**?", ["to + verbo", "verbo + -ing", "verbo base"], 0, "*I need to study.* **Need** pide **to + verbo**.", { full: "I need to study." }),
          Q.mcq("¿Qué viene después de **can**?", ["to + verbo", "verbo + -ing", "verbo base"], 2, "Después de un modal como **can** el verbo va en **base**: *I can swim.*", { full: "I can swim." }),
          Q.mcq("En español dices «el estrés». En inglés general, ¿cómo dices «stress»?", ["the stress", "stress (sin the)", "a stress"], 1, "Para ideas **generales** no se usa *the*: *stress*, *life*, *coffee*.")
        ] }
      ]
    },

    /* ═════════════ 2. HELP + VERBO BASE ═════════════ */
    {
      id: "base", title: "HELP + verbo base",
      blocks: [
        { type: "h", h: "El verbo “desnudo”" },
        { type: "p", es: "**Bare** = desnudo. **Infinitive** = el verbo en su forma básica. **Bare infinitive** = el verbo base **sin TO**. No estamos quitando *TO* “porque sí”: es una estructura reconocida del inglés." },
        { type: "callout", kind: "tip", title: "Cómo se dice “bare infinitive”", es: "**bare** se pronuncia `/bɛr/`, casi como “ber” en español. Rima con *air*, *care* y *chair*. La *e* final no se pronuncia, y la *a* no suena como en “bar”.\n\n**infinitive** se pronuncia `/ɪnˈfɪnətɪv/` → “in-FI-ni-tiv”. La fuerza va en la segunda sílaba: **FI**.\n\nJuntos: “ber in-FI-ni-tiv”. ✗ no “bar”, no “bir”." },
        { type: "h", h: "Las dos formas principales" },
        { type: "examples", title: "Con o sin TO: mismo significado", items: [
          { en: "This method helps improve your pronunciation.", es: "Este método ayuda a mejorar tu pronunciación.", note: "**Sin TO**: muy natural en inglés americano." },
          { en: "This method helps to improve your pronunciation.", es: "Mismo significado.", note: "**Con TO**: también correcta; **no es un error**." }] },
        { type: "formula", title: "Estructura 1", parts: [{ t: "Sujeto" }, { t: "HELP", c: "b" }, { t: "verbo base", c: "c" }, { t: "complemento" }], note: "Exercise helps reduce stress." },
        { type: "h", h: "Con una persona en medio" },
        { type: "formula", title: "Estructura 2", parts: [{ t: "Sujeto" }, { t: "HELP", c: "b" }, { t: "persona", c: "d" }, { t: "verbo base", c: "c" }, { t: "complemento" }], note: "También se puede usar TO aquí, pero lo más natural es sin TO." },
        { type: "examples", items: [
          { en: "She helped me understand the problem.", es: "Ella me ayudó a entender el problema." },
          { en: "My teacher helped me understand English grammar.", es: "Mi profesor me ayudó a entender la gramática inglesa." },
          { en: "Can you help me find my keys?", es: "¿Puedes ayudarme a encontrar mis llaves?" },
          { en: "Technology helps students learn faster.", es: "La tecnología ayuda a los estudiantes a aprender más rápido." }] },
        { type: "h", h: "Los 8 bloques modelo: lo que más se usa" },
        { type: "p", es: "En vez de aprender *HELP + “cualquier verbo”*, aprende **8 bloques modelo** y, con cada uno, las palabras que normalmente lo acompañan. Así tu cerebro deja de armar la frase pieza por pieza y empieza a decirla completa. Otros dos muy frecuentes: {{help explain}} (ayudar a explicar) y {{help solve}} (ayudar a resolver)." },
        { type: "table", head: ["Bloque modelo", "IPA", "En español", "Lo que más se usa después"], rows: [
          ["**help reduce**", "`/hɛlp rɪˈduːs/`", "ayudar a reducir", "stress · anxiety · costs · risk · pain · waste"],
          ["**help improve**", "`/hɛlp ɪmˈpruːv/`", "ayudar a mejorar", "health · sleep · performance · communication · skills · pronunciation"],
          ["**help connect**", "`/hɛlp kəˈnɛkt/`", "ayudar a conectar", "people · students · families · communities · ideas"],
          ["**help build**", "`/hɛlp bɪld/`", "ayudar a construir", "confidence · trust · relationships · habits · skills · a future"],
          ["**help create**", "`/hɛlp kriˈeɪt/`", "ayudar a crear", "opportunities · jobs · value · a plan · a better future"],
          ["**help understand**", "`/hɛlp ˌʌndərˈstænd/`", "ayudar a comprender", "the problem · the situation · the rules · how it works · complex ideas"],
          ["**help develop**", "`/hɛlp dɪˈvɛləp/`", "ayudar a desarrollar", "skills · confidence · habits · critical thinking · fluency"],
          ["**help achieve**", "`/hɛlp əˈtʃiːv/`", "ayudar a alcanzar / lograr", "goals · results · success · your dreams · the best outcome"]] },
        { type: "examples", title: "Un modelo en acción", items: [
          { en: "Regular exercise helps reduce stress.", es: "El ejercicio regular ayuda a reducir el estrés." },
          { en: "Daily practice helps improve your pronunciation.", es: "La práctica diaria ayuda a mejorar tu pronunciación." },
          { en: "Technology helps connect people from different countries.", es: "La tecnología ayuda a conectar a personas de distintos países." },
          { en: "Good habits help build confidence.", es: "Los buenos hábitos ayudan a construir confianza." },
          { en: "A clear strategy helps create new opportunities.", es: "Una estrategia clara ayuda a crear nuevas oportunidades." },
          { en: "Clear examples help understand complex ideas.", es: "Los ejemplos claros ayudan a comprender ideas complejas." },
          { en: "Reading every day helps develop fluency and vocabulary.", es: "Leer todos los días ayuda a desarrollar fluidez y vocabulario." },
          { en: "A clear plan helps achieve your goals.", es: "Un plan claro ayuda a alcanzar tus metas." }] },
        { type: "callout", kind: "key", title: "Cambia una pieza y tienes cien frases", es: "Memoriza el bloque y cambia solo lo que va después: {{helps reduce stress}} → {{helps reduce anxiety}} → {{helps reduce costs}} → {{helps reduce risk}}. Es la forma más rápida de pasar de “traduzco” a “hablo”." },
        { type: "exercises", id: "chk2", title: "Comprueba: HELP + verbo base", items: [
          Q.mcq("This helps ___ your English.", ["improve", "improving", "improves"], 0, "Después de **help** el verbo va en **base**: *improve*. Nunca *-ing* ni *-s*."),
          Q.mcq("¿Cuál es la estructura más natural en inglés americano?", ["She helped me to understand.", "She helped me understand.", "She helped me understanding."], 1, "**Sin TO** es lo más natural. Con TO también es correcta, pero *understanding* nunca."),
          Q.mcq("¿Qué significa **bare infinitive**?", ["verbo con -ing", "verbo base sin TO", "verbo en pasado"], 1, "**Bare** = desnudo; el verbo en su forma básica **sin TO**."),
          Q.mcq("¿Cómo rima **bare**?", ["con “bar”", "con air, care y chair", "con “beer”"], 1, "**bare** `/bɛr/` rima con *air*, *care* y *chair*."),
          Q.match("Une cada bloque con su significado", [["help reduce", "ayudar a reducir"], ["help build", "ayudar a construir"], ["help achieve", "ayudar a alcanzar"], ["help connect", "ayudar a conectar"]], "Son bloques que debes decir **completos**, como una canción.")
        ] }
      ]
    },

    /* ═════════════ 3. SIN THE Y CON -S ═════════════ */
    {
      id: "details", title: "Sin THE y con -s",
      blocks: [
        { type: "h", h: "Tres detalles que tu cerebro en español se salta" },
        { type: "list", items: ["**Sin “the” en lo general:** {{helps reduce stress}}, no *helps reduce the stress*. Solo usas *the* si es algo específico: {{the stress of the exam}}.", "**Sin “to”:** el bloque ya viene armado, *helps reduce*. (Con *to* también es correcto, pero el bloque corto es el que más oyes.)", "**Sujeto plural = “help”, sin -s:** {{Exercise helps…}} pero {{Good habits help…}}"] },
        { type: "h", h: "Por qué “stress” no lleva THE" },
        { type: "p", es: "Tu mente dice *el estrés*, así que pone *the*. Pero el inglés usa *the* solo para algo **específico que los dos ya conocemos**. Cuando hablas de una idea **en general**, va **sin artículo**." },
        { type: "table", head: ["Español", "Inglés (general: sin the)", "Inglés (específico: con the)"], rows: [
          ["El estrés es malo", "{{Stress is bad for health.}}", "{{The stress of this job is huge.}}"],
          ["La vida es dura", "{{Life is hard.}}", "{{The life of a nurse is hard.}}"],
          ["Me gusta el café", "{{I like coffee.}}", "{{I like the coffee in this café.}}"],
          ["La práctica ayuda a reducir el estrés", "{{Practice helps reduce stress.}}", "{{Practice helps reduce the stress of the exam.}}"]] },
        { type: "callout", kind: "key", title: "La pregunta de control", es: "Antes de escribir *the*, pregúntate: **¿hablo de algo específico que los dos conocemos, o de algo en general?** Si es general, **no lleva the**." },
        { type: "h", h: "Practicing helps: el verbo como sujeto" },
        { type: "p", es: "En español dices *Practicar ayuda* (infinitivo). En inglés el sujeto es un **gerundio** (verbo + *-ing*) y se trata como **tercera persona singular**, así que HELP lleva **-s**." },
        { type: "table", head: ["Incorrecto", "Correcto", "Por qué"], rows: [
          ["✗ Practicing help reduce stress", "✓ {{Practicing helps reduce stress}}", "Gerundio como sujeto = he/she/it → **-s**"],
          ["✗ Reading help improve vocabulary", "✓ {{Reading helps improve vocabulary}}", "Igual: *Reading* = it"],
          ["✗ Walking help clear your mind", "✓ {{Walking helps clear your mind}}", "Igual: *Walking* = it"]] },
        { type: "callout", kind: "key", title: "Regla para recordar", es: "Gerundio como sujeto → **helps**. Y después de *helps*, el verbo **siempre va en base**: {{helps get ahead}}, nunca *helps getting ahead*." },
        { type: "callout", kind: "warn", title: "Dos sujetos = plural", es: "Si el sujeto son **dos gerundios**, ya es plural y vuelve **help** sin -s: {{Reading and writing help improve your English.}}" },
        { type: "exercises", id: "chk3", title: "Comprueba: THE y la -s", items: [
          Q.mcq("«La vida es dura» (idea general) se dice…", ["Life is hard.", "The life is hard."], 0, "Idea **general** → sin *the*.", { full: "Life is hard." }),
          Q.mcq("«El estrés de este trabajo es enorme» se dice…", ["Stress of this job is huge.", "The stress of this job is huge."], 1, "Es algo **específico** (*de este trabajo*) → lleva *the*.", { full: "The stress of this job is huge." }),
          Q.mcq("Learning ___ people build confidence.", ["help", "helps"], 1, "*Learning* es un gerundio como sujeto = it → **helps**."),
          Q.mcq("Walking ___ clear your mind.", ["help", "helps"], 1, "Gerundio como sujeto = **it** → **helps**."),
          Q.mcq("Reading and writing ___ improve your English.", ["help", "helps"], 0, "**Dos** sujetos = plural → **help**."),
          Q.mcq("Antes de escribir **the**, ¿qué debes preguntarte?", ["¿Es un sustantivo?", "¿Hablo de algo específico que los dos conocemos o de algo general?", "¿Está en plural?"], 1, "Si es **general**, no lleva *the*.")
        ] }
      ]
    },

    /* ═════════════ 4. FRASES LARGAS Y EL MOMENTO ¡AJA! ═════════════ */
    {
      id: "long", title: "Frases largas",
      blocks: [
        { type: "h", h: "El secreto para construir frases largas" },
        { type: "p", es: "Cuando coordinas varias acciones después de HELP, **no repites TO ni cambias la forma**: todas se quedan en base. Así se arman las frases largas que suenan profesionales." },
        { type: "examples", title: "Frases largas modelo", items: [
          { en: "Learning English helps students communicate with confidence, understand different cultures, express their ideas clearly and take advantage of international opportunities.", es: "Aprender inglés ayuda a los estudiantes a comunicarse con confianza, comprender diferentes culturas, expresar sus ideas con claridad y aprovechar las oportunidades internacionales." },
          { en: "Regular exercise helps reduce stress, improve sleep quality, increase energy levels and maintain a healthier lifestyle.", es: "El ejercicio regular ayuda a reducir el estrés, mejorar el sueño, aumentar la energía y mantener un estilo de vida más saludable." },
          { en: "A good education helps people develop critical thinking, make better decisions, solve problems more effectively and build stronger professional relationships.", es: "Una buena educación ayuda a las personas a desarrollar el pensamiento crítico, tomar mejores decisiones, resolver problemas con eficacia y construir relaciones profesionales sólidas." },
          { en: "The new strategy helped the company reduce operating costs, attract new customers and expand its services into international markets.", es: "La nueva estrategia ayudó a la empresa a reducir costos, atraer clientes y expandir sus servicios a mercados internacionales." },
          { en: "This program can help participants develop practical skills, overcome communication barriers and prepare for new professional opportunities.", es: "Este programa puede ayudar a los participantes a desarrollar habilidades prácticas, superar barreras de comunicación y prepararse para nuevas oportunidades." }] },
        { type: "callout", kind: "tip", title: "Tu cerebro repetiría “a”", es: "En español repetirías *a* delante de cada verbo. En inglés basta con **el primer enchufe de help**: {{helps reduce stress, improve sleep and increase energy}}." },
        { type: "formula", title: "Fórmula de la frase larga", parts: [{ t: "Sujeto" }, { t: "helps", c: "b" }, { t: "verbo 1", c: "c" }, { t: "verbo 2", c: "c" }, { t: "and verbo 3", c: "c" }], note: "Todos los verbos en base. Sin repetir TO." },
        { type: "h", h: "El momento ¡aja!: ¿por qué aparece TO más adelante?" },
        { type: "p", es: "Mira esta frase real. Tiene `help` sin TO… y más adelante aparece un `to`. ¿Es una contradicción?" },
        { type: "examples", items: [{ en: "This approach can help make the learning process much easier for students who struggle to understand complex grammar.", es: "Este enfoque puede ayudar a hacer el aprendizaje más fácil para estudiantes que tienen dificultades para entender gramática compleja." }] },
        { type: "table", head: ["Fragmento", "Qué pasa"], rows: [
          ["{{can help}}", "Después del modal **can**, *help* va en base."], ["{{help make}}", "HELP permite **make** sin TO."],
          ["{{students who…}}", "Empieza una descripción de los estudiantes."], ["{{struggle to understand}}", "**STRUGGLE** trae su propio enchufe: *to + verbo*."]] },
        { type: "callout", kind: "key", title: "Regla de oro", es: "**Help solo manda sobre el verbo que va justo después de él.** Cuando ese tramo termina, cada verbo nuevo trae su **propio enchufe**. No es una contradicción: son dos verbos con dos reglas." },
        { type: "examples", title: "Tres verbos, tres reglas", items: [{ en: "My teacher helped me understand difficult grammar by explaining the rules, providing practical examples and encouraging me to use English in real-life situations.", es: "Mi profesor me ayudó a entender gramática difícil explicando las reglas, dando ejemplos prácticos y animándome a usar inglés en situaciones reales.", note: "**helped me understand** (HELP + persona + base) · **by explaining** (después de la preposición *by* va **-ing**) · **encouraging me to use** (ENCOURAGE + persona + *to* + verbo). Es *encourage*, no *help*, quien pide TO." }] },
        { type: "exercises", id: "chk4", title: "Comprueba: frases largas y el momento ¡aja!", items: [
          Q.mcq("Learning English helps people build confidence, ___ new skills and connect with others.", ["develop", "developing", "to developing"], 0, "Todos los verbos que siguen a **help** se quedan en **base**: *build, develop, connect*."),
          Q.mcq("En «students who struggle to understand», ¿por qué hay un **to**?", ["Porque help lo pide", "Porque struggle trae su propio enchufe: to + verbo", "Porque students es plural"], 1, "**Help** solo manda sobre el verbo que va justo después. *Struggle* tiene su propio enchufe."),
          Q.mcq("En «helped me understand… by explaining», ¿por qué **explaining** va en -ing?", ["Porque help lo pide", "Porque después de la preposición by va -ing", "Porque está en pasado"], 1, "Tras una **preposición** (by) el verbo va en **-ing**."),
          Q.mcq("En «encouraging me to use», ¿quién pide TO?", ["help", "encourage", "me"], 1, "**ENCOURAGE + persona + to + verbo**. No es *help*.")
        ] }
      ]
    },

    /* ═════════════ 5. OTROS USOS Y ERRORES ═════════════ */
    {
      id: "other", title: "Otros usos y errores",
      blocks: [
        { type: "h", h: "Atención: CAN’T HELP + -ing (otro significado)" },
        { type: "p", es: "Aquí HELP **no** significa “ayudar a alguien”. Significa **no poder evitar algo**. Es otra construcción y cambia la forma del verbo." },
        { type: "table", head: ["Estructura", "Ejemplo", "Significado"], rows: [
          ["can’t / couldn’t help + **-ing**", "{{I couldn't help laughing.}}", "No pude evitar reírme."],
          ["can’t / couldn’t help but + **base**", "{{I couldn't help but laugh.}}", "No pude evitar reírme."],
          ["can’t help it", "{{I couldn't help it.}}", "No pude evitarlo."]] },
        { type: "examples", items: [{ en: "I couldn't help thinking about it.", es: "No pude evitar pensar en eso." }, { en: "I can't help worrying about my family.", es: "No puedo evitar preocuparme por mi familia." }] },
        { type: "callout", kind: "error", title: "Error típico", es: "✗ *I can't help to laugh*  →  ✓ {{I can't help laughing.}}" },
        { type: "h", h: "Otros usos importantes de HELP" },
        { type: "table", head: ["Expresión", "Significado", "Ejemplo"], rows: [
          ["help out", "echar una mano", "{{Can you help me out?}}"], ["help yourself (to)", "servirse por cuenta propia", "{{Help yourself to some coffee.}}"],
          ["it helps (that)", "ayuda / resulta útil", "{{A little practice helps.}}"], ["help with + sustantivo / -ing", "ayudar con algo", "{{She helped me with my homework.}}"]] },
        { type: "callout", kind: "note", es: "Con *help with* **no** usamos bare infinitive: usamos *with* + sustantivo o *-ing*. Ejemplo: {{This app helps with organizing your schedule.}}" },
        { type: "h", h: "Tabla de referencia rápida" },
        { type: "table", head: ["Estructura", "Ejemplo"], rows: [
          ["HELP + verbo base", "{{This helps improve.}}"], ["HELP + persona + verbo base", "{{She helped me understand.}}"], ["HELP + to + verbo", "{{This helps to improve.}}"],
          ["HELP + persona + to + verbo", "{{She helped me to understand.}}"], ["CAN’T HELP + -ing", "{{I can't help laughing.}}"], ["CAN’T HELP BUT + verbo base", "{{I can't help but laugh.}}"],
          ["HELP OUT", "{{Can you help me out?}}"], ["HELP WITH + sustantivo", "{{Help with my homework.}}"]] },
        { type: "h", h: "Errores típicos de hispanohablantes (y su arreglo)" },
        { type: "table", head: ["Lo que sale por traducir", "Cómo se dice", "Por qué"], rows: [
          ["✗ The teacher helps me to reduce the stress", "✓ {{The teacher helps me reduce stress}}", "Sin *to* es más natural; estrés general, sin *the*"],
          ["✗ Practicing help reduce stress", "✓ {{Practicing helps reduce stress}}", "Gerundio sujeto → **-s**"],
          ["✗ She helps me understanding", "✓ {{She helps me understand}}", "Después de help, verbo **base**"],
          ["✗ This helps getting ahead", "✓ {{This helps get ahead}}", "Nunca **-ing** tras help (ayudar)"],
          ["✗ The life is hard", "✓ {{Life is hard}}", "Idea general, sin *the*"],
          ["✗ I like the coffee", "✓ {{I like coffee}}", "Gusto general, sin *the*"],
          ["✗ I can’t help to laugh", "✓ {{I can't help laughing}}", "*can’t help* = no poder evitar → **-ing**"]] },
        { type: "callout", kind: "note", title: "Un recordatorio amable", es: "Antes de decir “está mal”, piensa: *tu cerebro está usando el paquete del español; este es el paquete nuevo*. Equivocarse es señal de que el paquete nuevo se está construyendo." },
        { type: "callout", kind: "key", title: "El resumen que quiero que recuerdes", es: "• HELP + verbo base (sin TO): *helps reduce, helps improve, helps build*.\n• HELP + persona + verbo base: *She helped me understand*.\n• TO también es correcto, pero sin TO es más común en inglés americano.\n• Ideas generales sin THE: *stress, life, coffee*.\n• Gerundio como sujeto → *helps*: *Practicing helps*.\n• CAN’T HELP + -ing = no poder evitar: *I couldn’t help laughing*.\n• Cada verbo trae su enchufe: aprende el paquete, no la traducción." },
        { type: "exercises", id: "chk5", title: "Comprueba: otros usos", items: [
          Q.mcq("I couldn't help ___.", ["laugh", "to laugh", "laughing"], 2, "**Can't help** (no poder evitar) pide **-ing**."),
          Q.mcq("En «I can't help you», help significa…", ["ayudar", "no poder evitar", "servirse"], 0, "Aquí hay **persona** + nada más: es *ayudar*. Con *-ing* sería «no poder evitar».", { fixed: true }),
          Q.mcq("«Echar una mano» se dice…", ["help out", "help up", "help in"], 0, "**Help out** = echar una mano."),
          Q.mcq("She helped me ___ my homework.", ["with", "to", "for"], 0, "**help with** + sustantivo: ayudar con algo."),
          Q.tf("«I can't help to laugh» es correcto.", false, "Debe ser *I can't help laughing* (o *I can't help but laugh*).")
        ] }
      ]
    },

    /* ═════════════ 6. PRONUNCIACIÓN ═════════════ */
    {
      id: "pron", title: "Pronunciación",
      blocks: [
        { type: "p", es: "Primero cada bloque **solo**, luego dentro de una oración completa. Di el bloque **10 veces en voz alta**, y después cambia una sola pieza: *helps reduce stress → helps reduce anxiety → helps reduce costs*. Toca cada palabra para escucharla." },
        { type: "pron", title: "Bare infinitive", groups: [
          { sym: "/bɛr ɪnˈfɪnətɪv/", name: "bare infinitive", tip: "“ber in-FI-ni-tiv”. La fuerza va en **FI**. ✗ no “bar”, no “bir”.", words: [{ w: "bare infinitive", ipa: "bɛr ɪnˈfɪnətɪv" }, { w: "bare", ipa: "bɛr" }, { w: "infinitive", ipa: "ɪnˈfɪnətɪv" }, "air", "care", "chair"] }] },
        { type: "pron", title: "Los 8 bloques y sus compañeros", intro: "Cada tarjeta: el bloque primero, luego las palabras que más lo acompañan.", groups: [
          { sym: "/hɛlp rɪˈduːs/", name: "help reduce", words: [{ w: "help reduce", ipa: "hɛlp rɪˈduːs" }, "stress", "anxiety", "costs", "risk", "pain", "waste"] },
          { sym: "/hɛlp ɪmˈpruːv/", name: "help improve", words: [{ w: "help improve", ipa: "hɛlp ɪmˈpruːv" }, "health", "sleep", "performance", "communication", "skills", "pronunciation"] },
          { sym: "/hɛlp kəˈnɛkt/", name: "help connect", words: [{ w: "help connect", ipa: "hɛlp kəˈnɛkt" }, "people", "students", "families", "communities", "ideas"] },
          { sym: "/hɛlp bɪld/", name: "help build", words: [{ w: "help build", ipa: "hɛlp bɪld" }, "confidence", "trust", "relationships", "habits", "future"] },
          { sym: "/hɛlp kriˈeɪt/", name: "help create", words: [{ w: "help create", ipa: "hɛlp kriˈeɪt" }, "opportunities", "jobs", "value", "plan"] },
          { sym: "/hɛlp ˌʌndərˈstænd/", name: "help understand", words: [{ w: "help understand", ipa: "hɛlp ˌʌndərˈstænd" }, "problem", "situation", "rules", "complex", "ideas"] },
          { sym: "/hɛlp dɪˈvɛləp/", name: "help develop", words: [{ w: "help develop", ipa: "hɛlp dɪˈvɛləp" }, "skills", "confidence", "thinking", "fluency"] },
          { sym: "/hɛlp əˈtʃiːv/", name: "help achieve", words: [{ w: "help achieve", ipa: "hɛlp əˈtʃiːv" }, "goals", "results", "success", "dreams", "outcome"] }] },
        { type: "callout", kind: "tip", title: "Ritmo natural", es: "En una frase real, *help* se une al verbo que sigue: {{helps reduce}} suena casi como una sola palabra. Intenta decirlo **sin pausa** entre las dos." }
      ]
    },

    /* ═════════════ 7. LECTURA ═════════════ */
    {
      id: "reading", title: "Lectura",
      blocks: [
        { type: "reading", title: "Una rutina con HELP", intro: "Un texto corto con los bloques en contexto. Escúchalo completo, luego frase por frase, y toca las palabras que no conozcas.", paragraphs: [
          { en: "I study English every day, and it really helps improve my life. Reading helps develop my vocabulary, and listening helps me understand native speakers. My teacher helped me build confidence, and she always helps us practice our pronunciation. Now exercise helps me reduce stress, too. I can't help smiling when I understand a whole conversation!", es: "Estudio inglés todos los días y de verdad ayuda a mejorar mi vida. Leer ayuda a desarrollar mi vocabulario y escuchar me ayuda a entender a los hablantes nativos. Mi profesor me ayudó a construir confianza y siempre nos ayuda a practicar nuestra pronunciación. Ahora el ejercicio también me ayuda a reducir el estrés. ¡No puedo evitar sonreír cuando entiendo toda una conversación!" }] },
        { type: "reading", title: "Frases largas", intro: "Observa cómo después de **help** todos los verbos quedan en base, sin repetir *to*.", paragraphs: [
          { en: "Learning English helps students communicate with confidence, understand different cultures, express their ideas clearly and take advantage of international opportunities.", es: "Aprender inglés ayuda a los estudiantes a comunicarse con confianza, comprender diferentes culturas, expresar sus ideas con claridad y aprovechar las oportunidades internacionales." },
          { en: "Regular exercise helps reduce stress, improve sleep quality, increase energy levels and maintain a healthier lifestyle.", es: "El ejercicio regular ayuda a reducir el estrés, mejorar el sueño, aumentar la energía y mantener un estilo de vida más saludable." },
          { en: "A good education helps people develop critical thinking, make better decisions, solve problems more effectively and build stronger professional relationships.", es: "Una buena educación ayuda a las personas a desarrollar el pensamiento crítico, tomar mejores decisiones, resolver problemas con eficacia y construir relaciones profesionales sólidas." },
          { en: "The new strategy helped the company reduce operating costs, attract new customers and expand its services into international markets.", es: "La nueva estrategia ayudó a la empresa a reducir costos, atraer clientes y expandir sus servicios a mercados internacionales." },
          { en: "This program can help participants develop practical skills, overcome communication barriers and prepare for new professional opportunities.", es: "Este programa puede ayudar a los participantes a desarrollar habilidades prácticas, superar barreras de comunicación y prepararse para nuevas oportunidades." }] },
        { type: "reading", title: "El momento ¡aja!", intro: "Aquí aparecen otros verbos con su propio enchufe. Identifica cuáles obedecen a *help* y cuáles no.", paragraphs: [
          { en: "This approach can help make the learning process much easier for students who struggle to understand complex grammar.", es: "Este enfoque puede ayudar a hacer el aprendizaje más fácil para estudiantes que tienen dificultades para entender gramática compleja." },
          { en: "My teacher helped me understand difficult grammar by explaining the rules, providing practical examples and encouraging me to use English in real-life situations.", es: "Mi profesor me ayudó a entender gramática difícil explicando las reglas, dando ejemplos prácticos y animándome a usar inglés en situaciones reales." }] }
      ]
    },

    /* ═════════════ 8. FRASES (REPETICIÓN) ═════════════ */
    {
      id: "phrases", title: "Frases",
      blocks: [
        { type: "p", es: "Aquí el valor está en **repetir**. Cada frase se reproduce varias veces y, en el modo *Escuchar y repetir*, hay una pausa para decirla en voz alta. Empieza por los bloques solos, luego cambia una pieza, y termina con las frases largas." },
        { type: "drill", title: "1 · Los 8 bloques solos", repeats: 5, intro: "Dilos como si fueran una sola palabra.", phrases: [
          { en: "help reduce", es: "ayudar a reducir", ipa: "hɛlp rɪˈduːs" }, { en: "help improve", es: "ayudar a mejorar", ipa: "hɛlp ɪmˈpruːv" }, { en: "help connect", es: "ayudar a conectar", ipa: "hɛlp kəˈnɛkt" },
          { en: "help build", es: "ayudar a construir", ipa: "hɛlp bɪld" }, { en: "help create", es: "ayudar a crear", ipa: "hɛlp kriˈeɪt" }, { en: "help understand", es: "ayudar a comprender", ipa: "hɛlp ˌʌndərˈstænd" },
          { en: "help develop", es: "ayudar a desarrollar", ipa: "hɛlp dɪˈvɛləp" }, { en: "help achieve", es: "ayudar a alcanzar", ipa: "hɛlp əˈtʃiːv" }] },
        { type: "drill", title: "2 · Cambia una pieza", repeats: 3, intro: "El bloque no cambia; solo cambia lo que va después.", phrases: [
          { en: "helps reduce stress", es: "ayuda a reducir el estrés" }, { en: "helps reduce anxiety", es: "ayuda a reducir la ansiedad" }, { en: "helps reduce costs", es: "ayuda a reducir costos" }, { en: "helps reduce risk", es: "ayuda a reducir el riesgo" },
          { en: "helps improve health", es: "ayuda a mejorar la salud" }, { en: "helps improve sleep", es: "ayuda a mejorar el sueño" }, { en: "helps improve communication", es: "ayuda a mejorar la comunicación" }, { en: "helps improve pronunciation", es: "ayuda a mejorar la pronunciación" },
          { en: "helps build confidence", es: "ayuda a construir confianza" }, { en: "helps build trust", es: "ayuda a construir confianza (en otros)" }, { en: "helps build good habits", es: "ayuda a construir buenos hábitos" }, { en: "helps build a future", es: "ayuda a construir un futuro" },
          { en: "helps create opportunities", es: "ayuda a crear oportunidades" }, { en: "helps create jobs", es: "ayuda a crear empleos" }, { en: "helps achieve your goals", es: "ayuda a alcanzar tus metas" }, { en: "helps achieve success", es: "ayuda a lograr el éxito" }] },
        { type: "drill", title: "3 · Frases modelo", repeats: 3, phrases: [
          { en: "Regular exercise helps reduce stress.", es: "El ejercicio regular ayuda a reducir el estrés." }, { en: "Daily practice helps improve your pronunciation.", es: "La práctica diaria ayuda a mejorar tu pronunciación." },
          { en: "Technology helps connect people from different countries.", es: "La tecnología ayuda a conectar a personas de distintos países." }, { en: "Good habits help build confidence.", es: "Los buenos hábitos ayudan a construir confianza." },
          { en: "A clear strategy helps create new opportunities.", es: "Una estrategia clara ayuda a crear nuevas oportunidades." }, { en: "Clear examples help understand complex ideas.", es: "Los ejemplos claros ayudan a comprender ideas complejas." },
          { en: "Reading every day helps develop fluency and vocabulary.", es: "Leer todos los días ayuda a desarrollar fluidez y vocabulario." }, { en: "A clear plan helps achieve your goals.", es: "Un plan claro ayuda a alcanzar tus metas." }] },
        { type: "drill", title: "4 · Con una persona en medio", repeats: 3, phrases: [
          { en: "She helped me understand the problem.", es: "Ella me ayudó a entender el problema." }, { en: "My teacher helped me understand English grammar.", es: "Mi profesor me ayudó a entender la gramática inglesa." },
          { en: "Can you help me find my keys?", es: "¿Puedes ayudarme a encontrar mis llaves?" }, { en: "Technology helps students learn faster.", es: "La tecnología ayuda a los estudiantes a aprender más rápido." },
          { en: "This app helps people organize their time.", es: "Esta aplicación ayuda a las personas a organizar su tiempo." }, { en: "Can you help me out?", es: "¿Puedes echarme una mano?" }] },
        { type: "drill", title: "5 · Practicing helps (el verbo como sujeto)", repeats: 3, phrases: [
          { en: "Practicing helps reduce stress.", es: "Practicar ayuda a reducir el estrés." }, { en: "Reading helps improve vocabulary.", es: "Leer ayuda a mejorar el vocabulario." }, { en: "Walking helps clear your mind.", es: "Caminar ayuda a despejar la mente." },
          { en: "Reading and writing help improve your English.", es: "Leer y escribir ayudan a mejorar tu inglés." }, { en: "Stress is bad for health.", es: "El estrés es malo para la salud." }, { en: "Life is hard.", es: "La vida es dura." }, { en: "I like coffee.", es: "Me gusta el café." }] },
        { type: "drill", title: "6 · No poder evitar (CAN’T HELP)", repeats: 3, phrases: [
          { en: "I couldn't help laughing.", es: "No pude evitar reírme." }, { en: "I couldn't help but laugh.", es: "No pude evitar reírme." }, { en: "I couldn't help it.", es: "No pude evitarlo." },
          { en: "I couldn't help thinking about it.", es: "No pude evitar pensar en eso." }, { en: "I can't help worrying about my family.", es: "No puedo evitar preocuparme por mi familia." }] },
        { type: "drill", title: "7 · Frases largas (un solo enchufe)", repeats: 2, phrases: [
          { en: "Regular exercise helps reduce stress, improve sleep quality, increase energy levels and maintain a healthier lifestyle.", es: "El ejercicio regular ayuda a reducir el estrés, mejorar el sueño, aumentar la energía y mantener un estilo de vida más saludable." },
          { en: "A good education helps people develop critical thinking, make better decisions, solve problems more effectively and build stronger professional relationships.", es: "Una buena educación ayuda a las personas a desarrollar el pensamiento crítico, tomar mejores decisiones, resolver problemas con eficacia y construir relaciones sólidas." },
          { en: "The new strategy helped the company reduce operating costs, attract new customers and expand its services into international markets.", es: "La nueva estrategia ayudó a la empresa a reducir costos, atraer clientes y expandir sus servicios." },
          { en: "This program can help participants develop practical skills, overcome communication barriers and prepare for new professional opportunities.", es: "Este programa puede ayudar a los participantes a desarrollar habilidades, superar barreras y prepararse para nuevas oportunidades." }] }
      ]
    },

    /* ═════════════ 9. PRÁCTICA: 15 SETS DE MENOR A MAYOR DIFICULTAD ═════════════ */
    {
      id: "practice", title: "Práctica",
      blocks: [
        { type: "callout", kind: "key", title: "Cómo practicar", es: "Los sets van de **fácil a difícil**. No pases al siguiente hasta sacar **70 % o más** (verás tu mejor resultado en cada tarjeta). Si fallas, lee la explicación y usa **Repetir las falladas**. Los ejercicios que falles quedan guardados en **Práctica › Corregir mis errores**." },

        { type: "h", h: "Fase 1 · Reconocer" },
        { type: "exercises", id: "p1", title: "1 · Elige el verbo correcto después de HELP", intro: "Nivel inicial: reconoce la forma que va después de help.", items: [
          Q.mcq("Regular exercise helps ___ stress.", ["reducing", "reduce", "reduces"], 1, "Después de **help** el verbo va en **base**: *reduce*."),
          Q.mcq("This method helps students ___ faster.", ["learning", "learns", "learn"], 2, "**helps students learn**: HELP + persona + verbo base."),
          Q.mcq("My teacher helped me ___ the lesson.", ["understand", "understanding", "understands"], 0, "**helped me understand**: base, no *-ing* ni *-s*."),
          Q.mcq("The program helps people ___ confidence.", ["develop", "developing", "develops"], 0, "**helps people develop**: base."),
          Q.mcq("She helped me ___ my English pronunciation.", ["improve", "improving", "improves"], 0, "**helped me improve**: base."),
          Q.mcq("This strategy can help ___ the problem.", ["solving", "solve", "solves"], 1, "Después de **can help**, *help* va en base y el siguiente verbo también: *solve*."),
          Q.mcq("Music helps people ___ better.", ["relax", "relaxing", "relaxes"], 0, "**helps people relax**: base."),
          Q.mcq("Sleep helps you ___ healthy.", ["stay", "staying", "stays"], 0, "**helps you stay**: HELP + persona + base."),
          Q.mcq("Good friends help us ___ problems.", ["solve", "solving", "solves"], 0, "**help us solve**: base."),
          Q.mcq("My brother helped me ___ my homework.", ["do", "doing", "does"], 0, "**helped me do**: base."),
          Q.mcq("Practice helps ___ confidence.", ["build", "building", "builds"], 0, "**helps build**: el bloque modelo."),
          Q.mcq("Our teacher always helps us ___ English.", ["understand", "understanding", "understands"], 0, "**helps us understand**: base."),
          Q.mcq("Walking helps ___ your mind.", ["clear", "clearing", "clears"], 0, "**helps clear**: *Walking* es el sujeto (por eso *helps*), pero después de help va **base**."),
          Q.mcq("Does this medicine help ___ pain?", ["reduce", "reducing", "reduces"], 0, "Tras **help** siempre base, incluso en preguntas con *does*.")
        ] },
        { type: "exercises", id: "p2", title: "2 · Escribe el verbo en la forma correcta", intro: "Escribe el verbo que falta. Con o sin TO se acepta, pero lo natural es sin TO.", items: [
          Q.fill("Exercise helps ___ (reduce) stress.", B("reduce"), "Verbo base tras help.", { hint: "Sin -s, sin -ing." }),
          Q.fill("Practice helps ___ (improve) your English.", B("improve"), "Verbo base tras help."),
          Q.fill("She helped me ___ (understand) the lesson.", B("understand"), "HELP + persona + base."),
          Q.fill("Technology helps students ___ (learn) faster.", B("learn"), "HELP + persona + base."),
          Q.fill("A good plan helps ___ (achieve) your goals.", B("achieve"), "Bloque modelo: *help achieve*."),
          Q.fill("Sleep helps ___ (improve) your memory.", B("improve"), "Bloque modelo: *help improve*."),
          Q.fill("Can you help me ___ (find) my keys?", B("find"), "HELP + persona + base: *help me find*."),
          Q.fill("This book helps people ___ (develop) new habits.", B("develop"), "Bloque modelo: *help develop*."),
          Q.fill("Reading every day helps ___ (develop) fluency.", B("develop"), "Después de help, base."),
          Q.fill("My mother helped me ___ (create) a budget.", B("create"), "HELP + persona + base: *help me create*."),
          Q.fill("These examples help ___ (understand) the rules.", B("understand"), "Sujeto plural → *help*; después, base."),
          Q.fill("Teamwork helps ___ (connect) people.", B("connect"), "Bloque modelo: *help connect*.")
        ] },
        { type: "exercises", id: "p3", title: "3 · Los 8 bloques modelo", intro: "Significado, palabras que los acompañan y escritura.", items: [
          Q.match("Une cada bloque con su significado (1)", [["help reduce", "ayudar a reducir"], ["help improve", "ayudar a mejorar"], ["help connect", "ayudar a conectar"], ["help build", "ayudar a construir"]], "Aprende los bloques completos, no las piezas."),
          Q.match("Une cada bloque con su significado (2)", [["help create", "ayudar a crear"], ["help understand", "ayudar a comprender"], ["help develop", "ayudar a desarrollar"], ["help achieve", "ayudar a alcanzar / lograr"]], "Aprende los bloques completos, no las piezas."),
          Q.mcq("¿Qué bloque usas para decir «ayudar a construir confianza»?", ["help build confidence", "help achieve confidence", "help reduce confidence"], 0, "**Build** va con *confidence, trust, relationships, habits*.", { full: "Good habits help build confidence." }),
          Q.mcq("¿Qué suele ir después de **help reduce**?", ["stress", "goals", "friends"], 0, "*help reduce*: stress, anxiety, costs, risk, pain, waste."),
          Q.mcq("¿Qué suele ir después de **help improve**?", ["pronunciation", "anxiety", "pain"], 0, "*help improve*: health, sleep, performance, communication, skills, pronunciation."),
          Q.mcq("¿Qué suele ir después de **help achieve**?", ["goals", "stress", "waste"], 0, "*help achieve*: goals, results, success, your dreams, the best outcome."),
          Q.mcq("¿Qué suele ir después de **help create**?", ["opportunities", "pain", "stress"], 0, "*help create*: opportunities, jobs, value, a plan, a better future."),
          Q.mcq("¿Qué suele ir después de **help understand**?", ["the problem", "pain", "waste"], 0, "*help understand*: the problem, the situation, the rules, how it works, complex ideas."),
          Q.mcq("¿Qué suele ir después de **help connect**?", ["people", "risk", "costs"], 0, "*help connect*: people, students, families, communities, ideas."),
          Q.fill("A clear plan helps ___ (alcanzar) your goals.", B("achieve"), "*help achieve* + goals."),
          Q.fill("Good habits help ___ (construir) confidence.", B("build"), "*help build* + confidence."),
          Q.fill("Technology helps ___ (conectar) people.", B("connect"), "*help connect* + people."),
          Q.fill("Examples help ___ (comprender) the rules.", B("understand"), "*help understand* + the rules."),
          Q.fill("This course helps ___ (desarrollar) new skills.", B("develop"), "*help develop* + skills."),
          Q.fill("A strategy helps ___ (crear) new opportunities.", B("create"), "*help create* + opportunities."),
          Q.dictate("Regular exercise helps reduce stress.", "Bloque *help reduce* + *stress* (sin *the*)."),
          Q.dictate("Daily practice helps improve your pronunciation.", "Bloque *help improve* + *your pronunciation*.")
        ] },
        { type: "exercises", id: "p4", title: "4 · Con THE o sin THE", intro: "Ideas generales (sin the) frente a cosas específicas (con the).", items: [
          Q.mcq("«Me gusta el café» (en general) se dice…", ["I like coffee.", "I like the coffee."], 0, "Gusto **general** → sin *the*.", { full: "I like coffee." }),
          Q.mcq("«Me gusta el café de esta cafetería» se dice…", ["I like coffee in this café.", "I like the coffee in this café."], 1, "Es un café **específico** (el de esta cafetería) → *the*.", { full: "I like the coffee in this café." }),
          Q.mcq("«La vida es dura» (en general) se dice…", ["Life is hard.", "The life is hard."], 0, "Idea **general** → sin *the*.", { full: "Life is hard." }),
          Q.mcq("«La vida de una enfermera es dura» se dice…", ["Life of a nurse is hard.", "The life of a nurse is hard."], 1, "Es la vida **específica** de una enfermera → *the*.", { full: "The life of a nurse is hard." }),
          Q.mcq("«El estrés es malo para la salud» (en general) se dice…", ["Stress is bad for health.", "The stress is bad for the health."], 0, "Todo es **general**: sin *the* ni en *stress* ni en *health*.", { full: "Stress is bad for health." }),
          Q.mcq("«El estrés de este trabajo es enorme» se dice…", ["Stress of this job is huge.", "The stress of this job is huge."], 1, "*de este trabajo* lo hace **específico** → *the*.", { full: "The stress of this job is huge." }),
          Q.mcq("«La práctica ayuda a reducir el estrés» (en general)", ["Practice helps reduce stress.", "The practice helps reduce the stress."], 0, "General → sin *the*.", { full: "Practice helps reduce stress." }),
          Q.mcq("«La práctica ayuda a reducir el estrés del examen»", ["Practice helps reduce stress of the exam.", "Practice helps reduce the stress of the exam."], 1, "*del examen* es específico → *the stress*.", { full: "Practice helps reduce the stress of the exam." }),
          Q.mcq("___ music helps reduce stress.", ["The", "(sin artículo)"], 1, "Hablas de la música **en general** → sin *the*.", { fixed: true, full: "Music helps reduce stress." }),
          Q.mcq("___ music in this restaurant is too loud.", ["The", "(sin artículo)"], 0, "Es la música **específica** de este restaurante → *the*.", { fixed: true, full: "The music in this restaurant is too loud." }),
          Q.mcq("___ health is important.", ["The", "(sin artículo)"], 1, "Salud en **general** → sin *the*.", { fixed: true, full: "Health is important." }),
          Q.mcq("___ health of my grandmother is good.", ["The", "(sin artículo)"], 0, "*of my grandmother* lo vuelve específico → *the*.", { fixed: true, full: "The health of my grandmother is good." }),
          Q.tf("«Practice helps reduce the stress» es la forma natural para una idea general.", false, "Si es general no lleva *the*: *Practice helps reduce stress.*"),
          Q.order("El estrés es malo para la salud", "Stress is bad for health", "Idea general: sin artículos.", { extra: ["the"] }),
          Q.order("El estrés de este trabajo es enorme", "The stress of this job is huge", "Aquí sí lleva *the*: es específico.", { extra: ["Stress"] })
        ] },
        { type: "exercises", id: "p5", title: "5 · help o helps: el sujeto manda", intro: "Gerundios, singulares, plurales y tiempos.", items: [
          Q.mcq("Exercise ___ reduce stress.", ["help", "helps"], 1, "*Exercise* = it → **helps**."),
          Q.mcq("Good habits ___ build confidence.", ["help", "helps"], 0, "*Good habits* = they → **help**."),
          Q.mcq("Practicing ___ improve fluency.", ["help", "helps"], 1, "Gerundio como sujeto = it → **helps**."),
          Q.mcq("These apps ___ people learn.", ["help", "helps"], 0, "*These apps* = they → **help**."),
          Q.mcq("Reading ___ develop vocabulary.", ["help", "helps"], 1, "Gerundio = it → **helps**."),
          Q.mcq("My friends ___ me relax.", ["help", "helps"], 0, "*My friends* = they → **help**."),
          Q.mcq("Technology ___ connect people.", ["help", "helps"], 1, "*Technology* = it → **helps**."),
          Q.mcq("Clear examples ___ understand ideas.", ["help", "helps"], 0, "Plural → **help**."),
          Q.mcq("Reading and writing ___ improve your English.", ["help", "helps"], 0, "**Dos** gerundios = plural → **help**."),
          Q.mcq("Studying every day ___ you remember more.", ["help", "helps"], 1, "Un solo gerundio sujeto = it → **helps**."),
          Q.mcq("Teachers ___ students succeed.", ["help", "helps"], 0, "*Teachers* = they → **help**."),
          Q.mcq("That company ___ clients save money.", ["help", "helps"], 1, "*That company* = it → **helps**."),
          Q.fill("Exercise ___ (help) reduce stress.", "helps", "*Exercise* = it → *helps*."),
          Q.fill("Good habits ___ (help) build confidence.", "help", "Plural → *help* (sin -s)."),
          Q.fill("The new strategy ___ (help) us grow last year.", "helped", "*last year* indica pasado → *helped* (igual para singular y plural)."),
          Q.fill("My parents ___ (help) me study when I was a child.", "helped", "*when I was a child* es pasado → *helped*."),
          Q.fill("Reading ___ (help) improve your vocabulary.", "helps", "Gerundio como sujeto → *helps*.")
        ] },
        { type: "h", h: "Fase 2 · Aplicar" },
        { type: "exercises", id: "p6", title: "6 · CAN’T HELP y otros usos de HELP", intro: "Aquí HELP cambia de significado y de estructura.", items: [
          Q.mcq("I couldn't help ___ when I heard the joke.", ["laugh", "to laugh", "laughing"], 2, "**Can't help** (no poder evitar) + **-ing**."),
          Q.mcq("He couldn't help but ___.", ["laughing", "laugh", "to laugh"], 1, "**Can't help but** + verbo **base**."),
          Q.mcq("I can't help ___ about my family.", ["worry", "worrying", "to worry"], 1, "**Can't help** + **-ing**."),
          Q.mcq("She couldn't help but ___ about it.", ["think", "thinking", "to think"], 0, "**Help but** + base."),
          Q.mcq("¿Qué significa «I couldn't help it»?", ["No pude ayudarte", "No pude evitarlo", "No quise ayudar"], 1, "*Can't help it* = no poder evitarlo.", { full: "I couldn't help it." }),
          Q.mcq("En «I can't help laughing», ¿help significa «ayudar a alguien»?", ["Sí", "No: significa no poder evitar"], 1, "Con **-ing** tras *can't help*, el significado es **no poder evitar**.", { fixed: true }),
          Q.mcq("Can you help me ___?", ["out", "in", "on"], 0, "**help out** = echar una mano.", { full: "Can you help me out?" }),
          Q.mcq("___ yourself to some coffee.", ["Help", "Serve", "Take"], 0, "**Help yourself (to)** = sírvete por tu cuenta.", { full: "Help yourself to some coffee." }),
          Q.mcq("She helped me ___ my homework.", ["with", "to", "for"], 0, "**help with** + sustantivo.", { full: "She helped me with my homework." }),
          Q.mcq("This app helps ___ organizing your schedule.", ["with", "to", "for"], 0, "**help with** + sustantivo o *-ing*.", { full: "This app helps with organizing your schedule." }),
          Q.tf("«I can't help to laugh» es correcto.", false, "Correcto: *I can't help laughing* o *I can't help but laugh*."),
          Q.fill("I couldn't help ___ (cry).", "crying", "**Can't help** + **-ing**."),
          Q.fill("I couldn't help but ___ (smile).", "smile", "**Help but** + base."),
          Q.fill("I can't help ___ (think) about it.", "thinking", "**Can't help** + **-ing**."),
          Q.fill("Could you help me ___?", "out", "**help out** = echar una mano."),
          Q.fill("Help ___ to some cake.", "yourself", "**help yourself** (reflexivo)."),
          Q.match("Une cada estructura con su significado", [["can't help + -ing", "no poder evitar"], ["help out", "echar una mano"], ["help yourself (to)", "servirse por cuenta propia"], ["help with + noun", "ayudar con algo"], ["it helps (that)", "ayuda / resulta útil"]], "Cada estructura de HELP tiene su propio significado."),
          Q.order("No puedo evitar preocuparme por mi familia", "I can't help worrying about my family", "**Can't help** + **-ing**.", { extra: ["to", "worry"] }),
          Q.order("¿Puedes echarme una mano?", "Can you help me out", "**help out** = echar una mano.", { extra: ["in"] }),
          Q.order("Ella me ayudó con mi tarea", "She helped me with my homework", "**help with** + sustantivo.", { extra: ["to"] })
        ] },
        { type: "exercises", id: "p7", title: "7 · Corrige el error", intro: "Los errores típicos de hispanohablantes. Elige la correcta y luego corrige escribiendo.", items: [
          Q.mcq("¿Cuál es correcta?", ["The teacher helps me reduce the stress.", "The teacher helps me reduce stress.", "The teacher helps me reducing stress."], 1, "Sin *-ing* tras help, y estrés **general** sin *the*.", { fixed: true, full: "The teacher helps me reduce stress." }),
          Q.mcq("¿Cuál es correcta?", ["Practicing help reduce stress.", "Practicing helps reduce stress.", "Practicing helps reducing stress."], 1, "Gerundio sujeto → *helps*; después, base.", { fixed: true, full: "Practicing helps reduce stress." }),
          Q.mcq("¿Cuál es correcta?", ["She helps me understanding.", "She helps me understand.", "She helps me understands."], 1, "Después de help (+ persona), verbo **base**.", { fixed: true, full: "She helps me understand." }),
          Q.mcq("¿Cuál es correcta?", ["This helps getting ahead.", "This helps get ahead.", "This helps gets ahead."], 1, "Nunca *-ing* ni *-s* tras help (ayudar).", { fixed: true, full: "This helps get ahead." }),
          Q.mcq("¿Cuál es correcta? («La vida es dura»)", ["The life is hard.", "Life is hard.", "Life are hard."], 1, "Idea general → sin *the*; *life* es singular → *is*.", { fixed: true, full: "Life is hard." }),
          Q.mcq("¿Cuál es correcta? («Me gusta el café», en general)", ["I like the coffee.", "I like coffee.", "I likes coffee."], 1, "Gusto general → sin *the*.", { fixed: true, full: "I like coffee." }),
          Q.mcq("¿Cuál es correcta?", ["I can't help to laugh.", "I can't help laughing.", "I can't help laugh."], 1, "**Can't help** + **-ing**.", { fixed: true, full: "I can't help laughing." }),
          Q.mcq("¿Cuál es correcta?", ["He couldn't help but laughing.", "He couldn't help but laugh.", "He couldn't help but to laugh."], 1, "**Help but** + verbo **base**.", { fixed: true, full: "He couldn't help but laugh." }),
          Q.mcq("¿Cuál es correcta?", ["Technology helps students learns faster.", "Technology helps students learn faster.", "Technology help students learn faster."], 1, "*Technology* = it → **helps**; y después base: *learn*.", { fixed: true, full: "Technology helps students learn faster." }),
          Q.mcq("¿Cuál es correcta?", ["Reading help improve vocabulary.", "Reading helps improve vocabulary.", "Reading helps improving vocabulary."], 1, "Gerundio sujeto → *helps*; después base.", { fixed: true, full: "Reading helps improve vocabulary." }),
          Q.fill("Corrige: She helps me understanding the lesson.", G("She helps me |understand the lesson"), "Tras help + persona, verbo base: *understand*."),
          Q.fill("Corrige (idea general): The life is hard.", "Life is hard", "Idea general → sin *the*."),
          Q.fill("Corrige: I can't help to cry.", ["I can't help crying", "I can't help but cry"], "**Can't help** + *-ing*, o **can't help but** + base."),
          Q.fill("Corrige: This helps getting ahead.", G("This helps |get ahead"), "Nunca *-ing* tras help."),
          Q.fill("Corrige: Reading help improve vocabulary.", G("Reading helps |improve vocabulary"), "Gerundio sujeto → *helps*."),
          Q.fill("Corrige (estrés general): The stress is bad for health.", "Stress is bad for health", "Idea general → sin *the*."),
          Q.fill("Corrige (estrés general): My teacher helped me to reduce the stress.", G("My teacher helped me |reduce stress"), "Estrés general: sin *the*. (El *to* es opcional.)")
        ] },
        { type: "exercises", id: "p8", title: "8 · Ordena la frase", intro: "Forma frases cada vez más largas. Hay palabras que sobran a propósito.", items: [
          Q.order("El ejercicio ayuda a reducir el estrés", "Exercise helps reduce stress", "HELP + base, sin *the*.", { extra: ["to", "the"], alt: ["Exercise helps to reduce stress"] }),
          Q.order("Practicar ayuda a mejorar tu pronunciación", "Practicing helps improve your pronunciation", "Gerundio sujeto → *helps*.", { extra: ["help", "to"], alt: ["Practicing helps to improve your pronunciation"] }),
          Q.order("Ella me ayudó a entender el problema", "She helped me understand the problem", "HELP + persona + base.", { extra: ["understanding", "to"], alt: ["She helped me to understand the problem"] }),
          Q.order("¿Puedes ayudarme a encontrar mis llaves?", "Can you help me find my keys", "HELP + persona + base.", { extra: ["finding", "to"], alt: ["Can you help me to find my keys"] }),
          Q.order("Los buenos hábitos ayudan a construir confianza", "Good habits help build confidence", "Plural → *help*.", { extra: ["helps", "the"], alt: ["Good habits help to build confidence"] }),
          Q.order("La tecnología ayuda a conectar a personas de distintos países", "Technology helps connect people from different countries", "HELP + base.", { extra: ["to", "the"], alt: ["Technology helps to connect people from different countries"] }),
          Q.order("No pude evitar reírme", "I couldn't help laughing", "**Can't help** + *-ing* (o *help but* + base).", { extra: ["to", "but"], alt: ["I couldn't help but laugh"] }),
          Q.order("Una buena estrategia ayuda a reducir los costos y aumentar las ventas", "A good strategy helps reduce costs and increase sales", "Todos los verbos en base, sin repetir *to*.", { extra: ["to", "the"], alt: ["A good strategy helps to reduce costs and increase sales"] }),
          Q.order("Esta aplicación ayuda a las personas a organizar su tiempo", "This app helps people organize their time", "HELP + persona + base.", { extra: ["to", "the"], alt: ["This app helps people to organize their time"] }),
          Q.order("Aprender inglés ayuda a las personas a construir confianza y desarrollar nuevas habilidades", "Learning English helps people build confidence and develop new skills", "Dos verbos en base unidos con *and*.", { extra: ["to", "the"], alt: ["Learning English helps people to build confidence and develop new skills"] }),
          Q.order("El ejercicio regular ayuda a reducir el estrés, mejorar el sueño y aumentar la energía", "Regular exercise helps reduce stress, improve sleep and increase energy", "Tres verbos en base, un solo enchufe.", { extra: ["to", "the"], alt: ["Regular exercise helps to reduce stress, improve sleep and increase energy"] }),
          Q.order("Mi profesor me ayudó a entender la gramática explicando las reglas", "My teacher helped me understand grammar by explaining the rules", "*helped me understand* + *by explaining* (-ing tras la preposición *by*).", { extra: ["to", "explain"], alt: ["My teacher helped me to understand grammar by explaining the rules"] })
        ] },
        { type: "h", h: "Fase 3 · Construir" },
        { type: "exercises", id: "p9", title: "9 · Traduce: nivel fácil", intro: "Frases cortas: piensa en el paquete, no pieza por pieza.", items: [
          Q.fill("Traduce: Esto ayuda a mejorar.", G("This helps |improve"), "Paquete: *helps improve*."),
          Q.fill("Traduce: Esto ayuda a reducir el estrés.", G("This helps |reduce stress"), "Paquete: *helps reduce stress* (sin *the*)."),
          Q.fill("Traduce: Ella me ayudó a entender.", G("She helped me |understand"), "HELP + persona + base."),
          Q.fill("Traduce: ¿Puedes ayudarme a encontrar mi teléfono?", G("Can you help me |find my phone"), "HELP + persona + base."),
          Q.fill("Traduce: Leer ayuda a desarrollar el vocabulario.", G("Reading helps |develop {my }vocabulary"), "Gerundio sujeto → *helps*; después base."),
          Q.fill("Traduce: Practicar ayuda.", "Practicing helps", "Gerundio como sujeto, verbo con **-s**.", { hint: "Practicing + helps." }),
          Q.fill("Traduce: El ejercicio ayuda a mejorar la salud.", G("Exercise helps |improve health"), "Paquete *helps improve* + *health* sin *the*."),
          Q.fill("Traduce: Aprender inglés ayuda a desarrollar confianza.", G("Learning English helps |develop confidence"), "Gerundio sujeto → *helps develop*.")
        ] },
        { type: "exercises", id: "p10", title: "10 · Traduce: nivel intermedio (de la lección)", intro: "Frases de la práctica de la lección. Se aceptan las variantes con o sin TO.", items: [
          Q.fill("Traduce: Esta aplicación ayuda a las personas a organizar su tiempo.", ["app", "application"].flatMap(w => G("This " + w + " helps people |organize their time")), "HELP + persona + base: *this app helps people organize their time*."),
          Q.fill("Traduce: Mi profesor me ayudó a entender la explicación.", G("My teacher helped me |understand the explanation"), "HELP + persona + base."),
          Q.fill("Traduce: La tecnología ayuda a conectar a personas de diferentes países.", G("Technology helps |connect people from different countries"), "Bloque *help connect*."),
          Q.fill("Traduce: Una buena estrategia ayuda a reducir los costos y aumentar las ventas.", G("A good strategy helps |reduce costs and increase sales"), "Dos verbos en base, un solo *helps*. *Costs* sin *the* (general)."),
          Q.fill("Traduce: No pude evitar reírme.", ["I couldn't help laughing", "I couldn't help but laugh"], "**Can't help** + *-ing*, o **help but** + base."),
          Q.fill("Traduce: Este método puede ayudar a los estudiantes a comunicarse con mayor confianza.", ["more", "greater"].flatMap(w => G("This method can help students |communicate with " + w + " confidence")), "**can help students communicate**: tras *can*, *help* va en base; y después base otra vez."),
          Q.fill("Traduce: La práctica constante ayuda a mejorar la pronunciación, ampliar el vocabulario y desarrollar fluidez.", ["Constant", "Consistent"].flatMap(w => G(w + " practice helps |improve pronunciation, expand vocabulary and develop fluency")), "Tres verbos en base con un solo *helps*. *Pronunciation* y *vocabulary* sin *the*."),
          Q.fill("Traduce: Ella me ayudó a encontrar una solución que cambió mi manera de trabajar.", ["She helped me find a solution that changed the way I work", "She helped me to find a solution that changed the way I work", "She helped me find a solution that changed my way of working", "She helped me find a solution that changed how I work"], "*helped me find* (HELP + persona + base) y *the way I work* para «mi manera de trabajar».")
        ] },
        { type: "exercises", id: "p11", title: "11 · Frases largas: un solo enchufe", intro: "Coordina varios verbos después de HELP sin repetir TO ni cambiar la forma.", items: [
          Q.mcq("¿Cuál es la frase correcta?", ["Learning English helps students communicate, understand and express their ideas.", "Learning English helps students communicate, understanding and express their ideas.", "Learning English helps students communicating, understanding and expressing their ideas."], 0, "Todos los verbos tras **help** quedan en **base**: *communicate, understand, express*.", { fixed: true }),
          Q.mcq("¿Cuál es la frase correcta?", ["A good education helps people develop critical thinking, making better decisions and solve problems.", "A good education helps people develop critical thinking, make better decisions and solve problems.", "A good education helps people developing critical thinking, make better decisions and solve problems."], 1, "*develop, make, solve*: todos en base.", { fixed: true }),
          Q.mcq("Learning English helps people build confidence, ___ new skills and connect with others.", ["develop", "developing", "develops"], 0, "Coordinados con *and*, todos en base.", { full: "Learning English helps people build confidence, develop new skills and connect with others." }),
          Q.mcq("Encuentra el verbo incorrecto: «Exercise helps reduce stress, improving sleep and maintain a healthier lifestyle.»", ["reduce", "improving", "maintain"], 1, "Debe ser *improve*: todos los verbos coordinados tras **help** van en base.", { fixed: true }),
          Q.mcq("Encuentra el verbo incorrecto: «The strategy helped the company reduce costs, attracting new customers and expand its services.»", ["reduce", "attracting", "expand"], 1, "Debe ser *attract* (base).", { fixed: true }),
          Q.fill("Regular exercise helps reduce stress, improve sleep and ___ (increase) energy levels.", "increase", "Coordinado con *and*: base, sin repetir *to*.", { full: "Regular exercise helps reduce stress, improve sleep and increase energy levels." }),
          Q.fill("A good education helps people develop critical thinking, ___ (make) better decisions and solve problems.", "make", "Base: *make better decisions*."),
          Q.fill("The new strategy helped the company reduce costs, ___ (attract) new customers and expand its services.", "attract", "Pasado (*helped*) pero los verbos que siguen van en **base**."),
          Q.fill("This program can help participants develop practical skills, ___ (overcome) barriers and prepare for opportunities.", "overcome", "Tras *can help*, todo en base."),
          Q.fill("Reading helps you learn new words, understand ideas and ___ (improve) your writing.", "improve", "Coordinado: base."),
          Q.order("Una buena educación ayuda a las personas a tomar mejores decisiones y resolver problemas", "A good education helps people make better decisions and solve problems", "Dos verbos en base con un solo *helps*.", { extra: ["to", "solving"], alt: ["A good education helps people to make better decisions and solve problems"] }),
          Q.order("La estrategia ayudó a la empresa a reducir costos y atraer clientes", "The strategy helped the company reduce costs and attract customers", "Pasado en *helped*; verbos en base.", { extra: ["to", "attracting"], alt: ["The strategy helped the company to reduce costs and attract customers"] })
        ] },
        { type: "h", h: "Fase 4 · Dominar" },
        { type: "exercises", id: "p12", title: "12 · El momento ¡aja!: cada verbo con su enchufe", intro: "Analiza frases reales. HELP solo manda sobre el verbo que va justo después.", items: [
          Q.mcq("«…students who struggle to understand complex grammar». ¿Por qué lleva **to**?", ["Porque help lo pide", "Porque struggle trae su propio enchufe: to + verbo", "Porque students es plural"], 1, "**Struggle** pide *to + verbo*. **Help** no manda aquí."),
          Q.mcq("En «This approach can ___ make learning easier», ¿qué forma toma **help** después de *can*?", ["helps", "help", "helping"], 1, "Después de un modal (*can*), el verbo va en **base**: *help*.", { fixed: true, full: "This approach can help make learning easier." }),
          Q.mcq("En «helped me understand grammar by explaining the rules», ¿por qué **explaining** lleva -ing?", ["Porque help lo pide", "Porque después de la preposición by va -ing", "Porque es pasado"], 1, "Tras una **preposición**, el verbo va en **-ing**."),
          Q.mcq("En «encouraging me to use English», ¿quién pide **to**?", ["help", "encourage", "me"], 1, "**ENCOURAGE + persona + to + verbo**."),
          Q.mcq("En «help make students feel more comfortable», ¿por qué **feel** va sin *to*?", ["Porque make trae su propio enchufe: make + persona + base", "Porque help lo pide directamente", "Porque feel es irregular"], 0, "*make students feel*: **make + persona + base** (el enchufe de *make*)."),
          Q.mcq("«A well-structured learning environment can help make students feel more comfortable, participate more actively and develop greater confidence when communicating in English.» ¿Qué verbo NO depende de help?", ["feel / participate / develop", "communicating", "make"], 1, "**communicating** va en -ing porque está después de *when* (una conjunción), no por *help*."),
          Q.mcq("«The use of real-life examples helps make complicated ideas easier to understand.» ¿Qué verbo obedece a help?", ["make", "understand", "helps"], 0, "**make** va en base por *help*. **understand** va tras *easier to* (adjetivo + to)."),
          Q.mcq("«Having a clear strategy should help prevent misunderstandings…» ¿Por qué **prevent** va en base?", ["Porque should help + base", "Porque es gerundio", "Porque lleva to"], 0, "Tras el modal **should**, *help* va en base, y después de help otro verbo base: *prevent*."),
          Q.mcq("«…ensure that everyone understands their responsibilities.» ¿Por qué **understands** lleva -s?", ["Porque help lo pide", "Porque after ensure that empieza una oración nueva con su propio verbo conjugado (everyone = it)", "Porque es un gerundio"], 1, "**that everyone understands** es una oración nueva: *everyone* = it → *understands*."),
          Q.mcq("«…the confidence they need to communicate effectively». ¿Qué verbo pide **to**?", ["help", "need", "develop"], 1, "**NEED + to + verbo**."),
          Q.mcq("«…communicate effectively, express their ideas clearly and take advantage of opportunities». ¿Por qué **express** y **take** no llevan to?", ["Se coordinan con communicate, dentro del mismo to", "Porque help lo prohíbe", "Porque son plurales"], 0, "Van coordinados con *communicate*, que ya tiene su *to* (*need to communicate, express and take*)."),
          Q.mcq("«…opportunities that might otherwise seem out of reach.» ¿Qué forma sigue a **might**?", ["to seem", "seem (base)", "seems"], 1, "Modal + **base**: *might seem*.", { fixed: true }),
          Q.match("Une el fragmento con lo que pasa", [["can help", "después del modal, help va en base"], ["help make", "HELP permite make sin TO"], ["struggle to understand", "STRUGGLE trae su propio enchufe: to + verbo"], ["by explaining", "tras una preposición va -ing"]], "Cada verbo tiene su enchufe; **help** solo manda sobre el verbo que va justo después."),
          Q.match("¿Quién pide qué?", [["need", "to + verbo"], ["enjoy", "verbo + -ing"], ["can", "verbo base"], ["help", "base (o con to)"]], "Cada verbo trae su propio enchufe: apréndelo, no lo adivines."),
          Q.mcq("Regla de oro: help solo manda sobre…", ["todos los verbos de la frase", "el verbo que va justo después de él", "el último verbo"], 1, "Cuando ese tramo termina, cada verbo nuevo trae su **propio enchufe**.", { fixed: true })
        ] },
        { type: "exercises", id: "p13", title: "13 · Dictado: escucha y escribe", intro: "Escucha con atención las terminaciones: help / helps / helped.", items: [
          Q.dictate("This helps improve.", "Bloque corto: *helps improve*."),
          Q.dictate("Exercise helps reduce stress.", "*helps reduce stress*, sin *the*."),
          Q.dictate("She helped me understand.", "*helped me understand*: pasado + persona + base."),
          Q.dictate("Can you help me find my keys?", "*help me find*: base."),
          Q.dictate("Practicing helps reduce stress.", "Gerundio sujeto → *helps*."),
          Q.dictate("I couldn't help laughing.", "*couldn't help* + *-ing*."),
          Q.dictate("Technology helps students learn faster.", "*helps students learn*."),
          Q.dictate("Good habits help build confidence.", "Plural → *help* sin -s."),
          Q.dictate("A clear plan helps achieve your goals.", "Bloque *help achieve*."),
          Q.dictate("Reading every day helps develop fluency and vocabulary.", "Bloque *help develop*."),
          Q.dictate("Regular exercise helps reduce stress, improve sleep quality and maintain a healthier lifestyle.", "Frase larga: tres verbos en base con un solo *helps*.")
        ] },
        { type: "exercises", id: "p14", title: "14 · Comprensión auditiva: escucha y elige", intro: "Distingue la forma exacta que oyes.", items: [
          Q.hear("She helped me understand.", ["She helped me understand.", "She helps me understand.", "She helped me understanding."], 0, "Se oye *helped* (pasado) y *understand* en base."),
          Q.hear("Good habits help build confidence.", ["Good habits help build confidence.", "A good habit helps build confidence.", "Good habits help me build confidence."], 0, "Plural: *habits* + *help* (sin /s/)."),
          Q.hear("I couldn't help laughing.", ["I couldn't help laughing.", "I couldn't help but laugh.", "I couldn't help you laugh."], 0, "*couldn't help* + *-ing*."),
          Q.hear("Practicing helps reduce stress.", ["Practicing help reduce stress.", "Practicing helps reduce stress.", "Practicing helps reduce the stress."], 1, "Gerundio sujeto → *helps* (se oye la /s/) y sin *the*."),
          Q.hear("Technology helps connect people.", ["Technology helps connect people.", "Technology helped connect people.", "Technology helps to connect people."], 0, "Presente *helps* y sin *to*."),
          Q.hear("Can you help me out?", ["Can you help me out?", "Can you help me now?", "Can you help me up?"], 0, "**help out** = echar una mano.")
        ] },
        { type: "exercises", id: "p15", title: "15 · Reto final", intro: "Mezcla todo lo aprendido: traducción larga, orden, análisis y corrección.", items: [
          Q.fill("Traduce: Aprender inglés ayuda a las personas a construir confianza, desarrollar nuevas habilidades, conectar con otros y alcanzar sus metas.", G("Learning English helps people |build confidence, develop new skills, connect with others and achieve their goals"), "Cuatro verbos en base, un solo *helps*. *Confidence* sin *the*."),
          Q.fill("Traduce: El ejercicio regular ayuda a reducir el estrés, mejorar el sueño, aumentar la energía y mantener un estilo de vida más saludable.", G("Regular exercise helps |reduce stress, improve sleep{ quality}, increase energy{ levels} and maintain a healthier lifestyle"), "Cuatro verbos en base. Sin *the* en estrés, sueño, energía."),
          Q.fill("Traduce: Esta estrategia ayudó a la empresa a reducir costos y atraer nuevos clientes.", G("This {new }strategy helped the company |reduce costs and attract new customers"), "Pasado: *helped*. Después, base: *reduce, attract*."),
          Q.fill("Traduce: Este programa puede ayudar a los participantes a desarrollar habilidades prácticas y superar barreras de comunicación.", G("This program can help participants |develop practical skills and overcome communication barriers"), "*can help participants develop*: modal + base + persona + base."),
          Q.order("Una buena educación ayuda a las personas a desarrollar el pensamiento crítico y tomar mejores decisiones", "A good education helps people develop critical thinking and make better decisions", "Dos verbos en base, *critical thinking* sin *the*.", { extra: ["to", "the"], alt: ["A good education helps people to develop critical thinking and make better decisions"] }),
          Q.mcq("Encuentra el error: «Reading every day help improve your vocabulary.»", ["help → helps", "improve → improving", "your → the"], 0, "Gerundio como sujeto → **helps**.", { fixed: true }),
          Q.mcq("Encuentra el error: «This course helps students developing critical thinking.»", ["helps → help", "developing → develop", "students → student"], 1, "Tras *help students*, verbo **base**: *develop*.", { fixed: true }),
          Q.mcq("Encuentra el error: «I couldn't help to cry.»", ["help → helping", "to cry → crying", "couldn't → can't"], 1, "**Can't help** + **-ing**: *crying*.", { fixed: true }),
          Q.mcq("Encuentra el error: «The life is hard when you are alone.» (idea general)", ["the life → life", "is → are", "hard → harder"], 0, "Idea general → sin *the*: *Life is hard…*", { fixed: true }),
          Q.dictate("My teacher helped me understand difficult grammar by explaining the rules.", "*helped me understand* + *by explaining*."),
          Q.hear("The new strategy helped the company reduce costs.", ["The new strategy helped the company reduce costs.", "The new strategy helps the company reduce costs.", "The new strategy helped the company reducing costs."], 0, "Pasado *helped* y base *reduce*."),
          Q.match("Une cada estructura con su ejemplo", [["HELP + verbo base", "This helps improve."], ["HELP + persona + verbo base", "She helped me understand."], ["CAN'T HELP + -ing", "I can't help laughing."], ["CAN'T HELP BUT + base", "I can't help but laugh."], ["HELP OUT", "Can you help me out?"], ["HELP WITH + sustantivo", "Help with my homework."]], "Repasa la tabla de referencia rápida del tema.")
        ] }
      ]
    }
  ]
});
})();
