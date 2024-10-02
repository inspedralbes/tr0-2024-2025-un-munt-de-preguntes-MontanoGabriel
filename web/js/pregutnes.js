async function cargarPreguntes() {
    try {
        // Hacer el fetch a preguntes.php
        const response = await fetch('/tr0-2024-2025-un-munt-de-preguntes-MontanoGabriel/back/Back.php');
        const preguntes = await response.json();

        // Verificar si la respuesta es correcta
        if (!response.ok || !Array.isArray(preguntes)) {
            console.error('Error al obtener las preguntas');
            return;
        }

        // Función para mostrar las preguntas
        mostrarPreguntes(preguntes);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para mostrar las preguntas y respuestas en el DOM
function mostrarPreguntes(preguntes) {
    const container = document.getElementById('quiz-container');
    container.innerHTML = ''; // Limpiamos el contenedor

    // Recorremos todas las preguntas y respuestas
    preguntes.forEach(pregunta => {
        const divPregunta = document.createElement('div');
        divPregunta.classList.add('pregunta');

        // Título de la pregunta
        const tituloPregunta = document.createElement('h2');
        tituloPregunta.textContent = pregunta.pregunta;
        divPregunta.appendChild(tituloPregunta);

        // Crear una lista de respuestas (correcta + incorrectas)
        const respuestas = [
            pregunta.resposta_correcta,
            ...pregunta.respostes_incorrectes
        ];

        // Mezclar respuestas para que no siempre esté primero la correcta
        respuestas.sort(() => Math.random() - 0.5);

        // Añadir las respuestas a la pregunta
        respuestas.forEach(respuesta => {
            const btnRespuesta = document.createElement('button');
            btnRespuesta.textContent = respuesta;
            divPregunta.appendChild(btnRespuesta);
        });

        // Añadir imagen si existe
        if (pregunta.imatge) {
            const imgPregunta = document.createElement('img');
            imgPregunta.src = pregunta.imatge;
            imgPregunta.alt = 'Imagen relacionada';
            divPregunta.appendChild(imgPregunta);
        }

        // Añadir la pregunta completa al contenedor
        container.appendChild(divPregunta);
    });
}

// Cargar las preguntas al cargar la página
window.onload = cargarPreguntes;