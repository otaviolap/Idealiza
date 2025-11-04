import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../../components/ThemeToggle';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  
  // Se já estiver autenticado, redirecionar
  if (isAuthenticated) {
    navigate('/');
  }
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: 'teste@email.com',
    password: '123456',
    confirmPassword: '',
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
    
    if (isSignUp) {
      // Lógica de cadastro
      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem');
        setIsLoading(false);
        return;
      }
      
      if (formData.name.trim() === '') {
        setError('Nome é obrigatório');
        setIsLoading(false);
        return;
      }
      
      // Simular cadastro bem-sucedido
      setTimeout(() => {
        console.log('Cadastro realizado:', formData);
        setIsSignUp(false);
        setError('');
        setIsLoading(false);
        alert('Cadastro realizado com sucesso! Agora você pode fazer login.');
      }, 1000);
    } else {
      // Lógica de login
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
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleAuthMode = () => {
    setIsAnimating(true);
    
    // Troca o conteúdo apenas quando estiver totalmente escondido (no momento 50% da animação)
    setTimeout(() => {
      setIsSignUp(!isSignUp);
      setError('');
      setFormData(prev => ({
        ...prev,
        name: '',
        confirmPassword: ''
      }));
    }, 400); // Exatamente quando está em translateX(-100%) - totalmente escondido
    
    // Remove a classe de animação
    setTimeout(() => {
      setIsAnimating(false);
    }, 800); // Duração total da animação
  };

  return (
    <div className="login-container">
      {/* Header fino */}
      <div className="login-top-header">
        <div className="app-name">Idealiza</div>
        <ThemeToggle />
      </div>
      
      <div className="login-split">
        {/* Left side - Login/SignUp Form */}
        <div className="login-form-section">
          <div className={`login-form-wrapper ${isAnimating ? 'sliding' : ''}`}>
            <div className="login-header">
              <h1>{isSignUp ? 'Criar conta' : 'Bem-vindo de volta'}</h1>
              <p>{isSignUp ? 'Junte-se a nós e transforme suas ideias' : 'Entre em sua conta para continuar'}</p>
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
              
              {isSignUp && (
                <div className="form-group">
                  <label htmlFor="name">Nome completo</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome completo"
                      required
                    />
                    <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
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

              {isSignUp && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar senha</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirme sua senha"
                      required
                    />
                    <svg className="input-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Botão Google */}
              <div className="social-login">
                <div className="divider">
                  <span>ou</span>
                </div>
                <button type="button" className="google-button">
                  <svg viewBox="0 0 24 24" className="google-icon">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {isSignUp ? 'Cadastrar com Google' : 'Entrar com Google'}
                </button>
              </div>

              {!isSignUp && (
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
              )}

              <button type="submit" className="login-button" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span>{isSignUp ? 'Criando conta...' : 'Entrando...'}</span>
                    <svg className="animate-spin" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>{isSignUp ? 'Criar conta' : 'Entrar'}</span>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      {isSignUp ? (
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      )}
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="login-footer">
              <p>
                {isSignUp ? 'Já tem uma conta? ' : 'Não tem uma conta? '}
                <button onClick={toggleAuthMode} className="signup-link">
                  {isSignUp ? 'Entrar' : 'Cadastre-se'}
                </button>
              </p>
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