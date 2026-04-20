import { Metadata } from "next";
import { Mail, MapPin, Clock, Calendar } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { ContactForm } from "@/components/forms/contact-form";
import { FadeIn } from "@/components/motion/fade-in";
import { siteConfig } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with VizionScop3 to discuss your next technology project. We respond within one business day.",
  path: "/contact",
});

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.links.email,
    href: `mailto:${siteConfig.links.email}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: `${siteConfig.location.city}, ${siteConfig.location.state}`,
    description: "Remote-first, serving clients worldwide",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 1 business day",
    description: "We value your time",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="lg" className="pt-32">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-[var(--color-electric-cyan)]">
              Get in Touch
            </span>
            <Heading as="h1" size="hero" className="mb-6">
              Let&apos;s build something{" "}
              <span className="bg-gradient-to-r from-[var(--color-electric-cyan)] to-[var(--color-plasma-violet)] bg-clip-text text-transparent">
                extraordinary
              </span>
            </Heading>
            <p className="text-lg text-[var(--color-echo-gray)] md:text-xl">
              Whether you have a clear vision or just an idea, we&apos;re here to
              help turn it into reality. No pitch decks required.
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <FadeIn>
                <h2 className="mb-6 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-signal-white)]">
                  Contact Information
                </h2>

                <div className="mb-8 space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-deep-space)]">
                        <item.icon className="h-5 w-5 text-[var(--color-electric-cyan)]" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--color-echo-gray)]">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-medium text-[var(--color-signal-white)] transition-colors hover:text-[var(--color-electric-cyan)]"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium text-[var(--color-signal-white)]">
                            {item.value}
                          </p>
                        )}
                        {item.description && (
                          <p className="text-sm text-[var(--color-echo-gray)]">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calendar Booking */}
                <div
                  id="schedule"
                  className="rounded-[var(--radius-lg)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)] p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[var(--color-plasma-violet)]" />
                    <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-signal-white)]">
                      Prefer to talk first?
                    </h3>
                  </div>
                  <p className="mb-4 text-sm text-[var(--color-echo-gray)]">
                    Schedule a free 30-minute discovery call to discuss your project
                    needs.
                  </p>
                  <a
                    href="https://cal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border-2 border-[var(--color-plasma-violet)] bg-[var(--color-plasma-violet)]/10 px-4 py-2 text-sm font-medium text-[var(--color-plasma-violet)] transition-all hover:bg-[var(--color-plasma-violet)]/20"
                  >
                    <Calendar className="h-4 w-4" />
                    Book a Call
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <FadeIn delay={0.1}>
                <div className="rounded-[var(--radius-xl)] border border-[var(--color-void-gray)]/50 bg-[var(--color-deep-space)] p-6 md:p-8">
                  <h2 className="mb-6 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-signal-white)]">
                    Send us a Message
                  </h2>
                  <ContactForm />
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
