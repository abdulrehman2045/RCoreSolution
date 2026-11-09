import { Check } from 'lucide-react';
import HeroFlow from '../components/HeroFlow.jsx';
import Reviews from '../components/Reviews.jsx';
import Seo from '../components/Seo.jsx';
import { Btn, Cta, Head, Link2 } from '../components/UI.jsx';
import { useSite } from '../context/SiteContext.jsx';
import { processSteps, whyChoose } from '../data/content.js';
import { getIcon } from '../lib/icons.js';

const HERO_CHIPS = ['Custom Software', 'Business Websites', 'CRM & ERP', 'AI Automation'];

const WORKFLOW_POINTS = [
  { title: 'Problem first', text: 'We ask what is slowing you down before we talk about tech.' },
  { title: 'Room to grow', text: 'Built so you can add to it later, not throw it away.' },
  { title: 'We pick up the phone', text: 'Support does not end on launch day.' },
];

// These cards are shown wider in the services grid.
const WIDE_CARD_INDEXES = [0, 3];

export default function Home() {
  const { settings, services, products, industries } = useSite();

  return (
    <>
      <Seo
        title="Software House for Websites, CRM, ERP & AI Automation"
        description={settings.metaDescription}
      />

      <section className="hero">
        <HeroFlow />
        <div className="wrap hero-in">
          <div>
            <h1>{settings.heroTitle}</h1>
            <p className="lead">{settings.heroSubtitle}</p>
            <div className="row">
              <Btn to="/contact">Start a Project</Btn>
              <Btn to="/services" variant="ghost">
                Explore Our Solutions
              </Btn>
            </div>
            <ul className="chips">
              {HERO_CHIPS.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <h2>Your workflow comes first. The code comes after.</h2>
            <p>
              You already have a way of working: how enquiries come in, who follows up, how orders get tracked. We
              start there, and build around it instead of forcing you into some bloated system.
            </p>
          </div>
          <div className="stack">
            {WORKFLOW_POINTS.map((point) => (
              <div key={point.title} className="line">
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <Head
            title="Website, Software & Automation Services"
            text="From a business website to custom CRM and ERP systems, we cover the digital work growing companies usually need."
          />
          <div className="bento">
            {services.map((service, index) => {
              const Icon = getIcon(service.icon);
              const isWide = WIDE_CARD_INDEXES.includes(index);

              return (
                <article key={service.slug} className={`card ${isWide ? 'span2' : ''}`}>
                  <Icon className="ic" />
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <Link2 to={service.to}>Explore Service</Link2>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Head
            title="Ready-Made Business Software"
            text="CRM, ERP, school management and automation tools you can start using without waiting for a full custom build."
          />
          {products.map((product) => (
            <div key={product.slug} className="feature">
              <div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <ul className="tick">
                  {product.features.slice(0, 4).map((feature) => (
                    <li key={feature}>
                      <Check size={15} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link2 to={product.to}>View {product.name}</Link2>
              </div>
            </div>
          ))}
          <div className="center">
            <Btn to="/products" variant="ghost">
              Explore All Products →
            </Btn>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <Head
            title="Software Solutions for Your Industry"
            text="Schools, gyms, clinics, shops, salons, restaurants and agencies each work differently. We build for that."
          />
          <div className="grid4">
            {industries.map((industry) => (
              <article key={industry.slug} className="card">
                <h3>{industry.name}</h3>
                <p>{industry.description}</p>
                <Link2 to={industry.to}>View Solution</Link2>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Head title="How Our Software Projects Work" />
          <ol className="steps">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <Head title="Why Businesses Choose RCore Solutions" />
          <div className="grid4">
            {whyChoose.map((reason) => (
              <div key={reason.title} className="line">
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews />
      <Cta />
    </>
  );
}
