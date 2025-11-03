import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface UserProfileData {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: string;
  department?: string;
  joinDate?: string;
}

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState<UserProfileData>({
    name: user?.name || 'Usuário Teste',
    email: 'teste@email.com',
    role: 'Administrator',
    phone: '(11) 99999-9999',
    department: 'Tecnologia da Informação',
    joinDate: '15/03/2023'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [documents] = useState<DocumentItem[]>([
    {
      id: '1',
      name: 'Contrato de Trabalho.pdf',
      type: 'PDF',
      uploadDate: '15/03/2023',
      size: '2.3 MB'
    },
    {
      id: '2',
      name: 'RG - Frente e Verso.pdf',
      type: 'PDF',
      uploadDate: '15/03/2023',
      size: '1.8 MB'
    },
    {
      id: '3',
      name: 'CPF.pdf',
      type: 'PDF',
      uploadDate: '15/03/2023',
      size: '856 KB'
    },
    {
      id: '4',
      name: 'Comprovante de Residência.pdf',
      type: 'PDF',
      uploadDate: '20/03/2023',
      size: '1.2 MB'
    }
  ]);

  const handleNameSave = () => {
    // Aqui você implementaria a lógica para salvar o nome
    console.log('Nome atualizado:', formData.name);
    setIsEditingName(false);
    // Mostrar toast de sucesso
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres!');
      return;
    }
    // Aqui você implementaria a lógica para alterar a senha
    console.log('Senha alterada com sucesso');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsChangingPassword(false);
    alert('Senha alterada com sucesso!');
  };

  const handleDocumentDownload = (document: DocumentItem) => {
    // Aqui você implementaria o download do documento
    console.log('Baixando documento:', document.name);
  };

  const handleDocumentUpload = () => {
    // Aqui você implementaria o upload de novos documentos
    console.log('Abrindo upload de documentos');
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1 className="page-title">Meu Perfil</h1>
        <p className="page-subtitle">Gerencie suas informações pessoais e documentos</p>
      </div>

      <div className="profile-content">
        {/* Informações Pessoais */}
        <div className="profile-section">
          <div className="section-header">
            <h2 className="section-title">Informações Pessoais</h2>
          </div>

          <div className="profile-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar-large">
                {formData.name.charAt(0).toUpperCase()}
              </div>
              <div className="avatar-info">
                <h3>{formData.name}</h3>
                <p>{formData.role}</p>
              </div>
            </div>

            <div className="profile-fields">
              {/* Nome de Exibição */}
              <div className="field-group">
                <label className="field-label">Nome de Exibição</label>
                {isEditingName ? (
                  <div className="edit-field">
                    <input
                      type="text"
                      className="profile-input"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <div className="edit-actions">
                      <button className="btn-save" onClick={handleNameSave}>
                        Salvar
                      </button>
                      <button 
                        className="btn-cancel" 
                        onClick={() => setIsEditingName(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="display-field">
                    <span className="field-value">{formData.name}</span>
                    <button 
                      className="btn-edit"
                      onClick={() => setIsEditingName(true)}
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Editar
                    </button>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="field-group">
                <label className="field-label">Email</label>
                <div className="display-field">
                  <span className="field-value">{formData.email}</span>
                  <span className="field-note">Email não pode ser alterado</span>
                </div>
              </div>

              {/* Telefone */}
              <div className="field-group">
                <label className="field-label">Telefone</label>
                <div className="display-field">
                  <span className="field-value">{formData.phone}</span>
                </div>
              </div>

              {/* Departamento */}
              <div className="field-group">
                <label className="field-label">Departamento</label>
                <div className="display-field">
                  <span className="field-value">{formData.department}</span>
                </div>
              </div>

              {/* Data de Ingresso */}
              <div className="field-group">
                <label className="field-label">Data de Ingresso</label>
                <div className="display-field">
                  <span className="field-value">{formData.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Segurança */}
        <div className="profile-section">
          <div className="section-header">
            <h2 className="section-title">Segurança</h2>
          </div>

          <div className="profile-card">
            <div className="security-field">
              <div className="security-info">
                <h3>Senha</h3>
                <p>Última alteração: 15/03/2023</p>
              </div>
              {!isChangingPassword ? (
                <button 
                  className="btn-secondary"
                  onClick={() => setIsChangingPassword(true)}
                >
                  Alterar Senha
                </button>
              ) : (
                <div className="password-change-form">
                  <div className="password-field">
                    <label>Senha Atual</label>
                    <input
                      type="password"
                      className="profile-input"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    />
                  </div>
                  <div className="password-field">
                    <label>Nova Senha</label>
                    <input
                      type="password"
                      className="profile-input"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    />
                  </div>
                  <div className="password-field">
                    <label>Confirmar Nova Senha</label>
                    <input
                      type="password"
                      className="profile-input"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    />
                  </div>
                  <div className="edit-actions">
                    <button className="btn-save" onClick={handlePasswordChange}>
                      Alterar Senha
                    </button>
                    <button 
                      className="btn-cancel" 
                      onClick={() => setIsChangingPassword(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Documentos */}
        <div className="profile-section">
          <div className="section-header">
            <h2 className="section-title">Documentos</h2>
            <button className="btn-primary" onClick={handleDocumentUpload}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Adicionar Documento
            </button>
          </div>

          <div className="profile-card">
            <div className="documents-grid">
              {documents.map((document) => (
                <div key={document.id} className="document-item">
                  <div className="document-icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="document-info">
                    <h4>{document.name}</h4>
                    <div className="document-meta">
                      <span>{document.type}</span>
                      <span>{document.size}</span>
                      <span>{document.uploadDate}</span>
                    </div>
                  </div>
                  <button 
                    className="document-download"
                    onClick={() => handleDocumentDownload(document)}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;