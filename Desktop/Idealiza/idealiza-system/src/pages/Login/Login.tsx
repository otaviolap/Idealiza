import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  
  // Se já estiver autenticado, redirecionar
  if (isAuthenticated) {
    navigate('/');
  }
  const [formData, setFormData] = useState({
    email: 'teste@email.com',
    password: '123456',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Credenciais de teste
  const VALID_CREDENTIALS = {
    email: 'teste@email.com',
    password: '123456'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Verificar credenciais específicas
    if (formData.email === VALID_CREDENTIALS.email && formData.password === VALID_CREDENTIALS.password) {
      try {
        const success = await login(formData.email, formData.password);
        if (success) {
          console.log('Login successful:', formData);
          navigate('/');
        } else {
          setError('Erro na autenticação. Tente novamente.');
        }
      } catch (error) {
        setError('Erro na autenticação. Tente novamente.');
      }
    } else {
      setError('Email ou senha incorretos. Use: teste@email.com / 123456');
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="login-container">
      <div className="login-split">
        {/* Left side - Login Form */}
        <div className="login-form-section">
          <div className="login-form-wrapper">
            <div className="login-header">
              <div className="logo-container">
                <div className="logo-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="logo-text">Idealiza</span>
              </div>
              <h1>Bem-vindo de volta</h1>
              <p>Entre em sua conta para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {error && (
                <div className="error-message">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                  />
                  <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Sua senha"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Lembrar de mim
                </label>
                <a href="#" className="forgot-password">Esqueceu a senha?</a>
              </div>

              <button type="submit" className="login-button" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span>Entrando...</span>
                    <svg className="animate-spin" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Entrar</span>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="login-footer">
              <div className="demo-info">
                <p><strong>� Credenciais de Teste:</strong></p>
                <p><strong>Email:</strong> teste@email.com</p>
                <p><strong>Senha:</strong> 123456</p>
              </div>
              <p>Não tem uma conta? <a href="#" className="signup-link">Cadastre-se</a></p>
            </div>
          </div>
        </div>

        {/* Right side - Feature Showcase */}
        <div className="login-showcase">
          <div className="showcase-content">
            <div className="showcase-header">
              <h2>Transforme suas ideias em realidade</h2>
              <p>Plataforma completa para gestão empresarial inteligente</p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 11H1l6-6 6 6zm4 4v8l6-6-6-6z"/>
                  </svg>
                </div>
                <h3>Gestão Inteligente</h3>
                <p>Automatize processos e otimize resultados com IA avançada</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <h3>Analytics Avançada</h3>
                <p>Insights em tempo real para decisões estratégicas precisas</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3>Escalabilidade</h3>
                <p>Cresça sem limitações com nossa infraestrutura robusta</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3>Segurança Total</h3>
                <p>Proteção de dados de nível empresarial certificada</p>
              </div>
            </div>

            <div className="showcase-stats">
              <div className="stat-item">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50k+</div>
                <div className="stat-label">Empresas</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">2M+</div>
                <div className="stat-label">Usuários</div>
              </div>
            </div>
          </div>

          <div className="showcase-overlay"></div>
        </div>
      </div>
    </div>
  );
}