# AGENTS.md — Códice

Sitio web estático de enciclopedia personal en español. Sin build tools, sin package manager, sin tests.

## Estructura

```
index.html                    # Hub principal
temas/[slug]/index.html       # Cada tema (contenido didáctico)
assets/
  css/style.css               # Estilos globales + variables CSS
  css/prism.css               # Highlight de código
  js/main.js                  # Lógica del hub (búsqueda, renderizado, dark mode)
  js/prism.js                 # PrismJS
  data/temas.js               # Registro de metadata: window.temasData[]
```

## Crear un nuevo tema

Seguir estrictamente `Prompt-nuevo-tema.md`. Pasos técnicos:

1. Crear `/temas/[slug]/index.html`
2. **Si el tema es extenso (>8-10 conceptos o >1500 líneas), dividir en subtemas:**
   - `index.html` como introducción + links a subtemas
   - Cada subtema en `/temas/[slug]/[subtema]/index.html`
   - Navegación "← Anterior" / "Siguiente →" entre subtemas
3. Registrar en `/assets/data/temas.js` (agregar objeto al array `window.temasData`)
4. CSS del tema: bloque `<style>` local, **no** modificar style.css (excepto para crear `--diagram-1` a `--diagram-6` la primera vez)
5. Rutas relativas:
   - Tema simple: `../../assets/css/style.css`, `../../assets/js/main.js`
   - Subtema: `../../../assets/css/style.css`, `../../../assets/js/main.js`
6. PrismJS en head y body (ver `Prompt-nuevo-tema.md` §4)

## Convenciones clave

- Todo en español con tildes correctas
- Analogías primero, fórmulas después
- SVG inline para diagramas (no imágenes generadas), usar `var(--diagram-N)`
- Clase `.reveal-element` en bloques principales para animaciones de scroll
- Variables CSS para diagramas: crear en `:root` de `style.css` solo si no existen
- Tono directo, sin relleno corporativo
