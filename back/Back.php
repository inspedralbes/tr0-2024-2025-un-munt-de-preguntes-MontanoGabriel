<?php 
include("baseDades.php");

echo json_encode(json_decode(getPreguntes(), true));
?>