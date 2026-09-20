<?php
// ==========================================
// API REST - RELATÓRIOS
// ==========================================
require_once '../config/database.php';
setJsonHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

try {
    $db = getDB();
    
    if ($method !== 'GET') {
        jsonResponse(['error' => 'Método não permitido'], 405);
    }
    
    if ($action === 'mensal' && isset($_GET['mes']) && isset($_GET['ano'])) {
        // Relatório mensal
        $mes = (int)$_GET['mes'];
        $ano = (int)$_GET['ano'];
        
        // Buscar imóveis ativos no período
        $stmt = $db->prepare("
            SELECT i.*, c.nome as cliente_nome, c.cpf as cliente_cpf
            FROM imoveis i
            LEFT JOIN clientes c ON i.cliente_uuid = c.uuid
            WHERE i.ativo = 1
            AND DATE_ADD(i.data_inicio, INTERVAL i.contrato_meses MONTH) >= ?
            AND i.data_inicio <= ?
            ORDER BY i.endereco
        ");
        $dataInicio = "$ano-" . str_pad($mes, 2, '0', STR_PAD_LEFT) . "-01";
        $dataFim = "$ano-" . str_pad($mes, 2, '0', STR_PAD_LEFT) . "-31";
        $stmt->execute([$dataInicio, $dataFim]);
        $imoveis = $stmt->fetchAll();
        
        // Buscar pagamentos do mês
        $stmt = $db->prepare("
            SELECT * FROM pagamentos
            WHERE mes = ? AND ano = ?
        ");
        $stmt->execute([$mes, $ano]);
        $pagamentos = $stmt->fetchAll();
        
        // Criar mapa de pagamentos
        $pagamentosMap = [];
        foreach ($pagamentos as $p) {
            $pagamentosMap[$p['imovel_uuid']] = $p;
        }
        
        // Calcular totais
        $totalReceita = 0;
        $totalRecebido = 0;
        $totalPendente = 0;
        $imoveisPagos = 0;
        $imoveisPendentes = 0;
        
        foreach ($imoveis as &$imovel) {
            $totalReceita += $imovel['valor_aluguel'];
            
            if (isset($pagamentosMap[$imovel['uuid']]) && $pagamentosMap[$imovel['uuid']]['pago']) {
                $imovel['pago'] = true;
                $imovel['data_pagamento'] = $pagamentosMap[$imovel['uuid']]['data_pagamento'];
                $totalRecebido += $imovel['valor_aluguel'];
                $imoveisPagos++;
            } else {
                $imovel['pago'] = false;
                $totalPendente += $imovel['valor_aluguel'];
                $imoveisPendentes++;
            }
        }
        
        jsonResponse([
            'mes' => $mes,
            'ano' => $ano,
            'total_receita' => $totalReceita,
            'total_recebido' => $totalRecebido,
            'total_pendente' => $totalPendente,
            'imoveis_pagos' => $imoveisPagos,
            'imoveis_pendentes' => $imoveisPendentes,
            'total_imoveis' => count($imoveis),
            'imoveis' => $imoveis
        ]);
        
    } elseif ($action === 'anual' && isset($_GET['ano'])) {
        // Relatório anual
        $ano = (int)$_GET['ano'];
        
        $meses = [];
        $totalAnual = 0;
        $totalRecebidoAnual = 0;
        
        for ($mes = 1; $mes <= 12; $mes++) {
            // Buscar imóveis ativos no mês
            $stmt = $db->prepare("
                SELECT i.valor_aluguel
                FROM imoveis i
                WHERE i.ativo = 1
                AND DATE_ADD(i.data_inicio, INTERVAL i.contrato_meses MONTH) >= ?
                AND i.data_inicio <= ?
            ");
            $dataInicio = "$ano-" . str_pad($mes, 2, '0', STR_PAD_LEFT) . "-01";
            $dataFim = "$ano-" . str_pad($mes, 2, '0', STR_PAD_LEFT) . "-31";
            $stmt->execute([$dataInicio, $dataFim]);
            $imoveis = $stmt->fetchAll();
            
            $totalMes = array_sum(array_column($imoveis, 'valor_aluguel'));
            
            // Buscar pagamentos do mês
            $stmt = $db->prepare("
                SELECT p.*, i.valor_aluguel
                FROM pagamentos p
                LEFT JOIN imoveis i ON p.imovel_uuid = i.uuid
                WHERE p.mes = ? AND p.ano = ? AND p.pago = 1
            ");
            $stmt->execute([$mes, $ano]);
            $pagos = $stmt->fetchAll();
            
            $recebidoMes = array_sum(array_column($pagos, 'valor_aluguel'));
            
            $meses[] = [
                'mes' => $mes,
                'nome' => ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][$mes - 1],
                'total' => $totalMes,
                'recebido' => $recebidoMes,
                'pendente' => $totalMes - $recebidoMes,
                'qtd_imoveis' => count($imoveis),
                'qtd_pagos' => count($pagos)
            ];
            
            $totalAnual += $totalMes;
            $totalRecebidoAnual += $recebidoMes;
        }
        
        jsonResponse([
            'ano' => $ano,
            'total_anual' => $totalAnual,
            'total_recebido' => $totalRecebidoAnual,
            'total_pendente' => $totalAnual - $totalRecebidoAnual,
            'meses' => $meses
        ]);
        
    } elseif ($action === 'stats') {
        // Estatísticas gerais
        $stmt = $db->prepare("SELECT COUNT(*) as total FROM clientes WHERE ativo = 1");
        $stmt->execute();
        $totalClientes = $stmt->fetch()['total'];
        
        $stmt = $db->prepare("SELECT COUNT(*) as total FROM imoveis WHERE ativo = 1");
        $stmt->execute();
        $totalImoveis = $stmt->fetch()['total'];
        
        $stmt = $db->prepare("
            SELECT COUNT(*) as total FROM pagamentos WHERE pago = 1
        ");
        $stmt->execute();
        $totalPagos = $stmt->fetch()['total'];
        
        $stmt = $db->prepare("SELECT COUNT(*) as total FROM pagamentos");
        $stmt->execute();
        $totalPagamentos = $stmt->fetch()['total'];
        
        $stmt = $db->prepare("
            SELECT SUM(valor_aluguel) as total
            FROM imoveis
            WHERE ativo = 1
            AND DATE_ADD(data_inicio, INTERVAL contrato_meses MONTH) >= CURDATE()
        ");
        $stmt->execute();
        $receitaMensal = $stmt->fetch()['total'] ?? 0;
        
        jsonResponse([
            'total_clientes' => $totalClientes,
            'total_imoveis' => $totalImoveis,
            'total_pagamentos' => $totalPagamentos,
            'total_pagos' => $totalPagos,
            'receita_mensal' => $receitaMensal
        ]);
        
    } else {
        jsonResponse(['error' => 'Ação inválida ou parâmetros faltando'], 400);
    }
    
} catch (Exception $e) {
    jsonResponse(['error' => $e->getMessage()], 500);
}
?>
