'use client';

import { useState, useCallback, ReactNode } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

type FAQItem = {
  question: string;
  answer: ReactNode;
};

type FAQSection = {
  title: string;
  items: FAQItem[];
};

function FAQAccordion({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((o) => !o), []);

  return (
    <div className="border-gray-200 border-b">
      <button
        type="button"
        className="flex w-full flex-row items-center justify-between py-5 text-left"
        onClick={toggleOpen}
      >
        <span className="text-gray-900 pr-4 text-base font-medium">{question}</span>
        <span className="flex-shrink-0">
          {isOpen ? (
            <ChevronUpIcon className="text-gray-500 h-5 w-5" />
          ) : (
            <ChevronDownIcon className="text-gray-500 h-5 w-5" />
          )}
        </span>
      </button>
      {isOpen && <div className="text-gray-600 pb-5 text-base">{answer}</div>}
    </div>
  );
}

const FAQ_SECTIONS: FAQSection[] = [];

export default function FAQsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-gray-900 text-4xl font-bold tracking-tight sm:text-5xl">
            Haneul App FAQs
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Find answers to commonly asked questions about the Haneul app and its features.
          </p>
        </div>

        <div className="space-y-12">
          {FAQ_SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-gray-900 mb-6 text-2xl font-semibold">{section.title}</h2>
              <div className="border-gray-200 rounded-lg border bg-white">
                {section.items.map((item) => (
                  <FAQAccordion key={item.question} question={item.question} answer={item.answer} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-lg bg-gray-50 p-8 text-center">
          <h3 className="text-gray-900 text-xl font-semibold">Still have questions?</h3>
          <p className="text-gray-600 mt-2">
            Visit our{' '}
            <a
              href="https://docs.haneulfoundation.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              Help Center
            </a>{' '}
            for more detailed support or join our{' '}
            <a
              href="https://github.com/GeunhwaJeong/haneul"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 text-blue-600 underline"
            >
              Discord community
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
