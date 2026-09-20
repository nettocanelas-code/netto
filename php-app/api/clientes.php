<?php
// ==========================================
// API REST - CLIENTES
// ==========================================
require_once '../config/database.php';
setJsonHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

try {
    $db = getDB();
    
    switch ($method) {
        case 'GET':
            if ($action === 'all') {
                // Listar todos os clientes ativos
                $stmt = $db->prepare("SELECT * FROM clientes WHERE ativo = 1 ORDER BY nome");
                $stmt->execute();
                jsonResponse($stmt->fetchAll());
                
            } elseif ($action === 'get' && isset($_GET['uuid'])) {
                // Buscar cliente por UUID
                $stmt = $db->prepare("SELECT * FROM clientes WHERE uuid = ?");
                $stmt->execute([$_GET['uuid']]);
                $cliente = $stmt->fetch();
                
                if ($cliente) {
                    jsonResponse($cliente);
                } else {
                    jsonResponse(['error' => 'Cliente não encontrado'], 404);
                }
                
            } elseif ($action === 'search' && isset($_GET['termo'])) {
                // Buscar clientes por termo
                $termo = '%' . $_GET['termo'] . '%';
                $stmt = $db->prepare("
                    SELECT * FROM clientes 
                    WHERE ativo = 1 AND (nome LIKE ? OR cpf LIKE ? OR telefone LIKE ?)
                    ORDER BY nome
                ");
                $stmt->execute([$termo, $termo, $termo]);
                jsonResponse($stmt->fetchAll());
                
            } else {
                jsonResponse(['error' => 'Ação inválida'], 400);
            }
            break;
            
        case 'POST':
            if ($action === 'create') {
                // Criar novo cliente
                $data = json_decode(file_get_contents('php://input'), true);
                
                if (!isset($data['nome']) || !isset($data['cpf']) || !isset($data['telefone'])) {
                    jsonResponse(['error' => 'Campos obrigatórios: nome, cpf, telefone'], 400);
                }
                
                $uuid = gerarUUID();
                $stmt = $db->prepare("
                    INSERT INTO clientes (uuid, nome, cpf, telefone, email, ativo)
                    VALUES (?, ?, ?, ?, ?, 1)
                ");
                $stmt->execute([
                    $uuid,
                    $data['nome'],
                    $data['cpf'],
                    $data['telefone'],
                    $data['email'] ?? null
                ]);
                
                jsonResponse(['success' => true, 'uuid' => $uuid], 201);
                
            } else {
                jsonResponse(['error' => 'Ação inválida'], 400);
            }
            break;
            
        case 'PUT':
            if ($action === 'update' && isset($_GET['uuid'])) {
                // Atualizar cliente
                $data = json_decode(file_get_contents('php://input'), true);
                $uuid = $_GET['uuid'];
                
                $campos = [];
                $valores = [];
                
                if (isset($data['nome'])) {
                    $campos[] = 'nome = ?';
                    $valores[] = $data['nome'];
                }
                if (isset($data['cpf'])) {
                    $campos[] = 'cpf = ?';
                    $valores[] = $data['cpf'];
                }
                if (isset($data['telefone'])) {
                    $campos[] = 'telefone = ?';
                    $valores[] = $data['telefone'];
                }
                if (isset($data['email'])) {
                    $campos[] = 'email = ?';
                    $valores[] = $data['email'];
                }
                
                if (empty($campos)) {
                    jsonResponse(['error' => 'Nenhum campo para atualizar'], 400);
                }
                
                $valores[] = $uuid;
                $sql = "UPDATE clientes SET " . implode(', ', $campos) . " WHERE uuid = ?";
                $stmt = $db->prepare($sql);
                $stmt->execute($valores);
                
                jsonResponse(['success' => true]);
                
            } else {
                jsonResponse(['error' => 'Ação inválida'], 400);
            }
            break;
            
        case 'DELETE':
            if ($action === 'delete' && isset($_GET['uuid'])) {
                // Soft delete (desativar)
                $uuid = $_GET['uuid'];
                $stmt = $db->prepare("UPDATE clientes SET ativo = 0 WHERE uuid = ?");
                $stmt->execute([$uuid]);
                
                jsonResponse(['success' => true]);
                
            } else {
                jsonResponse(['error' => 'Ação inválida'], 400);
            }
            break;
            
        default:
            jsonResponse(['error' => 'Método não permitido'], 405);
    }
    
} catch (Exception $e) {
    jsonResponse(['error' => $e->getMessage()], 500);
}
?>
