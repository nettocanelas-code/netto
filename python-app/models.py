from datetime import datetime
from app import db
import uuid

class Cliente(db.Model):
    """Modelo para clientes/inquilinos"""
    __tablename__ = 'clientes'
    
    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(36), unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    nome = db.Column(db.String(255), nullable=False)
    cpf = db.Column(db.String(20), nullable=False, unique=True)
    telefone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(255), nullable=True)
    data_cadastro = db.Column(db.DateTime, default=datetime.utcnow)
    ativo = db.Column(db.Boolean, default=True)
    
    # Relacionamento com imóveis
    imoveis = db.relationship('Imovel', backref='cliente', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'uuid': self.uuid,
            'nome': self.nome,
            'cpf': self.cpf,
            'telefone': self.telefone,
            'email': self.email,
            'data_cadastro': self.data_cadastro.isoformat() if self.data_cadastro else None,
            'ativo': self.ativo
        }

class Imovel(db.Model):
    """Modelo para imóveis"""
    __tablename__ = 'imoveis'
    
    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(36), unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    tipo = db.Column(db.Enum('casa', 'fazenda', 'suite', name='tipo_imovel'), nullable=False)
    endereco = db.Column(db.String(500), nullable=False)
    valor_aluguel = db.Column(db.Float, nullable=False)
    contrato_meses = db.Column(db.Integer, nullable=False)
    data_inicio = db.Column(db.Date, nullable=False)
    cliente_uuid = db.Column(db.String(36), db.ForeignKey('clientes.uuid'), nullable=False)
    periodo_arrendado = db.Column(db.String(255), nullable=True)  # Para fazendas
    residencial = db.Column(db.String(255), nullable=True)  # Para suítes
    data_cadastro = db.Column(db.DateTime, default=datetime.utcnow)
    ativo = db.Column(db.Boolean, default=True)
    
    # Relacionamento com pagamentos
    pagamentos = db.relationship('Pagamento', backref='imovel', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'uuid': self.uuid,
            'tipo': self.tipo,
            'endereco': self.endereco,
            'valor_aluguel': self.valor_aluguel,
            'contrato_meses': self.contrato_meses,
            'data_inicio': self.data_inicio.isoformat() if self.data_inicio else None,
            'cliente_uuid': self.cliente_uuid,
            'periodo_arrendado': self.periodo_arrendado,
            'residencial': self.residencial,
            'data_cadastro': self.data_cadastro.isoformat() if self.data_cadastro else None,
            'ativo': self.ativo,
            'cliente_nome': self.cliente.nome if self.cliente else None
        }

class Pagamento(db.Model):
    """Modelo para pagamentos"""
    __tablename__ = 'pagamentos'
    
    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(36), unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    imovel_uuid = db.Column(db.String(36), db.ForeignKey('imoveis.uuid'), nullable=False)
    mes = db.Column(db.Integer, nullable=False)
    ano = db.Column(db.Integer, nullable=False)
    pago = db.Column(db.Boolean, default=False)
    data_pagamento = db.Column(db.DateTime, nullable=True)
    valor_pago = db.Column(db.Float, nullable=True)
    observacao = db.Column(db.Text, nullable=True)
    
    # Índice único para evitar duplicatas
    __table_args__ = (
        db.UniqueConstraint('imovel_uuid', 'mes', 'ano', name='uq_pagamento_mes_ano'),
    )
    
    def to_dict(self):
        return {
            'id': self.id,
            'uuid': self.uuid,
            'imovel_uuid': self.imovel_uuid,
            'mes': self.mes,
            'ano': self.ano,
            'pago': self.pago,
            'data_pagamento': self.data_pagamento.isoformat() if self.data_pagamento else None,
            'valor_pago': self.valor_pago,
            'observacao': self.observacao
        }
