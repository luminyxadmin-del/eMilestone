import type {
  NavGroup,
  Sector,
  ServiceOffering,
  ProcessStep,
  ValuePillar,
  TeamMember,
  Stat,
  FaqItem,
  Testimonial,
  OfficeLocation,
  CsrPillar,
  Benefit,
  HomeDifference,
  RecruiterComparison,
  ClientOutcome,
} from '@/types';

export const site = {
  name: 'eMilestones',
  legalName: 'eMilestones Executive Search',
  tagline: 'Empowering your business through executive **talent**',
  description:
    'eMilestones Executive Search connects world-class leadership with premier organizations across technology, healthcare, financial services, consumer, industrial and energy sectors.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://milestones-executive.com',
  email: 'career@emilestones.net',
  phone: '022-4079 4567',
  phoneHref: '+912240794567',
  founded: '2009',
  social: {
    linkedin: 'https://www.linkedin.com/company/milestones-executive-search',
    x: 'https://x.com/milestonesexec',
  },
  logoUrl:
    'https://res.cloudinary.com/dtg3lepr4/image/upload/v1783361344/emilestones_logo_p29vbm.png',
} as const;

/* ---------------------------------------------------------------- navigation */

export const navigation: NavGroup[] = [
  {
    label: 'About Us',
    href: '/who-we-are',
    children: [
      { label: 'Who We Are', href: '/who-we-are' },
      { label: 'Why Us', href: '/why-us' },
      { label: 'Our Team', href: '/our-team' },
      { label: 'CSR Activities', href: '/csr' },
      { label: 'Employee Engagement', href: '/employee-engagement' },
    ],
  },
  { label: 'Services', href: '/services' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'For Employers', href: '/for-employers' },
  { label: 'For Talent', href: '/for-talent' },
  { label: 'Contact Us', href: '/contact' },
];

export const footerNavigation = [
  {
    title: 'Company',
    links: [
      { label: 'Who We Are', href: '/who-we-are' },
      { label: 'Why Us', href: '/why-us' },
      { label: 'Our Team', href: '/our-team' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'What We Do',
    links: [
      { label: 'Services', href: '/services' },
      { label: 'Expertise', href: '/expertise' },
      { label: 'For Employers', href: '/for-employers' },
      { label: 'For Talent', href: '/for-talent' },
    ],
  },
  {
    title: 'Responsibility',
    links: [
      { label: 'CSR Activities', href: '/csr' },
      { label: 'Employee Engagement', href: '/employee-engagement' },
      { label: 'Open Roles', href: '/jobs' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];

/* --------------------------------------------------------------------- home */

export const stats: Stat[] = [
  { value: 50000, suffix: '+', label: 'Executives in our database', icon: 'Users' },
  { value: 5000, suffix: '+', label: 'Candidates placed', icon: 'Briefcase' },
  { value: 200, suffix: '+', label: 'Clients served', icon: 'Handshake' },
];

/** Heritage-oriented — Who We Are owns these, distinct from the homepage stats. */
export const whoWeAreStats: Stat[] = [
  { value: 15, suffix: '+', label: 'Years running retained searches', icon: 'CalendarClock' },
  { value: 85, suffix: '%', label: 'Of clients who return for their next search', icon: 'Repeat' },
  { value: 3, label: 'Partners, and only partners, running searches', icon: 'Users' },
];

/** Sector-coverage-oriented — Expertise owns these. */
export const expertiseStats: Stat[] = [
  { value: 6, label: 'Sectors covered, each led by a dedicated partner', icon: 'LayoutGrid' },
  {
    value: 12,
    suffix: '+',
    label: 'Years average operating experience per consultant',
    icon: 'Award',
  },
  {
    value: 40,
    suffix: '+',
    label: 'C-suite and board placements per sector, career to date',
    icon: 'TrendingUp',
  },
];

export const services: ServiceOffering[] = [
  {
    slug: 'executive-search',
    title: 'Executive Search',
    icon: 'Search',
    summary:
      'Discreet, retained search for C-suite and board-level appointments. We partner with boards to secure transformational leadership.',
    detail:
      'Identifying and securing visionary C-suite leaders and board members to steer your organization through its next chapter. Every engagement is led by a senior partner and run on a retained basis, with a shortlist grounded in market mapping rather than a database lookup.',
    cta: 'View capabilities',
    outcomes: [
      'Board and C-suite appointments',
      'Succession planning and bench strength reviews',
      'Discreet handling of sensitive board exits',
    ],
  },
  {
    slug: 'lateral-hiring',
    title: 'Lateral Hiring',
    icon: 'ArrowLeftRight',
    summary:
      'Strategic competitor mapping and talent extraction. We move proven performers into your ecosystem to accelerate capability.',
    detail:
      'Strategic placement of experienced professionals who make an immediate impact in key functional areas. We map the competitive landscape team by team, then approach the small number of people who genuinely move the needle.',
    cta: 'Discover approach',
    outcomes: [
      'Competitor and adjacent-market mapping',
      'Team lift-outs and multi-hire mandates',
      'Compensation benchmarking',
    ],
  },
  {
    slug: 'recruitment-consulting',
    title: 'Recruitment Consulting',
    icon: 'Users2',
    summary:
      'End-to-end talent acquisition strategy designed to scale alongside your organization’s growth trajectory.',
    detail:
      'End-to-end talent acquisition for critical organizational roles, using rigorous methodology to ensure both technical alignment and cultural fit. We build the process, train the team, and hand back a function that runs without us.',
    cta: 'Explore methodology',
    outcomes: [
      'Talent acquisition operating models',
      'Interview panel and scorecard design',
      'Employer brand positioning',
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery',
    icon: 'Search',
    summary: 'Deep alignment on the organizational mandate.',
    detail:
      'We start with the business problem, not the job description. Partners meet the board, the hiring executive and the team the role will lead, then write the mandate that everything downstream is measured against.',
  },
  {
    step: '02',
    title: 'Sourcing',
    icon: 'Network',
    summary: 'Global market mapping and discreet outreach.',
    detail:
      'We map the full addressable market rather than working a list. Outreach is personal, confidential, and made by the consultant who will run the search end to end.',
  },
  {
    step: '03',
    title: 'Evaluation',
    icon: 'ClipboardCheck',
    summary: 'Rigorous assessment of technical and cultural fit.',
    detail:
      'Structured interviews, work-sample review, and referencing against the competencies defined at discovery. You receive a written assessment for every candidate on the shortlist.',
  },
  {
    step: '04',
    title: 'Placement',
    icon: 'Award',
    summary: 'Negotiation, offer management and final selection.',
    detail:
      'We manage the offer conversation on both sides, including compensation structure, notice periods and counter-offer risk, so the close is not left to chance.',
  },
  {
    step: '05',
    title: 'Integration',
    icon: 'GitBranch',
    summary: 'Post-placement onboarding support.',
    detail:
      'Structured check-ins across the first 12 months with both the placed executive and the hiring manager, because a placement only counts once it has taken hold.',
  },
];

/** The dark anchor band on the homepage — "why eMilestones," in one
 *  confident statement rather than a grid of cards. Every figure here is
 *  reused verbatim from elsewhere in the project (the bento cells this
 *  replaced, and clientOutcomes below), never a new claim. */
export const homeDifference: HomeDifference = {
  eyebrow: 'Why eMilestones',
  title: 'What sets us **apart**',
  intro:
    'Most firms compete on the size of their database. We compete on the judgment of the people using it.',
  statement: {
    lead: 'Search run like a discipline, not ',
    accent: 'a database query',
  },
  supporting:
    'Every mandate is led end to end by the partner who scoped it — never handed off to a researcher once the contract is signed.',
  stats: [
    {
      value: 94,
      suffix: '%',
      label: 'of retained searches placed inside the guarantee window',
    },
    { value: 6, suffix: ' wks', label: 'to first shortlist, on average' },
    { value: 100, suffix: '%', label: 'first-year retention on recent placements' },
  ],
  quote: {
    quote:
      'The shortlist arrived in six weeks, and every name on it was someone we would have hired.',
    attribution: 'Chief People Officer, industrial manufacturer — anonymized',
  },
  cta: { label: 'See how we run a search', href: '/why-us' },
};

/** The homepage's other dark anchor band — replaces a fabricated "three
 *  offices" section. Every row is a truthful contrast between retained
 *  executive search and contingency recruiting, not a new claim. */
export const recruiterComparison: RecruiterComparison = {
  eyebrow: 'The difference',
  title: 'Not your typical **recruiter**',
  intro:
    'Executive search and contingency recruiting are not the same business. Here is what that actually means in practice.',
  usLabel: 'eMilestones',
  themLabel: 'Typical recruiter',
  rows: [
    {
      point: 'Who runs your search',
      us: 'Partner-led, start to finish',
      them: 'Handed to a junior researcher',
    },
    {
      point: 'Engagement model',
      us: 'Retained, exclusive focus',
      them: 'Contingent, many roles at once',
    },
    {
      point: 'Confidentiality',
      us: 'Confidential by default',
      them: 'CV circulated to many clients',
    },
    {
      point: 'Consultant background',
      us: 'Former operators in the sector',
      them: 'Generalist recruiters',
    },
    {
      point: 'Candidate assessment',
      us: 'Rigorous multi-stage evaluation',
      them: 'Keyword and database matching',
    },
    {
      point: 'Accountability',
      us: 'Guarantee window on every placement',
      them: 'No real accountability after signing',
    },
  ],
  cta: { label: 'Partner with us', href: '/for-employers' },
};

export const clientOutcomes: ClientOutcome[] = [
  {
    sector: 'Industrials',
    mandate: 'CFO succession, FTSE 250 group',
    description:
      'A confidential replacement search run alongside the sitting CFO, closed before the market noticed.',
    metric: { value: '6 wks', label: 'to first shortlist' },
    icon: 'TrendingUp',
  },
  {
    sector: 'Private Equity',
    mandate: 'CEO appointment, portfolio company',
    description:
      'Three finalists presented to the board; the first candidate we introduced was hired.',
    metric: { value: '3', label: 'finalists, 1 offer' },
    icon: 'Target',
  },
  {
    sector: 'Financial Services',
    mandate: 'Engineering leadership lift-out',
    description:
      'A four-person leadership team moved together into a new mandate inside one quarter.',
    metric: { value: '100%', label: 'first-year retention' },
    icon: 'Users',
  },
  {
    sector: 'Healthcare',
    mandate: 'Chief Medical Officer, confidential',
    description:
      'A five-month search that closed without a single leak to the incumbent or the market.',
    metric: { value: '0', label: 'confidentiality breaches' },
    icon: 'ShieldCheck',
  },
];

/* ---------------------------------------------------------------- expertise */

export const sectors: Sector[] = [
  {
    slug: 'technology',
    name: 'Technology',
    icon: 'Cpu',
    description:
      'Securing visionary leaders for SaaS, enterprise software, AI/ML and deep tech. We focus on engineering scale and product innovation.',
    roles: ['Chief Technology Officer', 'VP Engineering', 'Chief Product Officer'],
    detail:
      'We work the full stack from infrastructure to applied AI, and we can tell the difference between a CTO who ships and one who presents roadmaps.',
    examplePlacement:
      'CTO for a Series D infrastructure company, six weeks from brief to signed offer.',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    icon: 'HeartPulse',
    description:
      'Navigating regulatory complexity and innovation across biotechnology, pharmaceuticals, medical devices and healthcare services.',
    roles: [
      'Chief Medical Officer',
      'VP Regulatory Affairs',
      'Head of Clinical Operations',
    ],
    detail:
      'Regulatory fluency is table stakes; we look for leaders who have taken a therapy or a device through the approval process themselves.',
    examplePlacement:
      'Chief Medical Officer for a mid-cap biotech, placed ahead of a Phase III readout.',
  },
  {
    slug: 'financial-services',
    name: 'Financial Services',
    icon: 'Landmark',
    description:
      'Identifying quantitative and strategic talent for asset management, private equity, fintech and traditional banking institutions.',
    roles: ['Chief Financial Officer', 'Head of Risk', 'Managing Director, Investments'],
    detail:
      'From risk to investments, our shortlists hold up to board-level technical scrutiny because our consultants come from the seats they now recruit for.',
    examplePlacement:
      'Head of Risk for a regional bank, replacing an outgoing hire inside the regulatory notice window.',
  },
  {
    slug: 'consumer-retail',
    name: 'Consumer & Retail',
    icon: 'Store',
    description:
      'Sourcing brand-builders and operational experts for global retail, e-commerce and luxury consumer goods in a digital-first era.',
    roles: ['Chief Marketing Officer', 'VP E-commerce', 'Global Brand Director'],
    detail:
      'We recruit for brands managing the shift to digital-first commerce without losing what made the brand worth buying in the first place.',
    examplePlacement:
      'Chief Marketing Officer for a direct-to-consumer retailer ahead of a Series C raise.',
  },
  {
    slug: 'industrial',
    name: 'Industrial',
    icon: 'Factory',
    description:
      'Driving efficiency and transformation through leadership in manufacturing, supply chain, logistics and heavy industry.',
    roles: ['Chief Operating Officer', 'VP Supply Chain', 'Plant President'],
    detail:
      'Supply chain and manufacturing leadership where the P&L consequences of a bad hire show up inside a single quarter.',
    examplePlacement:
      "Plant President for a multi-site manufacturer, sourced from a competitor's operating bench.",
  },
  {
    slug: 'energy',
    name: 'Energy',
    icon: 'Zap',
    description:
      'Partnering with traditional utilities and renewable pioneers to place executives leading the global energy transition.',
    roles: ['Chief Sustainability Officer', 'VP Renewables', 'Head of Grid Strategy'],
    detail:
      'We place leaders who can run a traditional utility and credibly build the renewables business sitting alongside it.',
    examplePlacement:
      "VP Renewables for a regional utility building its first dedicated clean-energy division.",
  },
];

/* ------------------------------------------------------------------- values */

export const pillars: ValuePillar[] = [
  {
    title: 'Absolute Discretion',
    icon: 'ShieldCheck',
    description:
      'We operate with the highest level of confidentiality, safeguarding the interests of both our clients and executive candidates throughout the search lifecycle.',
  },
  {
    title: 'Strategic Insight',
    icon: 'LineChart',
    description:
      'Beyond credentials, we assess cultural fit, leadership nuance and strategic agility to ensure long-term value creation.',
  },
  {
    title: 'Enduring Partnership',
    icon: 'Handshake',
    description:
      'We view every placement as the beginning of a long-term relationship, committed to the ongoing success of the leaders we place.',
  },
];

export const advantages: ValuePillar[] = [
  {
    title: 'Data-Driven Precision',
    icon: 'BarChart3',
    description:
      'We leverage proprietary analytics and market intelligence to map leadership landscapes with pinpoint accuracy, so every shortlist is defensible.',
  },
  {
    title: 'Absolute Discretion',
    icon: 'Lock',
    description:
      'We operate quietly for highly sensitive transitions, protecting both client strategy and candidate reputation.',
  },
  {
    title: 'Long-term Alignment',
    icon: 'Handshake',
    description:
      'We assess cultural fit and strategic vision, not just past performance, to secure lasting impact.',
  },
  {
    title: 'Global Reach, Local Depth',
    icon: 'Globe',
    description:
      'We access hidden talent pools across continents while understanding the nuances of each regional market.',
  },
];

export const employerBenefits: Benefit[] = [
  {
    title: 'Absolute Discretion',
    icon: 'Lock',
    description:
      'We operate with the highest level of confidentiality, protecting your sensitive organizational information and the privacy of high-profile candidates throughout the search.',
  },
  {
    title: 'Quality of Talent',
    icon: 'Star',
    description:
      'Access to an exclusive network of transformational leaders who are, in most cases, not actively looking.',
  },
  {
    title: 'Global Reach, Local Insight',
    icon: 'Languages',
    description:
      'Our international network sources talent globally while applying deep local market intelligence for cultural and regulatory fit.',
  },
  {
    title: 'Accountable Delivery',
    icon: 'Globe2',
    description:
      'Every mandate carries a written scope, a defined timeline and a replacement guarantee. You always know where the search stands.',
  },
];

/** How the commercial partnership works — For Employers owns this, distinct
 *  from employerBenefits above (that's why us; this is how it runs). */
export const engagementModel: ValuePillar[] = [
  {
    title: 'Retained From Day One',
    icon: 'Handshake',
    description:
      'One partner, one mandate, billed in three instalments tied to discovery, shortlist and offer — never contingent on a rushed close.',
  },
  {
    title: 'Reporting At Every Gate',
    icon: 'ClipboardList',
    description:
      'A written update after every stage of the search, so you always know exactly where the mandate stands.',
  },
  {
    title: 'A Guarantee In Writing',
    icon: 'ShieldCheck',
    description:
      'Twelve months of replacement cover on every placement, built into the engagement letter before the search begins.',
  },
];

/* --------------------------------------------------------------------- team */

export const team: TeamMember[] = [
  {
    slug: 'robert-vance',
    name: 'Robert Vance',
    role: 'Managing Partner',
    bio: 'With over 25 years in global finance, Robert leads our financial services practice, specializing in board-level appointments for Fortune 500 institutions.',
    email: 'robert.vance@milestones.com',
    linkedin: 'https://www.linkedin.com/in/',
    initials: 'RV',
    focus: 'Financial Services',
  },
  {
    slug: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Partner, Technology',
    bio: 'Elena drives our technology and innovation practice, identifying visionary leaders who can navigate complex digital transformations and scale high-growth enterprises.',
    email: 'elena.rostova@milestones.com',
    linkedin: 'https://www.linkedin.com/in/',
    initials: 'ER',
    focus: 'Technology',
  },
  {
    slug: 'marcus-thorne',
    name: 'Marcus Thorne',
    role: 'Partner, Healthcare',
    bio: 'Marcus brings clinical expertise and deep regulatory knowledge to executive search, placing top-tier talent in leading healthcare networks and life sciences firms.',
    email: 'marcus.thorne@milestones.com',
    linkedin: 'https://www.linkedin.com/in/',
    initials: 'MT',
    focus: 'Healthcare',
  },
];

/* ---------------------------------------------------------------------- csr */

export const csrPillars: CsrPillar[] = [
  {
    title: 'Environmental Stewardship',
    icon: 'Leaf',
    description:
      'We prioritize sustainable practices across our operations and work to minimize our carbon footprint. Our leadership initiatives encourage client partners to adopt green policies, fostering a corporate ecosystem that respects the planet.',
    metric: { value: 'Carbon neutral', label: 'Operations since 2022' },
  },
  {
    title: 'Community Support',
    icon: 'Users',
    description:
      'We invest in the communities where we live and work. From local mentorship programs to supporting non-profits, we believe in uplifting those around us.',
    metric: { value: '5k+', label: 'Hours volunteered' },
  },
];

export const csrInitiatives = [
  {
    title: 'Diversity in Leadership',
    description:
      'Pioneering pathways for underrepresented talent to reach the C-suite by 2026.',
    icon: 'Sparkles',
  },
  {
    title: 'Next-Gen Mentorship',
    description: 'Partnering with top universities to guide the leaders of tomorrow.',
    icon: 'GraduationCap',
  },
];

/* ------------------------------------------------------- employee engagement */

export const cultureValues: ValuePillar[] = [
  {
    title: 'Unwavering Integrity',
    icon: 'ShieldCheck',
    description:
      'We operate with transparency and an absolute commitment to confidentiality, so trust is the foundation of every interaction.',
  },
  {
    title: 'Intellectual Rigor',
    icon: 'Brain',
    description: 'We approach complex leadership challenges with analytical depth.',
  },
  {
    title: 'Collaborative Excellence',
    icon: 'Handshake',
    description: 'We combine cross-functional expertise to deliver superior results.',
  },
];

export const developmentPrograms = [
  {
    title: 'Industry Mastery Programs',
    description: 'Specialized training in evolving sectors such as fintech and AI.',
  },
  {
    title: 'Leadership Symposia',
    description: 'Quarterly gatherings with global thought leaders.',
  },
  {
    title: 'Executive Coaching Certification',
    description: 'Sponsored accreditation for every consultant past their second year.',
  },
];

/** What we look for in a hire — Careers owns this, distinct from
 *  cultureValues above (that's how we work; this is who fits). */
export const candidateFit: ValuePillar[] = [
  {
    title: 'Sector Operating Experience',
    icon: 'Briefcase',
    description:
      'You have worked inside the industry you want to recruit for, not just placed candidates into it.',
  },
  {
    title: 'Ownership Over Output',
    icon: 'Target',
    description: 'You would rather run three searches well than eight searches adequately.',
  },
  {
    title: 'Comfortable With Candor',
    icon: 'MessageSquare',
    description:
      'You will tell a client their spec will not clear the market, before you take the mandate, not after.',
  },
];

/* ------------------------------------------------------------------- talent */

export const candidateServices = [
  {
    title: 'Executive Career Insights',
    icon: 'Lightbulb',
    description:
      'Strategies for navigating board-level interviews and positioning your personal brand.',
  },
  {
    title: 'Our Process',
    icon: 'Route',
    description: 'Transparent, rigorous, and respectful of your time.',
  },
  {
    title: 'Interview Preparation Concierge',
    icon: 'MessagesSquare',
    description:
      'Bespoke briefings and mock scenarios tailored to the culture and challenges of the hiring organization.',
  },
];

export const featuredRoles = [
  {
    id: 'cto-fintech',
    sector: 'Technology',
    title: 'Chief Technology Officer',
    company: 'Series C FinTech',
    location: 'New York / Hybrid',
    engagement: 'Retained',
  },
  {
    id: 'vp-finance',
    sector: 'Finance',
    title: 'VP of Finance',
    company: 'Global Manufacturing Enterprise',
    location: 'London, UK',
    engagement: 'Exclusive',
  },
  {
    id: 'coo-health',
    sector: 'Operations',
    title: 'Chief Operating Officer',
    company: 'Healthcare Innovator',
    location: 'Remote (US)',
    engagement: 'Confidential',
  },
];

/* ------------------------------------------------------------------ contact */

export const offices: OfficeLocation[] = [
  {
    city: 'Mumbai',
    label: 'Head Office',
    address: [
      'C-13, Ground Floor, Kailas Vaibhav Complex',
      'Vikhroli Parksite, Near Nagbaba Temple',
      'LBS Marg, Vikhroli (W), Mumbai 400079',
    ],
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=C-13+Kailas+Vaibhav+Complex+Vikhroli+Parksite+LBS+Marg+Vikhroli+West+Mumbai+400079',
    primary: true,
    phone: '022-4079 4567',
    email: 'career@emilestones.net',
  },
  {
    city: 'Delhi',
    label: 'Delhi Office',
    address: ['9/905 Kailash Building', '26, KG Marg, Connaught Place', 'Delhi 110001'],
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=9%2F905+Kailash+Building+26+KG+Marg+Connaught+Place+Delhi+110001',
    primary: false,
    email: 'hrdelhi@emilestones.net',
  },
];

export const businessHours = [
  { days: 'Monday – Friday', hours: '9:30 AM – 6:30 PM IST' },
  { days: 'Saturday', hours: '10:00 AM – 2:00 PM IST' },
  { days: 'Sunday', hours: 'Closed' },
];

export const inquiryTypes = [
  { value: 'general', label: 'General inquiry' },
  { value: 'client', label: 'Client services (looking to hire)' },
  { value: 'candidate', label: 'Candidate services (looking for opportunities)' },
  { value: 'media', label: 'Media and press' },
] as const;

/* --------------------------------------------------------------- social proof */

export const testimonials: Testimonial[] = [
  {
    quote:
      'eMilestones understood the board dynamic before they understood the job spec. That is why the shortlist worked.',
    author: 'Chair of the Board',
    company: 'FTSE 250 industrial group',
  },
  {
    quote:
      'Three finalists, all of whom we would have hired. I have never had that from a search firm before.',
    author: 'Chief Executive Officer',
    company: 'Private equity portfolio company',
  },
  {
    quote:
      'They ran a genuinely confidential replacement search while the incumbent was still in seat. Nothing leaked.',
    author: 'Chief People Officer',
    company: 'Global asset manager',
  },
];

/** Framed around the decision to choose eMilestones — Why Us owns these,
 *  distinct from the general testimonials above. */
export const whyUsTestimonials: Testimonial[] = [
  {
    quote:
      'We had two other firms on the shortlist. eMilestones was the only one that pushed back on our spec before agreeing to run the search.',
    author: 'Chair, Remuneration Committee',
    company: 'Global logistics group',
  },
  {
    quote:
      'Our previous search firm sent CVs. eMilestones sent a point of view on who the role actually needed to be.',
    author: 'General Counsel',
    company: 'NASDAQ-listed technology company',
  },
  {
    quote:
      'We switched firms mid-search once and it cost us four months. We have not needed to switch since.',
    author: 'Group Chief Executive Officer',
    company: 'Diversified industrials holding',
  },
];

export const faqs: FaqItem[] = [
  {
    question: 'How long does a typical executive search take?',
    answer:
      'Most retained C-suite mandates reach a signed offer in 10 to 14 weeks. We present a first shortlist at around week six. Highly specialized or geographically constrained searches can run longer, and we tell you that at the scoping stage rather than after.',
  },
  {
    question: 'Do you work on a retained or contingent basis?',
    answer:
      'Executive search is retained. Lateral hiring mandates can be structured either way depending on volume and seniority. Recruitment consulting is scoped as a fixed-fee engagement.',
  },
  {
    question: 'What happens if a placement does not work out?',
    answer:
      'Every retained placement carries a replacement guarantee for the first twelve months. If the appointment ends within that window, we run the search again at no additional fee.',
  },
  {
    question: 'Will my search remain confidential?',
    answer:
      'Yes. We routinely run replacement searches while an incumbent is still in post. Client identity is disclosed to candidates only after a mutual non-disclosure agreement is in place.',
  },
  {
    question: 'I am a candidate. Will you tell my employer I applied?',
    answer:
      'Never. Your profile is visible only to the consultants working a relevant mandate, and we do not share your details with any client without your explicit approval for that specific role.',
  },
];

/** Which service fits, and how it is billed — Services owns these,
 *  distinct from the general FAQ above. */
export const servicesFaqs: FaqItem[] = [
  {
    question: 'Which service is right for a single C-suite vacancy?',
    answer:
      'Executive Search. It is retained, led by a partner, and built for exactly this — one seat, one mandate, one shortlist you can act on.',
  },
  {
    question: 'When does Lateral Hiring make more sense than Executive Search?',
    answer:
      'When you need proven performers below board level, often several at once, and speed matters more than an exhaustive market map. Lateral Hiring is scoped for volume; Executive Search is scoped for precision.',
  },
  {
    question: 'What does Recruitment Consulting actually deliver?',
    answer:
      'A working hiring function, not a placement. We design the process, train your team to run it, and hand back a system — typically over a 90 to 180 day engagement.',
  },
  {
    question: 'Can these services combine within one engagement?',
    answer:
      'Often. A Recruitment Consulting engagement frequently surfaces the need for a retained search for the function it just redesigned. We scope that as a separate, explicit mandate rather than folding it in unannounced.',
  },
  {
    question: 'How is each service billed?',
    answer:
      'Executive Search is retained, billed in three instalments against milestones. Lateral Hiring can run retained or contingent depending on volume. Recruitment Consulting is a fixed fee, agreed before work starts.',
  },
];

/** Guarantee, confidentiality and billing from the client's side — For
 *  Employers owns these, distinct from the general FAQ above. */
export const employerFaqs: FaqItem[] = [
  {
    question: 'What exactly does the replacement guarantee cover?',
    answer:
      'If a placement we made leaves or is exited within twelve months, we run the replacement search again at no additional fee. It is written into the engagement letter, not offered as goodwill after the fact.',
  },
  {
    question: 'How much visibility do we get while a search is running?',
    answer:
      'A written report at every stage gate — after discovery, after the market map, and after every round of interviews — from the partner running your mandate, not a coordinator.',
  },
  {
    question: 'Will you approach candidates from our direct competitors?',
    answer:
      'Only with your explicit sign-off on the target list. We agree exclusions with you before outreach starts, not after a name causes a problem.',
  },
  {
    question: 'What do we owe if we pause or cancel a search mid-engagement?',
    answer:
      'You owe the instalments tied to work already completed. Nothing is billed for stages that have not started, and we tell you exactly which stage you are in at any point.',
  },
  {
    question: 'How is our search kept confidential from our own board and staff?',
    answer:
      'Client identity is disclosed to candidates only under NDA, and we agree with you in advance exactly who inside your organization is read into the mandate.',
  },
];
