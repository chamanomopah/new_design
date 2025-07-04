# Plano de Arquitetura e Design - Redesign do App Myuze
# Plano de Arquitetura e Design - Redesign do App Myuze

## 1. Visão Geral do Projeto
O objetivo deste projeto é clonar com máxima fidelidade os novos designs do Figma para os fluxos de **Autenticação (Sign-in/Sign-up)** e **Onboarding**, gerando componentes e telas em React Native. O resultado deve ser código limpo, componentizado e pronto para integração com a lógica de negócio existente.

## 2. Arquitetura e Stack Tecnológica
- **Framework Principal:** React Native com Expo (SDK 52+).
- **Linguagem:** TypeScript.
- **Estilização:** **NativeWind** será a única fonte para estilização. Todos os estilos devem ser aplicados via classes utilitárias.
- **Estrutura de Arquivos:** Todo o novo código será gerado em um **novo diretório na raiz do projeto chamado `MyuzeRedesign/`**. A estrutura interna será:
    - `MyuzeRedesign/screens/` para todas as novas telas.
    - `MyuzeRedesign/components/` para todos os novos componentes reutilizáveis.
- **Gerenciamento de Formulários:** Use `react-hook-form` e `zod` como referência dos arquivos existentes.

## 3. Filosofia do Sistema de Design (Padrões Visuais Globais)
*(O restante deste arquivo permanece o mesmo, com a análise técnica e os padrões de design)*

- **Estilo Geral:** O design é limpo, minimalista e moderno, com uso generoso de espaço em branco.
- **Cantos Arredondados:** Todos os elementos interativos principais (botões, inputs, cartões de seleção) possuem um `borderRadius` consistentemente alto, criando uma estética suave e amigável. Isso deve ser um token de design aplicado globalmente.
- **Paleta de Cores:**
  - **Primária:** Um azul escuro, quase preto (`#1a1a1a` ou similar, a ser extraído do Figma) para botões de ação principais e texto de alto contraste.
  - **Secundária (Fundo):** Um branco suave/cinza muito claro para o fundo das telas e dos cartões.
  - **Texto:** Use a cor primária para títulos e um cinza mais suave para texto de suporte e placeholders.
  - **Gradiente de Acento:** Um gradiente proeminente de azul para roxo é usado exclusivamente na barra de progresso do onboarding para indicar avanço.
- **Hierarquia de Tipografia:**
  - **Títulos (`What's Your Style?`):** Fonte grande e com peso (ex: `font-bold`).
  - **Subtítulos (`AI will recommend...`):** Fonte de tamanho médio, com peso normal.
  - **Corpo/Labels (`Casual/Streetwear`):** Fonte padrão com peso normal a semi-bold.

## 4. Análise Técnica dos Componentes (Especificações para o Agente)

### Componentes de Autenticação (B000-B110)
- **Botões Sociais (`Continue with Google`):** Devem ser componentes `Button` com uma variante "social", contendo um ícone (`@expo/vector-icons`) à esquerda e um texto centralizado. A borda é sutil.
- **Input de Texto Padrão:** Um componente `Input` com padding interno generoso, fundo branco, borda sutil e cantos altamente arredondados. O estado de foco deve ser indicado por uma mudança na cor da borda.
- **Input de OTP (B100):** Este é um componente para verificação de código. Deve ser implementado como um grupo de 4 `TextInput` individuais, estilizados como caixas separadas. O foco deve saltar automaticamente para o próximo input após a digitação. Alternativamente, use uma biblioteca como `react-native-otp-textinput` e estilize-a para corresponder ao design.

### Componentes de Onboarding (C000-C201)
- **Barra de Progresso (C000 em diante):** Um componente `ProgressBar` que consiste em um contêiner de trilha cinza claro e uma barra de preenchimento que utiliza o **gradiente de acento** (azul-roxo). Deve aceitar `props` para o passo atual e o total de passos (ex: `step={1} totalSteps={4}`).
- **Seleção de Gênero (C000):** Implemente como um componente `SegmentedControl` ou `RadioGroup` personalizado. São dois botões lado a lado; o botão selecionado tem uma cor de fundo e texto distintas.
- **Seletor de Data (C000):** O campo "Date of birth" deve acionar um modal com um seletor de data nativo. Use `@react-native-community/datetimepicker` ou um equivalente do Expo.
- **Seletor de Tom de Pele (C100/C101):** Componente crucial. Implemente como um **slider horizontal**. O trilho do slider (`track`) deve ser preenchido com um `LinearGradient` (da `expo-linear-gradient`) que vai do tom de pele mais claro ao mais escuro, extraídos do Figma. O marcador (`thumb`) deve ser um círculo simples. Bibliotecas como `@react-native-community/slider` podem ser usadas como base, mas a estilização precisa ser pesada para corresponder ao design.
- **Cartões de Seleção (C200/C201):** Componente `SelectableCard`. É um cartão com cantos arredondados, contendo uma imagem à esquerda e texto (título e descrição) à direita. A seleção deve ser indicada visualmente, por exemplo, mudando a cor da borda para a cor primária ou adicionando um ícone de "check". Deve suportar tanto seleção única quanto múltipla via `props`.