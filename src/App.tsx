import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Clock3,
  Code2,
  Gauge,
  Gem,
  LayoutTemplate,
  MessageCircle,
  Rocket,
  Sparkles,
} from 'lucide-react'
import heroImage from './assets/one-page-hero.png'
import './App.css'

const whatsappUrl =
  'https://wa.me/5500000000000?text=Oi%2C%20quero%20criar%20um%20site%20one-page%20moderno.'

const benefits = [
  {
    icon: LayoutTemplate,
    title: 'Uma página que vende',
    text: 'Estrutura pensada para apresentar sua oferta, quebrar objeções e levar o visitante ao contato.',
  },
  {
    icon: Gauge,
    title: 'Rápido e responsivo',
    text: 'Layout leve, otimizado para celular e preparado para carregar bem na hospedagem da Vercel.',
  },
  {
    icon: Code2,
    title: 'Código limpo',
    text: 'Projeto em React com organização simples para você evoluir, publicar e ajustar sem dor.',
  },
]

const packages = [
  {
    name: 'Start',
    price: 'R$ 497',
    description: 'Para validar uma oferta com presença profissional.',
    items: ['One-page responsiva', 'Copy base da página', 'Publicação na Vercel'],
  },
  {
    name: 'Pro',
    price: 'R$ 897',
    description: 'Para negócios que querem uma página mais completa e persuasiva.',
    featured: true,
    items: ['Tudo do Start', 'Seções estratégicas extras', 'Animações sutis', 'Ajustes finos de performance'],
  },
  {
    name: 'Launch',
    price: 'R$ 1.497',
    description: 'Para campanhas com mais refinamento visual e acompanhamento.',
    items: ['Tudo do Pro', 'Identidade visual aplicada', 'Integração com formulário', '7 dias de suporte'],
  },
]

const steps = [
  'Briefing rápido para entender serviço, público e objetivo.',
  'Criação do layout moderno com textos focados em conversão.',
  'Desenvolvimento, revisão final, GitHub e deploy na Vercel.',
]

const samples = ['Serviços locais', 'Consultorias', 'Infoprodutos', 'Portfólios']

function App() {
  return (
    <main>
      <nav className="topbar" aria-label="Navegação principal">
        <a className="brand" href="#inicio" aria-label="Vitor Dev">
          <span>V</span>
          Vitor Dev
        </a>
        <div className="nav-links">
          <a href="#beneficios">Benefícios</a>
          <a href="#planos">Planos</a>
          <a href="#processo">Processo</a>
        </div>
        <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          <MessageCircle size={18} />
          Orçamento
        </a>
      </nav>

      <section id="inicio" className="hero">
        <img src={heroImage} alt="" className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">
            <Sparkles size={16} />
            Sites one-page para vender melhor
          </p>
          <h1>Seu negócio com uma página moderna, rápida e pronta para converter.</h1>
          <p className="hero-copy">
            Eu crio landing pages profissionais para prestadores de serviço, projetos digitais e
            negócios locais que precisam sair do improviso e ganhar presença online.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
              Pedir orçamento
              <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="#planos">
              Ver planos
              <ChevronRight size={18} />
            </a>
          </div>
          <div className="proof-row" aria-label="Destaques do serviço">
            <span>
              <BadgeCheck size={18} />
              Deploy na Vercel
            </span>
            <span>
              <Clock3 size={18} />
              Entrega ágil
            </span>
            <span>
              <Rocket size={18} />
              Mobile-first
            </span>
          </div>
        </div>
      </section>

      <section id="beneficios" className="section intro-section">
        <div className="section-heading">
          <p className="section-kicker">O que você recebe</p>
          <h2>Uma página enxuta, bonita e feita para gerar conversa.</h2>
        </div>
        <div className="benefit-grid">
          {benefits.map((benefit) => {
            const Icon = benefit.icon

            return (
              <article className="benefit-card" key={benefit.title}>
                <Icon size={26} />
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="showcase">
        <div className="showcase-copy">
          <p className="section-kicker">Visual de alto impacto</p>
          <h2>Design contemporâneo sem parecer template pronto.</h2>
          <p>
            A página é construída com uma narrativa clara: promessa, benefícios, prova, oferta,
            perguntas frequentes e chamada para ação. Tudo em uma experiência fluida.
          </p>
        </div>
        <div className="mockup-board" aria-label="Exemplos de nichos atendidos">
          {samples.map((sample, index) => (
            <article key={sample} className={`sample-card sample-${index + 1}`}>
              <span>{sample}</span>
              <strong>{index + 2}x</strong>
              <small>mais clareza na oferta</small>
            </article>
          ))}
        </div>
      </section>

      <section id="planos" className="section">
        <div className="section-heading compact">
          <p className="section-kicker">Planos</p>
          <h2>Escolha o nível ideal para o seu lançamento.</h2>
        </div>
        <div className="pricing-grid">
          {packages.map((item) => (
            <article className={item.featured ? 'price-card featured' : 'price-card'} key={item.name}>
              {item.featured ? <span className="popular">Mais escolhido</span> : null}
              <h3>{item.name}</h3>
              <strong>{item.price}</strong>
              <p>{item.description}</p>
              <ul>
                {item.items.map((feature) => (
                  <li key={feature}>
                    <Check size={17} />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                Quero esse
                <ArrowRight size={17} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="processo" className="process-section">
        <div>
          <p className="section-kicker">Processo</p>
          <h2>Do briefing ao site publicado, sem complicar o caminho.</h2>
        </div>
        <div className="timeline">
          {steps.map((step, index) => (
            <article key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contato" className="final-cta">
        <Gem size={34} />
        <h2>Vamos transformar sua oferta em uma página que parece profissional desde o primeiro clique.</h2>
        <p>Me chame com uma ideia do que você vende e eu te retorno com o melhor plano para começar.</p>
        <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
          Chamar no WhatsApp
          <MessageCircle size={19} />
        </a>
      </section>
    </main>
  )
}

export default App
