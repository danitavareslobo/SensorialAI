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
  Users,
  ArrowLeft,
  Sparkles,
  Brain,
  MessageSquare,
  TrendingDown,
  AlertTriangle,
  ThumbsUp,
  PieChart,
  BarChart,
  Radar
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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [progress, setProgress] = useState(0);

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

  const getSentimentColor = (sentiment) => {
    const colors = {
      positive: 'sentiment-positive',
      negative: 'sentiment-negative',
      neutral: 'sentiment-neutral'
    };
    return colors[sentiment] || 'sentiment-neutral';
  };

  const getSentimentIcon = (sentiment) => {
    const icons = {
      positive: <ThumbsUp className="icon-sm" />,
      negative: <TrendingDown className="icon-sm" />,
      neutral: <MessageSquare className="icon-sm" />
    };
    return icons[sentiment];
  };

  const simulateAIAnalysis = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simular progresso
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 800);

    // Simular tempo de análise
    setTimeout(() => {
      setAnalysisResults({
        summary: "Análise triangular detectou diferenças significativas na cor da massa. 83% dos avaliadores identificaram corretamente a amostra diferente.",
        insights: [
          {
            category: "Positivo",
            attribute: "Identificação",
            description: "Maioria dos avaliadores conseguiu identificar a diferença",
            frequency: 15,
            sentiment: 0.7,
            class: "insight-positive"
          },
          {
            category: "Neutro", 
            attribute: "Cor",
            description: "Diferenças sutis na coloração da massa foram detectadas",
            frequency: 12,
            sentiment: 0.0,
            class: "insight-neutral"
          },
          {
            category: "Negativo",
            attribute: "Percepção",
            description: "Alguns avaliadores relataram dificuldade na identificação",
            frequency: 3,
            sentiment: -0.3,
            class: "insight-negative"
          }
        ],
        recommendation: {
          decision: "Aprovado",
          confidence: 85,
          icon: <CheckCircle className="icon-lg" />,
          class: "recommendation-approved",
          reasoning: "Apesar das diferenças detectadas, elas são sutis e não comprometem a qualidade do produto."
        },
        feedback: [
          "Manter padrão de cor atual do corante",
          "Considerar treinamento adicional para avaliadores com baixa precisão",
          "Monitorar consistência em próximos lotes"
        ]
      });
      setIsAnalyzing(false);
      setProgress(0);
    }, 4000);
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
        <div className="analysis-view">
          {/* Header */}
          <div className="analysis-header">
            <button 
              onClick={() => {
                setSelectedTest(null);
                setAnalysisResults(null);
                setIsAnalyzing(false);
              }}
              className="btn-back-header"
            >
              <ArrowLeft className="icon-sm" />
              Voltar ao Dashboard
            </button>
            <h1 className="analysis-title">Análise Detalhada - {selectedTest.id}</h1>
          </div>

          <div className="analysis-content">
            {/* Seção 1: Informações do Teste */}
            <div className="test-info-section">
              <div className="section-card">
                <h2 className="section-heading">Informações do Teste</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <Building className="icon-sm" />
                    <div>
                      <span className="info-label">Fornecedor</span>
                      <span className="info-value">{selectedTest.supplier}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Package className="icon-sm" />
                    <div>
                      <span className="info-label">Insumo</span>
                      <span className="info-value">{selectedTest.input}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Calendar className="icon-sm" />
                    <div>
                      <span className="info-label">Data</span>
                      <span className="info-value">{new Date(selectedTest.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Activity className="icon-sm" />
                    <div>
                      <span className="info-label">Tipo de Teste</span>
                      <span className="info-value">{selectedTest.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção 2: Comentários dos Avaliadores */}
            <div className="comments-section">
              <div className="section-card">
                <h2 className="section-heading">
                  <MessageSquare className="icon-md" />
                  Comentários dos Avaliadores ({selectedTest.responses?.length || 0})
                </h2>
                <div className="comments-grid">
                  {selectedTest.responses?.map((response, index) => (
                    <div key={index} className="comment-card">
                      <div className="comment-header">
                        <div className="evaluator-info">
                          <User className="icon-sm" />
                          <span className="evaluator-name">{response.name}</span>
                        </div>
                        <div className="comment-badges">
                          <span className={`identification-badge ${response.identified ? 'identified-yes' : 'identified-no'}`}>
                            {response.identified ? <CheckCircle className="icon-xs" /> : <XCircle className="icon-xs" />}
                            {response.identified ? 'Identificou' : 'Não Identificou'}
                          </span>
                          <span className={`credibility-badge ${getCredibilityLevel(response.credibilityScore).class}`}>
                            {getCredibilityLevel(response.credibilityScore).level}
                          </span>
                          <span className={`sentiment-badge ${getSentimentColor(response.sentiment)}`}>
                            {getSentimentIcon(response.sentiment)}
                            {response.sentiment === 'positive' ? 'Positivo' : response.sentiment === 'negative' ? 'Negativo' : 'Neutro'}
                          </span>
                        </div>
                      </div>
                      <div className="comment-text">"{response.comment}"</div>
                      <div className="credibility-score">
                        Score: {response.credibilityScore}/100
                        <div className="score-bar">
                          <div 
                            className={`score-fill ${getCredibilityLevel(response.credibilityScore).class}`}
                            style={{ width: `${response.credibilityScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Seção 3: Botão de Análise */}
            {!isAnalyzing && !analysisResults && (
              <div className="ai-analysis-section">
                <div className="section-card text-center">
                  <button 
                    onClick={simulateAIAnalysis}
                    className="btn-ai-analyze"
                  >
                    <Brain className="icon-md" />
                    🔮 Analisar com IA
                    <Sparkles className="icon-sm sparkle-icon" />
                  </button>
                  <p className="ai-description">
                    Nossa IA irá analisar {selectedTest.responses?.length || 0} comentários e gerar insights automáticos
                  </p>
                </div>
              </div>
            )}

            {/* Seção 4: Loading State */}
            {isAnalyzing && (
              <div className="loading-section">
                <div className="section-card text-center">
                  <div className="loading-spinner"></div>
                  <h3 className="loading-title">Analisando {selectedTest.responses?.length || 0} comentários...</h3>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{progress}%</span>
                  </div>
                  <p className="loading-subtitle">IA processando padrões e sentimentos...</p>
                </div>
              </div>
            )}

            {/* Seção 5: Resultados da Análise */}
            {analysisResults && (
              <div className="results-section animate-fade-in">
                {/* Resumo Executivo */}
                <div className="section-card">
                  <h2 className="section-heading">
                    <BarChart3 className="icon-md" />
                    Resumo Executivo
                  </h2>
                  <div className="executive-summary">
                    {analysisResults.summary}
                  </div>
                </div>

                {/* Insights Identificados */}
                <div className="section-card">
                  <h2 className="section-heading">
                    <Sparkles className="icon-md" />
                    Insights Identificados
                  </h2>
                  <div className="insights-grid">
                    {analysisResults.insights.map((insight, index) => (
                      <div key={index} className={`insight-card ${insight.class}`}>
                        <div className="insight-header">
                          <span className="insight-category">{insight.category}</span>
                          <span className="insight-frequency">{insight.frequency} menções</span>
                        </div>
                        <div className="insight-attribute">{insight.attribute}</div>
                        <div className="insight-description">{insight.description}</div>
                        <div className="sentiment-bar-container">
                          <span className="sentiment-label">Sentimento:</span>
                          <div className="sentiment-bar">
                            <div 
                              className="sentiment-fill"
                              style={{ 
                                width: `${Math.abs(insight.sentiment) * 100}%`,
                                backgroundColor: insight.sentiment > 0 ? '#4caf50' : insight.sentiment < 0 ? '#f44336' : '#6b7280'
                              }}
                            ></div>
                          </div>
                          <span className="sentiment-value">{insight.sentiment > 0 ? '+' : ''}{insight.sentiment}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recomendação Final */}
                <div className="section-card">
                  <h2 className="section-heading">
                    <AlertTriangle className="icon-md" />
                    Recomendação Final
                  </h2>
                  <div className={`recommendation-card ${analysisResults.recommendation.class}`}>
                    <div className="recommendation-icon">
                      {analysisResults.recommendation.icon}
                    </div>
                    <div className="recommendation-content">
                      <div className="recommendation-decision">
                        {analysisResults.recommendation.decision}
                      </div>
                      <div className="recommendation-confidence">
                        Confiança: {analysisResults.recommendation.confidence}%
                      </div>
                      <div className="recommendation-reasoning">
                        {analysisResults.recommendation.reasoning}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feedback para Fornecedor */}
                <div className="section-card">
                  <h2 className="section-heading">
                    <MessageSquare className="icon-md" />
                    Feedback para Fornecedor
                  </h2>
                  <div className="feedback-list">
                    {analysisResults.feedback.map((item, index) => (
                      <div key={index} className="feedback-item">
                        <CheckCircle className="icon-sm feedback-icon" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;