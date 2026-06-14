import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Send, Plus, CreditCard, Smartphone, Settings, LogOut, ArrowUpRight, ArrowDownLeft, TrendingUp, Bell, X, Menu, Home, Zap, Lock, Mail, User, Phone } from 'lucide-react';

export default function AmimBank() {
  // ===== ESTADOS DE AUTENTICAÇÃO =====
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [telaAtiva, setTelaAtiva] = useState('login'); // 'login' ou 'cadastro'
  
  // ===== FORMULÁRIOS =====
  const [formLogin, setFormLogin] = useState({
    email: '',
    senha: ''
  });
  
  const [formCadastro, setFormCadastro] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    senha: '',
    senhaConfirm: ''
  });
  
  const [errosCadastro, setErrosCadastro] = useState({});
  const [errosLogin, setErrosLogin] = useState('');
  const [notificacaoTemp, setNotificacaoTemp] = useState('');

  // ===== ESTADOS DO BANCO (quando autenticado) =====
  const [saldoVisible, setSaldoVisible] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState('home');
  const [showMenu, setShowMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [cartaoFlipped, setCartaoFlipped] = useState(false);
  
  const [saldo, setSaldo] = useState(4852.75);
  const [limite, setLimite] = useState(2000);
  const [transacoes, setTransacoes] = useState([]);
  
  const [novaTransferencia, setNovaTransferencia] = useState({
    nomeRecebedor: '',
    cpfRecebedor: '',
    valor: '',
    descricao: ''
  });

  const [investimentos] = useState([
    { id: 1, nome: 'Tesouro Direto IPCA+', valor: 5000, rendimento: 745.32, taxa: '6.5% a.a.' },
    { id: 2, nome: 'Fundo de Ações', valor: 2000, rendimento: 156.80, taxa: '8.2% a.a.' },
  ]);

  // ===== EFEITOS =====
  useEffect(() => {
    verificarAutenticacao();
    inicializarTransacoes();
  }, []);

  // ===== FUNÇÕES DE AUTENTICAÇÃO =====
  const verificarAutenticacao = () => {
    const usuarioSalvo = localStorage.getItem('amim_usuario_logado');
    if (usuarioSalvo) {
      const usuario = JSON.parse(usuarioSalvo);
      setUsuarioLogado(usuario);
      setEstaAutenticado(true);
      setSaldo(usuario.saldo || 4852.75);
      carregarTransacoes(usuario.id);
    }
  };

  const carregarTransacoes = (usuarioId) => {
    const transacoesSalvas = localStorage.getItem(`amim_transacoes_${usuarioId}`);
    if (transacoesSalvas) {
      setTransacoes(JSON.parse(transacoesSalvas));
    } else {
      const transacoesInicial = [
        { id: 1, tipo: 'entrada', descricao: 'Salário Mensal', valor: 3500.00, data: '2024-01-15', hora: '08:30', categoria: 'Crédito' },
        { id: 2, tipo: 'saida', descricao: 'Restaurante Sabor', valor: 89.90, data: '2024-01-14', hora: '19:45', categoria: 'Alimentação', icon: '🍽️' },
        { id: 3, tipo: 'saida', descricao: 'Spotify Assinatura', valor: 16.90, data: '2024-01-13', hora: '10:15', categoria: 'Assinatura', icon: '🎵' },
        { id: 4, tipo: 'entrada', descricao: 'PIX Recebido', valor: 250.00, data: '2024-01-12', hora: '14:20', categoria: 'Transferência', icon: '💳' },
        { id: 5, tipo: 'saida', descricao: 'Uber para Centro', valor: 34.50, data: '2024-01-12', hora: '18:10', categoria: 'Transporte', icon: '🚗' },
        { id: 6, tipo: 'saida', descricao: 'Farmácia Genéricos', valor: 127.35, data: '2024-01-11', hora: '16:00', categoria: 'Saúde', icon: '💊' },
      ];
      setTransacoes(transacoesInicial);
    }
  };

  const inicializarTransacoes = () => {
    const transacoesInicial = [
      { id: 1, tipo: 'entrada', descricao: 'Salário Mensal', valor: 3500.00, data: '2024-01-15', hora: '08:30', categoria: 'Crédito' },
      { id: 2, tipo: 'saida', descricao: 'Restaurante Sabor', valor: 89.90, data: '2024-01-14', hora: '19:45', categoria: 'Alimentação', icon: '🍽️' },
      { id: 3, tipo: 'saida', descricao: 'Spotify Assinatura', valor: 16.90, data: '2024-01-13', hora: '10:15', categoria: 'Assinatura', icon: '🎵' },
      { id: 4, tipo: 'entrada', descricao: 'PIX Recebido', valor: 250.00, data: '2024-01-12', hora: '14:20', categoria: 'Transferência', icon: '💳' },
      { id: 5, tipo: 'saida', descricao: 'Uber para Centro', valor: 34.50, data: '2024-01-12', hora: '18:10', categoria: 'Transporte', icon: '🚗' },
      { id: 6, tipo: 'saida', descricao: 'Farmácia Genéricos', valor: 127.35, data: '2024-01-11', hora: '16:00', categoria: 'Saúde', icon: '💊' },
    ];
    setTransacoes(transacoesInicial);
  };

  // Validação CPF
  const validarCPF = (cpf) => {
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;
    
    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(10, 11))) return false;
    
    return true;
  };

  // Validação Email
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Verificar se email já existe
  const emailJaExiste = (email) => {
    const usuariosStr = localStorage.getItem('amim_usuarios');
    if (!usuariosStr) return false;
    const usuarios = JSON.parse(usuariosStr);
    return usuarios.some(u => u.email === email);
  };

  // Fazer Cadastro
  const handleCadastro = (e) => {
    e.preventDefault();
    const novoErros = {};

    // Validações
    if (!formCadastro.nome.trim()) {
      novoErros.nome = 'Nome é obrigatório';
    }
    if (!validarEmail(formCadastro.email)) {
      novoErros.email = 'Email inválido';
    }
    if (emailJaExiste(formCadastro.email)) {
      novoErros.email = 'Este email já foi cadastrado';
    }
    if (!validarCPF(formCadastro.cpf)) {
      novoErros.cpf = 'CPF inválido';
    }
    if (!formCadastro.telefone.trim()) {
      novoErros.telefone = 'Telefone é obrigatório';
    }
    if (formCadastro.senha.length < 6) {
      novoErros.senha = 'Senha deve ter pelo menos 6 caracteres';
    }
    if (formCadastro.senha !== formCadastro.senhaConfirm) {
      novoErros.senhaConfirm = 'As senhas não coincidem';
    }

    if (Object.keys(novoErros).length > 0) {
      setErrosCadastro(novoErros);
      return;
    }

    // Salvar novo usuário
    const novoUsuario = {
      id: Date.now(),
      nome: formCadastro.nome,
      email: formCadastro.email,
      cpf: formCadastro.cpf,
      telefone: formCadastro.telefone,
      senha: formCadastro.senha, // Em produção, usar hash!
      saldo: 4852.75,
      dataCadastro: new Date().toISOString()
    };

    const usuariosStr = localStorage.getItem('amim_usuarios');
    const usuarios = usuariosStr ? JSON.parse(usuariosStr) : [];
    usuarios.push(novoUsuario);
    localStorage.setItem('amim_usuarios', JSON.stringify(usuarios));

    // Auto-login
    localStorage.setItem('amim_usuario_logado', JSON.stringify(novoUsuario));
    setUsuarioLogado(novoUsuario);
    setEstaAutenticado(true);
    setSaldo(novoUsuario.saldo);
    carregarTransacoes(novoUsuario.id);

    // Reset formulários
    setFormCadastro({
      nome: '',
      email: '',
      cpf: '',
      telefone: '',
      senha: '',
      senhaConfirm: ''
    });
    setErrosCadastro({});
    setNotificacaoTemp('Cadastro realizado com sucesso!');
    setTimeout(() => setNotificacaoTemp(''), 3000);
  };

  // Fazer Login
  const handleLogin = (e) => {
    e.preventDefault();
    setErrosLogin('');

    if (!formLogin.email || !formLogin.senha) {
      setErrosLogin('Preencha todos os campos');
      return;
    }

    const usuariosStr = localStorage.getItem('amim_usuarios');
    if (!usuariosStr) {
      setErrosLogin('Usuário não encontrado');
      return;
    }

    const usuarios = JSON.parse(usuariosStr);
    const usuarioEncontrado = usuarios.find(
      u => u.email === formLogin.email && u.senha === formLogin.senha
    );

    if (!usuarioEncontrado) {
      setErrosLogin('Email ou senha inválidos');
      return;
    }

    // Login bem-sucedido
    localStorage.setItem('amim_usuario_logado', JSON.stringify(usuarioEncontrado));
    setUsuarioLogado(usuarioEncontrado);
    setEstaAutenticado(true);
    setSaldo(usuarioEncontrado.saldo);
    carregarTransacoes(usuarioEncontrado.id);

    setFormLogin({ email: '', senha: '' });
    setNotificacaoTemp('Bem-vindo(a) de volta!');
    setTimeout(() => setNotificacaoTemp(''), 3000);
  };

  // Fazer Logout
  const handleLogout = () => {
    localStorage.removeItem('amim_usuario_logado');
    setEstaAutenticado(false);
    setUsuarioLogado(null);
    setAbaAtiva('home');
    setSaldo(4852.75);
    setTransacoes([]);
    setTelaAtiva('login');
    setFormLogin({ email: '', senha: '' });
  };

  // ===== FUNÇÕES BANCÁRIAS =====
  const adicionarNotificacao = (mensagem, tipo = 'sucesso') => {
    const id = Date.now();
    const novaNotif = { id, mensagem, tipo };
    setNotifications(prev => [...prev, novaNotif]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const handleTransferencia = (e) => {
    e.preventDefault();
    if (novaTransferencia.valor && parseFloat(novaTransferencia.valor) > 0 && parseFloat(novaTransferencia.valor) <= saldo) {
      const novaTransacao = {
        id: transacoes.length + 1,
        tipo: 'saida',
        descricao: `Transferência para ${novaTransferencia.nomeRecebedor}`,
        valor: parseFloat(novaTransferencia.valor),
        data: new Date().toISOString().split('T')[0],
        hora: new Date().toTimeString().slice(0, 5),
        categoria: 'Transferência',
        icon: '💸'
      };
      
      const novaTransacoes = [novaTransacao, ...transacoes];
      setTransacoes(novaTransacoes);
      
      const novoSaldo = saldo - parseFloat(novaTransferencia.valor);
      setSaldo(novoSaldo);
      
      // Salvar no localStorage
      localStorage.setItem(`amim_transacoes_${usuarioLogado.id}`, JSON.stringify(novaTransacoes));
      const usuariosStr = localStorage.getItem('amim_usuarios');
      const usuarios = JSON.parse(usuariosStr);
      const usuarioAtualizado = usuarios.find(u => u.id === usuarioLogado.id);
      usuarioAtualizado.saldo = novoSaldo;
      localStorage.setItem('amim_usuarios', JSON.stringify(usuarios));
      localStorage.setItem('amim_usuario_logado', JSON.stringify({...usuarioLogado, saldo: novoSaldo}));
      
      adicionarNotificacao(`Transferência de R$ ${parseFloat(novaTransferencia.valor).toFixed(2)} realizada com sucesso!`, 'sucesso');
      setNovaTransferencia({ nomeRecebedor: '', cpfRecebedor: '', valor: '', descricao: '' });
      setShowTransferModal(false);
    } else {
      adicionarNotificacao('Valor inválido ou saldo insuficiente', 'erro');
    }
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // ===== RENDERIZAÇÃO DE TELAS =====
  if (!estaAutenticado) {
    return <RenderTelaAutenticacao 
      telaAtiva={telaAtiva}
      setTelaAtiva={setTelaAtiva}
      formLogin={formLogin}
      setFormLogin={setFormLogin}
      formCadastro={formCadastro}
      setFormCadastro={setFormCadastro}
      handleLogin={handleLogin}
      handleCadastro={handleCadastro}
      errosLogin={errosLogin}
      errosCadastro={errosCadastro}
      notificacaoTemp={notificacaoTemp}
    />;
  }

  const cartao = {
    numero: '4532 **** **** 8924',
    numeroCompleto: '4532123456788924',
    validade: '12/26',
    cvv: '342',
    titularCompleto: usuarioLogado.nome.toUpperCase()
  };

  const renderHome = () => (
    <div style={styles.homeContainer}>
      <div style={styles.saldoCard}>
        <div style={styles.saldoHeader}>
          <span style={styles.saldoLabel}>Saldo Total</span>
          <button onClick={() => setSaldoVisible(!saldoVisible)} style={styles.btnOlho}>
            {saldoVisible ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        <div style={styles.saldoValor}>
          {saldoVisible ? formatarMoeda(saldo) : '••••••'}
        </div>
        <div style={styles.limiteInfo}>
          Limite disponível: {saldoVisible ? formatarMoeda(limite) : '••••••'}
        </div>
      </div>

      <div
        style={{
          ...styles.cartaoContainer,
          transform: cartaoFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}
        onClick={() => setCartaoFlipped(!cartaoFlipped)}
      >
        {!cartaoFlipped ? (
          <div style={styles.cartao}>
            <div style={styles.cartaoHeader}>
              <span style={styles.amimLogo}>AMIM</span>
              <CreditCard size={32} color="#fff" />
            </div>
            <div style={styles.cartaoChip}>
              <div style={styles.chip}></div>
            </div>
            <div style={styles.cartaoNumero}>{cartao.numero}</div>
            <div style={styles.cartaoFooter}>
              <div>
                <span style={styles.cartaoLabel}>Titular</span>
                <div style={styles.cartaoTitular}>{cartao.titularCompleto}</div>
              </div>
              <div>
                <span style={styles.cartaoLabel}>Validade</span>
                <div style={styles.cartaoValidade}>{cartao.validade}</div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ ...styles.cartao, ...styles.cartaoVerso }}>
            <div style={styles.stripeMagnetica}></div>
            <div style={styles.cvvContainer}>
              <span style={styles.cvvLabel}>CVV</span>
              <div style={styles.cvv}>{cartao.cvv}</div>
            </div>
            <p style={styles.cartaoTip}>Clique para voltar</p>
          </div>
        )}
      </div>

      <div style={styles.acoesGrid}>
        <button
          style={styles.btnAcao}
          onClick={() => {
            setAbaAtiva('transferir');
            setShowTransferModal(true);
          }}
        >
          <Send size={24} />
          <span>Enviar</span>
        </button>
        <button
          style={styles.btnAcao}
          onClick={() => {
            adicionarNotificacao('Seu código Pix foi gerado: 12345-abcde', 'info');
          }}
        >
          <Plus size={24} />
          <span>Receber</span>
        </button>
        <button
          style={styles.btnAcao}
          onClick={() => setAbaAtiva('investimentos')}
        >
          <TrendingUp size={24} />
          <span>Investir</span>
        </button>
        <button style={styles.btnAcao}>
          <Smartphone size={24} />
          <span>Pagar</span>
        </button>
      </div>

      <div style={styles.transacoesSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitulo}>Últimas Transações</h3>
          <button onClick={() => setAbaAtiva('transacoes')} style={styles.btnVerTodas}>
            Ver tudo →
          </button>
        </div>
        <div style={styles.transacoesList}>
          {transacoes.slice(0, 4).map((t, index) => (
            <div key={t.id} style={{
              ...styles.itemTransacao,
              animation: `slideInLeft 0.4s ease-out ${index * 0.08}s backwards`
            }}>
              <div style={styles.itemIcon}>{t.icon || (t.tipo === 'entrada' ? '📥' : '📤')}</div>
              <div style={styles.itemInfo}>
                <div style={styles.itemDescricao}>{t.descricao}</div>
                <div style={styles.itemData}>{t.data}</div>
              </div>
              <div style={{
                color: t.tipo === 'entrada' ? '#16c784' : '#1a1a2e',
                fontWeight: '700',
                fontSize: '15px'
              }}>
                {t.tipo === 'entrada' ? '+' : '-'} {formatarMoeda(t.valor)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTransacoes = () => (
    <div style={styles.transacoesPage}>
      <h2 style={styles.pageTitle}>Extrato Completo</h2>
      <div style={styles.listaCompleta}>
        {transacoes.map((t, index) => (
          <div key={t.id} style={{
            ...styles.itemTransacao,
            animation: `slideInLeft 0.4s ease-out ${index * 0.05}s backwards`
          }}>
            <div style={styles.itemIcon}>{t.icon || (t.tipo === 'entrada' ? '📥' : '📤')}</div>
            <div style={styles.itemInfo}>
              <div style={styles.itemDescricao}>{t.descricao}</div>
              <div style={styles.itemData}>{t.data} às {t.hora}</div>
            </div>
            <div style={{
              color: t.tipo === 'entrada' ? '#16c784' : '#1a1a2e',
              fontWeight: '700',
              fontSize: '16px'
            }}>
              {t.tipo === 'entrada' ? '+' : '-'} {formatarMoeda(t.valor)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInvestimentos = () => (
    <div style={styles.investimentosPage}>
      <h2 style={styles.pageTitle}>Meus Investimentos</h2>
      <div style={styles.resumoInvestimentos}>
        <div style={styles.cardResumo}>
          <span style={styles.labelResumo}>Total Investido</span>
          <div style={styles.valorResumo}>{formatarMoeda(
            investimentos.reduce((sum, inv) => sum + inv.valor, 0)
          )}</div>
        </div>
        <div style={styles.cardResumo}>
          <span style={styles.labelResumo}>Rendimento Total</span>
          <div style={{ ...styles.valorResumo, color: '#16c784' }}>
            +{formatarMoeda(investimentos.reduce((sum, inv) => sum + inv.rendimento, 0))}
          </div>
        </div>
      </div>
      <div style={styles.investimentosList}>
        {investimentos.map((inv) => (
          <div key={inv.id} style={styles.investimentoItem}>
            <div>
              <div style={styles.invNome}>{inv.nome}</div>
              <div style={styles.invTaxa}>Rentabilidade: {inv.taxa}</div>
            </div>
            <div style={styles.invValores}>
              <div style={styles.invValor}>{formatarMoeda(inv.valor)}</div>
              <div style={styles.invRendimento}>+{formatarMoeda(inv.rendimento)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPerfil = () => (
    <div style={styles.perfilPage}>
      <div style={styles.perfilInfo}>
        <div style={styles.avatarContainer}>
          <div style={styles.avatar}>{usuarioLogado.nome.charAt(0).toUpperCase()}</div>
        </div>
        <div style={styles.usuarioNome}>{usuarioLogado.nome}</div>
        <div style={styles.usuarioEmail}>{usuarioLogado.email}</div>
      </div>

      <div style={styles.configItems}>
        <div style={styles.configItem}>
          <span>CPF</span>
          <span style={styles.configValue}>{formatarCPF(usuarioLogado.cpf)}</span>
        </div>
        <div style={styles.configItem}>
          <span>Telefone</span>
          <span style={styles.configValue}>{usuarioLogado.telefone}</span>
        </div>
        <div style={styles.configItem}>
          <span>Saldo</span>
          <span style={styles.configValue}>{formatarMoeda(saldo)}</span>
        </div>
      </div>

      <button style={styles.btnLogout} onClick={handleLogout}>
        <LogOut size={18} />
        Sair da Conta
      </button>
    </div>
  );

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoContainer}>
            <Zap size={28} color="#fff" style={{ marginRight: '8px' }} />
            <span style={styles.logoText}>AMIM</span>
          </div>
          <div style={styles.headerActions}>
            <button
              style={styles.btnNotificacao}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              {notifications.length > 0 && <span style={styles.notificationBadge}>{notifications.length}</span>}
            </button>
            <button
              style={styles.btnMenu}
              onClick={() => setShowMenu(!showMenu)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Dropdown */}
      {showMenu && (
        <div style={styles.menuDropdown}>
          <button onClick={() => { setAbaAtiva('home'); setShowMenu(false); }} style={styles.menuItem}>
            <Home size={18} /> Home
          </button>
          <button onClick={() => { setAbaAtiva('transacoes'); setShowMenu(false); }} style={styles.menuItem}>
            <ArrowDownLeft size={18} /> Extrato
          </button>
          <button onClick={() => { setAbaAtiva('investimentos'); setShowMenu(false); }} style={styles.menuItem}>
            <TrendingUp size={18} /> Investimentos
          </button>
          <button onClick={() => { setAbaAtiva('perfil'); setShowMenu(false); }} style={styles.menuItem}>
            <Settings size={18} /> Perfil
          </button>
        </div>
      )}

      {/* Notificações */}
      <div style={styles.notificationsContainer}>
        {notifications.map((notif) => (
          <div key={notif.id} style={{
            ...styles.notification,
            backgroundColor: notif.tipo === 'sucesso' ? '#ecfdf5' : notif.tipo === 'erro' ? '#fef2f2' : '#eff6ff',
            borderLeftColor: notif.tipo === 'sucesso' ? '#16c784' : notif.tipo === 'erro' ? '#ff6b6b' : '#0099ff'
          }}>
            <span style={{
              color: notif.tipo === 'sucesso' ? '#16c784' : notif.tipo === 'erro' ? '#ff6b6b' : '#0099ff'
            }}>{notif.mensagem}</span>
            <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))} style={styles.btnCloseNotif}>
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Conteúdo Principal */}
      <div style={styles.mainContent}>
        {abaAtiva === 'home' && renderHome()}
        {abaAtiva === 'transacoes' && renderTransacoes()}
        {abaAtiva === 'investimentos' && renderInvestimentos()}
        {abaAtiva === 'perfil' && renderPerfil()}
      </div>

      {/* Modal de Transferência */}
      {showTransferModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Enviar Dinheiro</h2>
              <button onClick={() => setShowTransferModal(false)} style={styles.btnCloseModal}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleTransferencia} style={styles.formularioTransferencia}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nome do Recebedor</label>
                <input
                  style={styles.input}
                  type="text"
                  value={novaTransferencia.nomeRecebedor}
                  onChange={(e) => setNovaTransferencia({...novaTransferencia, nomeRecebedor: e.target.value})}
                  placeholder="Ex: João Silva"
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>CPF</label>
                <input
                  style={styles.input}
                  type="text"
                  value={novaTransferencia.cpfRecebedor}
                  onChange={(e) => setNovaTransferencia({...novaTransferencia, cpfRecebedor: e.target.value})}
                  placeholder="000.000.000-00"
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Valor</label>
                <input
                  style={styles.input}
                  type="number"
                  step="0.01"
                  value={novaTransferencia.valor}
                  onChange={(e) => setNovaTransferencia({...novaTransferencia, valor: e.target.value})}
                  placeholder="0.00"
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Descrição (opcional)</label>
                <input
                  style={styles.input}
                  type="text"
                  value={novaTransferencia.descricao}
                  onChange={(e) => setNovaTransferencia({...novaTransferencia, descricao: e.target.value})}
                  placeholder="Assunto da transferência"
                />
              </div>
              <button type="submit" style={styles.btnConfirmar}>Confirmar Transferência</button>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div style={styles.bottomNav}>
        <button
          style={{...styles.navItem, ...(abaAtiva === 'home' ? styles.navItemAtivo : {})}}
          onClick={() => setAbaAtiva('home')}
        >
          <Home size={20} />
          <span>Home</span>
        </button>
        <button
          style={{...styles.navItem, ...(abaAtiva === 'transacoes' ? styles.navItemAtivo : {})}}
          onClick={() => setAbaAtiva('transacoes')}
        >
          <ArrowDownLeft size={20} />
          <span>Extrato</span>
        </button>
        <button
          style={{...styles.navItem, ...(abaAtiva === 'investimentos' ? styles.navItemAtivo : {})}}
          onClick={() => setAbaAtiva('investimentos')}
        >
          <TrendingUp size={20} />
          <span>Investir</span>
        </button>
        <button
          style={{...styles.navItem, ...(abaAtiva === 'perfil' ? styles.navItemAtivo : {})}}
          onClick={() => setAbaAtiva('perfil')}
        >
          <Settings size={20} />
          <span>Perfil</span>
        </button>
      </div>
    </div>
  );
}

// ===== COMPONENTE DE AUTENTICAÇÃO =====
function RenderTelaAutenticacao({
  telaAtiva, setTelaAtiva, formLogin, setFormLogin, formCadastro, setFormCadastro,
  handleLogin, handleCadastro, errosLogin, errosCadastro, notificacaoTemp
}) {
  return (
    <div style={stylesAuth.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {notificacaoTemp && (
        <div style={stylesAuth.notificacao}>{notificacaoTemp}</div>
      )}

      <div style={stylesAuth.card}>
        {/* Logo e Título */}
        <div style={stylesAuth.logoSection}>
          <div style={stylesAuth.logoBig}>AMIM</div>
          <h1 style={stylesAuth.titulo}>
            {telaAtiva === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
          </h1>
          <p style={stylesAuth.subtitulo}>
            {telaAtiva === 'login' ? 'Seu banco digital sempre com você' : 'Comece sua jornada financeira com AMIM'}
          </p>
        </div>

        {/* Login */}
        {telaAtiva === 'login' && (
          <form onSubmit={handleLogin} style={stylesAuth.formulario}>
            {errosLogin && <div style={stylesAuth.erro}>{errosLogin}</div>}
            
            <div style={stylesAuth.formGroup}>
              <label style={stylesAuth.label}>
                <Mail size={16} /> Email
              </label>
              <input
                style={stylesAuth.input}
                type="email"
                placeholder="seu@email.com"
                value={formLogin.email}
                onChange={(e) => setFormLogin({...formLogin, email: e.target.value})}
              />
            </div>

            <div style={stylesAuth.formGroup}>
              <label style={stylesAuth.label}>
                <Lock size={16} /> Senha
              </label>
              <input
                style={stylesAuth.input}
                type="password"
                placeholder="••••••••"
                value={formLogin.senha}
                onChange={(e) => setFormLogin({...formLogin, senha: e.target.value})}
              />
            </div>

            <button type="submit" style={stylesAuth.btnPrimario}>Entrar</button>

            <div style={stylesAuth.divisor}>
              <span>Não tem conta?</span>
            </div>

            <button
              type="button"
              style={stylesAuth.btnSecundario}
              onClick={() => setTelaAtiva('cadastro')}
            >
              Criar Conta Gratuita
            </button>
          </form>
        )}

        {/* Cadastro */}
        {telaAtiva === 'cadastro' && (
          <form onSubmit={handleCadastro} style={stylesAuth.formulario}>
            <div style={stylesAuth.formGroup}>
              <label style={stylesAuth.label}>
                <User size={16} /> Nome Completo
              </label>
              <input
                style={{...stylesAuth.input, ...(errosCadastro.nome ? {borderColor: '#ff6b6b'} : {})}}
                type="text"
                placeholder="Seu nome completo"
                value={formCadastro.nome}
                onChange={(e) => setFormCadastro({...formCadastro, nome: e.target.value})}
              />
              {errosCadastro.nome && <span style={stylesAuth.erroTexto}>{errosCadastro.nome}</span>}
            </div>

            <div style={stylesAuth.formGroup}>
              <label style={stylesAuth.label}>
                <Mail size={16} /> Email
              </label>
              <input
                style={{...stylesAuth.input, ...(errosCadastro.email ? {borderColor: '#ff6b6b'} : {})}}
                type="email"
                placeholder="seu@email.com"
                value={formCadastro.email}
                onChange={(e) => setFormCadastro({...formCadastro, email: e.target.value})}
              />
              {errosCadastro.email && <span style={stylesAuth.erroTexto}>{errosCadastro.email}</span>}
            </div>

            <div style={stylesAuth.formGroup}>
              <label style={stylesAuth.label}>CPF</label>
              <input
                style={{...stylesAuth.input, ...(errosCadastro.cpf ? {borderColor: '#ff6b6b'} : {})}}
                type="text"
                placeholder="000.000.000-00"
                value={formCadastro.cpf}
                onChange={(e) => setFormCadastro({...formCadastro, cpf: e.target.value})}
              />
              {errosCadastro.cpf && <span style={stylesAuth.erroTexto}>{errosCadastro.cpf}</span>}
            </div>

            <div style={stylesAuth.formGroup}>
              <label style={stylesAuth.label}>
                <Phone size={16} /> Telefone
              </label>
              <input
                style={{...stylesAuth.input, ...(errosCadastro.telefone ? {borderColor: '#ff6b6b'} : {})}}
                type="text"
                placeholder="(XX) XXXXX-XXXX"
                value={formCadastro.telefone}
                onChange={(e) => setFormCadastro({...formCadastro, telefone: e.target.value})}
              />
              {errosCadastro.telefone && <span style={stylesAuth.erroTexto}>{errosCadastro.telefone}</span>}
            </div>

            <div style={stylesAuth.formGroup}>
              <label style={stylesAuth.label}>
                <Lock size={16} /> Senha
              </label>
              <input
                style={{...stylesAuth.input, ...(errosCadastro.senha ? {borderColor: '#ff6b6b'} : {})}}
                type="password"
                placeholder="••••••••"
                value={formCadastro.senha}
                onChange={(e) => setFormCadastro({...formCadastro, senha: e.target.value})}
              />
              {errosCadastro.senha && <span style={stylesAuth.erroTexto}>{errosCadastro.senha}</span>}
            </div>

            <div style={stylesAuth.formGroup}>
              <label style={stylesAuth.label}>Confirmar Senha</label>
              <input
                style={{...stylesAuth.input, ...(errosCadastro.senhaConfirm ? {borderColor: '#ff6b6b'} : {})}}
                type="password"
                placeholder="••••••••"
                value={formCadastro.senhaConfirm}
                onChange={(e) => setFormCadastro({...formCadastro, senhaConfirm: e.target.value})}
              />
              {errosCadastro.senhaConfirm && <span style={stylesAuth.erroTexto}>{errosCadastro.senhaConfirm}</span>}
            </div>

            <button type="submit" style={stylesAuth.btnPrimario}>Criar Conta</button>

            <div style={stylesAuth.divisor}>
              <span>Já tem conta?</span>
            </div>

            <button
              type="button"
              style={stylesAuth.btnSecundario}
              onClick={() => setTelaAtiva('login')}
            >
              Fazer Login
            </button>
          </form>
        )}
      </div>

      <div style={stylesAuth.footer}>
        <p>AMIM © 2024 - Seu Banco Digital</p>
      </div>
    </div>
  );
}

// ===== ESTILOS =====
const stylesAuth = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },

  notificacao: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#16c784',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1000,
    animation: 'slideUp 0.3s ease-out'
  },

  card: {
    background: '#fff',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    animation: 'slideUp 0.5s ease-out'
  },

  logoSection: {
    textAlign: 'center',
    marginBottom: '32px'
  },

  logoBig: {
    fontSize: '48px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '16px',
    fontFamily: '"Poppins", sans-serif'
  },

  titulo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '8px',
    fontFamily: '"Poppins", sans-serif'
  },

  subtitulo: {
    fontSize: '14px',
    color: '#999',
    margin: 0
  },

  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '24px'
  },

  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },

  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#1a1a2e',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },

  input: {
    padding: '12px 14px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: '"Inter", sans-serif',
    backgroundColor: '#fafbfc',
    transition: 'all 0.3s ease',
    outline: 'none'
  },

  btnPrimario: {
    padding: '14px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '16px',
    fontFamily: '"Poppins", sans-serif',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    marginTop: '8px'
  },

  btnSecundario: {
    padding: '14px',
    background: '#f5f7fa',
    color: '#667eea',
    border: '2px solid #667eea',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '14px',
    fontFamily: '"Poppins", sans-serif',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },

  divisor: {
    textAlign: 'center',
    marginTop: '16px',
    marginBottom: '8px',
    fontSize: '13px',
    color: '#999'
  },

  erro: {
    background: '#fef2f2',
    border: '2px solid #ff6b6b',
    color: '#ff6b6b',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '12px'
  },

  erroTexto: {
    fontSize: '11px',
    color: '#ff6b6b',
    fontWeight: '600'
  },

  footer: {
    marginTop: '40px',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '12px'
  }
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    paddingBottom: '100px',
    paddingTop: '70px'
  },

  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 200,
    paddingTop: '12px',
    paddingBottom: '12px'
  },

  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    fontWeight: '800',
    fontSize: '24px',
    fontFamily: '"Poppins", sans-serif'
  },

  logoText: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: '800'
  },

  headerActions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },

  btnNotificacao: {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    transition: 'background 0.3s ease'
  },

  notificationBadge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    background: '#ff6b6b',
    color: '#fff',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '700'
  },

  btnMenu: {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background 0.3s ease'
  },

  menuDropdown: {
    position: 'fixed',
    top: '60px',
    right: '20px',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    zIndex: 150,
    minWidth: '200px',
    animation: 'slideUp 0.2s ease-out'
  },

  menuItem: {
    width: '100%',
    padding: '14px 16px',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a2e',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background 0.2s ease'
  },

  notificationsContainer: {
    position: 'fixed',
    top: '80px',
    right: '20px',
    maxWidth: '320px',
    zIndex: 300,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },

  notification: {
    padding: '12px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    borderLeft: '4px solid',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    animation: 'slideUp 0.3s ease-out'
  },

  btnCloseNotif: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center'
  },

  mainContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    animation: 'fadeIn 0.5s ease-out'
  },

  homeContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },

  saldoCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    animation: 'slideUp 0.4s ease-out'
  },

  saldoHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },

  saldoLabel: {
    fontSize: '13px',
    color: '#999',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.3px'
  },

  btnOlho: {
    background: 'none',
    border: 'none',
    color: '#8b5cf6',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.3s ease'
  },

  saldoValor: {
    fontSize: '42px',
    fontWeight: '800',
    fontFamily: '"Poppins", sans-serif',
    color: '#1a1a2e',
    marginBottom: '8px'
  },

  limiteInfo: {
    fontSize: '13px',
    color: '#999'
  },

  cartaoContainer: {
    perspective: '1000px',
    cursor: 'pointer',
    height: '200px',
    animation: 'slideUp 0.4s ease-out 0.1s backwards'
  },

  cartao: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    borderRadius: '16px',
    padding: '24px',
    color: '#fff',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)',
    position: 'relative',
    backfaceVisibility: 'hidden'
  },

  cartaoVerso: {
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  cartaoHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  amimLogo: {
    fontSize: '18px',
    fontWeight: '800',
    fontFamily: '"Poppins", sans-serif'
  },

  cartaoChip: {
    display: 'flex',
    gap: '8px'
  },

  chip: {
    width: '40px',
    height: '40px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '6px'
  },

  cartaoNumero: {
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: '2px',
    fontFamily: 'monospace',
    marginTop: '16px'
  },

  cartaoFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px'
  },

  cartaoLabel: {
    opacity: 0.8,
    fontSize: '10px',
    textTransform: 'uppercase'
  },

  cartaoTitular: {
    fontSize: '14px',
    fontWeight: '700',
    marginTop: '4px'
  },

  cartaoValidade: {
    fontSize: '14px',
    fontWeight: '700',
    marginTop: '4px'
  },

  stripeMagnetica: {
    width: '100%',
    height: '40px',
    background: 'rgba(0,0,0,0.3)',
    marginBottom: '20px',
    borderRadius: '4px'
  },

  cvvContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },

  cvvLabel: {
    fontSize: '12px',
    textTransform: 'uppercase',
    opacity: 0.9
  },

  cvv: {
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '2px',
    fontFamily: 'monospace'
  },

  cartaoTip: {
    fontSize: '12px',
    textAlign: 'center',
    opacity: 0.8,
    margin: 0
  },

  acoesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    animation: 'slideUp 0.4s ease-out 0.2s backwards'
  },

  btnAcao: {
    background: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    color: '#8b5cf6',
    fontWeight: '600',
    fontSize: '12px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  },

  transacoesSection: {
    animation: 'slideUp 0.4s ease-out 0.3s backwards'
  },

  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },

  sectionTitulo: {
    fontSize: '18px',
    fontWeight: '700',
    fontFamily: '"Poppins", sans-serif',
    color: '#1a1a2e',
    margin: 0
  },

  btnVerTodas: {
    background: 'none',
    border: 'none',
    color: '#8b5cf6',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  },

  transacoesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },

  itemTransacao: {
    background: '#fff',
    borderRadius: '12px',
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  },

  itemIcon: {
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center'
  },

  itemInfo: {
    flex: 1
  },

  itemDescricao: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '4px',
    color: '#1a1a2e'
  },

  itemData: {
    fontSize: '12px',
    color: '#999'
  },

  pageTitle: {
    fontSize: '24px',
    fontWeight: '800',
    fontFamily: '"Poppins", sans-serif',
    marginBottom: '24px',
    color: '#1a1a2e'
  },

  transacoesPage: {
    animation: 'fadeIn 0.5s ease-out'
  },

  listaCompleta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },

  investimentosPage: {
    animation: 'fadeIn 0.5s ease-out'
  },

  resumoInvestimentos: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
    marginBottom: '24px'
  },

  cardResumo: {
    background: '#fff',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
  },

  labelResumo: {
    fontSize: '12px',
    color: '#999',
    fontWeight: '500',
    display: 'block',
    marginBottom: '8px'
  },

  valorResumo: {
    fontSize: '20px',
    fontWeight: '700',
    fontFamily: '"Poppins", sans-serif',
    color: '#1a1a2e'
  },

  investimentosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },

  investimentoItem: {
    background: '#fff',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    borderLeft: '4px solid #8b5cf6'
  },

  invNome: {
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '4px'
  },

  invTaxa: {
    fontSize: '12px',
    color: '#999'
  },

  invValores: {
    textAlign: 'right'
  },

  invValor: {
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '4px'
  },

  invRendimento: {
    fontSize: '12px',
    color: '#16c784',
    fontWeight: '600'
  },

  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'flex-end',
    zIndex: 500,
    animation: 'fadeIn 0.3s ease-out'
  },

  modalContent: {
    background: '#fff',
    borderRadius: '20px 20px 0 0',
    padding: '24px 20px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    animation: 'slideUp 0.3s ease-out'
  },

  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },

  modalTitle: {
    fontSize: '20px',
    fontWeight: '700',
    fontFamily: '"Poppins", sans-serif',
    color: '#1a1a2e',
    margin: 0
  },

  btnCloseModal: {
    background: 'none',
    border: 'none',
    color: '#999',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },

  formularioTransferencia: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },

  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },

  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1a1a2e',
    textTransform: 'uppercase',
    letterSpacing: '0.3px'
  },

  input: {
    padding: '12px 14px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: '"Inter", sans-serif',
    backgroundColor: '#fafbfc'
  },

  btnConfirmar: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '16px',
    fontFamily: '"Poppins", sans-serif',
    marginTop: '10px',
    cursor: 'pointer'
  },

  perfilPage: {
    animation: 'fadeIn 0.5s ease-out'
  },

  perfilInfo: {
    background: '#fff',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    marginBottom: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
  },

  avatarContainer: {
    marginBottom: '16px'
  },

  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: '700',
    margin: '0 auto'
  },

  usuarioNome: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '4px'
  },

  usuarioEmail: {
    fontSize: '13px',
    color: '#999'
  },

  configItems: {
    background: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
  },

  configItem: {
    padding: '14px 16px',
    borderBottom: '1px solid #f0f2f5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px'
  },

  configValue: {
    fontWeight: '600',
    color: '#1a1a2e'
  },

  btnLogout: {
    width: '100%',
    padding: '14px',
    background: '#fff5f5',
    border: '2px solid #ff6b6b',
    color: '#ff6b6b',
    borderRadius: '8px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '14px',
    cursor: 'pointer'
  },

  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#fff',
    borderTop: '1px solid #f0f2f5',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '8px 0',
    boxShadow: '0 -5px 20px rgba(0,0,0,0.08)',
    zIndex: 100
  },

  navItem: {
    flex: 1,
    background: 'none',
    border: 'none',
    color: '#999',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    fontWeight: '600',
    padding: '8px 4px',
    transition: 'color 0.3s ease',
    cursor: 'pointer'
  },

  navItemAtivo: {
    color: '#8b5cf6'
  }
};
