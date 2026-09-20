from flask import Blueprint, request, jsonify
from models import Imovel, Cliente
from app import db
from datetime import datetime

imoveis_bp = Blueprint('imoveis', __name__)

@imoveis_bp.route('/', methods=['GET'])
def get_imoveis():
    """Listar todos os imóveis ativos"""
    imoveis = Imovel.query.filter_by(ativo=True).order_by(Imovel.data_cadastro.desc()).all()
    return jsonify([i.to_dict() for i in imoveis])

@imoveis_bp.route('/<uuid>', methods=['GET'])
def get_imovel(uuid):
    """Buscar imóvel por UUID"""
    imovel = Imovel.query.filter_by(uuid=uuid).first()
    if not imovel:
        return jsonify({'error': 'Imóvel não encontrado'}), 404
    return jsonify(imovel.to_dict())

@imoveis_bp.route('/cliente/<cliente_uuid>', methods=['GET'])
def get_imoveis_by_cliente(cliente_uuid):
    """Buscar imóveis por cliente"""
    imoveis = Imovel.query.filter_by(cliente_uuid=cliente_uuid, ativo=True).order_by(Imovel.data_cadastro.desc()).all()
    return jsonify([i.to_dict() for i in imoveis])

@imoveis_bp.route('/tipo/<tipo>', methods=['GET'])
def get_imoveis_by_tipo(tipo):
    """Buscar imóveis por tipo"""
    if tipo not in ['casa', 'fazenda', 'suite']:
        return jsonify({'error': 'Tipo inválido'}), 400
    
    imoveis = Imovel.query.filter_by(tipo=tipo, ativo=True).order_by(Imovel.data_cadastro.desc()).all()
    return jsonify([i.to_dict() for i in imoveis])

@imoveis_bp.route('/search', methods=['GET'])
def search_imoveis():
    """Buscar imóveis por termo"""
    termo = request.args.get('termo', '')
    imoveis = Imovel.query.join(Cliente).filter(
        Imovel.ativo == True,
        db.or_(
            Imovel.endereco.ilike(f'%{termo}%'),
            Cliente.nome.ilike(f'%{termo}%')
        )
    ).order_by(Imovel.data_cadastro.desc()).all()
    return jsonify([i.to_dict() for i in imoveis])

@imoveis_bp.route('/', methods=['POST'])
def create_imovel():
    """Criar novo imóvel"""
    data = request.get_json()
    
    required_fields = ['tipo', 'endereco', 'valor_aluguel', 'contrato_meses', 'data_inicio', 'cliente_uuid']
    if not data or not all(k in data for k in required_fields):
        return jsonify({'error': f'Campos obrigatórios: {", ".join(required_fields)}'}), 400
    
    # Verificar se cliente existe
    cliente = Cliente.query.filter_by(uuid=data['cliente_uuid'], ativo=True).first()
    if not cliente:
        return jsonify({'error': 'Cliente não encontrado'}), 404
    
    # Validar tipo
    if data['tipo'] not in ['casa', 'fazenda', 'suite']:
        return jsonify({'error': 'Tipo inválido'}), 400
    
    imovel = Imovel(
        tipo=data['tipo'],
        endereco=data['endereco'],
        valor_aluguel=float(data['valor_aluguel']),
        contrato_meses=int(data['contrato_meses']),
        data_inicio=datetime.strptime(data['data_inicio'], '%Y-%m-%d').date(),
        cliente_uuid=data['cliente_uuid'],
        periodo_arrendado=data.get('periodo_arrendado'),
        residencial=data.get('residencial')
    )
    
    db.session.add(imovel)
    db.session.commit()
    
    return jsonify({'success': True, 'uuid': imovel.uuid}), 201

@imoveis_bp.route('/<uuid>', methods=['PUT'])
def update_imovel(uuid):
    """Atualizar imóvel"""
    imovel = Imovel.query.filter_by(uuid=uuid).first()
    if not imovel:
        return jsonify({'error': 'Imóvel não encontrado'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Nenhum dado fornecido'}), 400
    
    # Atualizar campos
    campos_permitidos = ['tipo', 'endereco', 'valor_aluguel', 'contrato_meses', 'data_inicio', 
                         'cliente_uuid', 'periodo_arrendado', 'residencial']
    
    for campo in campos_permitidos:
        if campo in data:
            if campo == 'data_inicio':
                setattr(imovel, campo, datetime.strptime(data[campo], '%Y-%m-%d').date())
            elif campo in ['valor_aluguel', 'contrato_meses']:
                setattr(imovel, campo, float(data[campo]) if campo == 'valor_aluguel' else int(data[campo]))
            else:
                setattr(imovel, campo, data[campo])
    
    db.session.commit()
    
    return jsonify({'success': True})

@imoveis_bp.route('/<uuid>', methods=['DELETE'])
def delete_imovel(uuid):
    """Excluir imóvel (soft delete)"""
    imovel = Imovel.query.filter_by(uuid=uuid).first()
    if not imovel:
        return jsonify({'error': 'Imóvel não encontrado'}), 404
    
    imovel.ativo = False
    db.session.commit()
    
    return jsonify({'success': True})
