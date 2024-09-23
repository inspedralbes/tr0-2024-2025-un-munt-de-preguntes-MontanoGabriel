let data={
    "preguntes": [
      {
        "pregunta": "¿En qué año se estrenó la película 'Titanic'?",
        "resposta_correcta": "1997",
        "respostes_incorrectes": ["1995", "2000", "1999"],
        "imatge": "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2016/12/titanic.jpg?tf=3840x"
      },
      {
        "pregunta": "¿En qué año se estrenó 'Avatar'?",
        "resposta_correcta": "2009",
        "respostes_incorrectes": ["2007", "2010", "2012"],
        "imatge": "https://i.ebayimg.com/images/g/DJgAAOSwq19XB-hI/s-l1200.jpg"
      },
      {
        "pregunta": "¿En qué año se estrenó 'The Matrix'?",
        "resposta_correcta": "1999",
        "respostes_incorrectes": ["1997", "2001", "2000"],
        "imatge": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-eLE3Tvesl6fAhIFcs4tk914lmHXe3vaU3Q&s"
      },
      {
        "pregunta": "¿En qué año se estrenó 'The Lion King' (El Rey León)?",
        "resposta_correcta": "1994",
        "respostes_incorrectes": ["1996", "1993", "1995"],
        "imatge": "https://pics.filmaffinity.com/El_rey_leaon-497804235-large.jpg"
      },
      {
        "pregunta": "¿En qué año se estrenó 'Jurassic Park'?",
        "resposta_correcta": "1993",
        "respostes_incorrectes": ["1995", "1991", "1994"],
        "imatge": "https://www.mubis.es/media/users/3724/212313/poster-del-reestreno-en-cines-en-septiembre-de-jurassic-park-original.jpg"
      },
      {
        "pregunta": "¿En qué año se estrenó 'Forrest Gump'?",
        "resposta_correcta": "1994",
        "respostes_incorrectes": ["1996", "1993", "1995"],
        "imatge": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzKS8xrngfeFozAFDX-jdGax4yKXn7n1WGZA&s"
      },
      {
        "pregunta": "¿En qué año se estrenó 'Inception'?",
        "resposta_correcta": "2010",
        "respostes_incorrectes": ["2008", "2012", "2009"],
        "imatge": "https://cl2.buscafs.com/www.tomatazos.com/public/uploads/images/8000/8000_800x1166.jpg"
      },
      {
        "pregunta": "¿En qué año se estrenó 'The Godfather'?",
        "resposta_correcta": "1972",
        "respostes_incorrectes": ["1970", "1974", "1969"],
        "imatge": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCUDpLl5m4SfFFeuaxvRKCJ5ucfNwEy8xdMw&s"
      },
      {
        "pregunta": "¿En qué año se estrenó 'Pulp Fiction'?",
        "resposta_correcta": "1994",
        "respostes_incorrectes": ["1992", "1996", "1991"],
        "imatge": "https://cartelera.elpais.com/assets/uploads/2019/01/09030106/C_02863.jpg"
      },
      {
        "pregunta": "¿En qué año se estrenó 'The Dark Knight'?",
        "resposta_correcta": "2008",
        "respostes_incorrectes": ["2006", "2010", "2007"],
        "imatge": "https://preview.redd.it/the-dark-knight-and-rises-is-re-releasing-in-theatres-near-v0-wpd8o4t2sycb1.jpg?width=640&crop=smart&auto=webp&s=b008454eed48b3000268d37ae53027c9d9c419a7"
      }
    ]
  }
  

  function renderContent() {
    let htmlString = '';
    for (let i = 0; i < data.preguntes.length; i++) {
        htmlString += `
            <div class="pregunta">
                ${data.preguntes[i].pregunta}
            </div>
            <div class="image">
                <img src="${data.preguntes[i].imatge}" alt="Imagen" width="300">
            </div>
            <div>
        `;
        let answers = [data.preguntes[i].resposta_correcta, ...data.preguntes[i].respostes_incorrectes];
        for (let j = 0; j < answers.length; j++) {
            htmlString += `<button class="answer" onclick="renderContent()">${answers[j]}</button>`;
        }
        htmlString += `</div>`;
    }
    document.getElementById('content').innerHTML = htmlString;
  }
  
  
  
  renderContent();
  
  
  
  var inicio; // Variable global que guarda el momento en que el cronómetro empieza
  var timeout; // Guardará el ID del timeout
  
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
  
  
  