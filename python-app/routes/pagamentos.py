from flask import Blueprint, request, jsonify
from models import Pagamento, Imovel
from app import db
from datetime import datetime

pagamentos_bp = Blueprint('pagamentos', __name__)

@pagamentos_bp.route('/', methods=['GET'])
def get_pagamentos():
    """Listar todos os pagamentos"""
    pagamentos = Pagamento.query.order_by(Pagamento.ano.desc(), Pagamento.mes.desc()).all()
    return jsonify([p.to_dict() for p in pagamentos])

@pagamentos_bp.route('/imovel/<imovel_uuid>', methods=['GET'])
def get_pagamentos_by_imovel(imovel_uuid):
    """Buscar pagamentos por imóvel"""
    pagamentos = Pagamento.query.filter_by(imovel_uuid=imovel_uuid).order_by(
        Pagamento.ano.desc(), Pagamento.mes.desc()
    ).all()
    return jsonify([p.to_dict() for p in pagamentos])

@pagamentos_bp.route('/mes/<int:mes>/<int:ano>', methods=['GET'])
def get_pagamentos_by_mes(mes, ano):
    """Buscar pagamentos por mês/ano"""
    pagamentos = Pagamento.query.filter_by(mes=mes, ano=ano).all()
    return jsonify([p.to_dict() for p in pagamentos])

@pagamentos_bp.route('/check', methods=['GET'])
def check_pagamento():
    """Verificar se pagamento existe"""
    imovel_uuid = request.args.get('imovel_uuid')
    mes = request.args.get('mes', type=int)
    ano = request.args.get('ano', type=int)
    
    if not all([imovel_uuid, mes, ano]):
        return jsonify({'error': 'Parâmetros obrigatórios: imovel_uuid, mes, ano'}), 400
    
    pagamento = Pagamento.query.filter_by(
        imovel_uuid=imovel_uuid, mes=mes, ano=ano
    ).first()
    
    return jsonify({
        'existe': pagamento is not None,
        'pago': pagamento.pago if pagamento else False
    })

@pagamentos_bp.route('/toggle', methods=['POST'])
def toggle_pagamento():
    """Alternar status de pagamento"""
    data = request.get_json()
    
    if not data or not all(k in data for k in ['imovel_uuid', 'mes', 'ano']):
        return jsonify({'error': 'Campos obrigatórios: imovel_uuid, mes, ano'}), 400
    
    imovel_uuid = data['imovel_uuid']
    mes = data['mes']
    ano = data['ano']
    
    # Verificar se já existe
    pagamento = Pagamento.query.filter_by(
        imovel_uuid=imovel_uuid, mes=mes, ano=ano
    ).first()
    
    if pagamento:
        # Alternar status
        pagamento.pago = not pagamento.pago
        pagamento.data_pagamento = datetime.utcnow() if pagamento.pago else None
    else:
        # Criar novo pagamento
        imovel = Imovel.query.filter_by(uuid=imovel_uuid).first()
        if not imovel:
            return jsonify({'error': 'Imóvel não encontrado'}), 404
        
        pagamento = Pagamento(
            imovel_uuid=imovel_uuid,
            mes=mes,
            ano=ano,
            pago=True,
            data_pagamento=datetime.utcnow(),
            valor_pago=imovel.valor_aluguel
        )
        db.session.add(pagamento)
    
    db.session.commit()
    
    return jsonify({'success': True, 'pago': pagamento.pago})

@pagamentos_bp.route('/mark-paid', methods=['POST'])
def mark_paid():
    """Marcar como pago"""
    data = request.get_json()
    
    if not data or not all(k in data for k in ['imovel_uuid', 'mes', 'ano']):
        return jsonify({'error': 'Campos obrigatórios: imovel_uuid, mes, ano'}), 400
    
    imovel_uuid = data['imovel_uuid']
    mes = data['mes']
    ano = data['ano']
    valor = data.get('valor_pago')
    
    # Verificar se já existe
    pagamento = Pagamento.query.filter_by(
        imovel_uuid=imovel_uuid, mes=mes, ano=ano
    ).first()
    
    if pagamento:
        pagamento.pago = True
        pagamento.data_pagamento = datetime.utcnow()
        pagamento.valor_pago = valor
    else:
        imovel = Imovel.query.filter_by(uuid=imovel_uuid).first()
        if not imovel:
            return jsonify({'error': 'Imóvel não encontrado'}), 404
        
        pagamento = Pagamento(
            imovel_uuid=imovel_uuid,
            mes=mes,
            ano=ano,
            pago=True,
            data_pagamento=datetime.utcnow(),
            valor_pago=valor or imovel.valor_aluguel
        )
        db.session.add(pagamento)
    
    db.session.commit()
    
    return jsonify({'success': True})

@pagamentos_bp.route('/mark-pending', methods=['POST'])
def mark_pending():
    """Marcar como pendente"""
    data = request.get_json()
    
    if not data or not all(k in data for k in ['imovel_uuid', 'mes', 'ano']):
        return jsonify({'error': 'Campos obrigatórios: imovel_uuid, mes, ano'}), 400
    
    pagamento = Pagamento.query.filter_by(
        imovel_uuid=data['imovel_uuid'],
        mes=data['mes'],
        ano=data['ano']
    ).first()
    
    if pagamento:
        pagamento.pago = False
        pagamento.data_pagamento = None
        db.session.commit()
    
    return jsonify({'success': True})
