<?php
//прием запросов с клиента
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");

include_once './utils/token.php';

$data = json_decode(file_get_contents("php://input"));
if(!isset($data->login) || !isset($data->password)){
    http_response_code(500);
    echo json_encode(array("message" => "Заполните логин и пароль"));
    return;
}

$token = new Token();

$access = file("./utils/admin.php"); 
$login = trim($access[1]); 
$passw = trim($access[2]); 
if($data->login==$login && $data->password==$passw){
    echo json_encode($token->encode(array('isAdmin' => true)));
    return;
}else{  
    http_response_code(500);
    echo json_encode(array("message" => "Неверный логин или пароль"));
    return;
}

?>