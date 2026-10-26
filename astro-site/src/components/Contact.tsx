import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useRef, useState } from 'react';
import '../styles/contact.css';

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

const contactSchema = z.object({
  name: z.string().min(1, 'name is required'),
  email: z.string().email('invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  interest: z.enum(['consulting', 'learn', 'colab', 'other'], {
    required_error: 'please select a request type',
  }),
  message: z.string().min(10, 'please describe the outcome you need'),
  website: z.string().max(0).optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

const interestOptions = [
  { value: 'consulting', label: 'Request an outcome' },
  { value: 'learn',      label: 'Ask about the Learn practice' },
  { value: 'colab',      label: 'Discuss a partnership' },
  { value: 'other',      label: 'Something else' },
] as const;

const steps = [
  { title: 'Name the outcome', description: 'Tell us what must change and why it matters' },
  { title: 'Define done',       description: 'We write the constraints and proof before work starts' },
  { title: 'Build and prove',   description: 'The system ships with evidence and an operating handoff' },
];

function Field({ id, label, required, optional, error, children }: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="contact-field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true" className="contact-required"> *</span>}
        {optional && <span className="contact-optional"> (optional)</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="contact-error">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const [ready, setReady] = useState(false);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  useEffect(() => {
    setReady(true);
    const door = new URLSearchParams(window.location.search).get('door');
    if (door === 'outcome') setValue('interest', 'consulting');
    if (door === 'partner') setValue('interest', 'colab');
  }, [setValue]);

  useEffect(() => {
    if (submitted) confirmationRef.current?.focus();
  }, [submitted]);

  const onSubmit = async (data: ContactForm) => {
    try {
      setSubmitError(null);

      const response = await fetch('/api/forms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        data.name,
          email:       data.email,
          company:     data.company     || undefined,
          phone:       data.phone       || undefined,
          interest:    data.interest,
          message:     data.message,
          website:     data.website     || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Form submission failed with status ${response.status}`);
      }

      window.gtag?.('event', 'form_submit', {
        form_name: 'enhanced_contact',
        interest:  data.interest,
      });

      setSubmitted(true);
      reset({ name: '', email: '', company: '', phone: '', message: '', website: '', interest: data.interest });
    } catch (error) {
      console.error('Failed to submit contact form', error);
      setSubmitError('Something went wrong. Please email support@intentsolutions.io directly.');
    }
  };

  return (
    <div id="contact" className="contact-layout">
      <section className="contact-form-panel" aria-label="Outcome request">
        {submitted ? (
          <div className="contact-confirmation" role="status" tabIndex={-1} ref={confirmationRef}>
            <h2>Request received.</h2>
            <p>We will answer whether it is a fit.</p>
            <button type="button" className="contact-secondary" onClick={() => setSubmitted(false)}>
              Send another request
            </button>
          </div>
        ) : (
          <form method="post" onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <p className="contact-form-note">We read every request and answer whether it is a fit. Fields marked * are required.</p>
            {/* Name & Email */}
            <div className="contact-field-pair">
              <Field id="name" label="Name" required error={errors.name?.message}>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className="contact-input"
                  placeholder="Your name"
                />
              </Field>
              <Field id="email" label="Email" required error={errors.email?.message}>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="contact-input"
                  placeholder="you@example.com"
                />
              </Field>
            </div>

            {/* Company & Phone */}
            <div className="contact-field-pair">
              <Field id="company" label="Company" optional>
                <input
                  {...register('company')}
                  type="text"
                  id="company"
                  autoComplete="organization"
                  className="contact-input"
                  placeholder="Your company"
                />
              </Field>
              <Field id="phone" label="Phone" optional>
                <input
                  {...register('phone')}
                  type="tel"
                  id="phone"
                  autoComplete="tel"
                  className="contact-input"
                  placeholder="+1 555 123 4567"
                />
              </Field>
            </div>

            {/* Interest */}
            <Field id="interest" label="What kind of request is this?" required error={errors.interest?.message}>
              <select
                {...register('interest')}
                id="interest"
                aria-required="true"
                aria-invalid={!!errors.interest}
                aria-describedby={errors.interest ? 'interest-error' : undefined}
                className="contact-input"
              >
                <option value="">Select a request...</option>
                {interestOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </Field>

            {/* Message */}
            <Field id="message" label="What outcome do you need, and how will you know it worked?" required error={errors.message?.message}>
              <textarea
                {...register('message')}
                id="message"
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                rows={4}
                className="contact-input"
                placeholder="Describe the change you need, where it must run, and the evidence that would make you trust it."
              />
            </Field>

            {/* Honeypot */}
            <input {...register('website')} type="text" name="website" hidden tabIndex={-1} autoComplete="off" />

            {submitError && <p role="alert" className="contact-error">{submitError}</p>}
            <button type="submit" disabled={!ready || isSubmitting} className="contact-submit">
              {!ready ? 'Loading form...' : isSubmitting ? 'Sending...' : 'Send request'}
            </button>
          </form>
        )}
      </section>

      <aside className="contact-next" aria-labelledby="contact-next-title">
        <h2 id="contact-next-title">What happens next</h2>
        <ol className="contact-steps">
          {steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.description}.</p>
            </li>
          ))}
        </ol>
        <div className="contact-paths">
          <h2>Other paths</h2>
          <a href="mailto:support@intentsolutions.io">support@intentsolutions.io</a>
          <a href="https://learn.intentsolutions.io/">Learn the method</a>
        </div>
      </aside>
    </div>
  );
}
