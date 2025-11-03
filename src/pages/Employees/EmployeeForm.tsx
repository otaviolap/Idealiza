import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Upload } from 'lucide-react';

interface EmployeeFormData {
  name: string;
  email: string;
  cpf: string;
  rg: string;
  birthDate: string;
  phone: string;
  address: string;
  position: string;
  department: string;
  admissionDate: string;
  contractType: string;
  salary: number;
  client: string;
  status: 'active' | 'inactive' | 'vacation';
}

const initialFormData: EmployeeFormData = {
  name: '',
  email: '',
  cpf: '',
  rg: '',
  birthDate: '',
  phone: '',
  address: '',
  position: '',
  department: '',
  admissionDate: '',
  contractType: 'CLT',
  salary: 0,
  client: '',
  status: 'active'
};

const EmployeeForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditing) {
      // Em um sistema real, aqui faria uma requisição para buscar os dados do funcionário
      // Por agora, vamos simular com dados de exemplo
      setFormData({
        name: 'João Silva Santos',
        email: 'joao.silva@email.com',
        cpf: '123.456.789-01',
        rg: '12.345.678-9',
        birthDate: '1990-05-15',
        phone: '(11) 99999-9999',
        address: 'Rua das Flores, 123 - São Paulo, SP',
        position: 'Auxiliar de Limpeza',
        department: 'Limpeza',
        admissionDate: '2023-01-15',
        contractType: 'CLT',
        salary: 1500,
        client: 'Empresa ABC',
        status: 'active'
      });
    }
  }, [isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'salary' ? parseFloat(value) || 0 : value
    }));
    
    // Limpar erro quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
    if (!formData.cpf.trim()) newErrors.cpf = 'CPF é obrigatório';
    if (!formData.position.trim()) newErrors.position = 'Cargo é obrigatório';
    if (!formData.department.trim()) newErrors.department = 'Departamento é obrigatório';
    if (!formData.admissionDate) newErrors.admissionDate = 'Data de admissão é obrigatória';
    if (!formData.client.trim()) newErrors.client = 'Cliente é obrigatório';
    if (!formData.salary || formData.salary <= 0) newErrors.salary = 'Salário deve ser maior que zero';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Simular requisição à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/funcionarios');
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/funcionarios');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={handleCancel} className="btn btn-secondary">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Editar Funcionário' : 'Novo Funcionário'}
          </h1>
          <p className="text-gray-600">
            {isEditing ? 'Atualize as informações do funcionário' : 'Preencha os dados do novo funcionário'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dados Pessoais */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold">Dados Pessoais</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nome Completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`input ${errors.name ? 'input-error' : ''}`}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Digite o nome completo"
                />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`input ${errors.email ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@exemplo.com"
                />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="cpf" className="form-label">CPF *</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  className={`input ${errors.cpf ? 'input-error' : ''}`}
                  value={formData.cpf}
                  onChange={handleInputChange}
                  placeholder="000.000.000-00"
                />
                {errors.cpf && <div className="form-error">{errors.cpf}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="rg" className="form-label">RG</label>
                <input
                  type="text"
                  id="rg"
                  name="rg"
                  className="input"
                  value={formData.rg}
                  onChange={handleInputChange}
                  placeholder="00.000.000-0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="birthDate" className="form-label">Data de Nascimento</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  className="input"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="input"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">Endereço</label>
              <textarea
                id="address"
                name="address"
                className="input"
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Endereço completo"
              />
            </div>
          </div>
        </div>

        {/* Dados Profissionais */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold">Dados Profissionais</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="position" className="form-label">Cargo *</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  className={`input ${errors.position ? 'input-error' : ''}`}
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Ex: Auxiliar de Limpeza"
                />
                {errors.position && <div className="form-error">{errors.position}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="department" className="form-label">Departamento *</label>
                <select
                  id="department"
                  name="department"
                  className={`input ${errors.department ? 'input-error' : ''}`}
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione o departamento</option>
                  <option value="Limpeza">Limpeza</option>
                  <option value="Segurança">Segurança</option>
                  <option value="Jardinagem">Jardinagem</option>
                  <option value="Recepção">Recepção</option>
                  <option value="Outros">Outros</option>
                </select>
                {errors.department && <div className="form-error">{errors.department}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="admissionDate" className="form-label">Data de Admissão *</label>
                <input
                  type="date"
                  id="admissionDate"
                  name="admissionDate"
                  className={`input ${errors.admissionDate ? 'input-error' : ''}`}
                  value={formData.admissionDate}
                  onChange={handleInputChange}
                />
                {errors.admissionDate && <div className="form-error">{errors.admissionDate}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="contractType" className="form-label">Tipo de Contrato</label>
                <select
                  id="contractType"
                  name="contractType"
                  className="input"
                  value={formData.contractType}
                  onChange={handleInputChange}
                >
                  <option value="CLT">CLT</option>
                  <option value="PJ">Pessoa Jurídica</option>
                  <option value="Temporário">Temporário</option>
                  <option value="Estágio">Estágio</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="salary" className="form-label">Salário *</label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  className={`input ${errors.salary ? 'input-error' : ''}`}
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
                {errors.salary && <div className="form-error">{errors.salary}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="client" className="form-label">Cliente *</label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  className={`input ${errors.client ? 'input-error' : ''}`}
                  value={formData.client}
                  onChange={handleInputChange}
                  placeholder="Nome do cliente"
                />
                {errors.client && <div className="form-error">{errors.client}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                  id="status"
                  name="status"
                  className="input"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                  <option value="vacation">Férias</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Documentos */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold">Documentos</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label">RG (Documento)</label>
                <button type="button" className="btn btn-secondary w-full">
                  <Upload className="h-4 w-4" />
                  Enviar RG
                </button>
              </div>
              
              <div className="form-group">
                <label className="form-label">CPF (Documento)</label>
                <button type="button" className="btn btn-secondary w-full">
                  <Upload className="h-4 w-4" />
                  Enviar CPF
                </button>
              </div>
              
              <div className="form-group">
                <label className="form-label">Comprovante de Residência</label>
                <button type="button" className="btn btn-secondary w-full">
                  <Upload className="h-4 w-4" />
                  Enviar Comprovante
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="card">
          <div className="card-footer">
            <div className="flex gap-4 justify-end">
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                Cancelar
              </button>
              <button type="submit" disabled={loading} className="btn btn-success">
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {isEditing ? 'Atualizar' : 'Salvar'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;