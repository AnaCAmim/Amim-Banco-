# 🚀 AMIM v2.0 - Quick Start Guide

## ⚡ 30 segundos para começar

### 1. Claude.ai (Mais Rápido)
```
1. Vá para claude.ai
2. Cole `amim_banco_digital_completo.jsx`
3. Clique "Create"
4. ✅ Pronto!
```

### 2. Your React Project
```bash
npm install lucide-react
# Cole o arquivo em src/components/
# Importe e use
```

---

## 🎮 Testar Imediatamente

### Criar Conta de Teste
```
Nome: Ana Clara Silva
Email: ana@test.com
CPF: 123.456.789-00  (válido!)
Telefone: (85) 98888-7777
Senha: Teste123
```

### Fazer Transferência
```
1. Home → Enviar
2. Nome: João Silva
3. CPF: 12345678901
4. Valor: 100.00
5. Transferir ✨
```

### Verificar Persistência
```
1. Abra DevTools (F12)
2. Console
3. localStorage.getItem('amim_usuarios')
4. Ver dados salvos!
```

---

## 🔑 Principais Funcionalidades

| Feature | Como Usar |
|---------|-----------|
| **Criar Conta** | Clique "Criar Conta Gratuita" na tela de login |
| **Fazer Login** | Digite email e senha |
| **Ver Saldo** | Home → Saldo principal |
| **Ocultar Saldo** | Clique no ícone de olho |
| **Cartão** | Clique para flipar e ver CVV |
| **Transferir** | Home → Enviar → Preencher → Confirmar |
| **Extrato** | Bottom nav → Extrato |
| **Investimentos** | Bottom nav → Investir |
| **Perfil** | Bottom nav → Perfil |
| **Logout** | Perfil → Sair da Conta |

---

## 🧪 CPF de Teste

Use este CPF válido para testes:
```
123.456.789-00
```

Ou gere um aqui: https://www.4devs.com.br/gerador_cpf

---

## 📱 Responsivo?

✅ **Sim!** Funciona perfeitamente em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

Teste redimensionando a janela!

---

## 💾 Dados Salvos Onde?

**localStorage do navegador**

Para verificar:
```javascript
// F12 → Console
localStorage.getItem('amim_usuarios')
localStorage.getItem('amim_usuario_logado')
localStorage.getItem('amim_transacoes_1705334400000')
```

---

## 🔒 Segurança

✅ **Para Demo/Educação:** Está OK
❌ **Para Produção:** Precisa de backend + HTTPS

---

## 🎨 Customizar Cores

Busque no código por:
```
#8b5cf6 (Roxo principal)
#667eea (Roxo login)
#764ba2 (Roxo login gradient)
```

E substitua pela cor desejada.

---

## 📊 O que Mudou vs v1.0

```
v1.0 (Original)        v2.0 (Novo)
├─ 1 usuário           ├─ Múltiplos usuários
├─ Sem login           ├─ Login funcional
├─ Sem cadastro        ├─ Cadastro funcional
├─ Dados perdidos      ├─ Dados persistem
├─ SEM validações      └─ CPF/Email/Senha validados
```

---

## ❓ FAQs Rápidos

**P: Onde meus dados estão?**
R: localStorage do navegador (F12 → Application → localStorage)

**P: Meus dados sumiram!**
R: Verifique se limpou o localStorage. Está acessível em F12.

**P: Posso testar em mobile?**
R: Sim! Use o DevTools mobile (F12 → Ctrl+Shift+M)

**P: Preciso de backend?**
R: Não para demo. Sim para produção.

**P: Funciona offline?**
R: Sim! localStorage funciona offline.

**P: Como resetar dados?**
R: F12 → Console → `localStorage.clear()`

---

## 🚀 Próximo: Backend (Opcional)

Para versão profissional, integre com:
- Firebase (fácil)
- Supabase (fácil)
- Node.js + Postgres (completo)

---

## ⭐ Tips & Tricks

### Auto-Login
Se lembrar do email, ao recarregar já entra automaticamente!

### Transações por Usuário
Cada usuário vê suas próprias transações.

### Saldo Atualizado
Ao fazer logout/login, saldo persiste.

### Múltiplas Contas
Crie várias contas e alterne entre elas.

---

## 📞 Suporte Rápido

**Erro de validação?** → Leia a mensagem (bem específica!)
**Dados não salvam?** → localStorage pode estar desabilitado
**Tela de login presa?** → F12 → Console → Check localStorage

---

## ✅ Checklist de Verificação

- [ ] Criou uma conta?
- [ ] Conseguiu fazer login?
- [ ] Viu o saldo aparecer?
- [ ] Clicou no cartão?
- [ ] Fez uma transferência?
- [ ] Viu no extrato?
- [ ] Fez logout?
- [ ] Conseguiu fazer login novamente?
- [ ] Dados persistiram?

Se todos ✅ → **Sistema 100% funcional!**

---

## 🎁 Bônus: Comandos Console

```javascript
// Ver todos os usuários
JSON.parse(localStorage.getItem('amim_usuarios'))

// Ver usuário logado
JSON.parse(localStorage.getItem('amim_usuario_logado'))

// Ver transações do user
const u = JSON.parse(localStorage.getItem('amim_usuario_logado'))
JSON.parse(localStorage.getItem(`amim_transacoes_${u.id}`))

// Limpar tudo
localStorage.clear()

// Deletar só usuários
localStorage.removeItem('amim_usuarios')
```

---

## 🎉 You're All Set!

Seu AMIM está **100% funcional** com autenticação completa.

Divirta-se! 🚀

---

**AMIM v2.0** | Seu Banco Digital | © 2024
