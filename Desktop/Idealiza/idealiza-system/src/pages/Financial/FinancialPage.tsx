import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calculator, FileText, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const FinancialPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: DollarSign },
    { id: 'payroll', label: 'Folha de Pagamento', icon: Calculator },
    { id: 'costs', label: 'Custos por Cliente', icon: TrendingUp },
    { id: 'payments', label: 'Pagamentos', icon: CreditCard }
  ];

  // Dados de exemplo para gráficos
  const payrollData = [
    { month: 'Jan', total: 850000, benefits: 120000, taxes: 180000 },
    { month: 'Fev', total: 870000, benefits: 125000, taxes: 185000 },
    { month: 'Mar', total: 885000, benefits: 128000, taxes: 188000 },
    { month: 'Abr', total: 890000, benefits: 130000, taxes: 190000 },
    { month: 'Mai', total: 895000, benefits: 132000, taxes: 192000 },
    { month: 'Jun', total: 900000, benefits: 135000, taxes: 195000 },
  ];

  const costTrendData = [
    { month: 'Jan', custo: 1150000 },
    { month: 'Fev', custo: 1180000 },
    { month: 'Mar', custo: 1201000 },
    { month: 'Abr', custo: 1210000 },
    { month: 'Mai', custo: 1219000 },
    { month: 'Jun', custo: 1230000 },
  ];

  // Dados de exemplo para custos por cliente
  const clientCosts = [
    {
      client: 'Empresa ABC',
      employees: 85,
      totalCost: 340000,
      avgCost: 4000,
      contract: 'R$ 450.000',
      margin: '24.4%'
    },
    {
      client: 'Empresa XYZ',
      employees: 60,
      totalCost: 240000,
      avgCost: 4000,
      contract: 'R$ 320.000',
      margin: '25.0%'
    },
    {
      client: 'Empresa 123',
      employees: 45,
      totalCost: 180000,
      avgCost: 4000,
      contract: 'R$ 245.000',
      margin: '26.5%'
    },
    {
      client: 'Empresa DEF',
      employees: 70,
      totalCost: 280000,
      avgCost: 4000,
      contract: 'R$ 380.000',
      margin: '26.3%'
    },
    {
      client: 'Empresa GHI',
      employees: 40,
      totalCost: 160000,
      avgCost: 4000,
      contract: 'R$ 220.000',
      margin: '27.3%'
    }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Folha de Pagamento</p>
                <p className="text-2xl font-bold text-gray-900">R$ 900K</p>
                <p className="text-sm text-success-color">+1.2% vs mês anterior</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="h-8 w-8 text-success-color" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Benefícios</p>
                <p className="text-2xl font-bold text-gray-900">R$ 135K</p>
                <p className="text-sm text-warning-color">+2.3% vs mês anterior</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-info-color" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Encargos</p>
                <p className="text-2xl font-bold text-gray-900">R$ 195K</p>
                <p className="text-sm text-danger-color">+0.8% vs mês anterior</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <TrendingDown className="h-8 w-8 text-danger-color" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Custo Total</p>
                <p className="text-2xl font-bold text-gray-900">R$ 1.23M</p>
                <p className="text-sm text-info-color">+1.1% vs mês anterior</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Calculator className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Evolução da Folha de Pagamento</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={payrollData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${(value as number).toLocaleString('pt-BR')}`} />
                <Bar dataKey="total" fill="#2563eb" name="Salários" />
                <Bar dataKey="benefits" fill="#10b981" name="Benefícios" />
                <Bar dataKey="taxes" fill="#f59e0b" name="Encargos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Tendência de Custos Totais</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={costTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${(value as number).toLocaleString('pt-BR')}`} />
                <Line type="monotone" dataKey="custo" stroke="#ef4444" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPayrollTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Folha de Pagamento - Junho 2024</h3>
        <div className="flex gap-2">
          <button className="btn btn-secondary">Gerar Holerites</button>
          <button className="btn btn-primary">Processar Pagamento</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600">Salários Brutos</p>
          <p className="text-xl font-bold text-blue-900">R$ 900.000</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Benefícios</p>
          <p className="text-xl font-bold text-green-900">R$ 135.000</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600">Encargos</p>
          <p className="text-xl font-bold text-yellow-900">R$ 195.000</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-600">Descontos</p>
          <p className="text-xl font-bold text-red-900">R$ 180.000</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600">Líquido</p>
          <p className="text-xl font-bold text-purple-900">R$ 720.000</p>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h4 className="font-semibold mb-4">Detalhamento por Departamento</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Departamento</th>
                <th>Funcionários</th>
                <th>Salário Bruto</th>
                <th>Benefícios</th>
                <th>Encargos</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Limpeza</td>
                <td>120</td>
                <td>R$ 360.000</td>
                <td>R$ 54.000</td>
                <td>R$ 78.000</td>
                <td>R$ 492.000</td>
              </tr>
              <tr>
                <td>Segurança</td>
                <td>80</td>
                <td>R$ 288.000</td>
                <td>R$ 43.200</td>
                <td>R$ 62.400</td>
                <td>R$ 393.600</td>
              </tr>
              <tr>
                <td>Jardinagem</td>
                <td>45</td>
                <td>R$ 162.000</td>
                <td>R$ 24.300</td>
                <td>R$ 35.100</td>
                <td>R$ 221.400</td>
              </tr>
              <tr>
                <td>Recepção</td>
                <td>35</td>
                <td>R$ 59.500</td>
                <td>R$ 8.925</td>
                <td>R$ 12.885</td>
                <td>R$ 81.310</td>
              </tr>
              <tr>
                <td>Outros</td>
                <td>20</td>
                <td>R$ 30.500</td>
                <td>R$ 4.575</td>
                <td>R$ 6.615</td>
                <td>R$ 41.690</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCostsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Custos por Cliente</h3>
        <button className="btn btn-primary">Exportar Relatório</button>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Funcionários</th>
                <th>Custo Total</th>
                <th>Custo Médio</th>
                <th>Valor Contrato</th>
                <th>Margem</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {clientCosts.map((client, index) => (
                <tr key={index}>
                  <td className="font-medium">{client.client}</td>
                  <td>{client.employees}</td>
                  <td>R$ {client.totalCost.toLocaleString('pt-BR')}</td>
                  <td>R$ {client.avgCost.toLocaleString('pt-BR')}</td>
                  <td>{client.contract}</td>
                  <td>
                    <span className={`badge ${
                      parseFloat(client.margin) > 25 ? 'badge-success' : 'badge-warning'
                    }`}>
                      {client.margin}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success">Ativo</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-header">
            <h4 className="font-semibold">Receita Total</h4>
          </div>
          <div className="card-body">
            <p className="text-3xl font-bold text-green-600">R$ 1.615.000</p>
            <p className="text-sm text-gray-500">Contratos ativos</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="font-semibold">Custo Total</h4>
          </div>
          <div className="card-body">
            <p className="text-3xl font-bold text-red-600">R$ 1.200.000</p>
            <p className="text-sm text-gray-500">Todos os custos</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="font-semibold">Margem Geral</h4>
          </div>
          <div className="card-body">
            <p className="text-3xl font-bold text-blue-600">25.7%</p>
            <p className="text-sm text-gray-500">Margem média</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Controle de Pagamentos</h3>
        <button className="btn btn-primary">Gerar Remessa</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Pagamentos Realizados</p>
          <p className="text-2xl font-bold text-green-900">R$ 2.160.000</p>
          <p className="text-xs text-green-700">Últimos 3 meses</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600">Pendentes</p>
          <p className="text-2xl font-bold text-yellow-900">R$ 720.000</p>
          <p className="text-xs text-yellow-700">Este mês</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600">Próximo Pagamento</p>
          <p className="text-2xl font-bold text-blue-900">05/12</p>
          <p className="text-xs text-blue-700">Data limite</p>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h4 className="font-semibold mb-4">Histórico de Pagamentos</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Funcionários</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>05/11/2024</td>
                <td>Folha de Pagamento - Outubro</td>
                <td>300</td>
                <td>R$ 720.000</td>
                <td><span className="badge badge-success">Pago</span></td>
                <td>
                  <button className="btn btn-secondary btn-sm">
                    <FileText className="h-4 w-4" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>05/10/2024</td>
                <td>Folha de Pagamento - Setembro</td>
                <td>295</td>
                <td>R$ 708.000</td>
                <td><span className="badge badge-success">Pago</span></td>
                <td>
                  <button className="btn btn-secondary btn-sm">
                    <FileText className="h-4 w-4" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>05/09/2024</td>
                <td>Folha de Pagamento - Agosto</td>
                <td>290</td>
                <td>R$ 696.000</td>
                <td><span className="badge badge-success">Pago</span></td>
                <td>
                  <button className="btn btn-secondary btn-sm">
                    <FileText className="h-4 w-4" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>05/12/2024</td>
                <td>Folha de Pagamento - Novembro</td>
                <td>300</td>
                <td>R$ 720.000</td>
                <td><span className="badge badge-warning">Pendente</span></td>
                <td>
                  <button className="btn btn-primary btn-sm">Processar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'payroll':
        return renderPayrollTab();
      case 'costs':
        return renderCostsTab();
      case 'payments':
        return renderPaymentsTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
        <p className="text-gray-600">Controle financeiro e gestão de custos</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default FinancialPage;