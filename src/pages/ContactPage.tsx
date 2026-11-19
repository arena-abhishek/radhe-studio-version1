import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, MessageSquare } from 'lucide-react';
import { studioConfig } from '../config/studioConfig';
import {
  buildInquirySummary,
  buildWhatsAppDeepLink,
  validateInquiry,
  type InquiryFormData,
  type InquiryValidationErrors,
} from '../utils/inquiry';

interface ContactPageProps {
  preselectedService: string;
}

export function ContactPage({ preselectedService }: ContactPageProps) {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    eventType: preselectedService || studioConfig.proposedServices[0].title,
    eventDate: '',
    location: '',
    message: '',
  });

  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [editableSummary, setEditableSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const summarySectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, eventType: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (field: keyof InquiryFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateInquiry(formData);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      return;
    }

    const summary = buildInquirySummary(formData);
    setEditableSummary(summary);
    setCopied(false);
    requestAnimationFrame(() => {
      summarySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  };

  const handleCopySummary = async () => {
    if (!editableSummary) {
      return;
    }
    try {
      await navigator.clipboard.writeText(editableSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const whatsappUrl = editableSummary
    ? buildWhatsAppDeepLink(editableSummary)
    : buildWhatsAppDeepLink(`Hello ${studioConfig.brandName}, I would like to inquire about availability.`);

  return (
    <div className="page-enter">
      <section className="mx-auto max-w-[1280px] px-5 pt-12 pb-24 sm:px-8 lg:px-12 lg:pt-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left Context & Channels */}
          <div className="space-y-8 lg:col-span-5">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-[#8B5742] uppercase">
                Booking Inquiry
              </p>
              <h1 className="mt-4 font-serif text-5xl leading-[1.06] font-normal text-[#282520] sm:text-6xl">
                Begin a Conversation.
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[#5E5850]">
                Tell us about the occasion, tentative dates, and setting. This interactive inquiry
                form checks your details and compiles a clean message summary ready to share.
              </p>
            </div>

            <div className="divide-y divide-[#D2BC9E]/70 border-y border-[#D2BC9E]/70">
              <div className="py-5">
                <p className="text-xs font-medium tracking-[0.14em] text-[#5E5850] uppercase">
                  Official Instagram
                </p>
                <a
                  href={studioConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-[36px] items-center gap-1.5 text-base font-medium text-[#282520] underline decoration-[#8B5742] underline-offset-4 hover:text-[#8B5742]"
                >
                  <span>{studioConfig.instagramHandle}</span>
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>

              <div className="py-5">
                <p className="text-xs font-medium tracking-[0.14em] text-[#5E5850] uppercase">
                  Region (Inferred)
                </p>
                <p className="mt-2 text-sm text-[#282520]">{studioConfig.location.inferredLabel}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#5E5850]">
                  {studioConfig.location.disclosure}
                </p>
              </div>

              <div className="py-5">
                <p className="text-xs font-medium tracking-[0.14em] text-[#5E5850] uppercase">
                  Direct WhatsApp Handoff
                </p>
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-[44px] items-center gap-2 bg-[#282520] px-5 py-2.5 text-xs font-medium tracking-[0.12em] text-[#F8F5EF] uppercase transition-colors hover:bg-[#8B5742]"
                  >
                    <MessageSquare className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                    <span>Open WhatsApp Chat</span>
                  </a>
                ) : (
                  <p className="mt-2 text-xs leading-relaxed text-[#5E5850]">
                    WhatsApp deep link is inactive until a confirmed studio phone number is added to{' '}
                    <code className="font-mono text-[11px] text-[#282520]">
                      studioConfig.contact.whatsappNumber
                    </code>
                    .
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Form & Interactive Summary */}
          <div className="border border-[#D2BC9E]/70 bg-[#EFE9DF]/55 p-6 sm:p-10 lg:col-span-7">
            <h2 className="font-serif text-3xl font-normal text-[#282520]">
              Prepare Your Booking Note
            </h2>
            <p className="mt-2 text-xs text-[#5E5850]">
              All fields are validated locally. No message is transmitted automatically without a
              connected backend.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block text-xs font-medium tracking-[0.12em] text-[#282520] uppercase"
                  >
                    Your Name
                  </label>
                  <input
                    id="inquiry-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g. Aarav & Meera"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    className="mt-2 block min-h-[46px] w-full border border-[#D2BC9E] bg-[#F8F5EF] px-4 py-2.5 text-sm text-[#282520] placeholder:text-[#777168] focus:border-[#282520] focus:outline-none"
                  />
                  {errors.name && (
                    <p id="error-name" role="alert" className="mt-1.5 text-xs text-[#8B2E2E]">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiry-phone"
                    className="block text-xs font-medium tracking-[0.12em] text-[#282520] uppercase"
                  >
                    Phone Number
                  </label>
                  <input
                    id="inquiry-phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="e.g. +91 98XXX XXXXX"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'error-phone' : undefined}
                    className="mt-2 block min-h-[46px] w-full border border-[#D2BC9E] bg-[#F8F5EF] px-4 py-2.5 text-sm text-[#282520] placeholder:text-[#777168] focus:border-[#282520] focus:outline-none"
                  />
                  {errors.phone && (
                    <p id="error-phone" role="alert" className="mt-1.5 text-xs text-[#8B2E2E]">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="inquiry-event-type"
                    className="block text-xs font-medium tracking-[0.12em] text-[#282520] uppercase"
                  >
                    Event / Session Type
                  </label>
                  <select
                    id="inquiry-event-type"
                    name="eventType"
                    value={formData.eventType}
                    onChange={(e) => handleChange('eventType', e.target.value)}
                    aria-invalid={Boolean(errors.eventType)}
                    aria-describedby={errors.eventType ? 'error-event-type' : undefined}
                    className="mt-2 block min-h-[46px] w-full border border-[#D2BC9E] bg-[#F8F5EF] px-4 py-2.5 text-sm text-[#282520] focus:border-[#282520] focus:outline-none"
                  >
                    {studioConfig.proposedServices.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                    <option value="Custom Celebration Inquiry">Custom Celebration Inquiry</option>
                  </select>
                  {errors.eventType && (
                    <p id="error-event-type" role="alert" className="mt-1.5 text-xs text-[#8B2E2E]">
                      {errors.eventType}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiry-event-date"
                    className="block text-xs font-medium tracking-[0.12em] text-[#282520] uppercase"
                  >
                    Event Date
                  </label>
                  <input
                    id="inquiry-event-date"
                    name="eventDate"
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => handleChange('eventDate', e.target.value)}
                    aria-invalid={Boolean(errors.eventDate)}
                    aria-describedby={errors.eventDate ? 'error-event-date' : undefined}
                    className="mt-2 block min-h-[46px] w-full border border-[#D2BC9E] bg-[#F8F5EF] px-4 py-2.5 text-sm text-[#282520] focus:border-[#282520] focus:outline-none"
                  />
                  {errors.eventDate && (
                    <p id="error-event-date" role="alert" className="mt-1.5 text-xs text-[#8B2E2E]">
                      {errors.eventDate}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="inquiry-location"
                  className="block text-xs font-medium tracking-[0.12em] text-[#282520] uppercase"
                >
                  Celebration Location / City
                </label>
                <input
                  id="inquiry-location"
                  name="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g. Tharad, Banaskantha or destination venue"
                  aria-invalid={Boolean(errors.location)}
                  aria-describedby={errors.location ? 'error-location' : undefined}
                  className="mt-2 block min-h-[46px] w-full border border-[#D2BC9E] bg-[#F8F5EF] px-4 py-2.5 text-sm text-[#282520] placeholder:text-[#777168] focus:border-[#282520] focus:outline-none"
                />
                {errors.location && (
                  <p id="error-location" role="alert" className="mt-1.5 text-xs font-medium text-[#8B2E2E]">
                    {errors.location}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="inquiry-message"
                  className="block text-xs font-medium tracking-[0.12em] text-[#282520] uppercase"
                >
                  Your Story &amp; Details
                </label>
                <textarea
                  id="inquiry-message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Share your ceremony schedule, gathering size, or what moments matter most to you..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  className="mt-2 block w-full border border-[#D2BC9E] bg-[#F8F5EF] px-4 py-3 text-sm text-[#282520] placeholder:text-[#777168] focus:border-[#282520] focus:outline-none"
                />
                {errors.message && (
                  <p id="error-message" role="alert" className="mt-1.5 text-xs text-[#8B2E2E]">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex min-h-[48px] w-full items-center justify-center bg-[#8B5742] px-8 py-3.5 text-xs font-medium tracking-[0.14em] text-[#F8F5EF] uppercase transition-colors hover:bg-[#282520] sm:w-auto"
                >
                  Generate Inquiry Summary
                </button>
              </div>
            </form>

            {/* Editable Message Summary Output */}
            {editableSummary !== null && (
              <div
                ref={summarySectionRef}
                aria-live="polite"
                className="mt-10 border-t border-[#D2BC9E] pt-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-serif text-2xl font-normal text-[#282520]">
                    Editable Inquiry Summary
                  </h3>
                  <span className="text-xs font-medium tracking-[0.12em] text-[#8B5742] uppercase">
                    Local Demo · Not Sent Automatically
                  </span>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-[#5E5850]">
                  Review or refine your note below, then copy it to share via Instagram DM
                  {whatsappUrl ? ' or open directly in WhatsApp.' : '.'}
                </p>

                <label htmlFor="editable-summary-box" className="sr-only">
                  Editable inquiry message summary
                </label>
                <textarea
                  id="editable-summary-box"
                  rows={8}
                  value={editableSummary}
                  onChange={(e) => setEditableSummary(e.target.value)}
                  className="mt-4 block w-full border border-[#D2BC9E] bg-[#F8F5EF] p-4 font-sans text-sm leading-relaxed text-[#282520] focus:border-[#282520] focus:outline-none"
                />

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex min-h-[44px] items-center gap-2 border border-[#282520] bg-[#282520] px-5 py-2.5 text-xs font-medium tracking-[0.12em] text-[#F8F5EF] uppercase transition-colors hover:bg-[#8B5742] hover:border-[#8B5742]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                        <span>Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>

                  <a
                    href={studioConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 border border-[#D2BC9E] bg-[#F8F5EF] px-5 py-2.5 text-xs font-medium tracking-[0.12em] text-[#282520] uppercase transition-colors hover:border-[#282520]"
                  >
                    <span>Message on Instagram</span>
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </a>

                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 border border-[#8B5742] bg-[#8B5742] px-5 py-2.5 text-xs font-medium tracking-[0.12em] text-[#F8F5EF] uppercase transition-colors hover:bg-[#282520]"
                    >
                      <MessageSquare className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                      <span>Send via WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
