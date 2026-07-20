# PROMPT — Instrucciones para crear un nuevo tema

Usa este archivo como plantilla y guía cada vez que quieras agregar un nuevo tema al sitio. Solo necesitas indicarme cuál es el **TEMA** a tratar.

---

## Directrices de Contenido y Pedagogía

1. **Explicación Intuitiva Primero**:
   - Evita explicaciones excesivamente técnicas o académicas en los primeros párrafos.
   - Utiliza analogías del mundo real (ej. comparar redes neuronales con lentes o búsquedas de YouTube) para asentar el concepto básico antes de entrar en detalle.

2. **Ejemplos Prácticos y Visuales**:
   - Utiliza componentes visuales (como las cadenas de palabras en HTML y clases CSS locales) para mostrar de forma práctica cómo opera el concepto.
   - Toda teoría abstracta debe estar inmediatamente acompañada de un caso de uso concreto.

3. **Código Didáctico y Simplificado**:
   - En lugar de presentar fórmulas matemáticas crudas directamente, simula el comportamiento con código legible (pseudocódigo o scripts simples de Python/JavaScript comentados).
   - Explica detalladamente qué representa cada variable dentro de esa simulación.

4. **Tono y Estructura**:
   - Tono directo, claro, sin relleno corporativo ("descubre", "sumérgete en").
   - Alterna anchos de texto, columnas, citas, tablas y bloques de código para que la página sea visualmente atractiva y fácil de leer.

---

## Flujo de Trabajo Técnico (para la IA)

Cuando se solicite un nuevo tema:
1. Crea la página de tema en `/temas/[slug]/index.html` utilizando rutas relativas correctas para el CSS y JS compartidos:
   - `../../assets/css/style.css`
   - `../../assets/js/main.js`
2. No modifiques las variables CSS globales de `style.css`. Si necesitas estilos específicos para una explicación interactiva o visual, agrégalos en una etiqueta `<style>` local dentro del HTML de la página del tema.
3. Asegúrate de añadir la clase `.reveal-element` a los bloques principales para que hereden las animaciones de scroll.
4. **Resaltado de código con PrismJS**: Para cualquier bloque de código en el tema, usa siempre las etiquetas `<pre><code>` con la clase del lenguaje correspondiente. PrismJS ya está disponible en el proyecto — solo hay que enlazarlo en el `<head>` y al final del `<body>`:
   - En el `<head>`: `<link rel="stylesheet" href="../../assets/css/prism.css">`
   - Al final del `<body>`: `<script src="../../assets/js/prism.js"></script>`
   
   Sintaxis para bloques de código:
   ```html
   <pre><code class="language-python">
   # Tu código aquí
   print("Hola")
   </code></pre>
   ```
   Clases disponibles según lenguaje: `language-python`, `language-javascript`, `language-sql`, `language-bash`, `language-json`. **Nunca uses texto plano para mostrar código.**

5. Registra el tema en `/assets/data/temas.js` añadiendo el objeto correspondiente al array global `window.temasData`:
   ```javascript
   {
     "slug": "[slug-en-minusculas-con-guiones]",
     "titulo": "[Título del tema]",
     "categoria": "[Categoría principal]",
     "resumen": "[Una sola línea descriptiva y sin rodeos]",
     "fecha": "[YYYY-MM-DD]"
   }
   ```
