import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MvpShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MvpShowcase({ isOpen, onClose }: MvpShowcaseProps) {
  // Trap focus and handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Focus trap
    const focusableElements = document.querySelectorAll(
      '[data-modal] a, [data-modal] button'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);
    document.body.style.overflow = 'hidden';

    // Focus first element
    setTimeout(() => firstElement?.focus(), 100);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              data-modal
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-2xl bg-zinc-900 rounded-lg border border-zinc-800 shadow-2xl overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-800"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="p-8 pt-12">
                <h2
                  id="modal-title"
                  className="text-2xl font-bold text-zinc-50 mb-4"
                >
                  pipelinepilot: 4 customized iam agents
                </h2>

                <p className="text-zinc-400 mb-6">
                  PipelinePilot is a live MVP showing customized Intent Agent Models (IAM) for SDR automation. Here's how the 4 custom IAM agents work together:
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-zinc-100 font-semibold mb-1">
                        orchestrator agent
                      </h3>
                      <p className="text-sm text-zinc-400">
                        Coordinates workflows and delegates tasks between specialized agents. Routes lead data through enrichment, content generation, and campaign execution.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-zinc-100 font-semibold mb-1">
                        data captain agent
                      </h3>
                      <p className="text-sm text-zinc-400">
                        Retrieves, normalizes, deduplicates, and enriches lead records from Clay, Apollo, Clearbit, and Crunchbase APIs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-zinc-100 font-semibold mb-1">
                        content analyst agent
                      </h3>
                      <p className="text-sm text-zinc-400">
                        Generates personalized email sequences using Gemini 2.5 Flash. Context-aware messaging optimized for conversion.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-zinc-100 font-semibold mb-1">
                        readiness auditor agent
                      </h3>
                      <p className="text-sm text-zinc-400">
                        Validates configurations, API credentials, and data quality before campaign launch. Prevents errors before they happen.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 mb-8">
                  <p className="text-sm text-zinc-300 mb-2">
                    <strong className="text-indigo-300">Intent Agent Models are fully customizable.</strong> These 4 agents were configured specifically for SDR workflows. We customize IAM for compliance monitoring, data enrichment, document processing, research automation, or any business logic you need. Pre-configured packages (M1/M2/M3) available as starters.
                  </p>
                  <a
                    href="https://pipelinepilot-prod.web.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-400 hover:text-indigo-300 transition-smooth inline-flex items-center gap-1"
                  >
                    See PipelinePilot live
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/agents/"
                    className="btn-primary text-sm"
                    onClick={onClose}
                  >
                    see agent options
                  </a>
                  <a
                    href="https://calendar.app.google/Wqbt8EJuEh5xvvV58"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center text-zinc-200 hover:text-zinc-50 transition-smooth text-sm"
                    onClick={onClose}
                  >
                    Book a Discovery Call →
                  </a>
                  <a
                    href="/#contact"
                    className="inline-flex items-center text-zinc-200 hover:text-zinc-50 transition-smooth text-sm"
                    onClick={onClose}
                  >
                    discuss your use case →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
