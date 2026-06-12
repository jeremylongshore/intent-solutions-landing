import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

declare global {
  interface Window {
    umami?: { track: (eventName: string, props?: Record<string, unknown>) => void };
  }
}

const CYAN      = 'rgb(34 211 238)';
const CYAN_GLOW = '0 0 6px rgba(34,211,238,0.5)';

const contactSchema = z.object({
  name: z.string().min(1, 'name is required'),
  email: z.string().email('invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  interest: z.enum(['consulting', 'learn', 'colab', 'other'], {
    required_error: 'please select what you\'re interested in',
  }),
  projectType: z.enum(['ai-ml', 'workflow-automation', 'gcp', 'strategy']).optional(),
  budget: z.enum(['under-5k', '5k-15k', '15k-50k', '50k-plus', 'discuss']).optional(),
  timeline: z.enum(['immediate', 'this-month', 'this-quarter', 'exploring']).optional(),
  message: z.string().min(10, 'please tell us a bit more about your project'),
  website: z.string().max(0).optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

const interestOptions = [
  { value: 'consulting', label: 'Consulting / Custom Build' },
  { value: 'learn',      label: 'Learn with Jeremy' },
  { value: 'colab',      label: 'Colab with Jeremy' },
  { value: 'other',      label: 'Other' },
] as const;

const projectTypeOptions = [
  { value: 'ai-ml',               label: 'AI / Machine Learning' },
  { value: 'workflow-automation', label: 'Workflow Automation' },
  { value: 'gcp',                 label: 'GCP / Cloud Infrastructure' },
  { value: 'strategy',            label: 'AI Strategy Consulting' },
] as const;

const budgetOptions = [
  { value: 'under-5k', label: 'Under $5K' },
  { value: '5k-15k',   label: '$5K - $15K' },
  { value: '15k-50k',  label: '$15K - $50K' },
  { value: '50k-plus', label: '$50K+' },
  { value: 'discuss',  label: "Let's Discuss" },
] as const;

const timelineOptions = [
  { value: 'immediate',    label: 'Immediate (this week)' },
  { value: 'this-month',   label: 'This Month' },
  { value: 'this-quarter', label: 'This Quarter' },
  { value: 'exploring',    label: 'Just Exploring' },
] as const;

const steps = [
  { number: '01', title: 'You reach out',  description: 'Tell me about your project and goals' },
  { number: '02', title: 'We connect',     description: 'Quick call to understand your needs' },
  { number: '03', title: 'We ship',        description: 'Build, train, and deploy together' },
];

/* ── Shared input style (inline) ── */
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(9, 9, 11, 0.55)',
  border: '1px solid rgba(39, 39, 42, 0.8)',
  borderRadius: '0.5rem',
  color: 'rgb(250 250 250)',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.25s ease',
};

function Field({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgb(161 161 170)',
          marginBottom: '0.5rem',
          fontFamily: "'Syne', system-ui, sans-serif",
        }}
      >
        {label}
        {required && <span style={{ color: CYAN, marginLeft: '0.2rem' }}>*</span>}
        {optional && <span style={{ color: 'rgb(82 82 91)', marginLeft: '0.3rem', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>}
      </label>
      {children}
      {error && (
        <p style={{ marginTop: '0.375rem', fontSize: '0.78rem', color: 'rgb(248 113 113)' }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const selectedInterest = watch('interest');

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
          projectType: data.projectType || undefined,
          budget:      data.budget      || undefined,
          timeline:    data.timeline    || undefined,
          message:     data.message,
          website:     data.website     || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Form submission failed with status ${response.status}`);
      }

      window.umami?.track('form_submit', {
        form_name: 'enhanced_contact',
        interest:  data.interest,
        budget:    data.budget,
      });

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Failed to submit contact form', error);
      setSubmitError('Something went wrong. Please email jeremy@intentsolutions.io directly.');
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: '7rem 0',
        background: 'rgb(9 9 11)',
        borderTop: '1px solid rgba(39,39,42,0.5)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 600, height: 600,
          top: '-10%', right: '-15%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '42rem', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>

        {/* ── Section header ── */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
            <span style={{ display: 'block', height: 1, width: '3.5rem', background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.2))' }} />
            <span
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.28em',
                textTransform: 'uppercase' as const,
                color: CYAN,
              }}
            >
              Start a Conversation
            </span>
            <span style={{ display: 'block', height: 1, width: '3.5rem', background: 'linear-gradient(to left, transparent, rgba(34,211,238,0.2))' }} />
          </div>

          <h2
            style={{
              fontFamily: "'Syne', system-ui, sans-serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
              color: 'rgb(250 250 250)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '0.75rem',
            }}
          >
            Let's Build Something That Ships to Production
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgb(113 113 122)' }}>
            Tired of AI demos that never make it past the POC phase?
          </p>
        </motion.div>

        {/* ── 3-step process ── */}
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.875rem', marginBottom: '2.5rem' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              style={{
                padding: '1.25rem 1rem',
                background: 'rgba(18, 18, 20, 0.7)',
                border: '1px solid rgba(39,39,42,0.7)',
                borderRadius: '0.75rem',
                textAlign: 'center',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  border: `1px solid rgba(34,211,238,0.3)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.75rem',
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: CYAN,
                  boxShadow: CYAN_GLOW,
                }}
              >
                {step.number}
              </div>
              <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: '0.8rem', fontWeight: 600, color: 'rgb(228 228 231)', margin: '0 0 0.3rem' }}>
                {step.title}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'rgb(82 82 91)', margin: 0 }}>
                {step.description}
              </p>
            </div>
          ))}
        </motion.div>

        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgb(82 82 91)', marginBottom: '2.5rem' }}>
          We respond within 24 hours
        </p>

        {/* ── Form ── */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          {/* Name & Email */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <Field label="Name" required error={errors.name?.message}>
              <input
                {...register('name')}
                type="text"
                id="name"
                style={inputStyle}
                placeholder="Your name"
                onFocus={e => (e.target.style.borderColor = 'rgba(34,211,238,0.35)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(39,39,42,0.8)')}
              />
            </Field>
            <Field label="Email" required error={errors.email?.message}>
              <input
                {...register('email')}
                type="email"
                id="email"
                style={inputStyle}
                placeholder="you@example.com"
                onFocus={e => (e.target.style.borderColor = 'rgba(34,211,238,0.35)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(39,39,42,0.8)')}
              />
            </Field>
          </div>

          {/* Company & Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <Field label="Company" optional>
              <input
                {...register('company')}
                type="text"
                id="company"
                style={inputStyle}
                placeholder="Your company"
                onFocus={e => (e.target.style.borderColor = 'rgba(34,211,238,0.35)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(39,39,42,0.8)')}
              />
            </Field>
            <Field label="Phone" optional>
              <input
                {...register('phone')}
                type="tel"
                id="phone"
                style={inputStyle}
                placeholder="+1 555 123 4567"
                onFocus={e => (e.target.style.borderColor = 'rgba(34,211,238,0.35)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(39,39,42,0.8)')}
              />
            </Field>
          </div>

          {/* Interest */}
          <Field label="What are you interested in?" required error={errors.interest?.message}>
            <select
              {...register('interest')}
              id="interest"
              style={{ ...inputStyle, cursor: 'pointer' }}
              onFocus={e => (e.target.style.borderColor = 'rgba(34,211,238,0.35)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(39,39,42,0.8)')}
            >
              <option value="">Select an option...</option>
              {interestOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </Field>

          {/* Project Type — conditional */}
          {selectedInterest === 'consulting' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Field label="Project Type" optional>
                <select
                  {...register('projectType')}
                  id="projectType"
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(34,211,238,0.35)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(39,39,42,0.8)')}
                >
                  <option value="">Select project type...</option>
                  {projectTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </Field>
            </motion.div>
          )}

          {/* Budget & Timeline */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <Field label="Budget Range" optional>
              <select
                {...register('budget')}
                id="budget"
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(34,211,238,0.35)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(39,39,42,0.8)')}
              >
                <option value="">Select budget...</option>
                {budgetOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Timeline" optional>
              <select
                {...register('timeline')}
                id="timeline"
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(34,211,238,0.35)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(39,39,42,0.8)')}
              >
                <option value="">Select timeline...</option>
                {timelineOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </Field>
          </div>

          {/* Message */}
          <Field label="Project Details" required error={errors.message?.message}>
            <textarea
              {...register('message')}
              id="message"
              rows={4}
              style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}
              placeholder="Tell me about your project, goals, and any specific challenges..."
              onFocus={e => (e.target.style.borderColor = 'rgba(34,211,238,0.35)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(39,39,42,0.8)')}
            />
          </Field>

          {/* Honeypot */}
          <input {...register('website')} type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          {/* Status messages */}
          {submitError && (
            <p style={{ fontSize: '0.85rem', color: 'rgb(248 113 113)', textAlign: 'center' }}>{submitError}</p>
          )}
          {submitted && !submitError && (
            <p style={{ fontSize: '0.85rem', color: CYAN, textAlign: 'center' }}>
              Thanks for reaching out! I'll be in touch within 24 hours.
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || submitted}
            className="btn-primary"
            style={{
              width: '100%',
              fontFamily: "'Syne', system-ui, sans-serif",
              letterSpacing: '0.05em',
              fontSize: '0.9rem',
              opacity: isSubmitting || submitted ? 0.7 : 1,
              cursor: isSubmitting || submitted ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? 'Sending...' : submitted ? 'Sent!' : 'Get Started'}
          </button>
        </motion.form>

        {/* ── Direct contact footer ── */}
        <motion.div
          style={{
            marginTop: '3rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(39,39,42,0.5)',
            textAlign: 'center',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p style={{ fontSize: '0.85rem', color: 'rgb(82 82 91)', marginBottom: '1.25rem' }}>
            or reach out directly:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <a
              href="https://calendar.app.google/Wqbt8EJuEh5xvvV58"
              target="_blank"
              rel="noopener"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.625rem 1.25rem',
                background: 'rgba(18,18,20,0.7)',
                border: '1px solid rgba(39,39,42,0.8)',
                borderRadius: '0.5rem',
                color: 'rgb(212 212 216)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'border-color 0.25s ease, color 0.25s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.3)';
                (e.currentTarget as HTMLElement).style.color = 'rgb(250 250 250)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(39,39,42,0.8)';
                (e.currentTarget as HTMLElement).style.color = 'rgb(212 212 216)';
              }}
            >
              Book a Call
            </a>
            <a
              href="mailto:jeremy@intentsolutions.io"
              style={{
                fontSize: '0.875rem',
                color: 'rgb(113 113 122)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = CYAN)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgb(113 113 122)')}
            >
              jeremy@intentsolutions.io
            </a>
          </div>
          <p style={{ fontSize: '0.775rem', color: 'rgb(63 63 70)' }}>gulf shores, alabama</p>
        </motion.div>

      </div>
    </section>
  );
}
