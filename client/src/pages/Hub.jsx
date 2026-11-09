import Seo from '../components/Seo.jsx';
import { Cta, Link2 } from '../components/UI.jsx';
import { useSite } from '../context/SiteContext.jsx';
import { getIcon } from '../lib/icons.js';

const HUB_CONTENT = {
  services: {
    title: 'Software, Website, CRM & AI Automation Services',
    text: 'Software development, website development, CRM, ERP, SaaS, AI automation, UI/UX design and support, delivered by one team.',
    description:
      'Software, website, CRM, ERP, SaaS and AI automation services from RCore Solutions, built around how your business already works.',
  },
  products: {
    title: 'Business Software: CRM, ERP & School Management',
    text: 'Ready-to-use business software for sales, operations, schools and automation.',
    description:
      'RCore CRM, ERP, School, Business and Automation software for growing companies. Faster to adopt than a custom build.',
  },
  industries: {
    title: 'Software & Website Solutions by Industry',
    text: 'Every sector has its own workflow. Here is how we apply software and websites to yours.',
    description:
      'Websites and software for schools, gyms, clinics, retail, real estate, salons, restaurants and professional services.',
  },
};

/** The list page for services, products or industries. */
export default function Hub({ kind }) {
  const site = useSite();
  const { title, text, description } = HUB_CONTENT[kind];
  const items = site[kind];

  return (
    <>
      <Seo title={title} description={description} />

      <section className="page-hero">
        <div className="wrap">
          <h1>{title}</h1>
          <p className="lead">{text}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid3">
          {items.map((item) => {
            const Icon = getIcon(item.icon);

            return (
              <article key={item.slug} className="card">
                <Icon className="ic" />
                <h2 className="h3">{item.name}</h2>
                <p>{item.description}</p>
                <Link2 to={item.to}>Learn more</Link2>
              </article>
            );
          })}
        </div>
      </section>

      <Cta />
    </>
  );
}
