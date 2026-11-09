import { industries } from '../data/content.js';

const companyItems = [
  { name: 'About RCore', description: 'Our story, beliefs and mission.', to: '/about', icon: 'Building2' },
  { name: 'Our Process', description: 'Five steps from first call to ongoing support.', to: '/company/process', icon: 'Workflow' },
  { name: 'Our Approach', description: 'Understand, design, build, improve.', to: '/about#approach', icon: 'PenTool' },
  { name: 'Careers', description: 'Work with us.', to: '/company/careers', icon: 'Users' },
  { name: 'Contact', description: 'Start a conversation.', to: '/contact', icon: 'LifeBuoy' },
];

/** The navbar mega menus. Services and products come from the database. */
export function buildMenus({ services, products }) {
  return {
    Services: {
      title: 'What We Build',
      description: 'Digital solutions designed around the way your business actually works.',
      to: '/services',
      cta: 'All services',
      items: services,
    },
    Products: {
      title: 'RCore Products',
      description: 'Ready-to-use business software designed to simplify everyday operations.',
      to: '/products',
      cta: 'Explore Products',
      items: products,
    },
    Industries: {
      title: 'Solutions For Your Industry',
      description: 'See how we apply software and websites to the way your sector works.',
      to: '/industries',
      cta: 'All industries',
      items: industries,
    },
    Company: {
      title: 'Company',
      description: 'Who we are and how we work with clients.',
      to: '/about',
      cta: 'About RCore',
      items: companyItems,
    },
  };
}
