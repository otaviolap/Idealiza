import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  cpf: string;
  position: string;
  department: string;
  admissionDate: string;
  status: 'active' | 'inactive' | 'vacation';
  salary: number;
  client: string;
}

// Dados de exemplo
const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'João Silva Santos',
    email: 'joao.silva@email.com',
    cpf: '123.456.789-01',
    position: 'Auxiliar de Limpeza',
    department: 'Limpeza',
    admissionDate: '2023-01-15',
    status: 'active',
    salary: 1500,
    client: 'Empresa ABC'
  },
  {
    id: '2',
    name: 'Maria Oliveira Costa',
    email: 'maria.oliveira@email.com',
    cpf: '987.654.321-09',
    position: 'Vigilante',
    department: 'Segurança',
    admissionDate: '2023-03-20',
    status: 'active',
    salary: 1800,
    client: 'Empresa XYZ'
  },
  {
    id: '3',
    name: 'Carlos Eduardo Lima',
    email: 'carlos.lima@email.com',
    cpf: '456.789.123-45',
    position: 'Jardineiro',
    department: 'Jardinagem',
    admissionDate: '2023-05-10',
    status: 'vacation',
    salary: 1600,
    client: 'Empresa 123'
  },
  {
    id: '4',
    name: 'Ana Paula Rodrigues',
    email: 'ana.rodrigues@email.com',
    cpf: '789.123.456-78',
    position: 'Recepcionista',
    department: 'Recepção',
    admissionDate: '2023-02-28',
    status: 'active',
    salary: 1700,
    client: 'Empresa DEF'
  },
  {
    id: '5',
    name: 'Pedro Henrique Souza',
    email: 'pedro.souza@email.com',
    cpf: '321.654.987-12',
    position: 'Auxiliar de Serviços Gerais',
    department: 'Limpeza',
    admissionDate: '2023-04-05',
    status: 'inactive',
    salary: 1400,
    client: 'Empresa GHI'
  }
];

const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="badge badge-success">Ativo</span>;
      case 'inactive':
        return <span className="badge badge-danger">Inativo</span>;
      case 'vacation':
        return <span className="badge badge-warning">Férias</span>;
      default:
        return <span className="badge badge-secondary">{status}</span>;
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.cpf.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const departments = [...new Set(employees.map(emp => emp.department))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Funcionários</h1>
        <Link to="/funcionarios/novo" className="btn btn-primary">
          <Plus className="h-5 w-5" />
          Novo Funcionário
        </Link>
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-group">
              <label className="form-label">Pesquisar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nome, email ou CPF..."
                  className="input pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="input"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Todos</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
                <option value="vacation">Férias</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Departamento</label>
              <select
                className="input"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="all">Todos</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600">Total</p>
          <p className="text-2xl font-bold text-blue-900">{employees.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Ativos</p>
          <p className="text-2xl font-bold text-green-900">
            {employees.filter(emp => emp.status === 'active').length}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600">Em Férias</p>
          <p className="text-2xl font-bold text-yellow-900">
            {employees.filter(emp => emp.status === 'vacation').length}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-600">Inativos</p>
          <p className="text-2xl font-bold text-red-900">
            {employees.filter(emp => emp.status === 'inactive').length}
          </p>
        </div>
      </div>

      {/* Tabela */}
      <div className="card">
        <div className="card-body">
          {filteredEmployees.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum funcionário encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Cargo</th>
                    <th>Departamento</th>
                    <th>Cliente</th>
                    <th>Admissão</th>
                    <th>Status</th>
                    <th>Salário</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map(employee => (
                    <tr key={employee.id}>
                      <td>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </div>
                      </td>
                      <td>{employee.cpf}</td>
                      <td>{employee.position}</td>
                      <td>{employee.department}</td>
                      <td>{employee.client}</td>
                      <td>{new Date(employee.admissionDate).toLocaleDateString('pt-BR')}</td>
                      <td>{getStatusBadge(employee.status)}</td>
                      <td>R$ {employee.salary.toLocaleString('pt-BR')}</td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn btn-secondary btn-sm" title="Visualizar">
                            <Eye className="h-4 w-4" />
                          </button>
                          <Link 
                            to={`/funcionarios/editar/${employee.id}`}
                            className="btn btn-primary btn-sm"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button className="btn btn-danger btn-sm" title="Excluir">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;