# ✈️ Aura Travel — Sistema de Reservas & Viagens de Alto Padrão

[![Deploy com Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://aura-travel-one.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Aura--Travel-181717?style=for-the-badge&logo=github)](https://github.com/Luskinha01-cyber/Aura-Travel)
[![React 19](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

> 🌐 **Acesse a aplicação em produção:** [https://aura-travel-one.vercel.app](https://aura-travel-one.vercel.app)

Plataforma moderna e imersiva para descoberta de destinos globais, consulta de condições meteorológicas em tempo real, navegação em mapas interativos georreferenciados e simulação completa de reservas hoteleiras com emissão instantânea de vouchers.

![Aura Travel Preview](public/images/logo.png)

---

## 🌟 Principais Funcionalidades

* 🧭 **Exploração de Destinos Curados:** Experiências de viagem de luxo categorizadas (*Praias & Ilhas*, *Montanhas & Neve*, *Refúgios & Romance*, *Gastronomia & Vinhos*, *Cidades & Cultura*).
* ⛅ **Clima em Tempo Real:** Integração ao vivo com a API global **Open-Meteo** (temperatura, vento, umidade, índice UV e condições climáticas instantâneas sem necessidade de chaves pagas).
* 🗺️ **Mapas Interativos Split-View:** Visualização integrada via **Leaflet & OpenStreetMap / Esri World Street**, com alternador de camadas cartográficas e marcadores interativos de hotéis.
* 🏨 **Simulação Completa de Reservas:**
  * Seleção dinâmica de datas com cálculo automático de diárias.
  * Escolha de acomodações (*Standard*, *Deluxe*, *Suíte Presidencial*).
  * Simulação de pagamentos via PIX instantâneo (com chave cópia-e-cola e QR Code interativo) e Cartão de Crédito.
  * Validações de formulário em tempo real.
* 🎫 **Emissão de Voucher Oficial:**
  * Código de reserva único criptografado.
  * Opções de download de evento de calendário (.ics) e impressão direta formatada.
* 🌓 **Modo Claro & Escuro (Dark Mode):** Alternador fluido com paleta de cores harmonizada com a identidade visual da marca.
* 💾 **Persistência Local (LocalStorage):** Painel *Minhas Reservas* para visualização, conferência e cancelamento de viagens agendadas.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React 19 + Vite
* **Ícones & Estilo:** Lucide React + CSS puro moderno (Design System customizado com glassmorphism e micro-animações)
* **Mapas:** Leaflet.js + OpenStreetMap + Esri
* **Previsão do Tempo:** Open-Meteo API
* **Efeitos Visuais:** Canvas Confetti

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
* `npm` ou `yarn`

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Luskinha01-cyber/Aura-Travel.git
   cd Aura-Travel
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   ```
   http://localhost:5173/
   ```

---

## 📁 Estrutura do Projeto

```
sistema-reservas-viagens/
├── public/
│   ├── favicon.svg              # Favicon SVG oficial de alto contraste
│   └── images/                  # Ativos públicos e logotipos
├── src/
│   ├── assets/images/           # Imagens e marcas compiladas pelo Vite
│   ├── components/              # Componentes da interface
│   │   ├── AuraLogo.jsx         # Componente de marca oficial
│   │   ├── Header.jsx           # Cabeçalho com navegação e tema
│   │   ├── SearchBar.jsx        # Barra de pesquisa e filtro de categorias
│   │   ├── DestinationCard.jsx  # Cartões de destinos com clima ao vivo
│   │   ├── InteractiveMap.jsx   # Mapa interativo com Leaflet
│   │   ├── BookingModal.jsx     # Fluxo completo de reserva
│   │   ├── MyBookingsModal.jsx  # Gerenciador de reservas salvas
│   │   └── VoucherModal.jsx     # Voucher de viagem para impressão
│   ├── data/                    # Catálogo curado de destinos e hotéis
│   ├── services/                # Integrações (Open-Meteo, Geocoding, Storage)
│   ├── App.jsx                  # Orquestrador da aplicação
│   └── index.css                # Sistema de design tokens e estilos globais
└── index.html                   # HTML base da aplicação
```

---

## 👨‍💻 Autor & Créditos
Desenvolvido por **Lucas dos Anjos** ([@Luskinha01-cyber](https://github.com/Luskinha01-cyber)).
* **GitHub:** [https://github.com/Luskinha01-cyber/Aura-Travel](https://github.com/Luskinha01-cyber/Aura-Travel)
* **Demo ao Vivo:** [https://aura-travel-one.vercel.app](https://aura-travel-one.vercel.app)

---

## 📄 Licença
Distribuído sob a licença MIT. Consulte `LICENSE` para mais informações.
