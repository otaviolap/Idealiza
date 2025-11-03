import { useState, useEffect } from 'react';

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
  change: string;
  changeType: 'positive' | 'negative';
  color: string;
}

const StatCard = ({ icon, value, label, change, changeType, color }: StatCardProps) => (
  <div className="stat-card animate-slide-up">
    <div className={`stat-icon ${color}`}>
      {icon}
    </div>
    <div className="stat-content">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <div className={`stat-change ${changeType}`}>
        {changeType === 'positive' ? '↗' : '↘'} {change}
      </div>
    </div>
  </div>
);

const ChartCard = ({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) => (
  <div className="chart-card animate-slide-up">
    <div className="chart-header">
      <div className="chart-title">{title}</div>
      <div className="chart-subtitle">{subtitle}</div>
    </div>
    <div className="chart-container">
      {children}
    </div>
  </div>
);

const ActivityItem = ({ icon, title, description, time }: { icon: string; title: string; description: string; time: string }) => (
  <div className="activity-item">
    <div className="activity-icon">
      {icon}
    </div>
    <div className="activity-content">
      <div className="activity-title">{title}</div>
      <div className="activity-description">{description}</div>
    </div>
    <div className="activity-time">{time}</div>
  </div>
);

const BarChart = ({ data }: { data: number[] }) => (
  <div className="chart-mock">
    {data.map((height, index) => (
      <div 
        key={index}
        className="chart-bar" 
        style={{ height: `${height}%` }}
      />
    ))}
  </div>
);

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const statsData = [
    {
      icon: '📊',
      value: '2,847',
      label: 'Vendas Totais',
      change: '+12.5%',
      changeType: 'positive' as const,
      color: 'primary'
    },
    {
      icon: '👥',
      value: '1,429',
      label: 'Clientes Ativos',
      change: '+8.2%',
      changeType: 'positive' as const,
      color: 'secondary'
    },
    {
      icon: '💰',
      value: 'R$ 89.4K',
      label: 'Receita Mensal',
      change: '+15.3%',
      changeType: 'positive' as const,
      color: 'success'
    },
    {
      icon: '📈',
      value: '97.2%',
      label: 'Taxa de Conversão',
      change: '-2.1%',
      changeType: 'negative' as const,
      color: 'warning'
    }
  ];

  const salesData = [65, 48, 82, 57, 91, 73, 88, 69, 95, 78, 84, 71];
  const performanceData = [45, 67, 83, 72, 56, 89, 94, 68, 76, 85];

  const recentActivities = [
    {
      icon: '🎯',
      title: 'Nova Meta Alcançada',
      description: 'Vendas do mês superaram a meta em 15%',
      time: 'há 5 min'
    },
    {
      icon: '🛍️',
      title: 'Pedido Processado',
      description: 'Pedido #3472 de João Silva foi enviado',
      time: 'há 12 min'
    },
    {
      icon: '👤',
      title: 'Novo Cliente',
      description: 'Maria Santos se cadastrou na plataforma',
      time: 'há 28 min'
    },
    {
      icon: '📦',
      title: 'Estoque Atualizado',
      description: 'Produto "Smartphone XYZ" reabastecido',
      time: 'há 1h'
    },
    {
      icon: '💳',
      title: 'Pagamento Confirmado',
      description: 'Transação de R$ 1.247,90 aprovada',
      time: 'há 2h'
    }
  ];

  if (!isLoaded) {
    return (
      <div className="dashboard">
        <div className="flex items-center justify-center" style={{ height: '60vh' }}>
          <div className="animate-pulse">
            <div className="dashboard-title">Carregando...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Centro de Comando Idealiza
        </h1>
        <p className="dashboard-subtitle">
          Painel executivo com insights em tempo real • {currentTime.toLocaleTimeString('pt-BR')}
        </p>
      </div>

      {/* Key Performance Indicators */}
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            change={stat.change}
            changeType={stat.changeType}
            color={stat.color}
          />
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="charts-grid">
        <ChartCard 
          title="Performance de Vendas" 
          subtitle="Últimos 12 meses - Crescimento consistente"
        >
          <BarChart data={salesData} />
        </ChartCard>

        <ChartCard 
          title="Métricas de Engajamento" 
          subtitle="Análise comportamental dos usuários"
        >
          <BarChart data={performanceData} />
        </ChartCard>
      </div>

      {/* Recent Activity Feed */}
      <div className="activity-section">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Atividades Recentes</h3>
              <p className="card-subtitle">Acompanhe em tempo real as movimentações do sistema</p>
            </div>
            <div className="flex gap-4">
              <button className="btn btn-secondary btn-sm">
                📊 Relatório
              </button>
              <button className="btn btn-primary btn-sm">
                ⚡ Atualizar
              </button>
            </div>
          </div>
          
          <div className="activity-list">
            {recentActivities.map((activity, index) => (
              <ActivityItem
                key={index}
                icon={activity.icon}
                title={activity.title}
                description={activity.description}
                time={activity.time}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="charts-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Ações Rápidas</h3>
              <p className="card-subtitle">Acesso direto às funções mais utilizadas</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <button className="btn btn-primary flex-1">
                🎯 Nova Campanha
              </button>
              <button className="btn btn-secondary flex-1">
                📋 Relatório Executivo
              </button>
            </div>
            <div className="flex gap-4">
              <button className="btn btn-secondary flex-1">
                👥 Gerenciar Clientes
              </button>
              <button className="btn btn-secondary flex-1">
                📊 Analytics Avançado
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Alertas do Sistema</h3>
              <p className="card-subtitle">Notificações importantes requerem atenção</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="activity-item">
              <div className="activity-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)' }}>
                ⚠️
              </div>
              <div className="activity-content">
                <div className="activity-title">Estoque Baixo</div>
                <div className="activity-description">3 produtos precisam de reposição</div>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon" style={{ background: 'linear-gradient(135deg, #16a34a, #059669)' }}>
                ✅
              </div>
              <div className="activity-content">
                <div className="activity-title">Backup Concluído</div>
                <div className="activity-description">Sistema sincronizado com sucesso</div>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon" style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                🔔
              </div>
              <div className="activity-content">
                <div className="activity-title">Atualização Disponível</div>
                <div className="activity-description">Nova versão do sistema está pronta</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}