import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useSite } from '../context/SiteContext.jsx';

/** A button that links to an internal route (`to`) or an external address (`href`). */
export function Btn({ to, href, variant = 'primary', children }) {
  const className = `btn btn-${variant}`;

  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

/** Section heading with an optional intro paragraph. */
export function Head({ title, text, wide }) {
  return (
    <header className={`head ${wide ? 'wide' : ''}`}>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </header>
  );
}

/** "Learn more →" style link. */
export function Link2({ to, children }) {
  return (
    <Link className="more" to={to}>
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}

/** Accordion of `{ question, answer }` items. The first one starts open. */
export function Faq({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq">
      {items.map(({ question, answer }, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={question} className={`faq-item ${isOpen ? 'open' : ''}`}>
            <button aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
              {question}
              <ChevronDown size={18} />
            </button>
            {isOpen && <p>{answer}</p>}
          </div>
        );
      })}
    </div>
  );
}

/** Dark call-to-action banner shown at the bottom of most pages. */
export function Cta({
  title = 'Have A Business Problem We Can Solve?',
  text = "Tell us what you're trying to improve. We'll help you explore the right digital solution.",
}) {
  const { settings } = useSite();

  return (
    <section className="section">
      <div className="wrap cta">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-btns">
          <Btn to="/contact" variant="light">
            Start a Conversation
          </Btn>
          <Btn href={`https://wa.me/${settings.whatsappNumber}`} variant="ghost">
            WhatsApp Us
          </Btn>
        </div>
      </div>
    </section>
  );
}
