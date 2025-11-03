import React, { useState } from 'react';
import { FileText, Download, Filter, Calendar, Users, DollarSign, BarChart3, PieChart } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [department, setDepartment] = useState('');
  const [client, setClient] = useState('');

  const reportTypes = [
    {
      id: 'employees-active',
      title: 'Funcionários Ativos',
      description: 'Lista de todos os funcionários ativos por cliente/projeto',
      icon: Users,
      category: 'Funcionários'
    },
    {
      id: 'turnover',
      title: 'Turnover',
      description: 'Relatório de admissões e desligamentos por período',
      icon: BarChart3,
      category: 'Funcionários'
    },
    {
      id: 'attendance',
      title: 'Frequência',
      description: 'Relatório de horas trabalhadas por funcionário/projeto',
      icon: Calendar,
      category: 'RH'
    },
    {
      id: 'vacation',
      title: 'Férias',
      description: 'Relatório de férias programadas e vencidas',
      icon: Calendar,
      category: 'RH'
    },
    {
      id: 'payroll-costs',
      title: 'Custos Consolidados',
      description: 'Relatório de custos consolidados por período',
      icon: DollarSign,
      category: 'Financeiro'
    },
    {
      id: 'client-costs',
      title: 'Custos por Cliente',
      description: 'Análise de custos e margem por cliente',
      icon: PieChart,
      category: 'Financeiro'
    },
    {
      id: 'training',
      title: 'Treinamentos',
      description: 'Relatório de treinamentos realizados e pendentes',
      icon: FileText,
      category: 'RH'
    },
    {
      id: 'documents',
      title: 'Documentação',
      description: 'Status da documentação dos funcionários',
      icon: FileText,
      category: 'RH'
    }
  ];

  const recentReports = [
    {
      name: 'Funcionários Ativos - Novembro 2024',
      type: 'employees-active',
      generated: '2024-11-30',
      size: '2.3 MB'
    },
    {
      name: 'Custos Consolidados - Outubro 2024',
      type: 'payroll-costs',
      generated: '2024-11-01',
      size: '1.8 MB'
    },
    {
      name: 'Relatório de Turnover - Q3 2024',
      type: 'turnover',
      generated: '2024-10-15',
      size: '980 KB'
    },
    {
      name: 'Frequência por Departamento - Outubro',
      type: 'attendance',
      generated: '2024-11-05',
      size: '1.2 MB'
    }
  ];

  const departments = ['Limpeza', 'Segurança', 'Jardinagem', 'Recepção', 'Outros'];
  const clients = ['Empresa ABC', 'Empresa XYZ', 'Empresa 123', 'Empresa DEF', 'Empresa GHI'];

  const handleGenerateReport = () => {
    if (!selectedReport) {
      alert('Selecione um tipo de relatório');
      return;
    }
    
    // Simular geração de relatório
    alert('Relatório sendo gerado! Você receberá uma notificação quando estiver pronto.');
  };

  const getReportIcon = (type: string) => {
    const report = reportTypes.find(r => r.id === type);
    return report?.icon || FileText;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Funcionários':
        return 'bg-blue-50 text-blue-700';
      case 'RH':
        return 'bg-green-50 text-green-700';
      case 'Financeiro':
        return 'bg-purple-50 text-purple-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
        <p className="text-gray-600">Gere relatórios personalizados e acompanhe indicadores</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seleção de Relatório */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold">Gerar Novo Relatório</h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Tipo de Relatório</label>
                  <select
                    className="input"
                    value={selectedReport}
                    onChange={(e) => setSelectedReport(e.target.value)}
                  >
                    <option value="">Selecione um relatório</option>
                    {reportTypes.map((report) => (
                      <option key={report.id} value={report.id}>
                        {report.title} - {report.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Data Inicial</label>
                    <input
                      type="date"
                      className="input"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Data Final</label>
                    <input
                      type="date"
                      className="input"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Departamento (Opcional)</label>
                    <select
                      className="input"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="">Todos os departamentos</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cliente (Opcional)</label>
                    <select
                      className="input"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                    >
                      <option value="">Todos os clientes</option>
                      {clients.map((cli) => (
                        <option key={cli} value={cli}>{cli}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleGenerateReport}
                    className="btn btn-primary"
                  >
                    <FileText className="h-4 w-4" />
                    Gerar Relatório
                  </button>
                  <button className="btn btn-secondary">
                    <Filter className="h-4 w-4" />
                    Filtros Avançados
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tipos de Relatórios Disponíveis */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold">Tipos de Relatórios Disponíveis</h2>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTypes.map((report) => {
                  const Icon = report.icon;
                  return (
                    <div
                      key={report.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedReport === report.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedReport(report.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-lg border">
                          <Icon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{report.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(report.category)}`}>
                              {report.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{report.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar com Relatórios Recentes */}
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Relatórios Recentes</h2>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                {recentReports.map((report, index) => {
                  const Icon = getReportIcon(report.type);
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                      <Icon className="h-5 w-5 text-gray-500" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{report.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(report.generated).toLocaleDateString('pt-BR')} • {report.size}
                        </p>
                      </div>
                      <button className="btn btn-secondary btn-sm">
                        <Download className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Estatísticas Rápidas */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Estatísticas do Mês</h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Relatórios Gerados</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Downloads</span>
                  <span className="font-medium">123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Mais Solicitado</span>
                  <span className="font-medium">Funcionários Ativos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tempo Médio</span>
                  <span className="font-medium">2.3 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Ações Rápidas</h2>
            </div>
            <div className="card-body">
              <div className="space-y-2">
                <button className="btn btn-secondary w-full btn-sm">
                  <Users className="h-4 w-4" />
                  Funcionários Ativos
                </button>
                <button className="btn btn-secondary w-full btn-sm">
                  <DollarSign className="h-4 w-4" />
                  Custos do Mês
                </button>
                <button className="btn btn-secondary w-full btn-sm">
                  <Calendar className="h-4 w-4" />
                  Férias Pendentes
                </button>
                <button className="btn btn-secondary w-full btn-sm">
                  <BarChart3 className="h-4 w-4" />
                  Dashboard Executivo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;