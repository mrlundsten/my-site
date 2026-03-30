import Image from "next/image";
import Link from "next/link";
import { FeaturedWorkSwitcher } from "@/components/featured-work-switcher";
import { Reveal } from "@/components/reveal";
import { StreetCollectionMotion } from "@/components/street-collection-motion";

const streetCollection = [
  {
    src: "/home/street-collection-1.jpeg",
    alt: "A street photograph from the archive.",
  },
  {
    src: "/home/hero-crosswalk.jpg",
    alt: "A child standing in a crosswalk at night.",
  },
  {
    src: "/home/street-collection-2.jpeg",
    alt: "A second street photograph from the archive.",
  },
];

export default function Home() {
  return (
    <main className="bg-[var(--paper)] text-[var(--ink)]">
      <section className="white-band border-b border-[color:var(--border-soft)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-6 pb-14 pt-6 md:px-10 lg:px-12">
          <header className="flex flex-col gap-8 border-b border-[color:var(--border-soft)] pb-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-[family:var(--font-display-sans)] text-[0.95rem] uppercase tracking-[0.18em] text-[var(--ink)]">
                Ben Lundsten
              </p>
              <p className="mt-2 font-[family:var(--font-editorial-serif)] text-lg italic leading-7 text-[var(--muted-strong)]">
                Photographer/Filmmaker
              </p>
            </div>
            <nav className="flex flex-wrap items-center gap-4 font-[family:var(--font-field-mono)] text-[0.72rem] uppercase tracking-[0.24em] text-[var(--muted)]">
              <Link href="#featured-work">Featured Work</Link>
              <Link href="#street-collection">Street Collection</Link>
              <Link href="#sketchbook">Sketchbook</Link>
              <Link href="#contact">Contact</Link>
            </nav>
          </header>

          <Reveal className="space-y-8">
            <div className="space-y-5">
              <p className="editorial-kicker">
                I tell stories for people doing meaningful work.
              </p>
              <h1 className="display-heading max-w-5xl text-4xl leading-[0.94] md:text-7xl">
                My mission is to listen intently, look carefully, and record
                with intention.
              </h1>
            </div>

            <div className="flex flex-col gap-6 border-t border-[color:var(--border-soft)] pt-4 md:flex-row md:items-start md:justify-between">
              <p className="max-w-xl text-[1.04rem] leading-8 text-[var(--muted-strong)]">
                I collaborate with people and organizations doing work that
                matters. Through photography and documentary film, I shape
                stories that reflect what&apos;s real, so the work can be seen,
                understood, and remembered.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#featured-work"
                  className="inline-flex items-center justify-center border border-[color:var(--ink)] px-5 py-3 font-[family:var(--font-field-mono)] text-[0.7rem] uppercase tracking-[0.24em] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                >
                  See featured work
                </Link>
                <Link
                  href="#street-collection"
                  className="inline-flex items-center justify-center border border-[color:var(--border-strong)] px-5 py-3 font-[family:var(--font-field-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[var(--muted-strong)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
                >
                  Browse street collection
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal delay={120} eager>
        <section className="full-bleed-frame border-b border-[color:var(--border-soft)]">
          <figure className="photo-motion">
            <Image
              src="/home/hero-crosswalk.jpg"
              alt="A child pauses in a crosswalk at night as traffic moves past in a blur."
              width={1152}
              height={768}
              priority
            />
          </figure>
        </section>
      </Reveal>

      <FeaturedWorkSwitcher />

      <section
        id="working-together"
        className="working-together-section"
      >
        <Reveal className="editorial-journey__opening-shell">
          {/* Full-width breakout wrapper: image touches the viewport edge while text stays constrained. */}
          <figure className="editorial-journey__opening-image photo-motion">
            <Image
              src="/home/story-portrait-vertical.jpeg"
              alt="A quiet vertical portrait used to anchor the Working Together section."
              width={1000}
              height={1500}
            />
          </figure>

          {/* Right-side text column: constrained separately from the breakout image rail. */}
          <div className="editorial-journey__opening-text-wrap">
            <div className="editorial-journey__opening-text">
              <div className="editorial-journey__intro">
                <p className="editorial-kicker">Working Together</p>
                <h2 className="display-heading max-w-5xl text-4xl leading-[0.95] md:text-6xl">
                  A thoughtful process shaped by trust, attention, and the people
                  along the way.
                </h2>
                <p className="editorial-journey__lede">
                  My work has taken me to Indonesia, Thailand, Myanmar,
                  Singapore, and Sweden. Across each place, what has stayed with
                  me most are not just the locations, but the people I&apos;ve
                  encountered and the stories they&apos;ve shared.
                </p>
                <p className="editorial-journey__lede">
                  Whether in churches, villages, or conversations with strangers
                  in passing, I&apos;ve been continually humbled by the
                  individuals God has placed in my path. That experience has
                  shaped how I approach every story: with patience, respect, and
                  a deep responsibility to represent people honestly.
                </p>
                <p className="editorial-journey__lede">
                  The work begins there long before the camera.
                </p>
              </div>

              <div className="editorial-journey__text editorial-journey__text--opening">
                <p className="editorial-kicker">Process</p>
                <h3 className="display-heading text-3xl leading-[0.96] md:text-5xl">
                  Listening first. Then shaping the story with intention.
                </h3>
                <p>
                  Every project begins with understanding. That means taking
                  time to learn the context surrounding the story: the people
                  involved, the purpose behind the work, and the environment it
                  lives in.
                </p>
                <p>
                  From there, the process becomes more deliberate.
                </p>
                <p>
                  I study the history and current realities of the communities
                  I&apos;m working with. I look for the challenges, the moments
                  of growth, and the individuals who carry the story forward in
                  their daily lives. The goal is not just to document what is
                  visible, but to understand what gives it meaning.
                </p>
                <p>
                  Access is built through relationships. I work closely with
                  local leaders, pastors, families, and collaborators who help
                  guide the process with cultural awareness and trust. That
                  foundation allows the work to unfold naturally, without
                  forcing moments that aren&apos;t there.
                </p>
                <p>
                  Throughout it all, the approach remains grounded in care. That
                  includes being mindful of consent, respecting cultural
                  context, and making sure the work reflects people with dignity
                  and honesty.
                </p>
                <p>
                  The result is a body of work shaped with intention built to
                  live beyond a single moment and to serve the people it
                  represents.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-16 md:px-10 lg:px-12">
          <Reveal className="editorial-journey">
            <div className="editorial-journey__quote">
              <p>
                “The work should feel honest enough to trust, restrained enough
                to last, and clear enough to serve the people it was made for.”
              </p>
            </div>

            <div className="editorial-journey__movement editorial-journey__movement--right">
              <div className="editorial-journey__visual editorial-journey__visual--inspiration">
                {/* Two static inspiration images: arranged with the same editorial pacing
                    as Street Collection, but kept still and quieter here. */}
                <figure className="story-image-frame editorial-journey__inspiration-frame editorial-journey__inspiration-frame--large">
                  <Image
                    src="/home/story-documentary-wide.jpeg"
                    alt="A documentary moment used to anchor the Inspiration section."
                    width={1600}
                    height={1067}
                  />
                </figure>

                <figure className="story-image-frame editorial-journey__inspiration-frame editorial-journey__inspiration-frame--small">
                  <Image
                    src="/home/story-detail.jpeg"
                    alt="A close detail image that supports the quieter pacing of the Inspiration section."
                    width={1200}
                    height={1500}
                  />
                </figure>
              </div>

              <div className="editorial-journey__text">
                <p className="editorial-kicker">Inspiration</p>
                <h3 className="display-heading text-3xl leading-[0.96] md:text-5xl">
                  Drawn toward the people, the details, and what others might
                  overlook.
                </h3>
                <p>
                  What continues to resonate with me from each journey are the
                  individuals I&apos;ve met and the stories they carry.
                </p>
                <p>
                  Often, the most meaningful moments are not the most obvious
                  ones. They exist in the quieter spaces in conversation, in
                  routine, in the way someone carries responsibility or
                  expresses faith in everyday life.
                </p>
                <p>
                  That attention to detail shapes the work. It allows the story
                  to remain grounded in what is real, rather than what might
                  appear most dramatic from the outside.
                </p>
                <p>
                  My approach is influenced by documentary practice, but also by
                  a belief that stories are built over time. They are revealed
                  through trust, observation, and the willingness to stay
                  present long enough for something honest to emerge.
                </p>
              </div>
            </div>

            <div className="editorial-journey__movement editorial-journey__movement--funnel">
              {/* Next Steps is centered once the supporting image is removed. */}
              <div className="editorial-journey__text editorial-journey__text--funnel">
                <p className="editorial-kicker">Next Steps</p>
                <h3 className="display-heading text-3xl leading-[0.96] md:text-5xl">
                  A clear path from first conversation to finished story.
                </h3>
                <ol className="editorial-journey__steps">
                  <li>
                    <span>01</span>
                    <div>
                      <strong>Conversation</strong>
                      <p>
                        We begin with a conversation to understand your
                        organization, the people involved, and what the story
                        needs to accomplish.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span>02</span>
                    <div>
                      <strong>Story Development</strong>
                      <p>
                        From there, I shape an approach based on your goals,
                        your audience, and the tone the work should carry.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span>03</span>
                    <div>
                      <strong>Production</strong>
                      <p>
                        The story is captured with an emphasis on presence,
                        flexibility, and allowing real moments to unfold
                        naturally.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span>04</span>
                    <div>
                      <strong>Delivery</strong>
                      <p>
                        The final work is edited and prepared with care so it
                        can be shared, published, and used with purpose.
                      </p>
                    </div>
                  </li>
                </ol>
                <div className="editorial-journey__cta">
                  <p className="editorial-kicker">Final CTA</p>
                  <p>
                    If you have a story to tell, I&apos;d be glad to hear about
                    it.
                  </p>
                  <Link href="#contact">Start a conversation</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="street-collection"
        className="border-y border-[color:var(--border-soft)] white-band"
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10 lg:px-12">
          <Reveal>
            <StreetCollectionMotion className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="space-y-5 lg:pt-12">
              <p className="editorial-kicker">Street Collection</p>
              <h2 className="display-heading max-w-sm text-3xl leading-[0.95] md:text-5xl">
                Street photographs from the places I&apos;ve moved through.
              </h2>
              <p className="max-w-sm text-[1.02rem] leading-8 text-[var(--muted-strong)]">
                A broader collection of street work from crossings, sidewalks,
                roads, and transitional spaces around the world.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-[0.82fr_1.18fr]">
              <div className="grid gap-8 md:pt-18">
                <div className="story-image-frame photo-motion">
                  <div className="story-image-frame__label story-image-frame__label--top">
                    <div className="story-image-frame__label-clip">
                      <span className="story-image-frame__label-text story-image-frame__label-text--top">
                        01
                      </span>
                    </div>
                  </div>
                  <Image
                    src={streetCollection[0].src}
                    alt={streetCollection[0].alt}
                    width={1000}
                    height={1000}
                  />
                  <div className="story-image-frame__label story-image-frame__label--bottom">
                    <div className="story-image-frame__label-clip">
                      <span className="story-image-frame__label-text story-image-frame__label-text--bottom">
                        Southeast Asia
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-8">
                <div className="story-image-frame photo-motion">
                  <div className="story-image-frame__label story-image-frame__label--top">
                    <div className="story-image-frame__label-clip">
                      <span className="story-image-frame__label-text story-image-frame__label-text--top">
                        02
                      </span>
                    </div>
                  </div>
                  <Image
                    src={streetCollection[1].src}
                    alt={streetCollection[1].alt}
                    width={1152}
                    height={768}
                  />
                  <div className="story-image-frame__label story-image-frame__label--bottom">
                    <div className="story-image-frame__label-clip">
                      <span className="story-image-frame__label-text story-image-frame__label-text--bottom">
                        Europe
                      </span>
                    </div>
                  </div>
                </div>
                <div className="story-image-frame photo-motion max-w-[22rem] md:ml-auto">
                  <div className="story-image-frame__label story-image-frame__label--top">
                    <div className="story-image-frame__label-clip">
                      <span className="story-image-frame__label-text story-image-frame__label-text--top">
                        03
                      </span>
                    </div>
                  </div>
                  <Image
                    src={streetCollection[2].src}
                    alt={streetCollection[2].alt}
                    width={1000}
                    height={1000}
                  />
                  <div className="story-image-frame__label story-image-frame__label--bottom">
                    <div className="story-image-frame__label-clip">
                      <span className="story-image-frame__label-text story-image-frame__label-text--bottom">
                        The United States
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </StreetCollectionMotion>
          </Reveal>
        </div>
      </section>

      <section id="sketchbook" className="wash-band">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10 lg:px-12">
          <Reveal className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="grid gap-8 md:grid-cols-[1.18fr_0.82fr]">
              <div className="story-image-frame photo-motion">
                <Image
                  src="/home/sketchbook-1.jpeg"
                  alt="A photograph from the sketchbook archive."
                  width={1500}
                  height={1000}
                />
              </div>
              <div className="space-y-8 md:pt-18">
                <div className="story-image-frame photo-motion">
                  <Image
                    src="/home/story-portrait-vertical.jpeg"
                    alt="A quiet image from the archive."
                    width={1000}
                    height={1500}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:pt-24">
              <p className="editorial-kicker">Sketchbook</p>
              <h2 className="display-heading max-w-sm text-3xl leading-[0.95] md:text-5xl">
                A place for photographs and writing outside assignments.
              </h2>
              <p className="max-w-sm text-[1.02rem] leading-8 text-[var(--muted-strong)]">
                Sketchbook is where the site opens into notes, short stories,
                personal images, and the rougher work that still matters.
              </p>
              <Link
                href="#contact"
                className="inline-flex w-fit items-center justify-center border border-[color:var(--ink)] px-5 py-3 font-[family:var(--font-field-mono)] text-[0.7rem] uppercase tracking-[0.24em] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              >
                Build sketchbook next
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-[color:var(--border-soft)] bg-[var(--wash)]"
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 lg:px-12">
          <Reveal className="grid gap-10 md:grid-cols-[1fr_auto]">
            <div className="space-y-5">
              <p className="editorial-kicker">Contact</p>
              <h2 className="display-heading max-w-3xl text-4xl leading-[0.94] md:text-7xl">
                Available for documentary assignments, editorial features, and
                nonprofit storytelling partnerships.
              </h2>
              <p className="max-w-2xl text-[1.02rem] leading-8 text-[var(--muted-strong)]">
                The homepage now leads much more directly with image, scale, and
                structure. Next we can refine the text and continue replacing
                image sequences story by story.
              </p>
            </div>

            <div className="flex flex-col gap-3 self-start">
              <Link
                href="mailto:hello@example.com"
                className="inline-flex items-center justify-center border border-[color:var(--ink)] px-5 py-3 font-[family:var(--font-field-mono)] text-[0.7rem] uppercase tracking-[0.24em] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              >
                hello@example.com
              </Link>
              <p className="text-sm leading-6 text-[var(--muted)]">
                Available for commissions, editorial features, and nonprofit
                partnerships.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
