import React from 'react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  {
    path: '/',
    icon: '🏠',
    label: 'Dashboard',
    exact: true
  },
  {
    path: '/funcionarios',
    icon: '👥',
    label: 'Funcionários'
  },
  {
    path: '/rh',
    icon: '🎯',
    label: 'Recursos Humanos'
  },
  {
    path: '/financeiro',
    icon: '💰',
    label: 'Financeiro'
  },
  {
    path: '/relatorios',
    icon: '📊',
    label: 'Relatórios'
  },
  {
    path: '/vendas',
    icon: '🛍️',
    label: 'Vendas'
  },
  {
    path: '/clientes',
    icon: '👤',
    label: 'Clientes'
  },
  {
    path: '/configuracoes',
    icon: '⚙️',
    label: 'Configurações'
  }
];

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      {/* Logo Header */}
      <div className="sidebar-header">
        <a href="/" className="logo">
          <div className="logo-icon">I</div>
          <span>Idealiza</span>
        </a>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : ''}`
            }
            end={item.exact}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: 'var(--space-4)', marginTop: 'auto', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', textAlign: 'center' }}>
          Idealiza Enterprise
          <br />
          v2.0.1
        </div>
      </div>
    </div>
  );
};

export default Sidebar;