import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Activity,
  User,
  Calendar,
  Package,
  Building,
  Eye,
  TrendingUp,
  Users
} from 'lucide-react';

// Dados mockados baseados na análise real dos PDFs
const mockData = {
  stats: {
    total: 18, // Total de avaliadores analisados
    highCredibility: 4, // Heloisa, Silene, Jamerson, Italo
    mediumCredibility: 4, // Clemens, Mariana, Amanda, Renata
    lowCredibility: 3, // Laís, Carlos, Maiara
    testsCompleted: 60
  },
  tests: [
    {
      id: "TEST001",
      date: "2025-10-23",
      supplier: "Nutrimental",
      input: "Corante Natural",
      product: "Linguiça de Frango",
      status: "completed",
      type: "Triangular",
      evaluators: 18,
      correctIdentifications: 15,
      accuracy: 83.3,
      responses: [
        { 
          name: "Heloisa", 
          comment: "Diferença praticamente imperceptível",
          identified: true,
          credibilityScore: 85,
          sentiment: "neutral"
        },
        { 
          name: "Silene", 
          comment: "Amostra apresenta cor mais dourada",
          identified: true,
          credibilityScore: 90,
          sentiment: "neutral"
        },
        { 
          name: "Jamerson", 
          comment: "Aparentemente está mais 'cru'",
          identified: true,
          credibilityScore: 88,
          sentiment: "negative"
        },
        { 
          name: "Italo", 
          comment: "Ligeiramente mais rosada",
          identified: true,
          credibilityScore: 85,
          sentiment: "neutral"
        },
        { 
          name: "Mariana", 
          comment: "Bem sutil, mais é mais escura",
          identified: true,
          credibilityScore: 75,
          sentiment: "neutral"
        },
        { 
          name: "Laís", 
          comment: "Não evidenciado diferença significativa",
          identified: false,
          credibilityScore: 45,
          sentiment: "neutral"
        }
      ]
    },
    {
      id: "TEST002", 
      date: "2025-10-20",
      supplier: "FornecedorB", 
      input: "Tempero Especial",
      product: "Batata Frita", 
      status: "approved",
      evaluators: 12,
      accuracy: 75.0
    },
    {
      id: "TEST003",
      date: "2025-10-18", 
      supplier: "FornecedorC",
      input: "Óleo de Fritura", 
      product: "Frango Empanado",
      status: "rejected",
      evaluators: 15,
      accuracy: 60.0
    }
  ]
};

function App() {
  const [selectedTest, setSelectedTest] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      approved: 'status-approved',
      rejected: 'status-rejected', 
      completed: 'status-completed',
      analyzing: 'status-analyzing'
    };
    return colors[status] || 'status-default';
  };

  const getStatusIcon = (status) => {
    const icons = {
      approved: <CheckCircle className="icon-sm" />,
      rejected: <XCircle className="icon-sm" />,
      completed: <Activity className="icon-sm" />,
      analyzing: <Clock className="icon-sm" />
    };
    return icons[status];
  };

  const getStatusText = (status) => {
    const texts = {
      approved: 'Aprovado',
      rejected: 'Reprovado', 
      completed: 'Concluído',
      analyzing: 'Analisando'
    };
    return texts[status] || 'Desconhecido';
  };

  const getCredibilityLevel = (score) => {
    if (score >= 80) return { level: 'Alta', class: 'credibility-high' };
    if (score >= 50) return { level: 'Média', class: 'credibility-medium' };
    return { level: 'Baixa', class: 'credibility-low' };
  };

  return (
    <div className="app">
      {!selectedTest ? (
        <div className="dashboard">
          {/* Hero Section */}
          <div className="hero-section">
            <h1 className="hero-title">SensorialAI</h1>
            <p className="hero-subtitle">Análise Inteligente de Testes Sensoriais</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card card-hover">
              <div className="stat-icon bg-primary">
                <Users className="icon-md" />
              </div>
              <div className="stat-content">
                <div className="stat-number">{mockData.stats.total}</div>
                <div className="stat-label">Total Avaliadores</div>
              </div>
            </div>

            <div className="stat-card card-hover">
              <div className="stat-icon bg-success">
                <TrendingUp className="icon-md" />
              </div>
              <div className="stat-content">
                <div className="stat-number">{mockData.stats.highCredibility}</div>
                <div className="stat-label">Alta Credibilidade</div>
              </div>
            </div>

            <div className="stat-card card-hover">
              <div className="stat-icon bg-warning">
                <BarChart3 className="icon-md" />
              </div>
              <div className="stat-content">
                <div className="stat-number">{mockData.stats.mediumCredibility}</div>
                <div className="stat-label">Média Credibilidade</div>
              </div>
            </div>

            <div className="stat-card card-hover">
              <div className="stat-icon bg-danger">
                <Activity className="icon-md" />
              </div>
              <div className="stat-content">
                <div className="stat-number">{mockData.stats.testsCompleted}</div>
                <div className="stat-label">Testes Realizados</div>
              </div>
            </div>
          </div>

          {/* Tests Table */}
          <div className="tests-table-container">
            <h2 className="section-title">Testes Recentes</h2>
            <div className="table-wrapper">
              <table className="tests-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Fornecedor</th>
                    <th>Insumo</th>
                    <th>Produto</th>
                    <th>Avaliadores</th>
                    <th>Precisão</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.tests.map((test) => (
                    <tr key={test.id} className="table-row">
                      <td>{new Date(test.date).toLocaleDateString('pt-BR')}</td>
                      <td>{test.supplier}</td>
                      <td>{test.input}</td>
                      <td>{test.product}</td>
                      <td>{test.evaluators}</td>
                      <td className="accuracy-cell">{test.accuracy}%</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(test.status)}`}>
                          {getStatusIcon(test.status)}
                          {getStatusText(test.status)}
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={() => setSelectedTest(test)}
                          className="btn-analyze"
                        >
                          <Eye className="icon-sm" />
                          Analisar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        // Modal de Análise será implementado na próxima etapa
        <div className="analysis-modal">
          <div className="modal-content">
            <h2>Análise do Teste {selectedTest.id}</h2>
            <p>Modal de análise detalhada será implementado na próxima etapa</p>
            <button 
              onClick={() => setSelectedTest(null)}
              className="btn-back"
            >
              Voltar ao Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;