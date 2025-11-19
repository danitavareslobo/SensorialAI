import React, { useState, useEffect } from 'react';
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
import larLogo from './assets/lar-logo.svg';

// Dados mockados baseados na estrutura MyLims e análise de comentários para insights
const mockData = {
  stats: {
    total: 75, // Total de avaliadores em todos os testes
    highCredibility: 18, // Avaliadores com alta credibilidade (≥80)
    mediumCredibility: 25, // Avaliadores com credibilidade média (50-79)
    lowCredibility: 12, // Avaliadores com baixa credibilidade (<50)
    testsCompleted: 4 // Total de testes realizados
  },
  tests: [
    {
      id: "TEST001",
      date: "2025-10-23",
      supplier: "Nutrimental",
      input: "Corante Natural",
      product: "Linguiça de Frango",
      status: "approved", // Decisão estatística já definida
      type: "Triangular",
      evaluators: 12,
      correctIdentifications: 7,
      accuracy: 58.3,
      statisticalDecision: "Aprovado (p < 0.05)", // Resultado do método padrão estatístico
      responses: [
        { 
          name: "Laís Soares", 
          comment: "não evidenciado diferença significativa",
          identified: false,
          credibilityScore: 15, // Calculado: 0 + 15 (vague)
          sentiment: "neutral"
        },
        { 
          name: "Heloisa", 
          comment: "Diferença praticamente imperceptível",
          identified: true,
          credibilityScore: 65, // Calculado: 50 + 15 (vague - imperceptível)
          sentiment: "neutral"
        },
        { 
          name: "Silene", 
          comment: "Amostra apresenta cor mais dourada",
          identified: true,
          credibilityScore: 100, // Calculado: 50 + 50 (specific - dourada)
          sentiment: "positive"
        },
        { 
          name: "Jamerson", 
          comment: "Aparentemente está mais 'cru'",
          identified: true,
          credibilityScore: 100, // Calculado: 50 + 50 (specific - cru)
          sentiment: "negative"
        },
        { 
          name: "Italo", 
          comment: "Ligeiramente mais rosada",
          identified: true,
          credibilityScore: 100, // Calculado: 50 + 50 (specific - rosada)
          sentiment: "neutral"
        },
        { 
          name: "Mariana", 
          comment: "Bem sutil, mas é mais escura",
          identified: true,
          credibilityScore: 100, // Calculado: 50 + 50 (specific - escura)
          sentiment: "neutral"
        },
        { 
          name: "Amanda", 
          comment: "As amostras pareciam muito semelhante",
          identified: false,
          credibilityScore: 30, // Calculado: 0 + 30 (general - semelhante)
          sentiment: "neutral"
        },
        { 
          name: "Carlos Anderson", 
          comment: "As amostras 829, 130 e 223 diferem das demais",
          identified: true,
          credibilityScore: 80, // Calculado: 50 + 30 (general - diferem)
          sentiment: "positive"
        },
        { 
          name: "Renata", 
          comment: "Nas amostras diferentes a cor estava um pouco mais escura que as demais",
          identified: true,
          credibilityScore: 100, // Calculado: 50 + 50 (specific - escura)
          sentiment: "neutral"
        },
        { 
          name: "Maiara", 
          comment: "Não notei diferença na cor da massa",
          identified: false,
          credibilityScore: 15, // Calculado: 0 + 15 (vague - não notei)
          sentiment: "negative"
        },
        { 
          name: "Carlos Felipe", 
          comment: "Muito parecidas, não percebi diferenciação. Achei a 829, 130 e 223 levemente mais claros",
          identified: false,
          credibilityScore: 30, // Calculado: 0 + 30 (general - parecidas, levemente, claros)
          sentiment: "neutral"
        },
        { 
          name: "Clemerson Elis", 
          comment: "As amostras circuladas apresentam tom mais claro",
          identified: true,
          credibilityScore: 100, // Calculado: 50 + 50 (specific - tom, claro)
          sentiment: "neutral"
        }
      ]
    },
    {
      id: "TEST002", 
      date: "2025-11-10",
      supplier: "FornecedorA", 
      input: "Açúcar Orgânico",
      product: "Cookies Integrais", 
      status: "approved", // Decisão estatística já definida
      type: "Aceitação",
      evaluators: 25,
      averageScore: 7.8,
      statisticalDecision: "Aprovado (média > 6.0)",
      responses: [
        { 
          name: "Ana Silva", 
          comment: "Sabor doce equilibrado, textura crocante perfeita",
          score: 8.5,
          credibilityScore: 88,
          sentiment: "positive"
        },
        { 
          name: "João Santos", 
          comment: "Gosto muito da crocância, açúcar não fica enjoativo",
          score: 8.0,
          credibilityScore: 82,
          sentiment: "positive"
        },
        { 
          name: "Maria Costa", 
          comment: "Textura boa mas achei meio sem graça no sabor",
          score: 6.5,
          credibilityScore: 75,
          sentiment: "neutral"
        },
        { 
          name: "Pedro Lima", 
          comment: "Muito saboroso, compraria novamente",
          score: 9.0,
          credibilityScore: 90,
          sentiment: "positive"
        },
        { 
          name: "Carla Mendes", 
          comment: "Açúcar orgânico dá um gosto diferente, mais natural",
          score: 7.5,
          credibilityScore: 85,
          sentiment: "positive"
        },
        { 
          name: "Rafael Silva", 
          comment: "Não gostei, ficou muito doce pra mim",
          score: 4.0,
          credibilityScore: 70,
          sentiment: "negative"
        }
      ]
    },
    {
      id: "TEST003",
      date: "2025-11-08", 
      supplier: "FornecedorC",
      input: "Tempero Especial", 
      product: "Batata Frita Temperada",
      status: "rejected", // Decisão estatística já definida
      type: "Preferência",
      evaluators: 30,
      preferredSample: "Amostra B (Padrão)",
      statisticalDecision: "Reprovado (preferência < 50%)",
      responses: [
        { 
          name: "Lucas Oliveira", 
          comment: "Tempero muito forte, deixa a batata salgada demais",
          preferredSample: "B",
          credibilityScore: 88,
          sentiment: "negative"
        },
        { 
          name: "Fernanda Rocha", 
          comment: "Sabor interessante mas não combina com batata",
          preferredSample: "B",
          credibilityScore: 85,
          sentiment: "neutral"
        },
        { 
          name: "Bruno Alves", 
          comment: "Muito tempero, mascarou o sabor da batata",
          preferredSample: "B",
          credibilityScore: 92,
          sentiment: "negative"
        },
        { 
          name: "Mariana Santos", 
          comment: "Gostei do tempero, mais saboroso que o normal",
          preferredSample: "A",
          credibilityScore: 80,
          sentiment: "positive"
        },
        { 
          name: "Gabriel Costa", 
          comment: "Tempero diferente, mas prefiro o tradicional",
          preferredSample: "B",
          credibilityScore: 78,
          sentiment: "neutral"
        },
        { 
          name: "Juliana Lima", 
          comment: "Muito artificial, não tem gosto natural",
          preferredSample: "B",
          credibilityScore: 86,
          sentiment: "negative"
        }
      ]
    },
    {
      id: "TEST004",
      date: "2025-11-05", 
      supplier: "FornecedorD",
      input: "Farinha Especial", 
      product: "Pão de Forma",
      status: "approved",
      type: "Aceitação",
      evaluators: 20,
      averageScore: 8.2,
      statisticalDecision: "Aprovado (média > 6.0)",
      responses: [
        { 
          name: "Roberto Silva", 
          comment: "Textura macia, sabor suave e agradável",
          score: 8.5,
          credibilityScore: 85,
          sentiment: "positive"
        },
        { 
          name: "Patricia Costa", 
          comment: "Pão bem fofinho, fica bom pro café da manhã",
          score: 8.0,
          credibilityScore: 82,
          sentiment: "positive"
        },
        { 
          name: "Carlos Mendes", 
          comment: "Gosto normal, nada demais mas não é ruim",
          score: 7.0,
          credibilityScore: 70,
          sentiment: "neutral"
        }
      ]
    }
  ]
};

function App() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [progress, setProgress] = useState(0);
  const [sentimentCorrections, setSentimentCorrections] = useState(() => {
    // Carregar correções salvas do localStorage
    const saved = localStorage.getItem('sensorialAI_corrections');
    return saved ? JSON.parse(saved) : {};
  });
  const [showCorrectionFeedback, setShowCorrectionFeedback] = useState(null);
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Salvar correções no localStorage sempre que houver mudanças
  React.useEffect(() => {
    localStorage.setItem('sensorialAI_corrections', JSON.stringify(sentimentCorrections));
  }, [sentimentCorrections]);

  // Carregar dados do CSV
  useEffect(() => {
    const loadTestData = async () => {
      try {
        const response = await fetch('/dados_triangular.csv');
        const csvText = await response.text();
        const parsedData = parseCSVData(csvText);
        setTestData(parsedData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        // Fallback para dados mock se CSV não estiver disponível
        setTestData(mockData);
      } finally {
        setLoading(false);
      }
    };

    loadTestData();
  }, []);

  // Função para processar dados do CSV
  const parseCSVData = (csvText) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    const rawData = [];
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = parseCSVLine(lines[i]);
        const obj = {};
        headers.forEach((header, index) => {
          obj[header.trim()] = values[index];
        });
        rawData.push(obj);
      }
    }

    return transformToTestFormat(rawData);
  };

  // Função auxiliar para parsear linhas CSV considerando vírgulas em strings
  const parseCSVLine = (line) => {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    return values;
  };

  // Transformar dados CSV no formato esperado pelo Dashboard
  const transformToTestFormat = (rawData) => {
    const testsMap = new Map();
    let stats = {
      total: 0,
      highCredibility: 0,
      mediumCredibility: 0,
      lowCredibility: 0,
      testsCompleted: 0
    };

    rawData.forEach(row => {
      const testId = row.ID_Teste;
      
      if (!testsMap.has(testId)) {
        testsMap.set(testId, {
          id: `TEST${testId.toString().padStart(3, '0')}`,
          date: new Date().toISOString().split('T')[0], // Data atual, pode ser ajustada
          input: row.Insumo_Alterado || "Não especificado",
          product: row.Produto || "Produto do teste",
          status: "completed",
          type: "Triangular",
          evaluators: 0,
          correctIdentifications: 0,
          accuracy: 0,
          statisticalDecision: "Conforme análise dos dados",
          responses: []
        });
      }

      const test = testsMap.get(testId);
      const identified = parseInt(row.Resultado) === 1;
      const comment = row['Comentário_Provador'] || row.Comentário_Provador || "Sem comentário";
      
      // Calcular score de credibilidade baseado no comentário
      const credibilityScore = calculateCredibilityScore(identified, comment);
      
      // Análise de sentimento do comentário
      const sentiment = improvedSentimentAnalysis(comment);

      const response = {
        name: `Avaliador ${row.ID_Provador}`,
        comment: comment,
        identified: identified,
        credibilityScore: credibilityScore,
        sentiment: sentiment
      };

      test.responses.push(response);
      test.evaluators++;
      
      if (identified) {
        test.correctIdentifications++;
      }

      // Atualizar estatísticas globais
      stats.total++;
      if (credibilityScore >= 80) {
        stats.highCredibility++;
      } else if (credibilityScore >= 50) {
        stats.mediumCredibility++;
      } else {
        stats.lowCredibility++;
      }
    });

    // Calcular accuracy para cada teste
    testsMap.forEach(test => {
      test.accuracy = test.evaluators > 0 ? (test.correctIdentifications / test.evaluators) * 100 : 0;
      // Determinar status baseado na accuracy
      test.status = test.accuracy >= 50 ? "approved" : "rejected";
      test.statisticalDecision = test.accuracy >= 50 
        ? `Aprovado (${test.accuracy.toFixed(1)}% de acertos)` 
        : `Reprovado (${test.accuracy.toFixed(1)}% de acertos)`;
    });

    stats.testsCompleted = testsMap.size;

    return {
      stats,
      tests: Array.from(testsMap.values())
    };
  };

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

  const analyzeCommentQuality = (comment) => {
    const lowercaseComment = comment.toLowerCase();
    
    // Palavras que indicam comentário específico e técnico
    const specificWords = ['dourada', 'rosada', 'escura', 'clara', 'cru', 'tonalidade', 'coloração', 'intensa', 'evidente', 'óbvia'];
    const generalWords = ['sutil', 'diferença', 'parecidas', 'semelhante', 'levemente', 'mais', 'menos'];
    const vaguenWords = ['não notei', 'não percebi', 'muito parecidas', 'imperceptível', 'não evidenciado'];
    
    // Contar palavras específicas
    const specificCount = specificWords.filter(word => lowercaseComment.includes(word)).length;
    const generalCount = generalWords.filter(word => lowercaseComment.includes(word)).length;
    const vagueCount = vaguenWords.filter(word => lowercaseComment.includes(word)).length;
    
    if (specificCount >= 2 || lowercaseComment.includes('óbvia') || lowercaseComment.includes('evidente')) {
      return 'specific';
    } else if (specificCount >= 1 || generalCount >= 2) {
      return 'general';
    } else if (vagueCount >= 1 || lowercaseComment.includes('não')) {
      return 'vague';
    } else {
      return 'basic';
    }
  };

  const calculateCredibilityScore = (identified, comment) => {
    // Base: 50 pontos por identificação correta, 0 por incorreta
    let baseScore = identified ? 50 : 0;
    
    // Analisar qualidade do comentário automaticamente
    const commentQuality = analyzeCommentQuality(comment);
    
    // Adicionar pontos pela qualidade do comentário (0-50 pontos)
    let commentScore = 0;
    if (commentQuality === 'specific') {
      commentScore = 50; // Comentário específico e técnico
    } else if (commentQuality === 'general') {
      commentScore = 30; // Comentário geral mas relevante
    } else if (commentQuality === 'vague') {
      commentScore = 15; // Comentário vago
    } else {
      commentScore = 5; // Comentário muito básico
    }
    
    return Math.min(100, baseScore + commentScore);
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

  const correctSentiment = (testId, responseIndex, newSentiment, originalComment) => {
    const correctionKey = `${testId}-${responseIndex}`;
    
    // Salvar a correção para aprendizado futuro
    setSentimentCorrections(prev => ({
      ...prev,
      [correctionKey]: {
        originalSentiment: selectedTest.responses[responseIndex].sentiment,
        correctedSentiment: newSentiment,
        comment: originalComment,
        timestamp: new Date().toISOString(),
        testId: testId,
        responseIndex: responseIndex
      }
    }));

    // Atualizar o teste selecionado com a correção
    setSelectedTest(prev => ({
      ...prev,
      responses: prev.responses.map((response, index) => 
        index === responseIndex 
          ? { ...response, sentiment: newSentiment, correctedByUser: true }
          : response
      )
    }));

    // Mostrar feedback de sucesso
    setShowCorrectionFeedback(`Classificação alterada para ${newSentiment === 'positive' ? 'Positivo' : newSentiment === 'negative' ? 'Negativo' : 'Neutro'}!`);
    setTimeout(() => setShowCorrectionFeedback(null), 3000);
  };

  const getCurrentSentiment = (testId, responseIndex, originalSentiment) => {
    const correctionKey = `${testId}-${responseIndex}`;
    return sentimentCorrections[correctionKey]?.correctedSentiment || originalSentiment;
  };

  const learnFromCorrections = (comment) => {
    // Buscar padrões nas correções para melhorar classificações futuras
    const corrections = Object.values(sentimentCorrections);
    const similarCorrections = corrections.filter(correction => {
      const similarity = calculateSimilarity(comment.toLowerCase(), correction.comment.toLowerCase());
      return similarity > 0.3; // 30% de similaridade
    });

    if (similarCorrections.length > 0) {
      // Retornar o sentimento mais frequente nas correções similares
      const sentimentCounts = { positive: 0, negative: 0, neutral: 0 };
      similarCorrections.forEach(correction => {
        sentimentCounts[correction.correctedSentiment]++;
      });
      
      const mostFrequentSentiment = Object.keys(sentimentCounts).reduce((a, b) => 
        sentimentCounts[a] > sentimentCounts[b] ? a : b
      );
      
      return mostFrequentSentiment;
    }
    
    return null; // Nenhum aprendizado disponível
  };

  const calculateSimilarity = (str1, str2) => {
    // Algoritmo simples de similaridade baseado em palavras comuns
    const words1 = str1.split(/\s+/);
    const words2 = str2.split(/\s+/);
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  };

  const improvedSentimentAnalysis = (comment) => {
    // Primeiro, tentar aprender das correções anteriores
    const learnedSentiment = learnFromCorrections(comment);
    if (learnedSentiment) {
      return learnedSentiment;
    }

    // Se não há aprendizado, usar classificação original
    const lowercaseComment = comment.toLowerCase();
    
    // Palavras positivas expandidas com base no aprendizado
    const positiveWords = ['saboroso', 'gostei', 'ótimo', 'bom', 'agradável', 'perfeita', 'equilibrado', 'natural', 'compraria', 'fácil', 'óbvia', 'evidente', 'bem definida'];
    const negativeWords = ['não gostei', 'ruim', 'artificial', 'forte demais', 'enjoativo', 'mascarou', 'cru', 'não consegui', 'não notei'];
    
    const positiveCount = positiveWords.filter(word => lowercaseComment.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowercaseComment.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  };

  const classifyApprovalReasons = (responses, testType, testStatus) => {
    // Classificar motivos específicos de aprovação/reprovação
    const reasons = {
      approval: {
        sensory: [],
        technical: [],
        preference: []
      },
      rejection: {
        sensory: [],
        technical: [], 
        preference: []
      }
    };

    const approvalKeywords = {
      sensory: ['saboroso', 'crocante', 'macio', 'agradável', 'equilibrado', 'natural', 'fofinho'],
      technical: ['identificação', 'correto', 'perceptível', 'evidente', 'óbvia', 'clara'],
      preference: ['gostei', 'prefiro', 'melhor', 'compraria', 'recomendo']
    };

    const rejectionKeywords = {
      sensory: ['sem graça', 'artificial', 'forte demais', 'salgado demais', 'doce demais', 'mascarou', 'enjoativo'],
      technical: ['imperceptível', 'não consegui', 'não evidenciado', 'não notei', 'difícil'],
      preference: ['não gostei', 'prefiro o tradicional', 'não combina', 'não compraria']
    };

    responses.forEach(response => {
      const comment = response.comment.toLowerCase();
      
      // Classificar motivos de aprovação
      Object.keys(approvalKeywords).forEach(category => {
        approvalKeywords[category].forEach(keyword => {
          if (comment.includes(keyword)) {
            if (!reasons.approval[category].includes(keyword)) {
              reasons.approval[category].push(keyword);
            }
          }
        });
      });

      // Classificar motivos de rejeição
      Object.keys(rejectionKeywords).forEach(category => {
        rejectionKeywords[category].forEach(keyword => {
          if (comment.includes(keyword)) {
            if (!reasons.rejection[category].includes(keyword)) {
              reasons.rejection[category].push(keyword);
            }
          }
        });
      });
    });

    return reasons;
  };

  const analyzeComments = (responses, testType, testStatus) => {
    // Análise de sentimentos e temas dos comentários
    const sentimentCounts = { positive: 0, negative: 0, neutral: 0 };
    const themes = {};
    const keywords = {
      texture: ['textura', 'crocante', 'macio', 'fofinho', 'consistência'],
      flavor: ['sabor', 'gosto', 'doce', 'salgado', 'tempero', 'artificial'],
      color: ['cor', 'coloração', 'dourada', 'escura', 'rosada', 'tonalidade', 'intensa'],
      preference: ['prefiro', 'gostei', 'não gostei', 'melhor', 'pior', 'tradicional'],
      quality: ['qualidade', 'natural', 'bom', 'ruim', 'tradicional', 'óbvia', 'perceptível'],
      difficulty: ['imperceptível', 'difícil', 'sutil', 'evidente', 'fácil', 'óbvio']
    };

    // Contar sentimentos e identificar temas
    responses.forEach(response => {
      sentimentCounts[response.sentiment]++;
      
      // Análise temática
      Object.keys(keywords).forEach(theme => {
        keywords[theme].forEach(keyword => {
          if (response.comment.toLowerCase().includes(keyword)) {
            if (!themes[theme]) themes[theme] = 0;
            themes[theme]++;
          }
        });
      });
    });

    // Classificar motivos específicos
    const reasonsClassification = classifyApprovalReasons(responses, testType, testStatus);
    
    // Gerar insights baseados no tipo de teste e comentários
    const insights = [];
    
    // Adicionar insights sobre classificação de motivos
    if (testStatus === 'approved') {
      if (reasonsClassification.approval.sensory.length > 0) {
        insights.push({
          category: "Aprovação",
          attribute: "Atributos Sensoriais",
          description: `Motivos sensoriais: ${reasonsClassification.approval.sensory.join(', ')}`,
          frequency: reasonsClassification.approval.sensory.length,
          sentiment: 0.7,
          class: "insight-positive"
        });
      }
      if (reasonsClassification.approval.technical.length > 0) {
        insights.push({
          category: "Aprovação",
          attribute: "Aspectos Técnicos", 
          description: `Indicadores técnicos: ${reasonsClassification.approval.technical.join(', ')}`,
          frequency: reasonsClassification.approval.technical.length,
          sentiment: 0.6,
          class: "insight-positive"
        });
      }
    } else {
      if (reasonsClassification.rejection.sensory.length > 0) {
        insights.push({
          category: "Reprovação",
          attribute: "Problemas Sensoriais",
          description: `Motivos sensoriais: ${reasonsClassification.rejection.sensory.join(', ')}`,
          frequency: reasonsClassification.rejection.sensory.length,
          sentiment: -0.7,
          class: "insight-negative"
        });
      }
      if (reasonsClassification.rejection.technical.length > 0) {
        insights.push({
          category: "Reprovação",
          attribute: "Problemas Técnicos",
          description: `Dificuldades técnicas: ${reasonsClassification.rejection.technical.join(', ')}`,
          frequency: reasonsClassification.rejection.technical.length,
          sentiment: -0.5,
          class: "insight-negative"
        });
      }
    }
    
    if (testType === 'Triangular') {
      // Análise para testes triangulares
      const correctIdentifications = responses.filter(r => r.identified).length;
      const totalEvaluators = responses.length;
      
      if (themes.color > 0) {
        insights.push({
          category: "Atributo Principal",
          attribute: "Cor",
          description: `${themes.color} avaliadores mencionaram diferenças de cor como principal indicador`,
          frequency: themes.color,
          sentiment: testStatus === 'approved' ? 0.5 : -0.3,
          class: testStatus === 'approved' ? "insight-neutral" : "insight-negative"
        });
      }
      
      if (correctIdentifications / totalEvaluators > 0.7) {
        insights.push({
          category: "Eficácia",
          attribute: "Identificação",
          description: `Alta taxa de identificação (${Math.round(correctIdentifications/totalEvaluators*100)}%) indica diferença perceptível`,
          frequency: correctIdentifications,
          sentiment: 0.8,
          class: "insight-positive"
        });
      }
    }
    
    if (testType === 'Aceitação') {
      // Análise para testes de aceitação
      if (sentimentCounts.positive > sentimentCounts.negative) {
        insights.push({
          category: "Aceitação",
          attribute: "Satisfação Geral",
          description: `${sentimentCounts.positive} comentários positivos vs ${sentimentCounts.negative} negativos`,
          frequency: sentimentCounts.positive,
          sentiment: 0.7,
          class: "insight-positive"
        });
      }
      
      if (themes.flavor > 0) {
        const flavorSentiment = testStatus === 'approved' ? 0.6 : -0.4;
        insights.push({
          category: "Atributo",
          attribute: "Sabor",
          description: `${themes.flavor} avaliadores comentaram especificamente sobre sabor`,
          frequency: themes.flavor,
          sentiment: flavorSentiment,
          class: testStatus === 'approved' ? "insight-positive" : "insight-negative"
        });
      }
      
      if (themes.texture > 0) {
        insights.push({
          category: "Atributo",
          attribute: "Textura",
          description: `${themes.texture} menções sobre textura do produto`,
          frequency: themes.texture,
          sentiment: testStatus === 'approved' ? 0.5 : -0.2,
          class: testStatus === 'approved' ? "insight-positive" : "insight-neutral"
        });
      }
    }
    
    if (testType === 'Preferência') {
      // Análise para testes de preferência
      const negativeReasons = responses.filter(r => r.sentiment === 'negative').length;
      
      if (themes.flavor > themes.texture) {
        insights.push({
          category: "Motivo Principal",
          attribute: "Sabor",
          description: `Sabor foi o principal motivo de rejeição mencionado`,
          frequency: themes.flavor,
          sentiment: -0.7,
          class: "insight-negative"
        });
      }
      
      if (negativeReasons > responses.length / 2) {
        insights.push({
          category: "Rejeição",
          attribute: "Preferência",
          description: `Maioria dos comentários (${negativeReasons}) expressa preferência pelo padrão`,
          frequency: negativeReasons,
          sentiment: -0.6,
          class: "insight-negative"
        });
      }
    }
    
    // Insights sobre credibilidade dos avaliadores
    const highCredibilityCount = responses.filter(r => r.credibilityScore >= 80).length;
    if (highCredibilityCount > responses.length * 0.6) {
      insights.push({
        category: "Confiabilidade",
        attribute: "Credibilidade",
        description: `${highCredibilityCount} avaliadores com alta credibilidade (>80%)`,
        frequency: highCredibilityCount,
        sentiment: 0.8,
        class: "insight-positive"
      });
    }
    
    return insights;
  };

  const generateAutomaticInsights = (responses, testType, testStatus, reasonsClassification) => {
    const automaticInsights = [];
    
    // Análise de padrões nos comentários
    const totalComments = responses.length;
    const positiveComments = responses.filter(r => r.sentiment === 'positive').length;
    const negativeComments = responses.filter(r => r.sentiment === 'negative').length;
    const highCredibilityComments = responses.filter(r => r.credibilityScore >= 80).length;
    
    // Insight 1: Padrão de credibilidade
    if (highCredibilityComments / totalComments > 0.7) {
      automaticInsights.push({
        type: "Confiabilidade",
        title: "Alta Confiabilidade dos Avaliadores",
        description: `${Math.round(highCredibilityComments/totalComments*100)}% dos avaliadores possuem alta credibilidade (>80%), aumentando a confiança nos resultados.`,
        impact: "Alta",
        actionable: "Manter programa de treinamento atual"
      });
    }
    
    // Insight 2: Consenso dos avaliadores
    const consensusRate = testType === 'Triangular' 
      ? responses.filter(r => r.identified).length / totalComments
      : positiveComments / totalComments;
    
    if (consensusRate > 0.8) {
      automaticInsights.push({
        type: "Consenso",
        title: "Alto Consenso Entre Avaliadores",
        description: `${Math.round(consensusRate*100)}% dos avaliadores concordaram, indicando resultado consistente.`,
        impact: "Alta",
        actionable: "Resultado altamente confiável para tomada de decisão"
      });
    } else if (consensusRate < 0.5) {
      automaticInsights.push({
        type: "Divergência",
        title: "Divergência Entre Avaliadores",
        description: `Apenas ${Math.round(consensusRate*100)}% de consenso, pode indicar variabilidade no produto ou necessidade de treinamento.`,
        impact: "Média",
        actionable: "Revisar protocolo de teste e treinamento de avaliadores"
      });
    }
    
    // Insight 3: Análise de motivos específicos
    const totalApprovalReasons = Object.values(reasonsClassification.approval).flat().length;
    const totalRejectionReasons = Object.values(reasonsClassification.rejection).flat().length;
    
    if (totalApprovalReasons > totalRejectionReasons && testStatus === 'approved') {
      automaticInsights.push({
        type: "Validação",
        title: "Motivos de Aprovação Bem Definidos", 
        description: `Identificados ${totalApprovalReasons} motivos específicos de aprovação nos comentários, validando a decisão estatística.`,
        impact: "Alta",
        actionable: "Comunicar pontos fortes ao fornecedor"
      });
    }
    
    if (totalRejectionReasons > 2 && testStatus === 'rejected') {
      automaticInsights.push({
        type: "Oportunidade",
        title: "Múltiplos Pontos de Melhoria Identificados",
        description: `${totalRejectionReasons} aspectos específicos precisam ser melhorados conforme feedback dos avaliadores.`,
        impact: "Alta", 
        actionable: "Priorizar melhorias baseadas nos motivos mais frequentes"
      });
    }
    
    // Insight 4: Tendências por tipo de teste
    if (testType === 'Preferência' && negativeComments > positiveComments) {
      automaticInsights.push({
        type: "Preferência",
        title: "Resistência à Mudança",
        description: "Avaliadores demonstram preferência pelo produto padrão, indicando necessidade de ajustes na nova formulação.",
        impact: "Alta",
        actionable: "Reduzir intensidade das mudanças ou melhorar comunicação dos benefícios"
      });
    }
    
    return automaticInsights;
  };

  const generateFeedback = (testType, testStatus, insights) => {
    const feedback = [];
    
    if (testStatus === 'approved') {
      if (testType === 'Aceitação') {
        feedback.push("Produto atende aos critérios de aceitação do consumidor");
        feedback.push("Manter padrão atual de produção");
      } else if (testType === 'Triangular') {
        feedback.push("Diferenças detectadas são aceitáveis para o processo");
        feedback.push("Monitorar consistência em próximos lotes");
      }
    } else {
      if (testType === 'Preferência') {
        feedback.push("Reformular produto baseado nos comentários negativos");
        feedback.push("Focar na melhoria dos atributos mais criticados");
      }
      
      // Feedback específico baseado nos insights
      insights.forEach(insight => {
        if (insight.sentiment < -0.3) {
          if (insight.attribute === 'Sabor') {
            feedback.push("Reavaliar formulação para melhorar perfil de sabor");
          } else if (insight.attribute === 'Textura') {
            feedback.push("Ajustar processo para otimizar textura");
          } else if (insight.attribute === 'Cor') {
            feedback.push("Considerar ajustes na coloração do produto");
          }
        }
      });
    }
    
    // Feedback sobre avaliadores
    feedback.push("Continuar treinamento de avaliadores para manter alta credibilidade");
    
    return feedback;
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
      // Gerar insights baseados nos comentários reais
      const insights = analyzeComments(selectedTest.responses, selectedTest.type, selectedTest.status);
      const reasonsClassification = classifyApprovalReasons(selectedTest.responses, selectedTest.type, selectedTest.status);
      const automaticInsights = generateAutomaticInsights(selectedTest.responses, selectedTest.type, selectedTest.status, reasonsClassification);
      const feedback = generateFeedback(selectedTest.type, selectedTest.status, insights);
      
      // Gerar resumo baseado no tipo de teste
      let summary = "";
      if (selectedTest.type === 'Triangular') {
        const correctIds = selectedTest.responses.filter(r => r.identified).length;
        summary = `Análise triangular: ${correctIds}/${selectedTest.responses.length} avaliadores (${selectedTest.accuracy}%) identificaram corretamente a amostra diferente. ${selectedTest.statisticalDecision}.`;
      } else if (selectedTest.type === 'Aceitação') {
        summary = `Teste de aceitação com média de ${selectedTest.averageScore} pontos. ${selectedTest.statisticalDecision}. Análise de ${selectedTest.responses.length} comentários revela padrões de aceitação.`;
      } else if (selectedTest.type === 'Preferência') {
        const preferredA = selectedTest.responses.filter(r => r.preferredSample === 'A').length;
        const preferredB = selectedTest.responses.filter(r => r.preferredSample === 'B').length;
        summary = `Teste de preferência: ${preferredA} escolheram amostra A, ${preferredB} escolheram amostra B. ${selectedTest.statisticalDecision}.`;
      }
      
      setAnalysisResults({
        summary,
        insights,
        reasonsClassification,
        automaticInsights,
        recommendation: {
          decision: selectedTest.status === 'approved' ? 'Aprovado' : 'Reprovado',
          confidence: 85,
          icon: selectedTest.status === 'approved' ? <CheckCircle className="icon-lg" /> : <XCircle className="icon-lg" />,
          class: selectedTest.status === 'approved' ? "recommendation-approved" : "recommendation-rejected",
          reasoning: selectedTest.status === 'approved' 
            ? "Análise dos comentários confirma a decisão estatística de aprovação."
            : "Análise dos comentários explica os motivos da reprovação estatística."
        },
        feedback
      });
      setIsAnalyzing(false);
      setProgress(0);
    }, 4000);
  };

  // Mostrar loading enquanto dados carregam
  if (loading) {
    return (
      <div className="app">
        <div className="dashboard">
          <div className="hero-section">
            <div className="hero-header">
              <img src={larLogo} alt="LAR Logo" className="hero-logo" />
              <div className="hero-text">
                <h1 className="hero-title">SensorialAI</h1>
                <p className="hero-subtitle">Carregando dados...</p>
              </div>
            </div>
          </div>
          <div className="loading-container">
            <Clock className="icon-lg animate-spin" />
            <p>Carregando dados dos testes sensoriais...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {!selectedTest ? (
        <div className="dashboard">
          {/* Hero Section */}
          <div className="hero-section">
            <div className="hero-header">
              <img src={larLogo} alt="LAR Logo" className="hero-logo" />
              <div className="hero-text">
                <h1 className="hero-title">SensorialAI</h1>
                <p className="hero-subtitle">Análise Inteligente de Testes Sensoriais</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card card-hover">
              <div className="stat-icon bg-primary">
                <Users className="icon-md" />
              </div>
              <div className="stat-content">
                <div className="stat-number">{testData?.stats?.total || 0}</div>
                <div className="stat-label">Total Avaliadores</div>
              </div>
            </div>

            <div className="stat-card card-hover">
              <div className="stat-icon bg-success">
                <TrendingUp className="icon-md" />
              </div>
              <div className="stat-content">
                <div className="stat-number">{testData?.stats?.highCredibility || 0}</div>
                <div className="stat-label">Alta Credibilidade</div>
              </div>
            </div>

            <div className="stat-card card-hover">
              <div className="stat-icon bg-warning">
                <BarChart3 className="icon-md" />
              </div>
              <div className="stat-content">
                <div className="stat-number">{testData?.stats?.mediumCredibility || 0}</div>
                <div className="stat-label">Média Credibilidade</div>
              </div>
            </div>

            <div className="stat-card card-hover">
              <div className="stat-icon bg-danger">
                <Activity className="icon-md" />
              </div>
              <div className="stat-content">
                <div className="stat-number">{testData?.stats?.testsCompleted || 0}</div>
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
                    <th>Insumo</th>
                    <th>Produto</th>
                    <th>Avaliadores</th>
                    <th>Precisão</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {(testData?.tests || []).map((test) => (
                    <tr key={test.id} className="table-row">
                      <td>{new Date(test.date).toLocaleDateString('pt-BR')}</td>
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

          {/* Feedback de Correção */}
          {showCorrectionFeedback && (
            <div className="correction-feedback">
              <CheckCircle className="icon-sm" />
              {showCorrectionFeedback}
            </div>
          )}

          <div className="analysis-content">
            {/* Seção 1: Informações do Teste */}
            <div className="test-info-section">
              <div className="section-card">
                <h2 className="section-heading">Informações do Teste</h2>
                <div className="info-grid">
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
                          {/* Linha única: Identificação, Credibilidade e Sentimento */}
                          <div className="badges-row">
                            <span className={`identification-badge ${response.identified ? 'identified-yes' : 'identified-no'}`}>
                              {response.identified ? <CheckCircle className="icon-xs" /> : <XCircle className="icon-xs" />}
                              {response.identified ? 'Identificou' : 'Não Identificou'}
                            </span>
                            <span className={`credibility-badge ${getCredibilityLevel(response.credibilityScore).class}`}>
                              {getCredibilityLevel(response.credibilityScore).level}
                            </span>
                            <span className={`sentiment-badge ${getSentimentColor(getCurrentSentiment(selectedTest.id, index, response.sentiment))}`}>
                              {getSentimentIcon(getCurrentSentiment(selectedTest.id, index, response.sentiment))}
                              {getCurrentSentiment(selectedTest.id, index, response.sentiment) === 'positive' ? 'Positivo' : 
                               getCurrentSentiment(selectedTest.id, index, response.sentiment) === 'negative' ? 'Negativo' : 'Neutro'}
                              {response.correctedByUser && <span className="corrected-indicator">✓</span>}
                            </span>
                          </div>
                          
                          {/* Linha de botões de correção */}
                          <div className="sentiment-correction-buttons">
                            <span className="correction-label"></span>
                            <button 
                              className={`sentiment-btn positive ${getCurrentSentiment(selectedTest.id, index, response.sentiment) === 'positive' ? 'active' : ''}`}
                              onClick={() => correctSentiment(selectedTest.id, index, 'positive', response.comment)}
                              title="Classificar como Positivo"
                            >
                              <ThumbsUp className="icon-xs" />
                            </button>
                            <button 
                              className={`sentiment-btn neutral ${getCurrentSentiment(selectedTest.id, index, response.sentiment) === 'neutral' ? 'active' : ''}`}
                              onClick={() => correctSentiment(selectedTest.id, index, 'neutral', response.comment)}
                              title="Classificar como Neutro"
                            >
                              <MessageSquare className="icon-xs" />
                            </button>
                            <button 
                              className={`sentiment-btn negative ${getCurrentSentiment(selectedTest.id, index, response.sentiment) === 'negative' ? 'active' : ''}`}
                              onClick={() => correctSentiment(selectedTest.id, index, 'negative', response.comment)}
                              title="Classificar como Negativo"
                            >
                              <TrendingDown className="icon-xs" />
                            </button>
                          </div>
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

                {/* Classificação de Motivos */}
                {analysisResults.reasonsClassification && (
                  <div className="section-card">
                    <h2 className="section-heading">
                      <BarChart className="icon-md" />
                      Classificação de Motivos
                    </h2>
                    <div className="reasons-grid">
                      <div className="reasons-column">
                        <h3 className="reasons-title approval">Motivos de Aprovação</h3>
                        {Object.entries(analysisResults.reasonsClassification.approval).map(([category, reasons]) => (
                          reasons.length > 0 && (
                            <div key={category} className="reason-category">
                              <h4 className="category-title">{
                                category === 'sensory' ? 'Sensoriais' :
                                category === 'technical' ? 'Técnicos' : 'Preferência'
                              }</h4>
                              <ul className="reason-list">
                                {reasons.map((reason, index) => (
                                  <li key={index} className="reason-item approval">{reason}</li>
                                ))}
                              </ul>
                            </div>
                          )
                        ))}
                        {Object.values(analysisResults.reasonsClassification.approval).every(arr => arr.length === 0) && (
                          <p className="no-reasons">Nenhum motivo específico de aprovação identificado</p>
                        )}
                      </div>
                      
                      <div className="reasons-column">
                        <h3 className="reasons-title rejection">Motivos de Reprovação</h3>
                        {Object.entries(analysisResults.reasonsClassification.rejection).map(([category, reasons]) => (
                          reasons.length > 0 && (
                            <div key={category} className="reason-category">
                              <h4 className="category-title">{
                                category === 'sensory' ? 'Sensoriais' :
                                category === 'technical' ? 'Técnicos' : 'Preferência'
                              }</h4>
                              <ul className="reason-list">
                                {reasons.map((reason, index) => (
                                  <li key={index} className="reason-item rejection">{reason}</li>
                                ))}
                              </ul>
                            </div>
                          )
                        ))}
                        {Object.values(analysisResults.reasonsClassification.rejection).every(arr => arr.length === 0) && (
                          <p className="no-reasons">Nenhum motivo específico de reprovação identificado</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

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

                {/* Insights Automáticos */}
                {analysisResults.automaticInsights && analysisResults.automaticInsights.length > 0 && (
                  <div className="section-card">
                    <h2 className="section-heading">
                      <Brain className="icon-md" />
                      Insights Automáticos da IA
                    </h2>
                    <div className="automatic-insights-grid">
                      {analysisResults.automaticInsights.map((insight, index) => (
                        <div key={index} className={`automatic-insight-card impact-${insight.impact.toLowerCase()}`}>
                          <div className="insight-header-auto">
                            <span className="insight-type">{insight.type}</span>
                            <span className={`impact-badge impact-${insight.impact.toLowerCase()}`}>
                              {insight.impact === 'Alta' ? '🔥' : insight.impact === 'Média' ? '⚠️' : '💡'} 
                              {insight.impact}
                            </span>
                          </div>
                          <h3 className="insight-title-auto">{insight.title}</h3>
                          <p className="insight-description-auto">{insight.description}</p>
                          <div className="insight-actionable">
                            <strong>Ação recomendada:</strong> {insight.actionable}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Correções de Sentimento */}
                {Object.keys(sentimentCorrections).length > 0 && (
                  <div className="section-card">
                    <h2 className="section-heading">
                      <Brain className="icon-md" />
                      Aprendizado da IA ({Object.keys(sentimentCorrections).length} correções)
                    </h2>
                    <div className="corrections-summary">
                      <p className="corrections-description">
                        A IA está aprendendo com suas correções para melhorar futuras classificações.
                      </p>
                      <div className="corrections-grid">
                        {Object.values(sentimentCorrections)
                          .filter(correction => correction.testId === selectedTest.id)
                          .map((correction, index) => (
                          <div key={index} className="correction-item">
                            <div className="correction-change">
                              <span className={`sentiment-old ${correction.originalSentiment}`}>
                                {correction.originalSentiment === 'positive' ? 'Positivo' : 
                                 correction.originalSentiment === 'negative' ? 'Negativo' : 'Neutro'}
                              </span>
                              →
                              <span className={`sentiment-new ${correction.correctedSentiment}`}>
                                {correction.correctedSentiment === 'positive' ? 'Positivo' : 
                                 correction.correctedSentiment === 'negative' ? 'Negativo' : 'Neutro'}
                              </span>
                            </div>
                            <div className="correction-comment">"{correction.comment}"</div>
                          </div>
                        ))}
                      </div>
                      <div className="learning-status">
                        <Sparkles className="icon-sm" />
                        <span>A IA incorporará essas correções em análises futuras</span>
                      </div>
                    </div>
                  </div>
                )}

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