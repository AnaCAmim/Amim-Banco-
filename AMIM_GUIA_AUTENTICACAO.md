# 🔐 AMIM - Guia de Autenticação e Cadastro

## ✨ O que mudou?

A nova versão do AMIM agora possui um **sistema completo de autenticação** com:
- ✅ Tela de Login funcional
- ✅ Tela de Cadastro com validações
- ✅ Persistência de dados em localStorage
- ✅ Múltiplas contas funcionando
- ✅ Sistema de logout
- ✅ Validação de CPF
- ✅ Validação de Email

---

## 🚀 Como Começar

### 1. Acessar pela primeira vez
Ao abrir a aplicação, você verá a **tela de login** com:
- Campo de email
- Campo de senha
- Botão "Entrar"
- Link para criar nova conta

### 2. Criar uma nova conta
Clique em **"Criar Conta Gratuita"** para ir para a tela de cadastro.

**Campos obrigatórios:**
```
Nome Completo: Seu nome inteiro
Email: seu@email.com (único na aplicação)
CPF: 000.000.000-00 (validado)
Telefone: (XX) XXXXX-XXXX
Senha: Mínimo 6 caracteres
Confirmar Senha: Deve ser igual à senha acima
```

**Exemplo de cadastro:**
```
Nome: Ana Clara Silva
Email: ana.clara@gmail.com
CPF: 123.456.789-00
Telefone: (85) 98888-7777
Senha: SenhaForte123
Confirmar: SenhaForte123
```

### 3. Validações Implementadas

#### ✅ Validação de CPF
- Aceita formato: `000.000.000-00` ou `00000000000`
- Valida dígitos verificadores (realmente funciona!)
- Exemplo válido: `123.456.789-00`
- Exemplo inválido: `111.111.111-11`

#### ✅ Validação de Email
- Deve ter formato: `usuario@dominio.com`
- Não permite emails duplicados
- Se tentar cadastrar com email já existente, receberá erro

#### ✅ Validação de Senha
- Mínimo 6 caracteres
- Deve confirmar a senha (devem ser iguais)
- Se não coincidirem, receberá erro

#### ✅ Validação de Nome e Telefone
- Nome obrigatório e não vazio
- Telefone obrigatório

### 4. Após Cadastro com Sucesso
- A conta é criada imediatamente
- Você faz **auto-login**
- Vê uma notificação: "Cadastro realizado com sucesso!"
- É redirecionado para a **Home do banco**
- Seu saldo inicial: **R$ 4.852,75**

---

## 🔑 Sistema de Login

### Fazer Login com Conta Existente
1. Vá para a tela de login
2. Digite seu email
3. Digite sua senha
4. Clique em "Entrar"

**Exemplo:**
```
Email: ana.clara@gmail.com
Senha: SenhaForte123
```

### Recuperação de Erro de Login
Se receber "Email ou senha inválidos", significa:
- O email não foi cadastrado, OU
- A senha está incorreta

Tente novamente ou crie uma nova conta.

---

## 💾 Onde os Dados são Guardados?

### localStorage Browser
Os dados são salvos **localmente no seu navegador** em:

**Chaves armazenadas:**
```
amim_usuarios → Lista de todos os usuários cadastrados
amim_usuario_logado → Usuário atualmente logado
amim_transacoes_{id} → Transações do usuário específico
```

**Exemplo de estrutura:**
```javascript
// amim_usuarios (localStorage)
[
  {
    id: 1705334400000,
    nome: "Ana Clara Silva",
    email: "ana.clara@gmail.com",
    cpf: "12345678900",
    telefone: "(85) 98888-7777",
    saldo: 4852.75,
    dataCadastro: "2024-01-16T10:00:00"
  },
  {
    id: 1705334500000,
    nome: "João Silva",
    email: "joao@gmail.com",
    cpf: "98765432100",
    telefone: "(85) 99999-8888",
    saldo: 5000.00,
    dataCadastro: "2024-01-16T10:10:00"
  }
]
```

### Como Verificar no Console
Abra o **DevTools** (F12) → Console e digite:

```javascript
// Ver todos os usuários
JSON.parse(localStorage.getItem('amim_usuarios'))

// Ver usuário logado
JSON.parse(localStorage.getItem('amim_usuario_logado'))

// Ver transações do usuário logado
const usuario = JSON.parse(localStorage.getItem('amim_usuario_logado'));
JSON.parse(localStorage.getItem(`amim_transacoes_${usuario.id}`))
```

---

## 🚪 Sistema de Logout

### Como fazer logout
1. Acesse a aba **"Perfil"** (último botão da bottom nav)
2. Clique em **"Sair da Conta"**
3. Você volta para a **tela de login**
4. Pode fazer login com outra conta ou criar uma nova

### O que acontece ao fazer logout
- ❌ Você é desconectado
- ❌ Os dados da sessão são limpos
- ✅ Seus dados continuam salvos no localStorage
- ✅ Você pode fazer login novamente depois

---

## 🔒 Segurança (Importante!)

### ⚠️ Para Desenvolvimento/Demo APENAS
Esta implementação é **educacional**. Para **produção real**, você DEVE:

1. **Nunca armazenar senhas em texto plano**
   - Use hashing (bcrypt, Argon2, etc)
   - Implemente JWT ou OAuth

2. **Usar HTTPS obrigatoriamente**
   - localStorage é vulnerável sem HTTPS

3. **Backend seguro**
   - Validar dados no servidor
   - Implementar rate limiting
   - Usar CORS apropriadamente

4. **Dados sensíveis**
   - Nunca salve CPF/cartão em texto plano
   - Use criptografia E2E se necessário

### Exemplo Seguro (Pseudo-código)
```javascript
// ❌ ERRADO (Código atual - apenas para demo)
const senha = 'senha123';
localStorage.setItem('senha', senha);

// ✅ CORRETO (Para produção)
const senhaHash = await bcrypt.hash('senha123', 10);
// Enviar para servidor via HTTPS
fetch('https://api.amim.com/login', {
  method: 'POST',
  body: JSON.stringify({ email, senhaHash }),
  headers: { 'Content-Type': 'application/json' }
});
```

---

## 🧪 Cenários de Teste

### Teste 1: Criar Conta Completa
```
Nome: Maria Silva
Email: maria@gmail.com
CPF: 123.456.789-09
Telefone: (85) 91234-5678
Senha: Teste@123
Resultado: ✅ Conta criada e login automático
```

### Teste 2: CPF Inválido
```
CPF: 111.111.111-11 (todos iguais)
Resultado: ❌ Erro: "CPF inválido"
```

### Teste 3: Email Duplicado
```
1. Cadastre: ana@gmail.com
2. Tente cadastrar novamente: ana@gmail.com
Resultado: ❌ Erro: "Este email já foi cadastrado"
```

### Teste 4: Senhas Diferentes
```
Senha: Teste@123
Confirmar: Teste@456
Resultado: ❌ Erro: "As senhas não coincidem"
```

### Teste 5: Senha Curta
```
Senha: abc (3 caracteres)
Resultado: ❌ Erro: "Senha deve ter pelo menos 6 caracteres"
```

### Teste 6: Login Incorreto
```
Email: email@gmail.com (não cadastrado)
Resultado: ❌ Erro: "Email ou senha inválidos"
```

### Teste 7: Transações Persistem
```
1. Crie conta: user1@gmail.com
2. Faça uma transferência de R$ 100
3. Logout
4. Faça login novamente
Resultado: ✅ Saldo atualizado + transação no histórico
```

---

## 🎮 Fluxo Completo de Uso

```
┌─────────────────────┐
│   Tela de Login     │
├─────────────────────┤
│  Email: ________    │
│  Senha: ________    │
│ [Entrar]            │
│ [Criar Conta]       │
└─────────────────────┘
         │
         ├─→ Cadastro
         │   └─→ Validações
         │   └─→ Criar Conta
         │   └─→ Auto-login
         │
         ├─→ Login
         │   └─→ Validar
         │   └─→ Entrar
         │
         ↓
┌─────────────────────┐
│   Home do Banco     │
├─────────────────────┤
│  Saldo: R$ 4.852    │
│  [Cartão]           │
│  [Ações Rápidas]    │
│  [Transações]       │
│  [Bottom Nav]       │
└─────────────────────┘
         │
         ├─→ Transferir
         ├─→ Ver Extrato
         ├─→ Investimentos
         ├─→ Perfil
         │   └─→ [Logout]
         │
         ↓
┌─────────────────────┐
│   Tela de Login     │
│   (Volta ao início) │
└─────────────────────┘
```

---

## 📱 Responsividade

O sistema funciona perfeitamente em:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 768px)

As telas de login/cadastro ocupam **100% da tela** em qualquer resolução.

---

## 🐛 Troubleshooting

### Problema: "Não consigo entrar com uma conta que criei"
**Solução:** Certifique-se de:
- Email exato (case-sensitive não, mas espaços sim)
- Senha exata (maiúsculas/minúsculas fazem diferença)
- localStorage não foi limpo

### Problema: "Ao fazer logout, minha conta desapareceu"
**Solução:** Seus dados estão salvos em localStorage. Basta fazer login novamente.

### Problema: "localStorage está cheio"
**Solução:** localStorage tem ~5-10MB. Com 100 usuários, você usa ~100KB. Não é problema.

### Problema: "Quero resetar tudo"
**Solução:** Abra DevTools (F12) → Console e execute:
```javascript
// Deletar tudo
localStorage.clear();

// Ou deletar específico
localStorage.removeItem('amim_usuarios');
localStorage.removeItem('amim_usuario_logado');
```

---

## 🚀 Próximos Passos (Extensões)

### Fácil (⭐)
- [ ] Adicionar "Lembrar email" com localStorage
- [ ] Botão "Esqueci a senha" (simular reset)
- [ ] Avatar automático com iniciais

### Médio (⭐⭐)
- [ ] Integrar com API backend (Firebase, Supabase)
- [ ] Criptografar senhas com bcryptjs
- [ ] Implementar refresh token

### Avançado (⭐⭐⭐)
- [ ] Autenticação OAuth (Google, GitHub)
- [ ] Two-Factor Authentication (2FA)
- [ ] Biometria (fingerprint)
- [ ] JWT Token com expiração

---

## 💡 Dicas Úteis

### Para Teste Rápido
Crie 3 contas de teste:

**Usuário 1 - Admin**
```
Nome: Ana Clara Silva
Email: admin@test.com
Senha: Admin123
```

**Usuário 2 - Teste**
```
Nome: João da Silva
Email: joao@test.com
Senha: Joao123
```

**Usuário 3 - Demo**
```
Nome: Maria Santos
Email: maria@test.com
Senha: Maria123
```

### Para Demonstração
1. Crie uma conta
2. Faça algumas transferências
3. Vá no Perfil e mostre seus dados
4. Faça logout
5. Faça login novamente para mostrar persistência

---

## 📚 Estrutura de Código

```javascript
// Estados principais
const [estaAutenticado, setEstaAutenticado] = useState(false);
const [usuarioLogado, setUsuarioLogado] = useState(null);

// Funções principais
verificarAutenticacao()    // Valida ao carregar
validarCPF()              // Valida CPF com algoritmo real
validarEmail()            // Valida formato email
handleCadastro()          // Processa novo cadastro
handleLogin()             // Processa login
handleLogout()            // Processa logout

// Persistência
localStorage.setItem()    // Salva dados
localStorage.getItem()    // Recupera dados
```

---

## ✅ Checklist para Usar

- [ ] Copiar código JSX completo
- [ ] Colar em Claude.ai ou seu projeto React
- [ ] Ver tela de login aparecendo
- [ ] Criar uma conta de teste
- [ ] Fazer login com essa conta
- [ ] Testar transferência
- [ ] Testar logout
- [ ] Testar login novamente
- [ ] Verificar no localStorage (F12)
- [ ] ✨ Sistema funcionando!

---

## 🎉 Pronto!

Seu AMIM agora tem um **sistema de autenticação profissional e completamente funcional**!

Qualquer dúvida, consulte este guia ou teste os cenários acima.

**Desenvolvido com ❤️ | AMIM - Seu Banco Digital**
