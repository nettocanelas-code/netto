<?php
// ==========================================
// SCRIPT DE INSTALAÇÃO DO BANCO DE DADOS
// ==========================================
// Execute este arquivo UMA VEZ para criar o banco de dados

require_once 'config/database.php';

echo "<!DOCTYPE html>
<html lang='pt-BR'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Instalação - Gestão de Imóveis</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            margin: 0;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 { color: #333; margin-bottom: 20px; }
        .success { 
            background: #d1fae5; 
            border-left: 4px solid #10b981; 
            padding: 15px; 
            margin: 15px 0; 
            border-radius: 8px;
            color: #065f46;
        }
        .error { 
            background: #fee2e2; 
            border-left: 4px solid #ef4444; 
            padding: 15px; 
            margin: 15px 0; 
            border-radius: 8px;
            color: #991b1b;
        }
        .info {
            background: #dbeafe;
            border-left: 4px solid #3b82f6;
            padding: 15px;
            margin: 15px 0;
            border-radius: 8px;
            color: #1e40af;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin-top: 20px;
            font-weight: 600;
        }
        .btn:hover { background: #5568d3; }
    </style>
</head>
<body>
    <div class='container'>
        <h1>🏢 Instalação do Banco de Dados</h1>";

try {
    // Criar banco de dados
    $pdo = new PDO("mysql:host=" . DB_HOST . ";charset=" . DB_CHARSET, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo->exec("CREATE DATABASE IF NOT EXISTS " . DB_NAME . " CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "<div class='success'>✅ Banco de dados '" . DB_NAME . "' criado com sucesso!</div>";
    
    // Conectar ao banco
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Criar tabela clientes
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS clientes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            uuid VARCHAR(36) UNIQUE NOT NULL,
            nome VARCHAR(255) NOT NULL,
            cpf VARCHAR(20) NOT NULL,
            telefone VARCHAR(20) NOT NULL,
            email VARCHAR(255),
            data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
            ativo BOOLEAN DEFAULT TRUE,
            INDEX idx_uuid (uuid),
            INDEX idx_cpf (cpf),
            INDEX idx_nome (nome),
            INDEX idx_ativo (ativo)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    echo "<div class='success'>✅ Tabela 'clientes' criada com sucesso!</div>";
    
    // Criar tabela imoveis
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS imoveis (
            id INT AUTO_INCREMENT PRIMARY KEY,
            uuid VARCHAR(36) UNIQUE NOT NULL,
            tipo ENUM('casa', 'fazenda', 'suite') NOT NULL,
            endereco VARCHAR(500) NOT NULL,
            valor_aluguel DECIMAL(10,2) NOT NULL,
            contrato_meses INT NOT NULL,
            data_inicio DATE NOT NULL,
            cliente_uuid VARCHAR(36) NOT NULL,
            periodo_arrendado VARCHAR(255),
            residencial VARCHAR(255),
            data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
            ativo BOOLEAN DEFAULT TRUE,
            INDEX idx_uuid (uuid),
            INDEX idx_tipo (tipo),
            INDEX idx_cliente (cliente_uuid),
            INDEX idx_ativo (ativo),
            FOREIGN KEY (cliente_uuid) REFERENCES clientes(uuid) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    echo "<div class='success'>✅ Tabela 'imoveis' criada com sucesso!</div>";
    
    // Criar tabela pagamentos
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS pagamentos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            uuid VARCHAR(36) UNIQUE NOT NULL,
            imovel_uuid VARCHAR(36) NOT NULL,
            mes INT NOT NULL,
            ano INT NOT NULL,
            pago BOOLEAN DEFAULT FALSE,
            data_pagamento DATETIME,
            valor_pago DECIMAL(10,2),
            observacao TEXT,
            INDEX idx_uuid (uuid),
            INDEX idx_imovel (imovel_uuid),
            INDEX idx_mes_ano (mes, ano),
            INDEX idx_imovel_mes_ano (imovel_uuid, mes, ano),
            INDEX idx_pago (pago),
            FOREIGN KEY (imovel_uuid) REFERENCES imoveis(uuid) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    echo "<div class='success'>✅ Tabela 'pagamentos' criada com sucesso!</div>";
    
    // Criar tabela configs
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS configs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            chave VARCHAR(100) UNIQUE NOT NULL,
            valor TEXT,
            INDEX idx_chave (chave)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    echo "<div class='success'>✅ Tabela 'configs' criada com sucesso!</div>";
    
    echo "<div class='info'>
        <strong>📊 Estrutura do banco criada:</strong><br>
        • clientes - Dados dos inquilinos<br>
        • imoveis - Imóveis com contratos<br>
        • pagamentos - Registro de pagamentos<br>
        • configs - Configurações do sistema
    </div>";
    
    echo "<div class='success'>
        <strong>🎉 Instalação concluída com sucesso!</strong><br>
        Agora você pode usar o sistema. Acesse <a href='index.php'>index.php</a> para começar.
    </div>";
    
    echo "<a href='index.php' class='btn'>🚀 Acessar o Sistema</a>";
    
} catch (PDOException $e) {
    echo "<div class='error'>
        <strong>❌ Erro na instalação:</strong><br>
        " . htmlspecialchars($e->getMessage()) . "<br><br>
        <strong>Soluções:</strong><br>
        1. Verifique se o MySQL está rodando<br>
        2. Verifique as credenciais em config/database.php<br>
        3. Verifique se o usuário tem permissão para criar bancos
    </div>";
}

echo "</div></body></html>";
?>
