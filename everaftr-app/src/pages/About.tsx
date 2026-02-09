import { Link } from 'react-router-dom';
import {
  Heart,
  Globe,
  Shield,
  Users,
  Mail,
  Instagram,
  Facebook,
  Music,
  Sparkles,
} from 'lucide-react';

export default function About() {
  const dreamElements = [
    {
      name: 'Dream',
      symbolism: 'Vision & imagination',
      colors: ['#9D8BD8', '#F4B8C5', '#F4C688'],
      gradient:
        'linear-gradient(90deg, #9D8BD8 0%, #F4B8C5 50%, #F4C688 100%)',
      section: 'The foundation — where your vision begins',
      description: 'Every celebration starts with a dream. Haraya gives you the space to imagine, explore, and shape your perfect day.',
    },
    {
      name: 'Plan',
      symbolism: 'Structure & clarity',
      colors: ['#5B7C99', '#C5D5E4', '#F4C688'],
      gradient:
        'linear-gradient(90deg, #5B7C99 0%, #C5D5E4 50%, #F4C688 100%)',
      section: 'The journey — bringing dreams to reality',
      description: 'Transform imagination into action with tools that understand Filipino celebrations — from ninongs to lechon suppliers.',
    },
    {
      name: 'Celebrate',
      symbolism: 'Joy & togetherness',
      colors: ['#F4B8C5', '#F4C688', '#9D8BD8'],
      gradient:
        'linear-gradient(90deg, #F4B8C5 0%, #F4C688 50%, #9D8BD8 100%)',
      section: 'The culmination — your moment to shine',
      description: 'Where every detail comes together and dreams become memories. Built for every love story, rooted in Filipino tradition.',
    },
  ];

  const values = [
    {
      icon: Globe,
      title: 'Filipino-First',
      description:
        "We speak your language. We know your traditions. From ninongs and ninangs to Pre-Cana seminars, lechon debates to Viber group chats — we understand the reality of planning a Filipino celebration.",
    },
    {
      icon: Heart,
      title: 'Every Couple',
      description:
        "No assumptions. No gendered defaults. Whether you're planning a church wedding, civil ceremony, nikah, or commitment celebration — your story deserves to be celebrated your way.",
    },
    {
      icon: Shield,
      title: 'Trusted',
      description:
        'Real reviews from real couples. Verified vendors. Transparent pricing. No more scam anxiety, no more wondering if that vendor is legit. We build trust into every interaction.',
    },
    {
      icon: Users,
      title: 'Community',
      description:
        'Built with and for Filipino couples and wedding professionals. Your feedback shapes the platform. Your stories inspire others. Together, we create something better.',
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="bg-cloud-white py-16 px-6 md:py-24 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.1] text-text-primary">
            Dream it. Plan it. Celebrate it.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-text-primary md:text-lg">
            haraya is the Philippines' first celebration planning platform built
            for every couple — where dreams take shape.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-bg-primary py-16 px-6 md:py-24 md:px-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-[clamp(1.75rem,4vw,2.625rem)] font-normal leading-[1.2] text-text-primary">
            Our Story
          </h2>

          <div className="mt-8 space-y-6 font-sans text-base font-light leading-relaxed text-text-primary md:text-lg">
            <p>
              Filipino couples deserve a celebration planning platform that
              understands their culture — ninongs and ninangs, Pre-Cana
              seminars, lechon debates, and Viber group chats. We built
              haraya because no one else has.
            </p>
            <p>
              We believe every love story deserves to be celebrated. Whether
              you're planning a church wedding in Manila, a garden ceremony in
              Tagaytay, a nikah in Marawi, or a commitment celebration in BGC —
              haraya is for you.
            </p>
            <p className="italic text-dream-lavender">
              This is planning built around your needs, your traditions, and
              your vision. Not someone else's template.
            </p>
          </div>
        </div>
      </section>

      {/* The Haraya Concept */}
      <section className="bg-pearl py-16 px-6 md:py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-[clamp(1.75rem,4vw,2.625rem)] font-normal leading-[1.2] text-text-primary">
              Where Dreams Take Shape
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base font-light leading-relaxed text-text-primary md:text-lg">
              Our design celebrates the Filipino imagination — haraya: the power to dream, envision, and create something beautiful
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {dreamElements.map((element) => (
              <div
                key={element.name}
                className="group overflow-hidden rounded-lg border border-whisper bg-pearl transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                {/* Top border with element's colors */}
                <div
                  className="h-[4px]"
                  style={{ background: element.gradient }}
                />

                <div className="p-8">
                  <h3 className="font-serif text-3xl font-normal text-text-primary">
                    {element.name}
                  </h3>
                  <p className="mt-2 font-sans text-sm font-light italic leading-relaxed text-dream-lavender">
                    {element.symbolism}
                  </p>

                  {/* Color swatches */}
                  <div className="mt-4 flex gap-2">
                    {element.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="h-6 w-6 rounded-full border-2 border-whisper"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>

                  <p className="mt-4 font-sans text-sm font-light leading-relaxed text-text-primary">
                    {element.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-center font-sans text-sm font-light leading-relaxed text-text-secondary md:text-base">
            Our design celebrates the Filipino spirit of haraya — the power to imagine, dream, and create something beautiful. Every color, every detail invites you to bring your vision to life.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-bg-primary py-16 px-6 md:py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-[clamp(1.75rem,4vw,2.625rem)] font-normal leading-[1.2] text-text-primary">
            Our Values
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="rounded-lg border border-whisper bg-pearl p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(157,139,216,0.1)]">
                    <Icon className="h-6 w-6 text-dream-lavender" />
                  </div>
                  <h3 className="mb-3 font-sans text-xl font-medium text-text-primary">
                    {value.title}
                  </h3>
                  <p className="font-sans text-sm font-light leading-relaxed text-text-secondary">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Vendors Section */}
      <section className="border-t border-border bg-gradient-to-r from-cloud-white to-whisper py-16 px-6 md:py-20 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <Sparkles className="mx-auto mb-6 h-12 w-12 text-dream-lavender" />
          <h2 className="font-serif text-[clamp(1.75rem,4vw,2.625rem)] font-normal leading-[1.2] text-text-primary">
            Are you a celebration vendor?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-base font-light leading-relaxed text-text-primary md:text-lg">
            Join the platform built to help Filipino celebration professionals
            thrive. Free listings, real leads, and a community that values your
            craft.
          </p>
          <Link
            to="/vendor-dashboard"
            className="mt-8 inline-block rounded bg-dream-lavender px-8 py-3 font-sans text-sm tracking-wide text-cloud-white transition hover:bg-[#8169C4]"
          >
            List Your Business
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-bg-primary py-16 px-6 md:py-24 md:px-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-[clamp(1.75rem,4vw,2.625rem)] font-normal leading-[1.2] text-text-primary">
            Get in Touch
          </h2>

          <div className="mt-12 space-y-8">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(157,139,216,0.1)]">
                <Mail className="h-5 w-5 text-dream-lavender" />
              </div>
              <div>
                <h3 className="font-sans text-lg font-medium text-text-primary">
                  Email Us
                </h3>
                <a
                  href="mailto:hello@haraya.ph"
                  className="mt-1 font-sans text-base font-light text-dream-lavender transition hover:text-[#8169C4]"
                >
                  hello@haraya.ph
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(157,139,216,0.1)]">
                <Globe className="h-5 w-5 text-dream-lavender" />
              </div>
              <div>
                <h3 className="mb-3 font-sans text-lg font-medium text-text-primary">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/haraya.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-primary transition hover:border-dream-lavender hover:bg-[rgba(157,139,216,0.1)]"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5 text-text-primary" />
                  </a>
                  <a
                    href="https://facebook.com/haraya.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-primary transition hover:border-dream-lavender hover:bg-[rgba(157,139,216,0.1)]"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5 text-text-primary" />
                  </a>
                  <a
                    href="https://tiktok.com/@haraya.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-primary transition hover:border-dream-lavender hover:bg-[rgba(157,139,216,0.1)]"
                    aria-label="TikTok"
                  >
                    <Music className="h-5 w-5 text-text-primary" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="mt-16 border-t border-border pt-8 text-center">
            <p className="font-serif text-xl italic leading-relaxed text-dream-lavender md:text-2xl">
              where dreams take shape
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
