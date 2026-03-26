"use client";

import { useState, useCallback } from "react";

interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

interface FaqAccordionProps {
  readonly items: ReadonlyArray<FaqItem>;
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="divide-y divide-cream-dark rounded-lg border border-cream-dark">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const id = `faq-${index}`;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-cream/30"
              aria-expanded={isOpen}
              aria-controls={`${id}-panel`}
              id={`${id}-button`}
            >
              <span className="pr-4 text-sm font-medium text-charcoal">
                {item.question}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`flex-shrink-0 text-charcoal-muted transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isOpen && (
              <div
                id={`${id}-panel`}
                role="region"
                aria-labelledby={`${id}-button`}
                className="px-5 pb-4 text-sm text-charcoal-muted leading-relaxed"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
