from flask import Blueprint, render_template
from models import Cliente, Imovel, Pagamento
from app import db
from datetime import datetime

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    """Página principal"""
    return render_template('index.html')

@main_bp.route('/api/stats')
def stats():
    """Estatísticas gerais"""
    total_clientes = Cliente.query.filter_by(ativo=True).count()
    total_imoveis = Imovel.query.filter_by(ativo=True).count()
    total_pagamentos = Pagamento.query.count()
    total_pagos = Pagamento.query.filter_by(pago=True).count()
    
    # Receita mensal (imóveis ativos)
    hoje = datetime.now().date()
    imoveis_ativos = Imovel.query.filter_by(ativo=True).all()
    receita_mensal = sum([
        imovel.valor_aluguel for imovel in imoveis_ativos
        if is_contrato_ativo(imovel, hoje)
    ])
    
    return {
        'total_clientes': total_clientes,
        'total_imoveis': total_imoveis,
        'total_pagamentos': total_pagamentos,
        'total_pagos': total_pagos,
        'receita_mensal': receita_mensal
    }

def is_contrato_ativo(imovel, data_referencia=None):
    """Verifica se o contrato está ativo"""
    if data_referencia is None:
        data_referencia = datetime.now().date()
    
    from dateutil.relativedelta import relativedelta
    data_fim = imovel.data_inicio + relativedelta(months=imovel.contrato_meses)
    return data_referencia <= data_fim
