"""
Script para inicializar o banco de dados
Execute este script para criar o banco de dados e as tabelas
"""

from app import create_app, db
from models import Cliente, Imovel, Pagamento

def init_db():
    """Inicializa o banco de dados"""
    app = create_app()
    
    with app.app_context():
        # Criar todas as tabelas
        db.create_all()
        print("✅ Banco de dados criado com sucesso!")
        print("✅ Tabelas criadas: clientes, imoveis, pagamentos")
        
        # Verificar se já existem dados
        total_clientes = Cliente.query.count()
        total_imoveis = Imovel.query.count()
        total_pagamentos = Pagamento.query.count()
        
        print(f"\n📊 Estatísticas atuais:")
        print(f"   - Clientes: {total_clientes}")
        print(f"   - Imóveis: {total_imoveis}")
        print(f"   - Pagamentos: {total_pagamentos}")
        
        if total_clientes == 0:
            print("\n💡 O banco está vazio. Comece cadastrando clientes e imóveis!")

if __name__ == '__main__':
    init_db()
