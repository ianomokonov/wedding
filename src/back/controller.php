<?php
//прием запросов с клиента
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");

include_once 'repository.php';

$repository = new WeddingRepository();

if(isset($_GET['key'])){
    switch($_GET['key']){
        
        case 'get-guest-info':
            http_response_code(200);
            echo json_encode($repository->GetGuestInfo($_GET['token']));
            break;
        case 'approve-comming':
            http_response_code(200);
            echo json_encode($repository->ApproveComming($_GET['token'], $GET['guest_id']));
            break;
        case 'save-answer':
            http_response_code(200);
            $data = json_decode(file_get_contents("php://input"));
            echo json_encode($repository->SaveAnswer($_GET['token'], $data));
            break;

        // admin

        case 'log-in':
            http_response_code(200);
            $data = json_decode(file_get_contents("php://input"));
            echo json_encode($repository->LogIn($data));
            break;
        case 'create-guest':
            http_response_code(200);
            $data = json_decode(file_get_contents("php://input"));
            echo json_encode($repository->CreateGuest($_GET['token'], $data));
            break;
        case 'generate-link':
            http_response_code(200);
            $data = json_decode(file_get_contents("php://input"));
            echo json_encode($repository->GenerateLink($_GET['token'], $data));
            break;
        case 'get-statistics':
            http_response_code(200);
            echo json_encode($repository->GetStatistics($_GET['token']));
            break;
        case 'get-questioning-results':
            http_response_code(200);
            echo json_encode($repository->GetQuestioningResults($_GET['token']));
            break;
        default: 
            http_response_code(500);
            echo json_encode(array("message" => "Ключ запроса не найден"));
        
    }
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Отсутствует ключ запроса."));
}
?>