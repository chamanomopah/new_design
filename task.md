# Checklist de Execução - Redesign do App Myuze (em Diretório Isolado)

## Objetivo
Gerar o código para cada tela de forma completa e sequencial em um diretório isolado (`MyuzeRedesign/`). Marque cada tarefa principal como concluída (`- [x]`) somente após a finalização de todas as suas sub-tarefas.

### - [x] Pré-requisito: Configuração do Ambiente
- [x] Criar a estrutura de pastas inicial na raiz do projeto: `MyuzeRedesign/screens/` e `MyuzeRedesign/components/ui/`.

### - [x] Etapa 1: Implementar Tela de Sign Up (B000)
- [x] **Extrair Dados do Figma:** @mcp_framerlink.get_data(url="https://www.figma.com/design/5IpgKEIISKlfqsaxi8YnTl/Myuze-App---Redesign?node-id=146-30185")
- [x] **Criar Arquivo:** Gerar o arquivo `MyuzeRedesign/screens/SignUpScreen.tsx`.
- [x] **Desenvolver UI:** Construir a UI completa e funcional da tela de Sign Up.

### - [x] Etapa 2: Implementar Tela de Verificação de Código (B100/B110)
- [x] **Extrair Dados do Figma:** @mcp_framerlink.get_data(url="https://www.figma.com/design/5IpgKEIISKlfqsaxi8YnTl/Myuze-App---Redesign?node-id=23-669") e @mcp_framerlink.get_data(url="https://www.figma.com/design/5IpgKEIISKlfqsaxi8YnTl/Myuze-App---Redesign?node-id=23-687")
- [x] **Criar Arquivo:** Gerar o arquivo `MyuzeRedesign/screens/VerifyCodeScreen.tsx`.
- [x] **Desenvolver UI:** Construir a UI completa, implementando o componente de input OTP.

### - [x] Etapa 3: Implementar Onboarding - "Let's Get to Know You" (C000)
- [x] **Extrair Dados do Figma:** @mcp_framerlink.get_data(url="https://www.figma.com/design/5IpgKEIISKlfqsaxi8YnTl/Myuze-App---Redesign?node-id=23-952")
- [x] **Criar Arquivo:** Gerar o arquivo `MyuzeRedesign/screens/OnboardingStep1Screen.tsx`.
- [x] **Desenvolver UI:** Construir o formulário completo, `ProgressBar` e botões.

### - [x] Etapa 4: Implementar Onboarding - "Help Us Find Your Fit" (C100/C101)
- [x] **Extrair Dados do Figma:** @mcp_framerlink.get_data(url="https://www.figma.com/design/5IpgKEIISKlfqsaxi8YnTl/Myuze-App---Redesign?node-id=30-27650")
- [x] **Criar Arquivo:** Gerar o arquivo `MyuzeRedesign/screens/OnboardingStep2Screen.tsx`.
- [x] **Desenvolver UI:** Implementar o slider de tom de pele, seletores e área de upload.

### - [ ] Etapa 5: Implementar Onboarding - "What's Your Style?" (C200/C201)
- [ ] **Extrair Dados do Figma:** @mcp_framerlink.get_data(url="https://www.figma.com/design/5IpgKEIISKlfqsaxi8YnTl/Myuze-App---Redesign?node-id=30-28236")
- [ ] **Criar Arquivo:** Gerar o arquivo `MyuzeRedesign/screens/OnboardingStep3Screen.tsx`.
- [ ] **Desenvolver UI:** Implementar a lista de cartões de estilo selecionáveis.

### - [ ] Etapa 6: Implementar Onboarding - "What's Your Body Shape?" (C200)
- [ ] **Extrair Dados do Figma (Ambas as Variantes):** @mcp_framerlink.get_data(url="https://www.figma.com/design/5IpgKEIISKlfqsaxi8YnTl/Myuze-App---Redesign?node-id=268-1959") e @mcp_framerlink.get_data(url="https://www.figma.com/design/5IpgKEIISKlfqsaxi8YnTl/Myuze-App---Redesign?node-id=268-1866")
- [ ] **Criar Arquivo:** Gerar o arquivo `MyuzeRedesign/screens/OnboardingStep4Screen.tsx`.
- [ ] **Desenvolver UI:** Implementar a lista de cartões de formato corporal selecionáveis.

---

## Backlog / Descobertas Mid-Processo
*<!-- Adicionar aqui quaisquer problemas ou tarefas inesperadas. -->*
- Precisamos criar componentes reutilizáveis para os ícones e botões sociais
- É necessário configurar o ambiente antes de continuar: package.json, tailwind.config.js e babel.config.js
- Criado componente reutilizável OtpInput para a tela de verificação
- Criados componentes reutilizáveis ProgressBar e GenderSelector para os fluxos de onboarding
- Foi implementado direto o slider de tom de pele na tela OnboardingStep2Screen devido às interdependências com o resto da UI, em vez de criar um componente separado