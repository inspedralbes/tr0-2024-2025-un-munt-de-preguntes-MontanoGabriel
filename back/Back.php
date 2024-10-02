<?php 
include("baseDades.php");
header('Content-Type: applications/json');
echo json_encode(msqlconec());

echo json_encode(getPreguntes());
?>