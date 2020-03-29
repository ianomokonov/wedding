<?php
    //обработка запросов
    include_once './utils/token.php';
    include_once 'model.php';
    class WeddingRepository{
        private $database;
        private $token;

        public function __construct()
        {
            // $this->database = new DataBase();
            $this->token = new Token();
        }

        public function GetGuestInfo($id){
            //return $chat;
            // $s = $this->db->prepare("INSERT INTO chats (login) VALUES (?)");
            // if($chat->name){
            //     $s->execute(array($chat->name));
            //     $chatId = $this->db->lastInsertId();
            //     $s = $this->db->prepare("INSERT INTO user_chat (userId, chatId) VALUES (?, ?)");
            //     $s->execute(array($chat->userId, $chatId));
            //     return $chatId;
            // }
            return array('message' => 'Информация о пользователе');
        }

        public function SaveAnswer($answer){
            // $s = $this->db->prepare("INSERT INTO messages (chatId, userId, message ) VALUES (?,?,?)");
            // if($message->chatId){
            //     $s->execute(array($message->chatId, $message->userId, $message->message));
            //     return $this->GetMessageById($this->db->lastInsertId());
            // }
            return array('message' => 'Ответ сохранен');
        }

        public function ApproveComming($userId){
            return array('message' => 'Подтверждено');
        }

        public function CreateGuest($guest){
            return array('message' => 'Гость добавлен');
        }

        public function GenerateLink($id){
            if($id){
                return $this->token->encode(array('guestId' => $id));
            } else {
                http_response_code(500);
                return array("message" => "Укажите гостя");
            }
            
        }

        public function AddToLink($id){
            return array("message" => "Гость добавлен в ссылку");
            
        }

        public function RemoveFromLink($id){
            return array("message" => "Гость удален из ссылке");
        }
        
        public function GetStatistics(){
            return array("message" => "Статистика");
            
        }

        public function GetQuestioningResults(){
            return array("message" => "Ответы");
            
        }

        private function LoginExists(string $login){
            $query = "SELECT id, login FROM users WHERE login = ?";
 
            // подготовка запроса 
            $stmt = $this->db->prepare( $query );
            $stmt->setFetchMode(PDO::FETCH_CLASS, 'User');
            // инъекция 
            $login=htmlspecialchars(strip_tags($login));
            // выполняем запрос 
            $stmt->execute(array($login));

            $user = $stmt->fetch();
            if($user){
                // $user->chats = $this->GetUserChats($user->id);
            }
            return $user;
        }

    }
?>
