<?php
// ==========================================
// API REST - IMÓVEIS
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
                // Listar todos os imóveis ativos
                $stmt = $db->prepare("
                    SELECT i.*, c.nome as cliente_nome, c.cpf as cliente_cpf
                    FROM imoveis i
                    LEFT JOIN clientes c ON i.cliente_uuid = c.uuid
                    WHERE i.ativo = 1
                    ORDER BY i.data_cadastro DESC
                ");
                $stmt->execute();
                jsonResponse($stmt->fetchAll());
                
            } elseif ($action === 'get' && isset($_GET['uuid'])) {
                // Buscar imóvel por UUID
                $stmt = $db->prepare("
                    SELECT i.*, c.nome as cliente_nome, c.cpf as cliente_cpf
                    FROM imoveis i
                    LEFT JOIN clientes c ON i.cliente_uuid = c.uuid
                    WHERE i.uuid = ?
                ");
                $stmt->execute([$_GET['uuid']]);
                $imovel = $stmt->fetch();
                
                if ($imovel) {
                    jsonResponse($imovel);
                } else {
                    jsonResponse(['error' => 'Imóvel não encontrado'], 404);
                }
                
            } elseif ($action === 'by-cliente' && isset($_GET['cliente_uuid'])) {
                // Buscar imóveis por cliente
                $stmt = $db->prepare("
                    SELECT * FROM imoveis
                    WHERE cliente_uuid = ? AND ativo = 1
                    ORDER BY data_cadastro DESC
                ");
                $stmt->execute([$_GET['cliente_uuid']]);
                jsonResponse($stmt->fetchAll());
                
            } elseif ($action === 'by-tipo' && isset($_GET['tipo'])) {
                // Buscar imóveis por tipo
                $stmt = $db->prepare("
                    SELECT i.*, c.nome as cliente_nome
                    FROM imoveis i
                    LEFT JOIN clientes c ON i.cliente_uuid = c.uuid
                    WHERE i.tipo = ? AND i.ativo = 1
                    ORDER BY i.data_cadastro DESC
                ");
                $stmt->execute([$_GET['tipo']]);
                jsonResponse($stmt->fetchAll());
                
            } elseif ($action === 'search' && isset($_GET['termo'])) {
                // Buscar imóveis por termo
                $termo = '%' . $_GET['termo'] . '%';
                $stmt = $db->prepare("
                    SELECT i.*, c.nome as cliente_nome
                    FROM imoveis i
                    LEFT JOIN clientes c ON i.cliente_uuid = c.uuid
                    WHERE i.ativo = 1 AND (i.endereco LIKE ? OR c.nome LIKE ?)
                    ORDER BY i.data_cadastro DESC
                ");
                $stmt->execute([$termo, $termo]);
                jsonResponse($stmt->fetchAll());
                
            } else {
                jsonResponse(['error' => 'Ação inválida'], 400);
            }
            break;
            
        case 'POST':
            if ($action === 'create') {
                // Criar novo imóvel
                $data = json_decode(file_get_contents('php://input'), true);
                
                if (!isset($data['tipo']) || !isset($data['endereco']) || 
                    !isset($data['valor_aluguel']) || !isset($data['contrato_meses']) || 
                    !isset($data['data_inicio']) || !isset($data['cliente_uuid'])) {
                    jsonResponse(['error' => 'Campos obrigatórios: tipo, endereco, valor_aluguel, contrato_meses, data_inicio, cliente_uuid'], 400);
                }
                
                $uuid = gerarUUID();
                $stmt = $db->prepare("
                    INSERT INTO imoveis (uuid, tipo, endereco, valor_aluguel, contrato_meses, data_inicio, cliente_uuid, periodo_arrendado, residencial, ativo)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
                ");
                $stmt->execute([
                    $uuid,
                    $data['tipo'],
                    $data['endereco'],
                    $data['valor_aluguel'],
                    $data['contrato_meses'],
                    $data['data_inicio'],
                    $data['cliente_uuid'],
                    $data['periodo_arrendado'] ?? null,
                    $data['residencial'] ?? null
                ]);
                
                jsonResponse(['success' => true, 'uuid' => $uuid], 201);
                
            } else {
                jsonResponse(['error' => 'Ação inválida'], 400);
            }
            break;
            
        case 'PUT':
            if ($action === 'update' && isset($_GET['uuid'])) {
                // Atualizar imóvel
                $data = json_decode(file_get_contents('php://input'), true);
                $uuid = $_GET['uuid'];
                
                $campos = [];
                $valores = [];
                
                $camposPermitidos = ['tipo', 'endereco', 'valor_aluguel', 'contrato_meses', 'data_inicio', 'cliente_uuid', 'periodo_arrendado', 'residencial'];
                
                foreach ($camposPermitidos as $campo) {
                    if (isset($data[$campo])) {
                        $campos[] = "$campo = ?";
                        $valores[] = $data[$campo];
                    }
                }
                
                if (empty($campos)) {
                    jsonResponse(['error' => 'Nenhum campo para atualizar'], 400);
                }
                
                $valores[] = $uuid;
                $sql = "UPDATE imoveis SET " . implode(', ', $campos) . " WHERE uuid = ?";
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
                $stmt = $db->prepare("UPDATE imoveis SET ativo = 0 WHERE uuid = ?");
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
