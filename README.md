# Crypto Quotes Dashboard

Painel web para acompanhar cotacoes de criptomoedas em tempo real, criado com React, TypeScript e Vite.

## Stack

- React + TypeScript
- Vite
- CoinGecko Markets API
- Vercel para deploy inicial
- AWS prevista para a proxima etapa de hospedagem/infra

## Rodando localmente

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## GitHub

Este diretorio ja pode ser versionado com Git. Para criar o repositorio remoto:

```bash
git init
git add .
git commit -m "Initial crypto dashboard"
```

Depois crie um repositorio no GitHub e conecte:

```bash
git remote add origin https://github.com/SEU_USUARIO/crypto-quotes-dashboard.git
git branch -M main
git push -u origin main
```

Se o GitHub CLI estiver instalado e autenticado, o fluxo mais rapido e:

```bash
gh repo create crypto-quotes-dashboard --public --source=. --remote=origin --push
```

## Vercel

Deploy atual:

```text
https://crypto-quotes-dashboard.vercel.app
```

Build command:

```bash
npm run build
```

Output directory:

```bash
dist
```

Deploy via CLI:

```bash
vercel
vercel --prod
```

## Proxima etapa AWS

Para hospedar na AWS, o caminho mais simples para este frontend estatico e:

- S3 para armazenar os arquivos gerados em `dist`
- CloudFront como CDN
- ACM para certificado TLS
- Route 53 para DNS, se o dominio estiver na AWS

Quando o projeto precisar de cache, alertas ou carteira de usuario, podemos adicionar uma API em Lambda/API Gateway ou migrar para uma arquitetura com backend dedicado.
