import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

const featuredStories = [
  {
    title: "Travel Documentary Work",
    label: "Featured story / 01",
    description:
      "Long-form essays shaped by travel, place, and the tension between landscape, movement, and the people encountered along the way.",
    hero: {
      src: "/home/story-panorama.jpeg",
      alt: "Two figures silhouetted on a ridge against a wide landscape.",
    },
    frames: [
      {
        src: "/home/story-portrait-vertical.jpeg",
        alt: "A figure walking beneath trees on a narrow path.",
      },
      {
        src: "/home/story-detail.jpeg",
        alt: "Three women posed together in a portrait.",
      },
      {
        src: "/home/sketchbook-1.jpeg",
        alt: "A scene from the archive.",
      },
    ],
  },
  {
    title: "Burmese Christian Orphanage",
    label: "Featured story / 02",
    description:
      "A documentary story from Myanmar centered on faith, education, and daily life inside a Christian orphanage community.",
    hero: {
      src: "/home/myanmar/Recent-Website-12.webp",
      alt: "Two children walk down a dirt path inside the orphanage grounds in Myanmar.",
    },
    frames: [],
  },
  {
    title: "Street Photography Collection",
    label: "Featured story / 03",
    description:
      "A body of work built from timing, geometry, and passing light, collected in cities, roads, and transitional spaces between assignments.",
    hero: {
      src: "/home/hero-crosswalk.jpg",
      alt: "A child standing alone in a crosswalk at night.",
    },
    frames: [
      {
        src: "/home/story-documentary-wide.jpeg",
        alt: "A black-and-white image with geometric flags.",
      },
      {
        src: "/home/street-collection-1.jpeg",
        alt: "A street photograph from the collection.",
      },
      {
        src: "/home/street-collection-2.jpeg",
        alt: "A second street photograph from the collection.",
      },
    ],
  },
];

const myanmarStoryImages = [
  {
    src: "/home/myanmar/Myanmar-03935.webp",
    alt: "A child looks out from a window frame.",
  },
  {
    src: "/home/myanmar/Myanmar-03956.webp",
    alt: "A figure stands in a narrow passage between buildings.",
  },
  {
    src: "/home/myanmar/Myanmar-03968.webp",
    alt: "Two boys smile together for the camera.",
  },
  {
    src: "/home/myanmar/Myanmar-04167.webp",
    alt: "Young men sit in a row during prayer.",
  },
  {
    src: "/home/myanmar/Myanmar-04181.webp",
    alt: "A woman and two children walk through the orphanage grounds.",
  },
  {
    src: "/home/myanmar/Myanmar-04215.webp",
    alt: "Women help an elder walk between buildings.",
  },
  {
    src: "/home/myanmar/Myanmar-04287.webp",
    alt: "Two women sit together outdoors in portrait.",
  },
  {
    src: "/home/myanmar/Myanmar-04307.webp",
    alt: "An older man walks through a doorway into sunlight.",
  },
  {
    src: "/home/myanmar/Myanmar-04369.webp",
    alt: "A girl studies papers in a dim room lit by sunlight.",
  },
  {
    src: "/home/myanmar/Myanmar-04617.webp",
    alt: "A quiet documentary frame from the orphanage.",
  },
  {
    src: "/home/myanmar/Myanmar-04626.webp",
    alt: "A quiet documentary frame from the orphanage grounds.",
  },
  {
    src: "/home/myanmar/Recent-Website-12.webp",
    alt: "Two children walk down a road beneath trees.",
  },
  {
    src: "/home/myanmar/Recent-Website-2.webp",
    alt: "Two children with thanaka smile at the camera.",
  },
  {
    src: "/home/myanmar/Recent-Website-4.webp",
    alt: "A group of young women laugh together while seated.",
  },
  {
    src: "/home/myanmar/Recent-Website-7.webp",
    alt: "A documentary scene from the orphanage community.",
  },
  {
    src: "/home/myanmar/Recent-Website-9.webp",
    alt: "A documentary scene from the orphanage community.",
  },
];

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
              <p className="editorial-kicker">Benjamin Lundsten</p>
              <p className="mt-2 max-w-xl text-base leading-7 text-[var(--muted-strong)]">
                Documentary, street, and portrait photography built around
                human stories.
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
              <p className="editorial-kicker">Opening statement</p>
              <h1 className="display-heading max-w-5xl text-4xl leading-[0.94] md:text-7xl">
                Everyone has a story to tell; it&apos;s my responsibility to
                look carefully, listen intently, and record intentionally.
              </h1>
            </div>

            <div className="flex flex-col gap-6 border-t border-[color:var(--border-soft)] pt-4 md:flex-row md:items-start md:justify-between">
              <p className="max-w-xl text-[1.04rem] leading-8 text-[var(--muted-strong)]">
                The work moves between travel documentary, local documentary,
                and street photography, always driven by observation before
                performance.
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

      <Reveal delay={120}>
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

      <section id="featured-work" className="white-band">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10 lg:px-12">
          <Reveal className="mb-18 grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5">
              <p className="editorial-kicker">Featured work</p>
              <h2 className="display-heading max-w-xl text-3xl leading-[0.95] md:text-5xl">
                A stronger read on the work should come from the images first.
              </h2>
            </div>
            <div className="md:pt-8">
              <p className="max-w-lg text-[1.03rem] leading-8 text-[var(--muted-strong)]">
                The homepage should work like an opening sequence: one anchor
                image, then a spare set of frames that show how the story
                gathers shape.
              </p>
            </div>
          </Reveal>

          <div className="space-y-28">
            <Reveal>
              <article className="story-spread grid gap-10 lg:grid-cols-[0.58fr_1.42fr]">
                <div className="space-y-6 lg:pt-10">
                  <p className="editorial-kicker">{featuredStories[0].label}</p>
                  <h3 className="display-heading max-w-sm text-3xl leading-[0.96] md:text-4xl">
                    {featuredStories[0].title}
                  </h3>
                  <p className="max-w-sm text-[1.02rem] leading-8 text-[var(--muted-strong)]">
                    {featuredStories[0].description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="story-image-frame photo-motion">
                    <Image
                      src={featuredStories[0].hero.src}
                      alt={featuredStories[0].hero.alt}
                      width={1500}
                      height={702}
                    />
                    <div className="photo-caption">
                      <span>{featuredStories[0].label}</span>
                      <span>{featuredStories[0].title}</span>
                    </div>
                  </div>
                  <div className="contact-strip">
                    {featuredStories[0].frames.map((frame) => (
                      <div
                        key={frame.src}
                        className="contact-strip__frame photo-motion"
                      >
                        <Image
                          src={frame.src}
                          alt={frame.alt}
                          width={1000}
                          height={1000}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal>
              <article className="story-spread space-y-12">
                <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
                  <p className="editorial-kicker">{featuredStories[1].label}</p>
                  <div className="space-y-6 lg:pt-10">
                    <h3 className="display-heading max-w-sm text-3xl leading-[0.96] md:text-4xl">
                      {featuredStories[1].title}
                    </h3>
                    <p className="max-w-sm text-[1.02rem] leading-8 text-[var(--muted-strong)]">
                      {featuredStories[1].description}
                    </p>
                  </div>

                  <div className="photo-motion lg:mr-[-14vw]">
                    <Image
                      src={featuredStories[1].hero.src}
                      alt={featuredStories[1].hero.alt}
                      width={2500}
                      height={1667}
                      className="bleed-right"
                    />
                  </div>
                </div>

                <div className="proof-sheet">
                  <div className="proof-sheet__grid">
                    {myanmarStoryImages.map((frame, index) => (
                      <div key={frame.src} className="proof-sheet__frame">
                        <span className="proof-sheet__index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="photo-motion">
                          <Image
                            src={frame.src}
                            alt={frame.alt}
                            width={2500}
                            height={1667}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal>
              <article className="story-spread grid gap-12 lg:grid-cols-[0.52fr_1.48fr]">
                <div className="space-y-6 lg:pt-10">
                  <p className="editorial-kicker">{featuredStories[2].label}</p>
                  <h3 className="display-heading max-w-xs text-3xl leading-[0.96] md:text-4xl">
                    {featuredStories[2].title}
                  </h3>
                  <p className="max-w-sm text-[1.02rem] leading-8 text-[var(--muted-strong)]">
                    {featuredStories[2].description}
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-[1.22fr_0.78fr] md:items-end">
                  <div className="story-image-frame photo-motion">
                    <Image
                      src={featuredStories[2].hero.src}
                      alt={featuredStories[2].hero.alt}
                      width={1152}
                      height={768}
                    />
                    <div className="photo-caption">
                      <span>{featuredStories[2].label}</span>
                      <span>{featuredStories[2].title}</span>
                    </div>
                  </div>
                  <div className="grid gap-6">
                    {featuredStories[2].frames.map((frame, index) => (
                      <div
                        key={frame.src}
                        className={`story-image-frame photo-motion ${
                          index === 1 ? "md:translate-x-6" : ""
                        }`}
                      >
                        <Image
                          src={frame.src}
                          alt={frame.alt}
                          width={1000}
                          height={1000}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="street-collection"
        className="border-y border-[color:var(--border-soft)] bg-[var(--wash)]"
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10 lg:px-12">
          <Reveal className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
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
                  <Image
                    src={streetCollection[0].src}
                    alt={streetCollection[0].alt}
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
              <div className="grid gap-8">
                <div className="story-image-frame photo-motion">
                  <Image
                    src={streetCollection[1].src}
                    alt={streetCollection[1].alt}
                    width={1152}
                    height={768}
                  />
                </div>
                <div className="story-image-frame photo-motion max-w-[22rem] md:ml-auto">
                  <Image
                    src={streetCollection[2].src}
                    alt={streetCollection[2].alt}
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="sketchbook" className="white-band">
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
