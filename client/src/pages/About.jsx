import Seo from '../components/Seo.jsx';
import { Cta, Head } from '../components/UI.jsx';

const WHAT_WE_BUILD = ['Websites', 'Business Software', 'CRM', 'ERP', 'SaaS', 'AI Automation', 'Custom Systems'];
const APPROACH_STEPS = ['Understand', 'Design', 'Build', 'Improve'];

export default function About() {
  return (
    <>
      <Seo
        title="About Our Software House"
        description="RCore Solutions designs and builds websites, business software, CRM, ERP and automation for companies that want systems that fit their workflow."
      />

      <section className="page-hero">
        <div className="wrap">
          <h1>About RCore Solutions</h1>
          <p className="lead">A software house focused on building practical digital solutions for businesses.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <h2>Who We Are</h2>
            <p>
              RCore Solutions is a software house that designs and builds business websites, custom software, CRM and
              ERP systems, and automation. We work with owners and teams who want their systems to fit their business,
              not the other way round.
            </p>
          </div>
          <div>
            <h2>What We Believe</h2>
            <p>Software should remove work, not add to it. If a simple tool solves your problem, we will tell you so.</p>
          </div>
        </div>
      </section>

      <section id="approach" className="section alt">
        <div className="wrap">
          <Head title="Our Approach" />
          <div className="grid4">
            {APPROACH_STEPS.map((step, index) => (
              <div key={step} className="line">
                <h3>
                  {index + 1}. {step}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>What We Build</h2>
          <ul className="tags">
            {WHAT_WE_BUILD.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap split">
          <div className="callout">
            <h2>Our Vision</h2>
            <p>Help businesses get a real, practical advantage from the technology they use.</p>
          </div>
          <div className="callout">
            <h2>Our Mission</h2>
            <p>Build reliable websites and software around real business needs.</p>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
