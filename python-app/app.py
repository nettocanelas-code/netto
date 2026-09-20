import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

# Inicializar extensões
db = SQLAlchemy()

def create_app():
    """Factory function para criar a aplicação Flask"""
    app = Flask(__name__)
    
    # Configurações
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///gestao_imoveis.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Inicializar extensões
    db.init_app(app)
    CORS(app)
    
    # Registrar rotas
    from routes.clientes import clientes_bp
    from routes.imoveis import imoveis_bp
    from routes.pagamentos import pagamentos_bp
    from routes.relatorios import relatorios_bp
    from routes.main import main_bp
    
    app.register_blueprint(main_bp)
    app.register_blueprint(clientes_bp, url_prefix='/api/clientes')
    app.register_blueprint(imoveis_bp, url_prefix='/api/imoveis')
    app.register_blueprint(pagamentos_bp, url_prefix='/api/pagamentos')
    app.register_blueprint(relatorios_bp, url_prefix='/api/relatorios')
    
    # Criar tabelas do banco de dados
    with app.app_context():
        from models import Cliente, Imovel, Pagamento
        db.create_all()
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
