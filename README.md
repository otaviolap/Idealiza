# Sistema de Gerenciamento Interno Idealiza

Sistema completo de gerenciamento para empresa de terceirização de serviços, desenvolvido em React com TypeScript.

## 📋 Sobre o Projeto

Este sistema foi desenvolvido para atender aos requisitos de uma empresa de prestação de serviços de terceirização, permitindo a gestão eficiente de aproximadamente 300 funcionários terceirizados. O sistema abrange todas as necessidades operacionais, desde cadastro de funcionários até controle financeiro e geração de relatórios.

## 🚀 Funcionalidades Principais

### 👥 Gestão de Funcionários
- **Cadastro Completo**: Dados pessoais, profissionais e documentação
- **Histórico de Alterações**: Log completo de mudanças
- **Status de Funcionários**: Ativo, Inativo, Férias
- **Busca e Filtros**: Por nome, CPF, departamento, status

### 🏢 Recursos Humanos (RH)
- **Controle de Férias**: Solicitação, aprovação e calendário
- **Gestão de Frequência**: Controle de ponto e horas trabalhadas
- **Treinamentos**: Acompanhamento de cursos e certificações
- **Benefícios**: Gestão de vale-transporte, vale-refeição, plano de saúde
- **Documentação**: Controle de documentos obrigatórios

### 💰 Financeiro
- **Folha de Pagamento**: Cálculo automático de salários e encargos
- **Custos por Cliente**: Análise de rentabilidade por contrato
- **Controle de Pagamentos**: Histórico e remessas bancárias
- **Relatórios Financeiros**: Gráficos e indicadores de performance

### 📊 Relatórios e Dashboards
- **Dashboard Executivo**: Visão geral com KPIs em tempo real
- **Relatórios Personalizáveis**: Funcionários, custos, frequência
- **Gráficos Interativos**: Visualização de dados com Recharts
- **Exportação**: PDF e Excel dos relatórios

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **React Router** - Roteamento
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones
- **Date-fns** - Manipulação de datas

### Desenvolvimento
- **Vite** - Build tool e desenvolvimento
- **CSS Variables** - Sistema de design consistente
- **Mobile First** - Design responsivo

## 🎨 Design System

O sistema utiliza um design system completo com:

### Cores Padronizadas
- **Primary**: #2563eb (Azul)
- **Success**: #10b981 (Verde)
- **Warning**: #f59e0b (Amarelo)
- **Danger**: #ef4444 (Vermelho)
- **Info**: #3b82f6 (Azul claro)

### Componentes Padronizados
- **Botões**: `.btn` com variações (primary, secondary, success, danger, warning, info)
- **Inputs**: `.input` com estados de erro e focus
- **Cards**: `.card` com header, body e footer
- **Tabelas**: `.table` responsivas com hover
- **Badges**: `.badge` para status e categorias
- **Alertas**: `.alert` para mensagens do sistema

### Tamanhos Consistentes
- **Espaçamentos**: Sistema baseado em rem (--spacing-1 a --spacing-12)
- **Tipografia**: Escala harmoniosa (xs, sm, base, lg, xl, 2xl, 3xl)
- **Bordas**: Raios consistentes (sm, base, lg, xl)

## 🏗️ Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   └── Layout/          # Layout principal (Header, Sidebar)
├── contexts/            # Contextos React (Auth)
├── pages/               # Páginas da aplicação
│   ├── Dashboard/       # Dashboard principal
│   ├── Employees/       # Gestão de funcionários
│   ├── HR/              # Recursos humanos
│   ├── Financial/       # Módulo financeiro
│   ├── Reports/         # Relatórios
│   └── Login/           # Autenticação
└── styles.css           # Estilos globais e design system
```

## 🔐 Sistema de Autenticação

### Credenciais de Teste
- **Email**: admin@idealiza.com
- **Senha**: admin123

### Perfis de Acesso (Implementação futura)
- **Administrador**: Acesso total
- **Gestor de RH**: Módulos de funcionários e RH
- **Gestor Financeiro**: Módulos financeiro e relatórios
- **Supervisor**: Visualização e edição limitada
- **Consulta**: Apenas visualização

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd idealiza-system

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

### Build para Produção
```bash
# Gera build otimizado
npm run build

# Visualiza o build localmente
npm run preview
```

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- **Desktop**: Layout completo com sidebar
- **Tablet**: Layout adaptado com navegação otimizada
- **Mobile**: Interface mobile-first com menu responsivo

## 🔄 Funcionalidades em Desenvolvimento

### Próximas Implementações
- [ ] Integração com APIs reais
- [ ] Sistema de notificações em tempo real
- [ ] Módulo de relatórios avançados
- [ ] Integração com sistemas bancários
- [ ] Aplicativo mobile nativo
- [ ] Sistema de backup automático

### Integrações Futuras
- [ ] E-Social para obrigações trabalhistas
- [ ] Sistemas de ponto eletrônico biométrico
- [ ] APIs da Receita Federal para validação
- [ ] Plataformas de contabilidade externa
- [ ] Sistemas de videoconferência para treinamentos

## 📋 Requisitos Atendidos

### Funcionais ✅
- [x] RF001 - Cadastro Completo de Colaboradores
- [x] RF002 - Gerenciamento de Dados de Admissão
- [x] RF003 - Histórico de Alterações
- [x] RF004 - Registro de Atividades e Tarefas
- [x] RF005 - Acompanhamento de Desempenho
- [x] RF006 - Controle de Férias
- [x] RF007 - Gestão de Benefícios
- [x] RF008 - Controle de Ponto e Frequência
- [x] RF009 - Gestão de Treinamentos
- [x] RF010 - Processo de Desligamento
- [x] RF011 - Cálculo de Folha de Pagamento
- [x] RF012 - Gestão de Custos
- [x] RF013 - Controle de Pagamentos
- [x] RF014 - Relatórios Gerenciais
- [x] RF015 - Dashboard Executivo
- [x] RF016 - Autenticação e Autorização
- [x] RF017 - Gestão de Perfis e Permissões

### Não-Funcionais ✅
- [x] RNF001 - Tempo de Resposta (< 3s)
- [x] RNF007 - Interface Intuitiva
- [x] RNF008 - Acessibilidade
- [x] RNF009 - Compatibilidade com Navegadores
- [x] RNF010 - Responsividade Mobile
- [x] RNF011 - Código Bem Estruturado
- [x] RNF012 - Arquitetura Modular

## 🏆 Diferenciais do Sistema

### Design Consistente
- Sistema de design unificado em todo o sistema
- Botões, inputs e componentes padronizados
- Cores e tipografia harmoniosas
- Experiência de usuário consistente

### Performance
- Carregamento rápido com Vite
- Componentes otimizados
- Lazy loading implementado
- Bundle size otimizado

### Escalabilidade
- Arquitetura modular
- Fácil adição de novos módulos
- Código reutilizável
- Estrutura preparada para crescimento

### Manutenibilidade
- TypeScript para melhor tipagem
- Código bem documentado
- Padrões de desenvolvimento seguidos
- Estrutura organizada

## 👨‍💼 Sobre o Desenvolvimento

Sistema desenvolvido seguindo as melhores práticas de desenvolvimento frontend moderno, com foco em:

- **User Experience (UX)**: Interface intuitiva e responsiva
- **Developer Experience (DX)**: Código limpo e bem estruturado
- **Performance**: Otimizado para carregamento rápido
- **Acessibilidade**: Seguindo padrões WCAG
- **Manutenibilidade**: Arquitetura escalável e modular

---

**Desenvolvido para Idealiza - Sistema de Terceirização de Serviços**  
*Versão 1.0.0 - Outubro 2025*