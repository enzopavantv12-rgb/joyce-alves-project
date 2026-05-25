# Joyce Alves — Landing Page Premium

## Stack Tecnológica
- **Vite** (Build tool)
- **React 18** + TypeScript
- **Tailwind CSS 3.4+**
- **Framer Motion** (Animações de entrada e revelação)
- **Lucide React** (Ícones)
- **Embla Carousel React** (Carrosséis de Antes/Depois e Depoimentos)
- **react-intersection-observer** (Para disparar animações de scroll)

## Instalação e Execução

1. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

2. Gere os placeholders (caso ainda não estejam criados):
\`\`\`bash
node create-placeholders.js
\`\`\`

3. Inicie o servidor de desenvolvimento:
\`\`\`bash
npm run dev
\`\`\`

## Substituição de Assets

Todos os assets temporários estão em \`public/placeholders/\`.
Quando os ativos finais estiverem prontos, basta substituir os arquivos na mesma pasta mantendo os mesmos nomes, ou atualizar os caminhos nos componentes:

- \`hero-video.mp4\`: Vídeo vertical de background do Hero (ideal: 1080x1920)
- \`joyce-portrait.jpg\`: Foto profissional (ideal: retrato vertical 600x800)
- \`treatment-*.jpg\`: Imagens dos tratamentos (ideal: retrato vertical 3:4)
- \`before-after-*-{before|after}.jpg\`: Pares de antes e depois
- \`environment-*.jpg\`: Imagens do ambiente da clínica

## Estilo e Design System
O projeto utiliza um design system de **Quiet Luxury** focado em bem-estar premium:
- Cores focadas em neutros quentes (Cream, Ivory, Nude, Cocoa) com acentos em Gold.
- Tipografia: *Cormorant Garamond* para Display (elegância) e *Inter* para Body (legibilidade).
- Uso abundante de *white space* para transmitir calma e sofisticação.
- Sombras suaves e bordas minimalistas.
- Animações Framer Motion fluidas (ease-out longo com stagger).
