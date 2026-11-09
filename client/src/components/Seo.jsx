import { useEffect } from 'react';
import { useSite } from '../context/SiteContext.jsx';

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function setCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function setStructuredData(data) {
  let element = document.head.querySelector('script[data-rcore-schema]');

  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.dataset.rcoreSchema = 'true';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

/** Sets the page title, meta tags and structured data. Renders nothing. */
export default function Seo({
  title,
  description,
  type = 'website',
  image = '/favicon.png',
  noIndex = false,
  jsonLd = [],
}) {
  const { settings } = useSite();
  const jsonLdKey = JSON.stringify(jsonLd);

  useEffect(() => {
    const { origin, pathname } = window.location;
    const { siteName } = settings;

    const pageTitle = title ? `${title} | ${siteName}` : `${siteName} | Software House & Digital Solutions`;
    const pageDescription = description || settings.metaDescription;
    const canonicalUrl = `${origin}${pathname}`;
    const imageUrl = `${origin}${image}`;
    const socialLinks = [settings.facebookUrl, settings.instagramUrl, settings.linkedinUrl].filter(Boolean);

    document.title = pageTitle;

    setMeta('name', 'description', pageDescription);
    setMeta('name', 'robots', noIndex ? 'noindex,nofollow' : 'index,follow');
    setMeta('name', 'theme-color', '#fc6e02');

    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', pageDescription);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:site_name', siteName);
    setMeta('property', 'og:image', imageUrl);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', pageDescription);
    setMeta('name', 'twitter:image', imageUrl);

    setCanonical(canonicalUrl);

    setStructuredData({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${origin}/#organization`,
          name: siteName,
          url: origin,
          logo: `${origin}/favicon.png`,
          email: settings.email,
          telephone: settings.phone,
          sameAs: socialLinks,
        },
        {
          '@type': 'WebSite',
          '@id': `${origin}/#website`,
          url: origin,
          name: siteName,
          publisher: { '@id': `${origin}/#organization` },
        },
        {
          '@type': 'WebPage',
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: pageTitle,
          description: pageDescription,
          isPartOf: { '@id': `${origin}/#website` },
          about: { '@id': `${origin}/#organization` },
        },
        ...jsonLd,
      ],
    });
    // jsonLd is tracked through jsonLdKey so a new array each render does not re-run this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, type, image, noIndex, jsonLdKey, settings]);

  return null;
}
