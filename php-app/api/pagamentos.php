<?php
// ==========================================
// API REST - PAGAMENTOS
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
                // Listar todos os pagamentos
                $stmt = $db->prepare("
                    SELECT p.*, i.endereco, i.valor_aluguel, c.nome as cliente_nome
                    FROM pagamentos p
                    LEFT JOIN imoveis i ON p.imovel_uuid = i.uuid
                    LEFT JOIN clientes c ON i.cliente_uuid = c.uuid
                    ORDER BY p.ano DESC, p.mes DESC
                ");
                $stmt->execute();
                jsonResponse($stmt->fetchAll());
                
            } elseif ($action === 'by-imovel' && isset($_GET['imovel_uuid'])) {
                // Buscar pagamentos por imóvel
                $stmt = $db->prepare("
                    SELECT * FROM pagamentos
                    WHERE imovel_uuid = ?
                    ORDER BY ano DESC, mes DESC
                ");
                $stmt->execute([$_GET['imovel_uuid']]);
                jsonResponse($stmt->fetchAll());
                
            } elseif ($action === 'by-mes' && isset($_GET['mes']) && isset($_GET['ano'])) {
                // Buscar pagamentos por mês/ano
                $stmt = $db->prepare("
                    SELECT p.*, i.endereco, i.valor_aluguel, i.tipo, c.nome as cliente_nome
                    FROM pagamentos p
                    LEFT JOIN imoveis i ON p.imovel_uuid = i.uuid
                    LEFT JOIN clientes c ON i.cliente_uuid = c.uuid
                    WHERE p.mes = ? AND p.ano = ?
                    ORDER BY p.pago ASC, i.endereco
                ");
                $stmt->execute([$_GET['mes'], $_GET['ano']]);
                jsonResponse($stmt->fetchAll());
                
            } elseif ($action === 'check' && isset($_GET['imovel_uuid']) && isset($_GET['mes']) && isset($_GET['ano'])) {
                // Verificar se pagamento existe
                $stmt = $db->prepare("
                    SELECT * FROM pagamentos
                    WHERE imovel_uuid = ? AND mes = ? AND ano = ?
                ");
                $stmt->execute([$_GET['imovel_uuid'], $_GET['mes'], $_GET['ano']]);
                $pagamento = $stmt->fetch();
                
                jsonResponse(['existe' => $pagamento !== false, 'pago' => $pagamento ? (bool)$pagamento['pago'] : false]);
                
            } else {
                jsonResponse(['error' => 'Ação inválida'], 400);
            }
            break;
            
        case 'POST':
            if ($action === 'toggle') {
                // Alternar status de pagamento
                $data = json_decode(file_get_contents('php://input'), true);
                
                if (!isset($data['imovel_uuid']) || !isset($data['mes']) || !isset($data['ano'])) {
                    jsonResponse(['error' => 'Campos obrigatórios: imovel_uuid, mes, ano'], 400);
                }
                
                $imovel_uuid = $data['imovel_uuid'];
                $mes = $data['mes'];
                $ano = $data['ano'];
                
                // Verificar se já existe
                $stmt = $db->prepare("SELECT * FROM pagamentos WHERE imovel_uuid = ? AND mes = ? AND ano = ?");
                $stmt->execute([$imovel_uuid, $mes, $ano]);
                $existente = $stmt->fetch();
                
                if ($existente) {
                    // Atualizar existente
                    $novoStatus = $existente['pago'] ? 0 : 1;
                    $dataPagamento = $novoStatus ? date('Y-m-d H:i:s') : null;
                    
                    $stmt = $db->prepare("
                        UPDATE pagamentos 
                        SET pago = ?, data_pagamento = ?
                        WHERE id = ?
                    ");
                    $stmt->execute([$novoStatus, $dataPagamento, $existente['id']]);
                } else {
                    // Criar novo
                    $uuid = gerarUUID();
                    $stmt = $db->prepare("
                        INSERT INTO pagamentos (uuid, imovel_uuid, mes, ano, pago, data_pagamento)
                        VALUES (?, ?, ?, ?, 1, ?)
                    ");
                    $stmt->execute([$uuid, $imovel_uuid, $mes, $ano, date('Y-m-d H:i:s')]);
                }
                
                jsonResponse(['success' => true]);
                
            } elseif ($action === 'mark-paid') {
                // Marcar como pago
                $data = json_decode(file_get_contents('php://input'), true);
                
                if (!isset($data['imovel_uuid']) || !isset($data['mes']) || !isset($data['ano'])) {
                    jsonResponse(['error' => 'Campos obrigatórios: imovel_uuid, mes, ano'], 400);
                }
                
                $imovel_uuid = $data['imovel_uuid'];
                $mes = $data['mes'];
                $ano = $data['ano'];
                $valor = $data['valor_pago'] ?? null;
                
                // Verificar se já existe
                $stmt = $db->prepare("SELECT * FROM pagamentos WHERE imovel_uuid = ? AND mes = ? AND ano = ?");
                $stmt->execute([$imovel_uuid, $mes, $ano]);
                $existente = $stmt->fetch();
                
                if ($existente) {
                    $stmt = $db->prepare("
                        UPDATE pagamentos 
                        SET pago = 1, data_pagamento = ?, valor_pago = ?
                        WHERE id = ?
                    ");
                    $stmt->execute([date('Y-m-d H:i:s'), $valor, $existente['id']]);
                } else {
                    $uuid = gerarUUID();
                    $stmt = $db->prepare("
                        INSERT INTO pagamentos (uuid, imovel_uuid, mes, ano, pago, data_pagamento, valor_pago)
                        VALUES (?, ?, ?, ?, 1, ?, ?)
                    ");
                    $stmt->execute([$uuid, $imovel_uuid, $mes, $ano, date('Y-m-d H:i:s'), $valor]);
                }
                
                jsonResponse(['success' => true]);
                
            } elseif ($action === 'mark-pending') {
                // Marcar como pendente
                $data = json_decode(file_get_contents('php://input'), true);
                
                if (!isset($data['imovel_uuid']) || !isset($data['mes']) || !isset($data['ano'])) {
                    jsonResponse(['error' => 'Campos obrigatórios: imovel_uuid, mes, ano'], 400);
                }
                
                $stmt = $db->prepare("
                    UPDATE pagamentos 
                    SET pago = 0, data_pagamento = NULL
                    WHERE imovel_uuid = ? AND mes = ? AND ano = ?
                ");
                $stmt->execute([$data['imovel_uuid'], $data['mes'], $data['ano']]);
                
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
