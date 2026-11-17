# English Studio

Plataforma web para estudiar inglés de forma autónoma: **IPA**, lector con audio, frases con repetición, vocabulario con enlace al punto exacto y ejercicios con retroalimentación. Funciona **sin internet** (PWA) en móvil, computador y TV.

Sin dependencias, sin build, sin CDN: HTML + CSS + JS puro.

## Ejecutar

```bash
node tools/serve.js          # → http://localhost:8080  (y la dirección para el celular, misma WiFi)
```

Abre la dirección en el navegador. La primera visita guarda todo para usarlo sin conexión; en el móvil usa *Añadir a pantalla de inicio*.
(También se puede abrir `index.html` directamente, pero sin modo offline.)

## Estructura

```
index.html            Entrada
css/                  tokens (color, escala fluida) · base (layout) · components · exercises
js/                   núcleo: store, dict, audio, router, topics, wordpanel, blocks, exercises, app
js/views/             Inicio/Temas/Práctica · Tema · Vocabulario · Fonética · Lector · Ajustes
data/dictionary.js    Diccionario base: palabra → [IPA, significado]
data/ipa.js           Tabla IPA, pares mínimos, símbolos
content/topics/*.js   UN ARCHIVO POR TEMA (aquí se agrega el contenido)
tools/                sync.js · serve.js · validate.js · make-icons.js
guides/               Material de referencia (no se publica)
```

## Agregar un tema

1. Copia `content/topics/01-to-be-present.js` (sirve de plantilla; cada tema va dentro de su propio `(function () { … })();`) → `content/topics/02-mi-tema.js` y cambia `id`, `title`, `order`.
2. `node tools/validate.js` → te dice qué palabras no tienen IPA/significado y si algún ejercicio está mal formado.
   Añade las que falten en `words: {...}` del tema (`"word": ["IPA", "significado"]`) o en `data/dictionary.js`.
3. `node tools/sync.js` (el servidor lo hace solo al arrancar) → registra el tema y actualiza la caché offline.

### Bloques disponibles (`sections[].blocks[]`)

| type | Para qué |
|---|---|
| `p`, `h`, `list`, `callout` (tip/warn/key/note/error), `table`, `formula` | Explicación conceptual. En el texto: `**negrita**`, `*cursiva*`, `{{English interactivo}}` |
| `examples` | Tarjetas en/es con audio normal y lento |
| `reading` | Texto o diálogo completo, frase por frase, con traducción e IPA (`dialogue: true`) |
| `drill` | **Frases con repetición** (1–10 veces, modo “escuchar y repetir”, velocidad, bucle) |
| `pron` | Grupos de palabras por sonido con IPA |
| `exercises` | Sets de ejercicios (abajo) |

### Ejercicios (`Q.*`)

`Q.mcq(q, opciones, índiceCorrecto, porqué)` · `Q.tf(q, bool, porqué)` · `Q.fill("She ___ here.", ["works"], porqué, {hint})` ·
`Q.order("es", "English sentence", porqué, {extra:[…], alt:[…]})` · `Q.match(q, [[en, es], …])` ·
`Q.dictate(en)` (escuchar y escribir) · `Q.hear(en, opciones, índice, porqué)` (escuchar y elegir).
El campo **porqué** es la retroalimentación cuando el estudiante falla: escríbelo siempre.

> Los enlaces de vocabulario usan los ids `section.id` / `block.id`. Si reordenas bloques sin id explícito, los enlaces guardados apuntan al bloque por su posición; pon `id` fijo en los bloques importantes.

## Vocabulario

Toca cualquier palabra en inglés → panel con IPA, significado, audio y **Guardar como desconocida**.
Se guarda con el enlace exacto (tema · sección · frase). Al final de cada tema, *Mi vocabulario* muestra solo las de ese tema; en **Vocabulario** están todas, con tarjetas de repaso espaciado.
Todo vive en `localStorage` (Ajustes → exportar/importar copia).

## Audio

Usa la voz del dispositivo (Web Speech API). Sin internet funciona si hay una voz en inglés **local** instalada (Ajustes › Voz indica cómo instalarla).

## TV

Ajustes › Tamaño de texto › **TV**. Se navega con las flechas del control remoto.
