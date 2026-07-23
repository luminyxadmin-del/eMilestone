import { Container } from '@/components/ui/container';

const clientSectors = [
  'FTSE 250 Industrials',
  'Fortune 500 Financial Services',
  'Series C–E Technology',
  'Global Asset Management',
  'Life Sciences & Biotech',
  'Private Equity Portfolios',
  'Renewable Energy',
  'Luxury Consumer Goods',
];

/**
 * Client names are confidential, so the marquee names the kinds of
 * organizations we serve instead of showing logos we cannot display.
 */
export function LogoMarquee() {
  const items = [...clientSectors, ...clientSectors];

  return (
    <section className="border-b border-line bg-white py-10">
      <Container>
        <p className="eyebrow text-center">Trusted across</p>
      </Container>

      <div className="mask-fade-x mt-6 overflow-hidden">
        <ul
          aria-hidden="true"
          className="flex w-max animate-marquee items-center gap-14 px-7"
        >
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="whitespace-nowrap font-display text-body-lg text-copy-faint"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="sr-only">
        We serve {clientSectors.join(', ')} and other enterprise organizations.
      </p>
    </section>
  );
}
