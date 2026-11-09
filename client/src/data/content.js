// Static website content. Services and products now live in the database (see the admin panel).

export const industries = [
  {
    slug: 'education',
    name: 'Education',
    description: 'School management, websites and education technology.',
    icon: 'GraduationCap',
    problem: 'Schools and institutes manage admissions, attendance and fees across paper and messaging apps.',
    solution: 'We connect a clear website with admissions tracking and school management software.',
    features: [
      'School website',
      'Admissions enquiries',
      'Student records',
      'Attendance',
      'Fee management',
      'Parent communication',
    ],
    faqQuestion: 'Which RCore product fits schools?',
    faqAnswer: 'RCore School, paired with a website.',
  },
  {
    slug: 'fitness',
    name: 'Fitness & Gyms',
    description: 'Gym websites, memberships, customer management and automation.',
    icon: 'Dumbbell',
    problem: 'Gyms track memberships by hand and lose enquiries that never get a follow-up.',
    solution: 'A gym website feeds a CRM, memberships are tracked in one place and renewal reminders go out automatically.',
    features: [
      'Gym website',
      'Membership management',
      'Member records',
      'Plans',
      'Attendance',
      'Lead management',
      'WhatsApp follow-ups',
      'Automation',
    ],
    faqQuestion: 'Can renewal reminders be automatic?',
    faqAnswer: 'Yes, through RCore Automation connected to your member records.',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    description: 'Web platforms, appointment systems and business software.',
    icon: 'HeartPulse',
    problem: 'Clinics deal with phone-based booking, missed appointments and paper records.',
    solution: 'We build appointment systems and web platforms that reduce phone load and keep schedules organised.',
    features: [
      'Clinic website',
      'Appointment booking',
      'Patient enquiry forms',
      'Reminders',
      'Staff schedules',
      'Admin reports',
    ],
    faqQuestion: 'Do you handle patient data?',
    faqAnswer: 'We design with privacy in mind and agree data handling requirements before building.',
  },
  {
    slug: 'retail',
    name: 'Retail',
    description: 'Inventory, customers, sales and business management solutions.',
    icon: 'ShoppingBag',
    problem: 'Stock counts drift, and customer history is not recorded anywhere useful.',
    solution: 'We build inventory and sales tools so you always know what is in stock and who your repeat customers are.',
    features: [
      'Inventory tracking',
      'Sales records',
      'Customer database',
      'Supplier records',
      'Low-stock alerts',
      'Sales reports',
    ],
    faqQuestion: 'Can this work with several branches?',
    faqAnswer: 'Yes, we can structure it per branch with combined reporting.',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    description: 'Property websites, lead management and CRM solutions.',
    icon: 'Building2',
    problem: 'Property enquiries come from many channels and agents follow up unevenly.',
    solution: 'A property website and CRM route every enquiry to an agent and track it until it closes.',
    features: [
      'Property listings',
      'Enquiry capture',
      'Lead assignment',
      'Client records',
      'Follow-up reminders',
      'Agent reports',
    ],
    faqQuestion: 'Can listings be updated easily?',
    faqAnswer: 'Yes, through a simple admin area.',
  },
  {
    slug: 'salons',
    name: 'Salons & Beauty',
    description: 'Booking websites, customer management and business automation.',
    icon: 'Scissors',
    problem: 'Appointments are managed by chat, and regular customers are not tracked.',
    solution: 'We build booking websites and customer records that send reminders automatically.',
    features: [
      'Online booking',
      'Service menu',
      'Customer history',
      'Appointment reminders',
      'Staff schedules',
      'Repeat-visit follow-ups',
    ],
    faqQuestion: 'Can customers book on their phone?',
    faqAnswer: 'Yes, booking pages are designed mobile-first.',
  },
  {
    slug: 'restaurants',
    name: 'Restaurants',
    description: 'Websites, ordering experiences and business management tools.',
    icon: 'UtensilsCrossed',
    problem: 'Menus change often, and orders and reservations arrive through too many channels.',
    solution: 'We build menu websites, ordering flows and management tools in one consistent system.',
    features: [
      'Menu website',
      'Online ordering',
      'Reservations',
      'Order tracking',
      'Customer records',
      'Sales reports',
    ],
    faqQuestion: 'Can we update the menu ourselves?',
    faqAnswer: 'Yes, menu editing is part of the admin area.',
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    description: 'Custom websites, CRM and workflow automation.',
    icon: 'Briefcase',
    problem: 'Firms win clients through trust, but track enquiries and client work informally.',
    solution: 'We build credible websites and light CRM and workflow tools for client handling.',
    features: [
      'Firm website',
      'Enquiry forms',
      'Client records',
      'Case or project tracking',
      'Document workflows',
      'Automated reminders',
    ],
    faqQuestion: 'Is this suitable for small firms?',
    faqAnswer: 'Yes, we scale the system to the size of the team.',
  },
];

export const processSteps = [
  {
    title: 'Understand',
    text: 'We learn about your business, users and challenges.',
  },
  {
    title: 'Plan',
    text: 'We define the product structure, features and technical direction.',
  },
  {
    title: 'Design',
    text: 'We create interfaces that are simple, practical and aligned with your brand.',
  },
  {
    title: 'Build',
    text: 'We build and test the solution in stages, with you reviewing progress.',
  },
  {
    title: 'Grow',
    text: 'We provide improvements, support and automation as your business evolves.',
  },
];

export const whyChoose = [
  {
    title: 'We start from the problem',
    text: 'Before any code, we work out what is slowing your team down.',
  },
  {
    title: 'Tools chosen for fit',
    text: 'Technology is picked for your project, not out of habit.',
  },
  {
    title: 'Room to grow',
    text: 'New features get added to the system instead of forcing a rebuild.',
  },
  {
    title: 'Screens people learn fast',
    text: 'Simple layouts so new staff can use the system from day one.',
  },
  {
    title: 'Plain-language updates',
    text: 'Regular progress updates and a scope agreed in writing.',
  },
  {
    title: 'Support after launch',
    text: 'We fix, update and improve the system once it is live.',
  },
  {
    title: 'Built to your workflow',
    text: 'No forcing your team into a ready-made process.',
  },
  {
    title: 'Less repetitive work',
    text: 'We look for manual steps that can be automated safely.',
  },
];

export const commonFaqs = [
  {
    question: 'How do we get started?',
    answer: 'Send an inquiry describing what you want to improve. We reply to discuss scope and next steps.',
  },
  {
    question: 'How is pricing decided?',
    answer: 'It depends on scope. After an initial discussion we share a written proposal.',
  },
];
