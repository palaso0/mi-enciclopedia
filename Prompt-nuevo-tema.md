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
4. Registra el tema en `/assets/data/temas.js` añadiendo el objeto correspondiente al array global `window.temasData`:
   ```javascript
   {
     "slug": "[slug-en-minusculas-con-guiones]",
     "titulo": "[Título del tema]",
     "categoria": "[Categoría principal]",
     "resumen": "[Una sola línea descriptiva y sin rodeos]",
     "fecha": "[YYYY-MM-DD]"
   }
   ```
