import React, { useState } from 'react';
import { Calendar, Clock, Award, AlertTriangle, Users, FileText } from 'lucide-react';

const HRPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('vacation');

  const tabs = [
    { id: 'vacation', label: 'Férias', icon: Calendar },
    { id: 'attendance', label: 'Frequência', icon: Clock },
    { id: 'training', label: 'Treinamentos', icon: Award },
    { id: 'benefits', label: 'Benefícios', icon: Users },
    { id: 'documents', label: 'Documentos', icon: FileText }
  ];

  // Dados de exemplo para férias
  const vacationData = [
    {
      id: '1',
      employee: 'João Silva Santos',
      startDate: '2024-12-15',
      endDate: '2024-12-29',
      days: 14,
      status: 'approved',
      type: 'ferias'
    },
    {
      id: '2',
      employee: 'Maria Oliveira Costa',
      startDate: '2025-01-10',
      endDate: '2025-01-24',
      days: 14,
      status: 'pending',
      type: 'ferias'
    },
    {
      id: '3',
      employee: 'Carlos Eduardo Lima',
      startDate: '2024-11-01',
      endDate: '2024-11-15',
      days: 14,
      status: 'completed',
      type: 'ferias'
    }
  ];

  // Dados de exemplo para frequência
  const attendanceData = [
    {
      employee: 'João Silva Santos',
      present: 22,
      absent: 1,
      late: 2,
      overtime: 8
    },
    {
      employee: 'Maria Oliveira Costa',
      present: 23,
      absent: 0,
      late: 0,
      overtime: 12
    },
    {
      employee: 'Carlos Eduardo Lima',
      present: 20,
      absent: 3,
      late: 1,
      overtime: 4
    }
  ];

  // Dados de exemplo para treinamentos
  const trainingData = [
    {
      id: '1',
      title: 'Segurança no Trabalho',
      employees: 45,
      completed: 42,
      dueDate: '2024-12-31',
      status: 'active'
    },
    {
      id: '2',
      title: 'Primeiros Socorros',
      employees: 30,
      completed: 25,
      dueDate: '2025-01-15',
      status: 'active'
    },
    {
      id: '3',
      title: 'Uso de EPIs',
      employees: 60,
      completed: 60,
      dueDate: '2024-11-30',
      status: 'completed'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="badge badge-success">Aprovado</span>;
      case 'pending':
        return <span className="badge badge-warning">Pendente</span>;
      case 'completed':
        return <span className="badge badge-primary">Concluído</span>;
      case 'active':
        return <span className="badge badge-info">Ativo</span>;
      default:
        return <span className="badge badge-secondary">{status}</span>;
    }
  };

  const renderVacationTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Controle de Férias</h3>
        <button className="btn btn-primary">Solicitar Férias</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600">Aprovadas</p>
          <p className="text-2xl font-bold text-blue-900">12</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600">Pendentes</p>
          <p className="text-2xl font-bold text-yellow-900">3</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Concluídas</p>
          <p className="text-2xl font-bold text-green-900">25</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-600">Vencendo</p>
          <p className="text-2xl font-bold text-red-900">8</p>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Funcionário</th>
                <th>Início</th>
                <th>Fim</th>
                <th>Dias</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vacationData.map(vacation => (
                <tr key={vacation.id}>
                  <td>{vacation.employee}</td>
                  <td>{new Date(vacation.startDate).toLocaleDateString('pt-BR')}</td>
                  <td>{new Date(vacation.endDate).toLocaleDateString('pt-BR')}</td>
                  <td>{vacation.days} dias</td>
                  <td>{getStatusBadge(vacation.status)}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-primary btn-sm">Ver</button>
                      {vacation.status === 'pending' && (
                        <>
                          <button className="btn btn-success btn-sm">Aprovar</button>
                          <button className="btn btn-danger btn-sm">Rejeitar</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAttendanceTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Controle de Frequência</h3>
        <button className="btn btn-primary">Gerar Relatório</button>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Funcionário</th>
                <th>Dias Presentes</th>
                <th>Faltas</th>
                <th>Atrasos</th>
                <th>Horas Extras</th>
                <th>Taxa de Presença</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((attendance, index) => (
                <tr key={index}>
                  <td>{attendance.employee}</td>
                  <td>{attendance.present}</td>
                  <td>
                    <span className={attendance.absent > 2 ? 'text-red-600' : 'text-green-600'}>
                      {attendance.absent}
                    </span>
                  </td>
                  <td>
                    <span className={attendance.late > 3 ? 'text-yellow-600' : 'text-green-600'}>
                      {attendance.late}
                    </span>
                  </td>
                  <td>{attendance.overtime}h</td>
                  <td>
                    <span className={`badge ${
                      ((attendance.present / (attendance.present + attendance.absent)) * 100) >= 95 
                        ? 'badge-success' 
                        : 'badge-warning'
                    }`}>
                      {((attendance.present / (attendance.present + attendance.absent)) * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTrainingTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestão de Treinamentos</h3>
        <button className="btn btn-primary">Novo Treinamento</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trainingData.map(training => (
          <div key={training.id} className="card">
            <div className="card-body">
              <h4 className="font-semibold mb-2">{training.title}</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Participantes:</span>
                  <span className="font-medium">{training.employees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Concluídos:</span>
                  <span className="font-medium">{training.completed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Prazo:</span>
                  <span className="font-medium">
                    {new Date(training.dueDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status:</span>
                  {getStatusBadge(training.status)}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(training.completed / training.employees) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  {((training.completed / training.employees) * 100).toFixed(1)}% concluído
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBenefitsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestão de Benefícios</h3>
        <button className="btn btn-primary">Configurar Benefícios</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h4 className="font-semibold">Vale Transporte</h4>
          </div>
          <div className="card-body">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Funcionários ativos:</span>
                <span className="font-medium">280</span>
              </div>
              <div className="flex justify-between">
                <span>Utilizando benefício:</span>
                <span className="font-medium">245</span>
              </div>
              <div className="flex justify-between">
                <span>Custo mensal:</span>
                <span className="font-medium">R$ 36.750,00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="font-semibold">Vale Refeição</h4>
          </div>
          <div className="card-body">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Funcionários ativos:</span>
                <span className="font-medium">280</span>
              </div>
              <div className="flex justify-between">
                <span>Utilizando benefício:</span>
                <span className="font-medium">275</span>
              </div>
              <div className="flex justify-between">
                <span>Custo mensal:</span>
                <span className="font-medium">R$ 82.500,00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="font-semibold">Plano de Saúde</h4>
          </div>
          <div className="card-body">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Funcionários ativos:</span>
                <span className="font-medium">280</span>
              </div>
              <div className="flex justify-between">
                <span>Utilizando benefício:</span>
                <span className="font-medium">195</span>
              </div>
              <div className="flex justify-between">
                <span>Custo mensal:</span>
                <span className="font-medium">R$ 97.500,00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="font-semibold">Seguro de Vida</h4>
          </div>
          <div className="card-body">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Funcionários ativos:</span>
                <span className="font-medium">280</span>
              </div>
              <div className="flex justify-between">
                <span>Utilizando benefício:</span>
                <span className="font-medium">280</span>
              </div>
              <div className="flex justify-between">
                <span>Custo mensal:</span>
                <span className="font-medium">R$ 8.400,00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocumentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Controle de Documentos</h3>
        <button className="btn btn-primary">Solicitar Documentos</button>
      </div>

      <div className="alert alert-warning">
        <AlertTriangle className="h-5 w-5" />
        <div>
          <strong>Atenção!</strong> 15 funcionários estão com documentação pendente ou vencida.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Documentação Completa</p>
          <p className="text-2xl font-bold text-green-900">265</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600">Documentação Pendente</p>
          <p className="text-2xl font-bold text-yellow-900">12</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-600">Documentos Vencidos</p>
          <p className="text-2xl font-bold text-red-900">3</p>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h4 className="font-semibold mb-4">Documentos Pendentes</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Funcionário</th>
                <th>Documento</th>
                <th>Status</th>
                <th>Prazo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>João Silva Santos</td>
                <td>ASO - Atestado de Saúde Ocupacional</td>
                <td><span className="badge badge-warning">Vencendo</span></td>
                <td>15/12/2024</td>
                <td>
                  <button className="btn btn-primary btn-sm">Solicitar</button>
                </td>
              </tr>
              <tr>
                <td>Maria Oliveira Costa</td>
                <td>Carteira de Trabalho (Foto)</td>
                <td><span className="badge badge-danger">Pendente</span></td>
                <td>-</td>
                <td>
                  <button className="btn btn-primary btn-sm">Solicitar</button>
                </td>
              </tr>
              <tr>
                <td>Carlos Eduardo Lima</td>
                <td>Comprovante de Residência</td>
                <td><span className="badge badge-danger">Vencido</span></td>
                <td>01/11/2024</td>
                <td>
                  <button className="btn btn-danger btn-sm">Urgente</button>
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
      case 'vacation':
        return renderVacationTab();
      case 'attendance':
        return renderAttendanceTab();
      case 'training':
        return renderTrainingTab();
      case 'benefits':
        return renderBenefitsTab();
      case 'documents':
        return renderDocumentsTab();
      default:
        return renderVacationTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Recursos Humanos</h1>
        <p className="text-gray-600">Gestão completa de RH e relacionamento com funcionários</p>
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

export default HRPage;