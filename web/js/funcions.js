let currentQuestionIndex = 0; // Índice para la pregunta actual
let correctAnswersCount = 0;  // Contador para las respuestas correctas


  

  function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }




// Función para mostrar el menú de inicio
function MenuInicio() {
    document.getElementById('content').innerHTML = `
        <div class="titulo">
            <h1>FilmQuiz</h1>
            <button id="Jugar">Iniciar</button>
        </div>
    `;
    document.getElementById('Jugar').addEventListener('click', renderContent);
    
}

// Función para renderizar el contenido (preguntas)
function renderContent() {
  
    // Si ya hemos pasado por todas las preguntas, mostramos el resultado final
    if (currentQuestionIndex >= data.preguntes.length) {
        document.getElementById('content').innerHTML = `
            <div class="final">
                <h1>¡Has completado el cuestionario!</h1>
                <img src="https://media.tenor.com/7PpiVBTIBXQAAAAM/spiderman-tobey-maguire.gif"> 
                <p>Respuestas correctas: ${correctAnswersCount} / ${data.preguntes.length}</p>
            </div>
        `;
        return; // Detenemos la ejecución
    }

    // Obtener la pregunta actual
    let preguntaActual = data.preguntes[currentQuestionIndex];
    

    // Construir el HTML para la pregunta y las respuestas
    let htmlString = `
        <div class="pregunta">
            ${preguntaActual.pregunta}
        </div>
        <div class="image">
            <img src="${preguntaActual.imatge}" alt="Imagen" width="300">
        </div>
        <div class="answers">
    `;
    // Crear los botones de respuesta
    let respuestas = [preguntaActual.resposta_correcta, ...preguntaActual.respostes_incorrectes];
    shuffle(respuestas)
    for (let j = 0; j < respuestas.length; j++) {
        // En el evento onclick pasamos la respuesta seleccionada para evaluar si es correcta o no
        htmlString += `<button class="answer" onclick="handleAnswerClick('${respuestas[j]}')">${respuestas[j]}</button>`;
    }

    htmlString += `</div>`;

    // Mostrar la pregunta y respuestas en el contenedor
    document.getElementById('content').innerHTML = htmlString;
}

// Función que maneja el clic en las respuestas
function handleAnswerClick(selectedAnswer) {
    // Obtener la respuesta correcta de la pregunta actual
    let correctAnswer = data.preguntes[currentQuestionIndex].resposta_correcta;

    // Verificar si la respuesta seleccionada es correcta
    if (selectedAnswer === correctAnswer) {
        correctAnswersCount++; // Aumentar el contador de respuestas correctas
    }

    // Pasar a la siguiente pregunta
    currentQuestionIndex++;
    // Renderizar la siguiente pregunta
    renderContent();
}

  // Función para añadir un cero delante si el número es menor de 10 (para horas, minutos, segundos)
  function LeadingZero(Time) {
      return (Time < 10) ? "0" + Time : Time;
  }
  
  // Función del cronómetro
  function Cronometro() {
      // Obtenemos la fecha actual
      var actual = new Date().getTime();
  
      // Calculamos la diferencia entre la fecha actual y la de inicio
      var diff = new Date(actual - inicio);
  
      // Formateamos el resultado en horas:minutos:segundos
      var result = LeadingZero(diff.getUTCHours()) + ":" + LeadingZero(diff.getUTCMinutes()) + ":" + LeadingZero(diff.getUTCSeconds());
  
      // Mostramos el tiempo transcurrido en el elemento con id 'crono'
      document.getElementById('crono').innerHTML = result;
  
      // Indicamos que la función se ejecute nuevamente en 1 segundo
      timeout = setTimeout(Cronometro, 1000);
  }
  
  // Iniciar el cronómetro cuando la página se cargue
  document.addEventListener('DOMContentLoaded', function() {
      inicio = new Date().getTime(); // Almacenar el tiempo de inicio
      Cronometro(); // Iniciar la función del cronómetro
  });

  
// Iniciar con el menú de inicio
// MenuInicio();
getjson();

var inicio; // Variable global que guarda el momento en que el cronómetro empieza
  var timeout; // Guardará el ID del timeout
  