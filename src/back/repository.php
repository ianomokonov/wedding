<?php
    //обработка запросов
    include_once './utils/token.php';
    include_once './utils/database.php';
    include_once 'models.php';
    class WeddingRepository{
        private $database;
        private $token;
        private $baseUrl = 'http://localhost:4200/#/';

        public function __construct()
        {
            $this->database = new DataBase();
            $this->token = new Token();
        }

        public function GetGuestInfo($id){
            if($id != null){
                $query = $this->database->db->prepare("SELECT * FROM guest WHERE id = ?");
                $query->execute(array($id));
                $query->setFetchMode(PDO::FETCH_CLASS, 'Guest');
                $guest = $query->fetch();
                $guest->link = $this->GetGuestLink($guest->linkId);
                $guest->children = $this->GetGuestChildren($guest->id);
                $guest->neighbours = $this->GetGuestNeighbours($guest->id);
                $guest->hasChild = $guest->hasChild == '1';
                $guest->transfer = $guest->transfer == '1';
                $guest->approved = $guest->approved == '1';
                
                return $guest;
            }

            http_response_code(500);
            return array("message" => "Укажите id гостя", "method" => "GetGuestInfo", "requestData" => $id);
            
        }

        public function SaveAnswer($guestId, $answer){
            if($guestId == null){
                http_response_code(403);
                return array("message" => "Id гостя не может быть пустым", "method" => "SaveAnswer", "requestData" => $answer);
            }
            $query = $this->database->db->prepare("UPDATE guest SET transfer = ?, food = ?, alcohole = ?, hasChild = ? WHERE id = ?");
            $query->execute(array($answer->transfer, $answer->food, $answer->alcohole, $answer->hasChild, $guestId));
            $this->RemoveGuestChildren($guestId);
            if($answer->hasChild){
                foreach ($answer->children as $child){
                    $child->guestId = $guestId;
                    $this->AddGuestChild($child);
                }
            }

            foreach ($answer->neighbours as $neighbour){
                $neighbour->guestId = $guestId;
                $this->AddGuestNeighbour($neighbour);
            }

            return $this->GetGuestInfo($guestId);
            
        }

        public function ApproveComming($userId, $approved){
            if($approved == null){
                http_response_code(500);
                return array("message" => "Укажите подтверждение", "method" => "CreateGuest", "requestData" => array($userId, $approved));
            }
            $query = $this->database->db->prepare("UPDATE guest SET approved = ? WHERE id = ?");
            $query->execute(array($approved, $userId));
            return array('message' => 'Подтверждено');
        }

        public function CreateGuest($guest){
            if(!isset($guest->name) || $guest->name == null){
                http_response_code(403);
                return array("message" => "Укажите имя", "method" => "CreateGuest", "requestData" => $guest);
            }

            $insert = $this->database->genInsertQuery((array)$guest, 'guest');
            $query = $this->database->db->prepare($insert[0]);
            if($insert[1][0]!=null){
                $query->execute($insert[1]);
            }
            return $this->database->db->lastInsertId();
        }

        public function GenerateLink($link){
            if($link == null || !isset($link->guestId) || $link->guestId == null){
                http_response_code(500);
                return array("message" => "Укажите id гостя", "method" => "GenerateLink", "requestData" => $link);
            }

            if($link == null || !isset($link->header) || $link->header == null){
                http_response_code(500);
                return array("message" => "Укажите заголовок приглашения для ссылки", "method" => "GenerateLink", "requestData" => $link);
            }

            if($this->LinkExists($link->guestId)){
                http_response_code(403);
                return array("message" => "У гостя уже есть ссылка", "method" => "GenerateLink", "requestData" => $link);
            }

            $token = $this->token->encode(array('guestId' => $link->guestId));
            $url = $this->baseUrl.'enter/'.$token;
            $link->url = $url;
            $guestId = $link->guestId;
            unset( $link->guestId );
            
            $insert = $this->database->genInsertQuery((array)$link, 'link');
            $query = $this->database->db->prepare($insert[0]);
            if($insert[1][0]!=null){
                $query->execute($insert[1]);
            }

            $linkId = $this->database->db->lastInsertId();

            $this->UpdateGuest((object) array('id' => $guestId, 'linkId' => $linkId));

            return $this->GetGuestLink($linkId);
            
        }

        public function UpdateGuest($guest){
            if($guest == null || !isset($guest->id)){
                http_response_code(500);
                return array("message" => "Укажите id гостя", "method" => "UpdateGuest", "requestData" => $guest);
            }

            $guestId = $guest->id;
            unset($guest->id);
            $a = $this->database->genUpdateQuery(array_keys((array)$guest), array_values((array)$guest), "guest", $guestId);
            $query = $this->database->db->prepare($a[0]);
            $query->execute($a[1]);
            return true;
        }

        public function AddToLink($guest){
            if($guest == null || !isset($guest->guestId) || !isset($guest->linkId)){
                http_response_code(500);
                return array("message" => "Укажите id гостя и ссылки", "method" => "AddToLink", "requestData" => $guest);
            }
            $this->UpdateGuest((object) array('id' => $guest->guestId, 'linkId' => $guest->linkId));
            return array("message" => "Гость добавлен в ссылку");
            
        }

        public function RemoveFromLink($guest){
            if($guest == null || !isset($guest->guestId) || !isset($guest->linkId)){
                http_response_code(500);
                return array("message" => "Укажите id гостя и ссылки", "method" => "RemoveFromLink", "requestData" => $guest);
            }
            $this->UpdateGuest((object) array('id' => $guest->guestId, 'linkId' => null));
            $this->CheckEmptyLink($guest->linkId);
            return array("message" => "Гость убран из ссылки");
        }
        
        public function GetStatistics(){
            return array("message" => "Статистика");
            
        }

        public function GetQuestioningResults(){
            return array("message" => "Ответы");
            
        }

        private function GetGuestLink($linkId = null)
        {
            if($linkId != null){
                $query = $this->database->db->prepare("SELECT * FROM link WHERE id = ?");
                $query->execute(array($linkId));
                $query->setFetchMode(PDO::FETCH_CLASS, 'Link');
                return $query->fetch();
            }
            return null;
        }

        private function GetGuestChildren($guestId = null)
        {
            if($guestId != null){
                $query = $this->database->db->prepare("SELECT * FROM child WHERE guestId = ?");
                $query->execute(array($guestId));
                $query->setFetchMode(PDO::FETCH_CLASS, 'Child');
                return $query->fetchAll();
            }
            return array();
        } 

        private function GetGuestNeighbours($guestId = null)
        {
            if($guestId != null){
                $query = $this->database->db->prepare("SELECT * FROM neighbour WHERE guestId = ?");
                $query->execute(array($guestId));
                $query->setFetchMode(PDO::FETCH_CLASS, 'Neighbour');
                return $query->fetchAll();
            }
            return array();
        } 

        private function AddGuestChild($child)
        {
            $insert = $this->database->genInsertQuery((array)$child, 'child');
            $query = $this->database->db->prepare($insert[0]);
            if($insert[1][0]!=null){
                $query->execute($insert[1]);
            }
        }

        private function AddGuestNeighbour($neighbour)
        {
            $insert = $this->database->genInsertQuery((array)$neighbour, 'neighbour');
            $query = $this->database->db->prepare($insert[0]);
            if($insert[1][0]!=null){
                $query->execute($insert[1]);
            }
        }

        private function LinkExists($guestId){
            $query = "SELECT linkId FROM guest WHERE id = ?";
 
            // подготовка запроса 
            $stmt = $this->database->db->prepare( $query );
            // выполняем запрос 
            $stmt->execute(array($guestId));

            $guest = $stmt->fetch();
            return isset($guest['linkId']) && $guest['linkId'] != null;
        }

        private function CheckEmptyLink($linkId){
            $query = "SELECT * FROM guest WHERE linkId = ?";
 
            // подготовка запроса 
            $stmt = $this->database->db->prepare( $query );
            // выполняем запрос 
            $stmt->execute(array($linkId));

            $count = $stmt->rowCount();
            if($count == 0){
                $query = "DELETE FROM link WHERE id = ?";
 
                // подготовка запроса 
                $stmt = $this->database->db->prepare( $query );
                // выполняем запрос 
                $stmt->execute(array($linkId));
            }
        }

        private function RemoveGuestChildren($guestId){
            $query = "DELETE FROM child WHERE guestId = ?";
            $stmt = $this->database->db->prepare( $query );
            $stmt->execute(array($guestId));
        }

    }
?>
