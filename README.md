# 🏭 Kaizen Clicker 

**O Simulador de Gestão Fabril Tycoon!**
Transforme sua linha de produção, invista em metodologias Lean e seja o melhor diretor no nosso **Ranking Global**. Kaizen Clicker não é só um Idle Game, é um software B2B de Business Intelligence voltado para o entretenimento.

---

## 🚀 Funcionalidades Principais

- **📊 Mosaico Triplo-BI**: Gráficos de Radar (Teia), Barras, Pizza e Áreas renderizados em tempo-real usando *Recharts* para acompanhar as métricas financeiras.
- **🤖 Motor Autônomo eKaizen**: Motor Matemático Desacoplado que lida com processamento de cliques e upgrades em loop assíncrono para escalar os cálculos sem gargalar o navegador.
- **🛒 Lojinha Lean**: Compre metodologias como 5S, Kanban, Automação IoT e TPM para dominar a Qualidade (OEE).
- **🏆 Ranking Global**: Integração com Banco de Dados persistente registrando os maiores executivos via `INNER JOIN` para expor o seu OEE no topo!
- **👔 UI Premium Corporativa**: Cores claras, design Apple-like, sombras sutis em CSS nativo focado em usabilidade SaaS (Software As A Service).

---

## 🛠️ Tecnologias e Stack
Este projeto full-stack foi construído seguindo o manual das boas práticas do S.O.L.I.D.
- **Frontend**: React.js 18 + Vite, Recharts para visualização de dados.
- **Backend**: Node.js + Express (Roteamento Seguro + Injeção de Dependência em container).
- **Banco de Dados**: SQLite3 (Para garantir que a aplicação rode *Out of The Box* sem necessidade de Docker ou instâncias cloud).
- **Testes**: `Vitest` para testes da Engine Matemática, Serviços Axio e Mocks de Árvore no React.

---

## ⚙️ Instalação e Execução

### 1. Requisitos Básicos
- Node.js `(LTS v18 ou superior)` instalado na sua máquina.

### 2. Configurando o Back-end
```bash
# Navegue até a pasta raiz
cd kaisen-clicker

# Instale os pacotes e inicialize as dependências
npm install

# Copie o arquivo de propriedades .env e configure se necessário
cp .env.example .env

# O Backend criará o DB na raiz automaticamente com o comando:
npm run dev
```
> O Servidor Node escutará na porta 3000 por padrão.

### 3. Configurando o Front-end
Abra uma **nova janela de terminal** (mantenha o backend vivo):
```bash
# Pule para a interface cliente
cd frontend

# Instale o pacote Recharts e os utilitários React
npm install

# Inicie o cliente no seu Chrome/Edge/Firefox
npm run dev
```
> A aplicação explodirá na sua tela em modo de desenvolvimento Hot Reload (Vite)!

---

## 📈 Padrões de Desenvolvimento

Seguimos os padrões da empresa para manter a manutenibilidade do código:
- **Commits Atômicos**: Cada commit deve representar uma única alteração lógica.
- **Gitmoji**: Utilizamos emojis no início das mensagens de commit para facilitar a leitura visual do histórico.
    - 🎉 `:tada:` (Initial Commit)
    - ✨ `:sparkles:` (Nova Feature)
    - 💄 `:lipstick:` (Mudanças de UI/CSS)
    - 🐛 `:bug:` (Correção de Bugs)
    - ♻️ `:recycle:` (Refatoração)

---

## 💡 Princípios Arquiteturais

A lógica do *Jogo* (matemática dos cliques, probabilidade de refugo e taxas) NÃO roda dentro dos Componentes React! Essa foi a nossa melhor decisão. Tudo foi extraído em forma estrita para o Arquivo `GameEngine.js`, deixando o nosso JSX puramente ocupado apenas com exibir painéis, gráficos e botões.

### Autor e Créditos
Codificado de forma modular visando expansão! Divirta-se subindo ao topo e maximizando suas taxas de aprovação IoT!
