# Crypto Market Desk

Painel web para acompanhar cotações de criptomoedas em tempo real, com visual limpo, alternância entre BRL/USD e uma leitura rápida dos principais indicadores do mercado.

![Topo do painel de cotação de criptomoedas](docs/dashboard-top.png)

## Acesse

Produção: [https://crypto-market-desk.vercel.app/](https://crypto-market-desk.vercel.app/)

## Recursos

- Cotações em tempo real usando a CoinGecko Markets API
- Alternância entre valores em reais e dólares
- Valor secundário exibido em tamanho reduzido para comparação rápida
- Cards de resumo com market cap, volume 24h e variação média
- Destaque para as principais criptomoedas por valor de mercado
- Tabela com busca, preço, volume, market cap e tendência de 7 dias
- Layout responsivo com fundo visual em doodle pattern

## Stack

- React
- TypeScript
- Vite
- CSS
- lucide-react
- Vercel

## Rodando Localmente

```bash
npm install
npm run dev
```

Depois acesse:

```text
http://127.0.0.1:5173
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Deploy

O projeto está configurado para deploy na Vercel.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

Deploy manual:

```bash
vercel --prod
```

## Próxima Etapa: AWS

Para hospedar este frontend estático na AWS, o caminho recomendado é:

- S3 para armazenar os arquivos gerados em `dist`
- CloudFront como CDN
- ACM para certificado TLS
- Route 53 para DNS, se o domínio estiver na AWS

Quando o projeto evoluir para alertas, cache, carteira de usuário ou autenticação, podemos adicionar uma API com Lambda/API Gateway ou migrar para um backend dedicado.
