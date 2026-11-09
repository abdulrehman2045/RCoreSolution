import { Navigate, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import { Btn, Cta, Faq, Head, Link2 } from '../components/UI.jsx';
import { useSite } from '../context/SiteContext.jsx';
import { commonFaqs, processSteps } from '../data/content.js';

// Services recommended on every industry page.
const RECOMMENDED_SERVICE_SLUGS = ['web-development', 'crm-development', 'ai-automation'];

const PAGE_COPY = {
  services: {
    features: 'What is included',
    approach: 'How we approach it',
    cta: 'Discuss This Service',
    title: (name) => `${name} Services`,
    more: 'Other services',
    benefits: ['Built around your workflow', 'Clear scope and plain updates', 'Support after launch'],
  },
  products: {
    features: 'Features',
    approach: 'How teams use it',
    cta: 'Request a Demo',
    title: (name) => `${name} Software`,
    more: 'Other RCore products',
    benefits: ['Faster to adopt than a custom build', 'Configurable to your process', 'Improvements as you grow'],
  },
  industries: {
    features: 'What we build for this sector',
    approach: 'Example workflow',
    cta: 'Discuss Your Business',
    title: (name) => `Software & Website Solutions for ${name}`,
    more: 'Other industries we work with',
    benefits: ['Less manual follow-up', 'One place for customer records', 'More time for customers'],
  },
};

const MAX_DESCRIPTION_LENGTH = 158;

const shorten = (text) => {
  if (text.length <= MAX_DESCRIPTION_LENGTH) return text;
  const cut = text.slice(0, MAX_DESCRIPTION_LENGTH - 1).replace(/\s+\S*$/, '');
  return `${cut}.`;
};

const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

/** The page for a single service, product or industry. */
export default function Detail({ kind }) {
  const { slug } = useParams();
  const site = useSite();

  const items = site[kind];
  const item = items.find((entry) => entry.slug === slug);

  if (!item) return site.ready ? <Navigate to={`/${kind}`} replace /> : null;

  const copy = PAGE_COPY[kind];
  const heading = copy.title(item.name);
  const isIndustry = kind === 'industries';
  const origin = window.location.origin;

  const faqs = [{ question: item.faqQuestion, answer: item.faqAnswer }, ...commonFaqs].filter((faq) => faq.question);
  const otherItems = items.filter((entry) => entry.slug !== slug).slice(0, 3);
  const recommendedServices = isIndustry
    ? site.services.filter((service) => RECOMMENDED_SERVICE_SLUGS.includes(service.slug))
    : [];

  const jsonLd = [
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
        { '@type': 'ListItem', position: 2, name: capitalize(kind), item: `${origin}/${kind}` },
        { '@type': 'ListItem', position: 3, name: item.name, item: `${origin}${item.to}` },
      ],
    },
    kind === 'products'
      ? {
          '@type': 'SoftwareApplication',
          name: item.name,
          description: item.description,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          publisher: { '@id': `${origin}/#organization` },
        }
      : {
          '@type': 'Service',
          name: heading,
          description: item.description,
          provider: { '@id': `${origin}/#organization` },
        },
  ];

  return (
    <>
      <Seo title={heading} description={shorten(`${item.description} ${item.solution}`)} jsonLd={jsonLd} />

      <section className="page-hero">
        <div className="wrap">
          <div>
            <h1>{heading}</h1>
            <p className="lead">{item.description}</p>
            <div className="row">
              <Btn to="/contact">{copy.cta}</Btn>
              <Btn to={`/${kind}`} variant="ghost">
                All {kind}
              </Btn>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <h2>{isIndustry ? 'The challenge' : 'The problem'}</h2>
            <p>{item.problem}</p>
          </div>
          <div className="callout">
            <h2>{isIndustry ? 'How RCore helps' : 'Our solution'}</h2>
            <p>{item.solution}</p>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <Head title={copy.features} />
          <ul className={kind === 'services' ? 'grid3 plain' : 'grid3 plain tight'}>
            {item.features.map((feature) => (
              <li key={feature} className="pill">
                <Check size={16} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {recommendedServices.length > 0 && (
        <section className="section">
          <div className="wrap">
            <Head title="Recommended solutions" />
            <div className="grid3">
              {recommendedServices.map((service) => (
                <article key={service.slug} className="card">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <Link2 to={service.to}>Explore Service</Link2>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <Head title={copy.approach} />
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
        <div className="wrap split">
          <div>
            <h2>Business benefits</h2>
          </div>
          <div className="stack">
            {copy.benefits.map((benefit) => (
              <div key={benefit} className="line">
                <h3>{benefit}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Head title={copy.more} />
          <div className="grid3">
            {otherItems.map((other) => (
              <article key={other.slug} className="card">
                <h3>{other.name}</h3>
                <p>{other.description}</p>
                <Link2 to={other.to}>Learn more</Link2>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap narrow">
          <Head title="Questions we hear" />
          <Faq items={faqs} />
        </div>
      </section>

      <Cta />
    </>
  );
}
