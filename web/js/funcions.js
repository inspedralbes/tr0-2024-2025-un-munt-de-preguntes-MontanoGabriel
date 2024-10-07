let questions;
let currentQuestionIndex = 0; 
let correctAnswersCount = 0; 
let inicio; 
let timeout; 

// Fetch para obtener las preguntas desde la base de datos a través de PHP
fetch("/tr0-2024-2025-un-munt-de-preguntes-MontanoGabriel/back/Back.php")
  .then(response => response.json())
  .then(data => {
    questions = data;
      // Inicia el menú después de cargar las preguntas
      MenuInicio();
  });

// Función para mezclar las respuestas
function shuffle(array) {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

// Función para mostrar el menú de inicio
function MenuInicio() {
    document.getElementById('content').innerHTML = `
        <div class="titulo">
            <h1>FilmQuiz</h1>
            <br>
            <button id="Jugar" class="answer">Iniciar</button>
        </div>
    `;
    document.getElementById('Jugar').addEventListener('click', preguntas);
}

// Función para mostrar las preguntas del cuestionario
function preguntas() {
    if (currentQuestionIndex < questions.length) {
        // Obtener la pregunta actual
        let preguntaActual = questions[currentQuestionIndex];
        let respuestas = [
            preguntaActual.resposta_correcta,
            ...preguntaActual.respostes_incorrectes
        ];

        // Mezclar las respuestas
        shuffle(respuestas);

        // Mostrar la pregunta y la imagen
        document.getElementById('content').innerHTML = `
            <div class="pregunta">
                <h2>${preguntaActual.pregunta}</h2>
                <img src="${preguntaActual.imatge}"  width="200" height="350px">
            </div>
            <div id="respuestas" class="respuestas-grid"></div>
        `;

        // Añadir las respuestas como botones
        let respuestasDiv = document.getElementById('respuestas');
        respuestas.forEach(respuesta => {
            let boton = document.createElement('button');
            boton.textContent = respuesta;
            boton.classList.add('answer'); 
            boton.addEventListener('click', function() {
                verificarRespuesta(respuesta === preguntaActual.resposta_correcta);
            });
            respuestasDiv.appendChild(boton);
        });
    } else {
        mostrarResultadoFinal();  
    }
}


// Función para verificar si la respuesta es correcta
function verificarRespuesta(esCorrecta) {
    if (esCorrecta) {
        correctAnswersCount++;
    }
    currentQuestionIndex++;
    preguntas(); // Mostrar la siguiente pregunta
}

// Función para mostrar el resultado final
function mostrarResultadoFinal() {
    document.getElementById('content').innerHTML = `
        <div class="final">
            <h1>¡Has completado el cuestionario!</h1>

            <p class="pregunta">Has acertado ${correctAnswersCount} de ${questions.length} preguntas.</p>
            <img src="https://media.tenor.com/7PpiVBTIBXQAAAAM/spiderman-tobey-maguire.gif">
        </div>

        
    `;
}

// Función del cronómetro (opcional, no relacionada directamente con las preguntas)
function Cronometro() {
    var actual = new Date().getTime();
    var diff = new Date(actual - inicio);
    var result = LeadingZero(diff.getUTCHours()) + ":" + LeadingZero(diff.getUTCMinutes()) + ":" + LeadingZero(diff.getUTCSeconds());
    document.getElementById('crono').innerHTML = result;
    timeout = setTimeout(Cronometro, 1000);
}

// Función para añadir un cero delante si el número es menor de 10 (para horas, minutos, segundos)
function LeadingZero(Time) {
    return (Time < 10) ? "0" + Time : Time;
}

// Iniciar el cronómetro cuando la página se cargue
document.addEventListener('DOMContentLoaded', function() {
    inicio = new Date().getTime();
    Cronometro();
});
