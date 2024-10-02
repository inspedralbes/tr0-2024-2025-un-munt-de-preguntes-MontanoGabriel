
<?php
function msqlconec(){
    $response = array();  // Array para almacenar la respuesta en formato JSON
    
    // Establecemos la conexión
    $enlace = mysqli_connect("localhost", "gabriel", "gabriadmin", "FilmQuiz");

    // Si no se pudo conectar, se llena el array con la información del error
    if (!$enlace) {
        $response['status'] = 'error';
        $response['message'] = 'No se pudo conectar a MySQL';
        $response['errno'] = mysqli_connect_errno();
        $response['error'] = mysqli_connect_error();
    } else {
        // Si la conexión es exitosa, se llena el array con la información de éxito
        $response['status'] = 'success';
        $response['message'] = 'Conexión exitosa a MySQL';
        $response['host_info'] = mysqli_get_host_info($enlace);
    }

    // Retorna el array en formato JSON
    return json_encode($response);
}

function getPreguntes() {
    // Conexión a la base de datos
    $enlace = mysqli_connect("localhost", "gabriel", "admin", "FilmQuiz");

    // Verificar si la conexión es exitosa
    if (!$enlace) {
        $response = [
            'status' => 'error',
            'message' => 'No se pudo conectar a la base de datos',
            'errno' => mysqli_connect_errno(),
            'error' => mysqli_connect_error()
        ];
        echo json_encode($response);
        return;
    }

    // Consulta SELECT para obtener todas las preguntas
    $query = "SELECT id, pregunta, resposta_correcta, respostes_incorrectes, imatge FROM preguntes";
    $result = mysqli_query($enlace, $query);

    // Verificar si la consulta fue exitosa
    if (!$result) {
        $response = [
            'status' => 'error',
            'message' => 'Error al realizar la consulta',
            'error' => mysqli_error($enlace)
        ];
        echo json_encode($response);
        return;
    }

    // Array para almacenar los resultados
    $preguntes = [];

    // Recorremos los resultados de la consulta
    while ($row = mysqli_fetch_assoc($result)) {
        // Decodificar el campo JSON respostes_incorrectes
        $row['respostes_incorrectes'] = json_decode($row['respostes_incorrectes']);
        $preguntes[] = $row;
    }

    // Cerramos la conexión a la base de datos
    mysqli_close($enlace);

    // Devolvemos los resultados en formato JSON
    echo json_encode($preguntes);
}

// Llamada a la función para obtener las preguntas y respuestas
header('Content-Type: application/json');  // Asegura que el contenido devuelto sea JSON
getPreguntes();



?>
