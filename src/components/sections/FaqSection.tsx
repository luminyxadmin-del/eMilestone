import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/motion/Reveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/content/site';
import type { FaqItem } from '@/types';

interface FaqSectionProps {
  items?: FaqItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function FaqSection({
  items = faqs,
  eyebrow = 'Common questions',
  title = 'What to expect from an **engagement**',
  description = 'If your question is not here, ask a partner directly — we answer within one business day.',
}: FaqSectionProps) {
  return (
    <section className="section bg-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />

          <Reveal delay={0.15}>
            <Accordion type="single" collapsible className="border-t border-line">
              {items.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
