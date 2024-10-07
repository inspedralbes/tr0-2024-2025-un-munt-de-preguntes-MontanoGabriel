<?php

function getPreguntes() {
    // Conexión a la base de datos
    $enlace = mysqli_connect("localhost", "a23josmoncas_a", "P@ssw0rd", "a23josmoncas_a");

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

    // Conexión a la base de datos
    $enlace = mysqli_connect("localhost", "gabriel", "gabriadmin", "FilmQuiz");

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
    return json_encode($preguntes);
}

?>
