# Reglas para la generación de temas en Códice

Siempre que el usuario solicite crear o modificar un tema para su enciclopedia personal de aprendizaje, debes guiarte estrictamente por las instrucciones descritas en [Prompt-nuevo-tema.md](../Prompt-nuevo-tema.md).

## Reglas Pedagógicas Críticas
1. **Comenzar con Analogías**: Nunca arranques un tema con fórmulas, definiciones de diccionario o sintaxis compleja. Comienza con una analogía simple y cotidiana.
2. **Casos Prácticos Inmediatos**: Acompaña cada concepto teórico de un ejemplo legible o simulación de código comentada.
3. **No Redefinir CSS Global**: Cualquier estilo especial necesario para representar un concepto de forma interactiva o visual debe ir en un bloque `<style>` dentro del HTML de ese tema específico.
4. **Actualizar el Registro**: Cada nuevo tema debe registrarse agregando su metadata en `assets/data/temas.js` dentro del array `window.temasData`.

## Temas Extenosos
Si el tema tiene más de 8-10 conceptos o el HTML supera las 1500 líneas:
- Dividir en subtemas dentro del directorio del tema
- Crear un `index.html` raíz como introducción y tabla de contenidos
- Cada subtema en su propia subcarpeta: `/temas/[slug]/[subtema]/index.html`
- Incluir navegación "← Anterior" / "Siguiente →" entre subtemas
- Usar rutas relativas `../../../assets/` para subtemas
