-- Seed data. Safe to re-run: every insert is idempotent on slug.

insert into public.job_postings
  (slug, title, company, sector, location, employment_type, engagement, seniority,
   salary_range, summary, description, responsibilities, requirements, is_published, is_featured)
values
  ('chief-technology-officer-fintech',
   'Chief Technology Officer',
   'Series C FinTech',
   'Technology',
   'New York / Hybrid',
   'Full-time',
   'Retained',
   'C-suite',
   '$380,000 – $450,000 plus equity',
   'Lead engineering and platform strategy for a payments business scaling from 80 to 200 engineers.',
   E'Our client has raised a Series C and is moving from a single-product payments platform to a multi-product financial infrastructure business.\n\nThe incoming CTO owns engineering, platform architecture and the build-versus-buy decisions that will define the next three years. This is a hands-on technical leadership seat, not a figurehead role.',
   array['Own the engineering roadmap and platform architecture',
         'Scale the organization from 80 to roughly 200 engineers',
         'Partner with the CPO on product direction and delivery cadence',
         'Represent technology to the board and to institutional investors'],
   array['Scaled an engineering organization past 150 people',
         'Deep experience in payments, banking infrastructure or regulated fintech',
         'Track record of shipping in a high-availability, high-compliance environment'],
   true, true),

  ('vp-finance-manufacturing',
   'VP of Finance',
   'Global Manufacturing Enterprise',
   'Industrial',
   'London, UK',
   'Full-time',
   'Exclusive',
   'VP',
   '£180,000 – £220,000 plus LTIP',
   'Financial leadership for an eight-country manufacturing group entering a transformation programme.',
   E'A long-established manufacturing group is consolidating finance operations across eight countries ahead of a planned refinancing.\n\nThe VP of Finance will lead FP&A, treasury and the transformation programme office, reporting to the Group CFO.',
   array['Lead FP&A, treasury and financial planning across eight markets',
         'Run the finance transformation programme through to completion',
         'Prepare the group for a planned refinancing'],
   array['Qualified accountant with manufacturing or industrial sector depth',
         'Led a multi-country finance transformation end to end',
         'Comfortable operating between the shop floor and the boardroom'],
   true, true),

  ('chief-operating-officer-healthcare',
   'Chief Operating Officer',
   'Healthcare Innovator',
   'Healthcare',
   'Remote (US)',
   'Full-time',
   'Confidential',
   'C-suite',
   null,
   'Operational leadership for a care-delivery business expanding into twelve new states.',
   E'Our client delivers value-based care across a growing footprint and is preparing for a significant multi-state expansion.\n\nThe COO owns clinical operations, market launch and the operating model that has to hold as the business roughly triples in size.',
   array['Own clinical operations and market expansion',
         'Build the operating model for a twelve-state footprint',
         'Partner with the CMO on quality and outcomes'],
   array['Senior operating experience in value-based or multi-site care delivery',
         'Managed a multi-state regulatory footprint',
         'Scaled operations through a period of rapid growth'],
   true, false)
on conflict (slug) do nothing;

insert into public.career_openings
  (slug, title, department, location, employment_type, summary, description, is_published)
values
  ('principal-consultant-technology',
   'Principal Consultant, Technology Practice',
   'Search',
   'New York',
   'Full-time',
   'Run retained CTO and CPO mandates for high-growth technology clients, with partner support and no billing targets in year one.',
   'You will own mandates end to end, from scoping through to the twelve-month review.',
   true),

  ('research-associate-emea',
   'Research Associate, EMEA',
   'Research',
   'London',
   'Full-time',
   'Build the market maps that our shortlists are made from. The most analytical seat in the firm.',
   'You will own market mapping and candidate research across our EMEA mandates.',
   true)
on conflict (slug) do nothing;

insert into public.team_members (slug, name, role, bio, focus, email, sort_order, is_published)
values
  ('robert-vance', 'Robert Vance', 'Managing Partner',
   'With over 25 years in global finance, Robert leads our financial services practice, specializing in board-level appointments for Fortune 500 institutions.',
   'Financial Services', 'robert.vance@milestones.com', 1, true),
  ('elena-rostova', 'Elena Rostova', 'Partner, Technology',
   'Elena drives our technology and innovation practice, identifying visionary leaders who can navigate complex digital transformations and scale high-growth enterprises.',
   'Technology', 'elena.rostova@milestones.com', 2, true),
  ('marcus-thorne', 'Marcus Thorne', 'Partner, Healthcare',
   'Marcus brings clinical expertise and deep regulatory knowledge to executive search, placing top-tier talent in leading healthcare networks and life sciences firms.',
   'Healthcare', 'marcus.thorne@milestones.com', 3, true)
on conflict (slug) do nothing;

insert into public.testimonials (quote, author, company, sector, sort_order, is_published)
values
  ('Milestones understood the board dynamic before they understood the job spec. That is why the shortlist worked.',
   'Chair of the Board', 'FTSE 250 industrial group', 'Industrial', 1, true),
  ('Three finalists, all of whom we would have hired. I have never had that from a search firm before.',
   'Chief Executive Officer', 'Private equity portfolio company', 'Financial Services', 2, true),
  ('They ran a genuinely confidential replacement search while the incumbent was still in seat. Nothing leaked.',
   'Chief People Officer', 'Global asset manager', 'Financial Services', 3, true);

insert into public.blog_posts
  (slug, title, excerpt, content, category, author_name, read_minutes, is_published)
values
  ('what-boards-get-wrong-about-succession',
   'What boards get wrong about succession',
   'Most succession plans name a person. The useful ones name a set of conditions.',
   E'Most succession plans we review name a successor. That feels like progress, and it is usually the wrong artefact.\n\nA name is a bet on a static future. The conditions that made someone the obvious internal candidate in 2023 rarely survive a strategy reset, an acquisition or a regulatory shift. Boards that plan by name find themselves relitigating the whole question the moment the context moves.\n\nThe more durable approach is to write down the conditions instead: what has to be true about the business in eighteen months, and what capability profile that implies. Then you assess the bench against the profile, on a schedule, and you know in advance whether the answer is internal or external.\n\nThis also changes what you ask a search firm for. Instead of a replacement, you are asking for a market view against a defined capability set — which is a question we can answer honestly, including when the answer is that your internal candidate is stronger than anything outside.',
   'Governance', 'Robert Vance', 4, true),

  ('the-counter-offer-problem',
   'The counter-offer problem',
   'Late-stage drop-outs are almost never about money, even when the candidate says they are.',
   E'When a placement collapses at offer stage, the post-mortem usually blames compensation. In our experience that is the stated reason far more often than it is the real one.\n\nCandidates who accept a counter-offer are typically resolving an ambiguity they were never comfortable with: an unclear mandate, a reporting line that shifted during the process, or a sense that the role as described in week two is not the role being offered in week ten.\n\nThe fix is unglamorous. Write the mandate down at discovery, share it with the candidate, and update it in writing when it changes. A candidate who has read the same document as the hiring executive is far harder to talk out of the move.',
   'Search practice', 'Elena Rostova', 3, true)
on conflict (slug) do nothing;
