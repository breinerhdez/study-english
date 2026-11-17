/* Alfabeto fonético (IPA) del inglés estadounidense, explicado para hispanohablantes.
   words: [palabra, IPA]    hard: sonido que suele costar a hispanohablantes */
window.IPA_DATA = {
  vowels: [
    { s: "iː", name: "i larga", es: "Como la “i” de “sí”, pero más larga y con los labios estirados.", words: [["see", "siː"], ["eat", "iːt"], ["green", "ɡriːn"]], tip: "Mantén el sonido: “seat” no es “sit”." , hard: true },
    { s: "ɪ", name: "i corta", es: "Entre la “i” y la “e” españolas. Relajada y breve.", words: [["sit", "sɪt"], ["big", "bɪɡ"], ["think", "θɪŋk"]], tip: "No la pronuncies como una “i” española tensa.", hard: true },
    { s: "ɛ", name: "e abierta", es: "Parecida a la “e” de “perro”.", words: [["bed", "bɛd"], ["ten", "tɛn"], ["friend", "frɛnd"]] },
    { s: "æ", name: "a cerrada", es: "Entre “a” y “e”: abre la boca como para “a” y di “e”.", words: [["cat", "kæt"], ["man", "mæn"], ["happy", "ˈhæpi"]], tip: "“bad” (æ) suena distinto de “bed” (ɛ).", hard: true },
    { s: "ɑː", name: "a profunda", es: "Como la “a” española, con la boca bien abierta y atrás.", words: [["father", "ˈfɑːðɚ"], ["hot", "hɑːt"], ["car", "kɑːr"]] },
    { s: "ɔː", name: "o abierta", es: "Una “o” redondeada y abierta, más larga que la española.", words: [["law", "lɔː"], ["water", "ˈwɔːtɚ"], ["talk", "tɔːk"]] },
    { s: "ʊ", name: "u corta", es: "Una “u” relajada y breve, sin redondear mucho los labios.", words: [["book", "bʊk"], ["good", "ɡʊd"], ["put", "pʊt"]], tip: "“full” (ʊ) no es “fool” (uː).", hard: true },
    { s: "uː", name: "u larga", es: "Como la “u” de “uno”, pero más larga.", words: [["food", "fuːd"], ["blue", "bluː"], ["you", "juː"]] },
    { s: "ʌ", name: "a corta (cup)", es: "Una “a” corta y neutra, con la boca relajada.", words: [["cup", "kʌp"], ["love", "lʌv"], ["bus", "bʌs"]], tip: "No digas “o”: “cup” no es “cop”.", hard: true },
    { s: "ə", name: "schwa", es: "El sonido más común del inglés: una vocal débil y neutra en sílabas sin acento.", words: [["about", "əˈbaʊt"], ["banana", "bəˈnænə"], ["the", "ðə"]], tip: "Reduce las sílabas sin acento: no pronuncies todas las vocales completas." },
    { s: "ɝ", name: "r vocal acentuada", es: "Vocal con “r” integrada, sin vibrar la lengua. Lengua curvada hacia atrás.", words: [["bird", "bɝd"], ["learn", "lɝn"], ["work", "wɝk"]], hard: true },
    { s: "ɚ", name: "r vocal débil", es: "Igual que ɝ, pero rápida y sin acento (final de muchas palabras).", words: [["teacher", "ˈtiːtʃɚ"], ["water", "ˈwɔːtɚ"], ["better", "ˈbɛtɚ"]] }
  ],
  diphthongs: [
    { s: "eɪ", name: "ei", es: "Como “ei” de “peine”, pero termina más suave.", words: [["day", "deɪ"], ["make", "meɪk"], ["eight", "eɪt"]] },
    { s: "aɪ", name: "ai", es: "Como “ai” de “baile”.", words: [["my", "maɪ"], ["time", "taɪm"], ["like", "laɪk"]] },
    { s: "ɔɪ", name: "oi", es: "Como “oy” de “hoy”.", words: [["boy", "bɔɪ"], ["voice", "vɔɪs"], ["enjoy", "ɪnˈdʒɔɪ"]] },
    { s: "aʊ", name: "au", es: "Como “au” de “causa”.", words: [["now", "naʊ"], ["house", "haʊs"], ["about", "əˈbaʊt"]] },
    { s: "oʊ", name: "ou", es: "Una “o” que termina en “u” suave. No es la “o” española pura.", words: [["go", "ɡoʊ"], ["home", "hoʊm"], ["know", "noʊ"]], tip: "Cierra los labios al final: “go” es /ɡoʊ/." }
  ],
  consonants: [
    { s: "p", name: "p", es: "Como la “p” española, pero con un soplo de aire al inicio de palabra.", words: [["pen", "pɛn"], ["happy", "ˈhæpi"], ["stop", "stɑːp"]] },
    { s: "b", name: "b", es: "Como la “b” de “bola”. Siempre con los labios cerrados.", words: [["book", "bʊk"], ["baby", "ˈbeɪbi"], ["job", "dʒɑːb"]] },
    { s: "t", name: "t", es: "Lengua en las encías (no en los dientes). Con soplo de aire al inicio.", words: [["time", "taɪm"], ["water", "ˈwɔːtɚ"], ["eat", "iːt"]], tip: "Entre vocales suena casi como una “d” rápida: “water”, “better”." },
    { s: "d", name: "d", es: "Lengua en las encías. Más firme que la “d” española suave.", words: [["day", "deɪ"], ["need", "niːd"], ["ready", "ˈrɛdi"]] },
    { s: "k", name: "k", es: "Como la “c” de “casa”.", words: [["cat", "kæt"], ["school", "skuːl"], ["make", "meɪk"]] },
    { s: "ɡ", name: "g", es: "Como la “g” de “gato”.", words: [["go", "ɡoʊ"], ["big", "bɪɡ"], ["again", "əˈɡɛn"]] },
    { s: "f", name: "f", es: "Como la “f” española.", words: [["food", "fuːd"], ["life", "laɪf"], ["phone", "foʊn"]] },
    { s: "v", name: "v", es: "Dientes superiores sobre el labio inferior y haz vibrar la voz. No es una “b”.", words: [["very", "ˈvɛri"], ["love", "lʌv"], ["live", "lɪv"]], tip: "“very” (v) no es “berry” (b).", hard: true },
    { s: "θ", name: "th sorda", es: "Punta de la lengua entre los dientes y sopla, sin voz. Como la “z” de España.", words: [["think", "θɪŋk"], ["three", "θriː"], ["bath", "bæθ"]], tip: "No la cambies por “s” ni por “t”.", hard: true },
    { s: "ð", name: "th sonora", es: "Igual que θ pero haciendo vibrar la voz. Como la “d” de “nada”.", words: [["this", "ðɪs"], ["mother", "ˈmʌðɚ"], ["the", "ðə"]], tip: "No la cambies por “d”.", hard: true },
    { s: "s", name: "s", es: "Como la “s” española.", words: [["see", "siː"], ["bus", "bʌs"], ["class", "klæs"]], tip: "Nunca añadas una “e” antes de “s” + consonante: “school” no es “eschool”.", hard: true },
    { s: "z", name: "z", es: "Una “s” con vibración de la voz (como un zumbido). No es la “z” española.", words: [["zoo", "zuː"], ["easy", "ˈiːzi"], ["is", "ɪz"]], hard: true },
    { s: "ʃ", name: "sh", es: "Como pedir silencio: “shhh”.", words: [["she", "ʃiː"], ["ship", "ʃɪp"], ["wash", "wɑːʃ"]] },
    { s: "ʒ", name: "zh", es: "Como “sh” pero con voz. Parecida a la “y” de “yo” en Argentina.", words: [["vision", "ˈvɪʒən"], ["usually", "ˈjuːʒuəli"], ["measure", "ˈmɛʒɚ"]] },
    { s: "h", name: "h", es: "Una “j” muy suave: solo aire, sin raspar la garganta.", words: [["hello", "həˈloʊ"], ["home", "hoʊm"], ["who", "huː"]], tip: "No la omitas ni la raspes. La “h” nunca es muda al inicio (salvo “hour”, “honest”)." },
    { s: "tʃ", name: "ch", es: "Como la “ch” de “chico”.", words: [["chair", "tʃɛr"], ["teacher", "ˈtiːtʃɚ"], ["watch", "wɑːtʃ"]] },
    { s: "dʒ", name: "j", es: "Como la “y” de “yo” en “mayo” fuerte, o “ll” argentina con “d” inicial: d + zh.", words: [["job", "dʒɑːb"], ["age", "eɪdʒ"], ["judge", "dʒʌdʒ"]], tip: "No lo pronuncies como la “j” española ni como la “y”.", hard: true },
    { s: "m", name: "m", es: "Como la “m” española.", words: [["man", "mæn"], ["time", "taɪm"], ["summer", "ˈsʌmɚ"]] },
    { s: "n", name: "n", es: "Como la “n” española.", words: [["no", "noʊ"], ["ten", "tɛn"], ["funny", "ˈfʌni"]] },
    { s: "ŋ", name: "ng", es: "La “n” de “banco”. Nunca se pronuncia la “g” al final.", words: [["sing", "sɪŋ"], ["morning", "ˈmɔːrnɪŋ"], ["thing", "θɪŋ"]], tip: "“sing” es /sɪŋ/, no “sin-g”.", hard: true },
    { s: "l", name: "l", es: "Punta de la lengua en las encías. Al final de sílaba es más “oscura” y profunda.", words: [["like", "laɪk"], ["hello", "həˈloʊ"], ["feel", "fiːl"]] },
    { s: "r", name: "r", es: "Lengua curvada hacia atrás SIN tocar el paladar y sin vibrar. No es la “r” española.", words: [["red", "rɛd"], ["right", "raɪt"], ["car", "kɑːr"]], tip: "Nunca la hagas vibrar como en “perro”.", hard: true },
    { s: "w", name: "w", es: "Como la “u” de “huevo”: labios redondeados y salida rápida.", words: [["we", "wiː"], ["water", "ˈwɔːtɚ"], ["work", "wɝk"]], tip: "No añadas una “g”: “we” no es “gui”." },
    { s: "j", name: "y", es: "Como la “i” de “hielo”. Es una semiconsonante.", words: [["yes", "jɛs"], ["you", "juː"], ["use", "juːz"]] }
  ],
  /* Pares mínimos: se diferencian en UN solo sonido. Ideales para entrenar el oído. */
  pairs: [
    { a: "iː", b: "ɪ", tip: "Larga y tensa vs. corta y relajada.", words: [["sheep", "ʃiːp", "ship", "ʃɪp"], ["seat", "siːt", "sit", "sɪt"], ["leave", "liːv", "live", "lɪv"], ["feel", "fiːl", "fill", "fɪl"]] },
    { a: "ɛ", b: "æ", tip: "“e” abierta vs. “a” cerrada.", words: [["bed", "bɛd", "bad", "bæd"], ["men", "mɛn", "man", "mæn"], ["pen", "pɛn", "pan", "pæn"]] },
    { a: "ʌ", b: "ɑː", tip: "“a” corta y neutra vs. “a” abierta.", words: [["cup", "kʌp", "cop", "kɑːp"], ["luck", "lʌk", "lock", "lɑːk"], ["cut", "kʌt", "cot", "kɑːt"]] },
    { a: "ʊ", b: "uː", tip: "u relajada y corta vs. u larga.", words: [["full", "fʊl", "fool", "fuːl"], ["pull", "pʊl", "pool", "puːl"], ["look", "lʊk", "Luke", "luːk"]] },
    { a: "θ", b: "s", tip: "Lengua entre los dientes vs. “s”.", words: [["think", "θɪŋk", "sink", "sɪŋk"], ["thick", "θɪk", "sick", "sɪk"], ["thing", "θɪŋ", "sing", "sɪŋ"]] },
    { a: "ð", b: "d", tip: "Lengua entre los dientes vs. “d”.", words: [["they", "ðeɪ", "day", "deɪ"], ["then", "ðɛn", "den", "dɛn"], ["those", "ðoʊz", "doze", "doʊz"]] },
    { a: "b", b: "v", tip: "Labios juntos vs. dientes sobre el labio.", words: [["berry", "ˈbɛri", "very", "ˈvɛri"], ["boat", "boʊt", "vote", "voʊt"], ["best", "bɛst", "vest", "vɛst"]] },
    { a: "ʃ", b: "tʃ", tip: "Aire continuo vs. explosión con “t”.", words: [["ship", "ʃɪp", "chip", "tʃɪp"], ["wash", "wɑːʃ", "watch", "wɑːtʃ"], ["sheep", "ʃiːp", "cheap", "tʃiːp"]] },
    { a: "dʒ", b: "j", tip: "“dy” con fricción vs. “y”.", words: [["jet", "dʒɛt", "yet", "jɛt"], ["jam", "dʒæm", "yam", "jæm"], ["Jess", "dʒɛs", "yes", "jɛs"]] },
    { a: "s", b: "z", tip: "Sin voz vs. con voz (vibra la garganta).", words: [["sip", "sɪp", "zip", "zɪp"], ["bus", "bʌs", "buzz", "bʌz"], ["ice", "aɪs", "eyes", "aɪz"]] },
    { a: "ŋ", b: "n", tip: "Fondo de la boca vs. punta de la lengua.", words: [["sing", "sɪŋ", "sin", "sɪn"], ["thing", "θɪŋ", "thin", "θɪn"], ["ran", "ræn", "rang", "ræŋ"]] },
    { a: "r", b: "l", tip: "Lengua curvada sin tocar vs. lengua en las encías.", words: [["right", "raɪt", "light", "laɪt"], ["red", "rɛd", "led", "lɛd"], ["road", "roʊd", "load", "loʊd"]] }
  ],
  /* Símbolos de acento y longitud */
  marks: [
    { s: "ˈ", name: "Acento principal", es: "Va ANTES de la sílaba más fuerte. Esa sílaba es más larga, más fuerte y más aguda.", ex: [["computer", "kəmˈpjuːtɚ"], ["banana", "bəˈnænə"], ["about", "əˈbaʊt"]] },
    { s: "ˌ", name: "Acento secundario", es: "Una sílaba con fuerza media, antes de la principal.", ex: [["education", "ˌɛdʒuˈkeɪʃən"], ["pronunciation", "prəˌnʌnsiˈeɪʃən"]] },
    { s: "ː", name: "Vocal larga", es: "Alarga la vocal que precede. Cambia el significado: “ship” vs. “sheep”.", ex: [["see", "siː"], ["food", "fuːd"], ["car", "kɑːr"]] },
    { s: "/ /", name: "Barras", es: "Encierran la pronunciación (la transcripción fonémica) de una palabra.", ex: [["hello", "həˈloʊ"], ["English", "ˈɪŋɡlɪʃ"]] }
  ]
};
