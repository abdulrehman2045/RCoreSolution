import Seo from '../components/Seo.jsx';
import { Btn, Cta, Head } from '../components/UI.jsx';
import { processSteps } from '../data/content.js';

export function Process() {
  return (
    <>
      <Seo
        title="Our Software Development Process"
        description="See how RCore Solutions takes a website or software project from first conversation through design, development, launch and ongoing support."
      />

      <section className="page-hero">
        <div className="wrap">
          <h1>Our Process</h1>
          <p className="lead">Five steps, with clear communication at each one.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
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

      <Cta />
    </>
  );
}

export function Careers() {
  return (
    <>
      <Seo
        title="Careers for Developers & Designers"
        description="Developers and designers who care about practical business software can send their details to RCore Solutions."
      />

      <section className="page-hero">
        <div className="wrap">
          <h1>Careers</h1>
          <p className="lead">We're always interested in developers and designers who care about practical software.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <Head
            title="Open positions"
            text="There are no open roles listed right now. Send us your details and what you like to work on, and we'll keep them on file."
          />
          <Btn to="/contact">Get in touch</Btn>
        </div>
      </section>
    </>
  );
}
