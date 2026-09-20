from flask import Blueprint, request, jsonify
from models import Cliente
from app import db

clientes_bp = Blueprint('clientes', __name__)

@clientes_bp.route('/', methods=['GET'])
def get_clientes():
    """Listar todos os clientes ativos"""
    clientes = Cliente.query.filter_by(ativo=True).order_by(Cliente.nome).all()
    return jsonify([c.to_dict() for c in clientes])

@clientes_bp.route('/<uuid>', methods=['GET'])
def get_cliente(uuid):
    """Buscar cliente por UUID"""
    cliente = Cliente.query.filter_by(uuid=uuid).first()
    if not cliente:
        return jsonify({'error': 'Cliente não encontrado'}), 404
    return jsonify(cliente.to_dict())

@clientes_bp.route('/search', methods=['GET'])
def search_clientes():
    """Buscar clientes por termo"""
    termo = request.args.get('termo', '')
    clientes = Cliente.query.filter(
        Cliente.ativo == True,
        db.or_(
            Cliente.nome.ilike(f'%{termo}%'),
            Cliente.cpf.ilike(f'%{termo}%'),
            Cliente.telefone.ilike(f'%{termo}%')
        )
    ).order_by(Cliente.nome).all()
    return jsonify([c.to_dict() for c in clientes])

@clientes_bp.route('/', methods=['POST'])
def create_cliente():
    """Criar novo cliente"""
    data = request.get_json()
    
    if not data or not all(k in data for k in ['nome', 'cpf', 'telefone']):
        return jsonify({'error': 'Campos obrigatórios: nome, cpf, telefone'}), 400
    
    # Verificar se CPF já existe
    if Cliente.query.filter_by(cpf=data['cpf']).first():
        return jsonify({'error': 'CPF já cadastrado'}), 400
    
    cliente = Cliente(
        nome=data['nome'],
        cpf=data['cpf'],
        telefone=data['telefone'],
        email=data.get('email')
    )
    
    db.session.add(cliente)
    db.session.commit()
    
    return jsonify({'success': True, 'uuid': cliente.uuid}), 201

@clientes_bp.route('/<uuid>', methods=['PUT'])
def update_cliente(uuid):
    """Atualizar cliente"""
    cliente = Cliente.query.filter_by(uuid=uuid).first()
    if not cliente:
        return jsonify({'error': 'Cliente não encontrado'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Nenhum dado fornecido'}), 400
    
    # Atualizar campos
    if 'nome' in data:
        cliente.nome = data['nome']
    if 'cpf' in data:
        # Verificar se CPF já existe em outro cliente
        outro = Cliente.query.filter(Cliente.cpf == data['cpf'], Cliente.uuid != uuid).first()
        if outro:
            return jsonify({'error': 'CPF já cadastrado'}), 400
        cliente.cpf = data['cpf']
    if 'telefone' in data:
        cliente.telefone = data['telefone']
    if 'email' in data:
        cliente.email = data['email']
    
    db.session.commit()
    
    return jsonify({'success': True})

@clientes_bp.route('/<uuid>', methods=['DELETE'])
def delete_cliente(uuid):
    """Excluir cliente (soft delete)"""
    cliente = Cliente.query.filter_by(uuid=uuid).first()
    if not cliente:
        return jsonify({'error': 'Cliente não encontrado'}), 404
    
    cliente.ativo = False
    db.session.commit()
    
    return jsonify({'success': True})
