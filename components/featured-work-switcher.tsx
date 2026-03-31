"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  type MouseEvent,
  type PointerEvent,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type StoryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type Story = {
  id: string;
  label: string;
  title: string;
  location: string;
  year: string;
  description: string;
  body: string[];
  hero: StoryImage;
  preview: StoryImage;
  gallery: StoryImage[];
};

type MicroDoc = {
  id: string;
  label: string;
  title: string;
  descriptor: string;
  runtime: string;
  poster: StoryImage;
  vimeoUrl: string;
  vimeoSourceFile: string;
  video: {
    src: string | null;
    mimeType: string;
    poster: string;
  };
};

function createVimeoEmbedUrl(vimeoUrl: string) {
  const match = vimeoUrl.match(/vimeo\.com\/(\d+)\/([a-zA-Z0-9]+)/);

  if (!match) {
    return vimeoUrl;
  }

  const [, videoId, hash] = match;
  return `https://player.vimeo.com/video/${videoId}?h=${hash}&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;
}

function groupStoryImages(images: StoryImage[]) {
  const pattern = [2, 3, 2, 3];
  const groups: Array<{ images: StoryImage[]; startIndex: number; variant: number }> = [];
  let cursor = 0;
  let patternIndex = 0;

  while (cursor < images.length) {
    const remaining = images.length - cursor;
    let groupSize = Math.min(pattern[patternIndex % pattern.length], remaining);

    if (remaining === 1) {
      if (groups.length > 0) {
        groups[groups.length - 1].images.push(images[cursor]);
      } else {
        groups.push({ images: [images[cursor]], startIndex: cursor, variant: patternIndex % 4 });
      }
      break;
    }

    if (remaining === 4 && groupSize === 3) {
      groupSize = 2;
    }

    groups.push({
      images: images.slice(cursor, cursor + groupSize),
      startIndex: cursor,
      variant: patternIndex % 4,
    });

    cursor += groupSize;
    patternIndex += 1;
  }

  return groups;
}

const monumentExpandedGallery: StoryImage[] = [
  "Monument-Dedication-X100-3023.jpg",
  "Monument-Dedication-X100-3028.jpg",
  "Monument-Dedication-X100-3031.jpg",
  "Monument-Dedication-X100-3034.jpg",
  "Monument-Dedication-X100-3036.jpg",
  "Monument-Dedication-X100-3038.jpg",
  "Monument-Dedication-X100-3040.jpg",
  "Monument-Dedication-X100-3042.jpg",
  "Monument-Dedication-X100-3046.jpg",
  "Monument-Dedication-X100-3047.jpg",
  "Monument-Dedication-X100-3050.jpg",
  "Monument-Dedication-X100-3052.jpg",
  "Monument-Dedication-X100-3054.jpg",
  "Monument-Dedication-X100-3055.jpg",
  "Monument-Dedication-X100-3056.jpg",
  "Monument-Dedication-X100-3063.jpg",
  "Monument-Dedication-X100-3067.jpg",
  "Monument-Dedication-X100-3070.jpg",
  "Monument-Dedication-X100-3071.jpg",
  "Monument-Dedication-X100-3072.jpg",
  "Monument-Dedication-X100-3074.jpg",
  "Monument-Dedication-X100-3075.jpg",
  "Monument-Dedication-X100-3077.jpg",
  "Monument-Dedication-X100-3080.jpg",
  "Monument-Dedication-X100-3082.jpg",
  "Monument-Dedication-X100-3084.jpg",
  "Monument-Dedication-X100-3089.jpg",
  "Monument-Dedication-X100-3096.jpg",
  "Monument-Dedication-X100-3099.jpg",
  "Monument-Dedication-X100-3105.jpg",
  "Monument-Dedication-X100-3108.jpg",
  "Monument-Dedication-X100-3109.jpg",
  "Monument-Dedication-X100-3111.jpg",
  "Monument-Dedication-X100-3116.jpg",
].map((filename, index) => ({
  src: `/home/featured/monument-expanded/${filename}`,
  alt: `Monument dedication documentary frame ${index + 1}.`,
  width: 2500,
  height: 1667,
}));

const sculptureGallery: StoryImage[] = [
  { src: "/home/featured/sculpture/_DSF3638.jpg", alt: "Stone sculpture documentary frame 1.", width: 2000, height: 1333 },
  { src: "/home/featured/sculpture/_DSF3641.jpg", alt: "Stone sculpture documentary frame 2.", width: 2000, height: 1333 },
  { src: "/home/featured/sculpture/_DSF3642.jpg", alt: "Stone sculpture documentary frame 3.", width: 2000, height: 1333 },
  { src: "/home/featured/sculpture/_DSF3643.jpg", alt: "Stone sculpture documentary frame 4.", width: 2000, height: 1333 },
  { src: "/home/featured/sculpture/_DSF3647.jpg", alt: "Stone sculpture documentary frame 5.", width: 2000, height: 1333 },
  { src: "/home/featured/sculpture/_DSF3650.jpg", alt: "Stone sculpture documentary frame 6.", width: 1333, height: 2000 },
  { src: "/home/featured/sculpture/_DSF3658.jpg", alt: "Stone sculpture documentary frame 7.", width: 2000, height: 1333 },
  { src: "/home/featured/sculpture/_DSF3663.jpg", alt: "Stone sculpture documentary frame 8.", width: 2000, height: 1333 },
  { src: "/home/featured/sculpture/_DSF3670.jpg", alt: "Stone sculpture documentary frame 9.", width: 2000, height: 1333 },
  { src: "/home/featured/sculpture/_DSF3676.jpg", alt: "Stone sculpture documentary frame 10.", width: 1333, height: 2000 },
  { src: "/home/featured/sculpture/_DSF3683.jpg", alt: "Stone sculpture documentary frame 11.", width: 2000, height: 1333 },
  { src: "/home/featured/sculpture/_DSF3713.jpg", alt: "Stone sculpture documentary frame 12.", width: 2000, height: 1333 },
  { src: "/home/featured/sculpture/_DSF3722.jpg", alt: "Stone sculpture documentary frame 13.", width: 2000, height: 1333 },
  { src: "/home/featured/sculpture/_DSF3747.jpg", alt: "Stone sculpture documentary frame 14.", width: 2000, height: 1333 },
  { src: "/home/featured/sculpture/_DSF3752.jpg", alt: "Stone sculpture documentary frame 15.", width: 2000, height: 1333 },
  { src: "/home/featured/sculpture/_DSF3756.jpg", alt: "Stone sculpture documentary frame 16.", width: 2000, height: 1333 },
  { src: "/home/featured/sculpture/_DSF3769.jpg", alt: "Stone sculpture documentary frame 17.", width: 2000, height: 1333 },
  { src: "/home/featured/sculpture/_DSF4096.jpg", alt: "Stone sculpture documentary frame 18.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4106.jpg", alt: "Stone sculpture documentary frame 19.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4107.jpg", alt: "Stone sculpture documentary frame 20.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4123.jpg", alt: "Stone sculpture documentary frame 21.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4139.jpg", alt: "Stone sculpture documentary frame 22.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4143.jpg", alt: "Stone sculpture documentary frame 23.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4145.jpg", alt: "Stone sculpture documentary frame 24.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4152.jpg", alt: "Stone sculpture documentary frame 25.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4153.jpg", alt: "Stone sculpture documentary frame 26.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4158.jpg", alt: "Stone sculpture documentary frame 27.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4162.jpg", alt: "Stone sculpture documentary frame 28.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4179.jpg", alt: "Stone sculpture documentary frame 29.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4183.jpg", alt: "Stone sculpture documentary frame 30.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4201.jpg", alt: "Stone sculpture documentary frame 31.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4206.jpg", alt: "Stone sculpture documentary frame 32.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4210.jpg", alt: "Stone sculpture documentary frame 33.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4217.jpg", alt: "Stone sculpture documentary frame 34.", width: 2500, height: 1667 },
  { src: "/home/featured/sculpture/_DSF4220.jpg", alt: "Stone sculpture documentary frame 35.", width: 2500, height: 1667 },
];

const fomaGallery: StoryImage[] = [
  "FOMA_Headshots-0003.jpg",
  "FOMA_Headshots-0004.jpg",
  "FOMA_Headshots-0005.jpg",
  "FOMA_Headshots-0006.jpg",
  "FOMA_Headshots-0007-2.jpg",
  "FOMA_Headshots-0007.jpg",
  "FOMA_Headshots-0010-2.jpg",
  "FOMA_Headshots-0010.jpg",
  "FOMA_Headshots-004.jpg",
  "FOMA_Headshots-033.jpg",
  "FOMA_Headshots-057.jpg",
  "FOMA_Headshots-077.jpg",
  "FOMA_Headshots-220623-2.jpg",
  "FOMA_Headshots-220623.jpg",
  "FOMA_Headshots-220624.jpg",
  "FOMA_Headshots-220626.jpg",
  "FOMA_Headshots-220627-2.jpg",
  "FOMA_Headshots-220627.jpg",
  "FOMA_Headshots-220631-2.jpg",
  "FOMA_Headshots-220631.jpg",
  "FOMA_Headshots-220636-2.jpg",
  "FOMA_Headshots-220636.jpg",
  "FOMA_Headshots-220639.jpg",
  "FOMA_Headshots-220641.jpg",
  "FOMA_Headshots-220649-2.jpg",
  "FOMA_Headshots-220649.jpg",
  "FOMA_Headshots-220652.jpg",
  "FOMA_Headshots-220654-2.jpg",
  "FOMA_Headshots-220654.jpg",
  "FOMA_Headshots-220658.jpg",
  "FOMA_Headshots-220660-2.jpg",
  "FOMA_Headshots-220660.jpg",
  "FOMA_Headshots-220949.jpg",
  "FOMA_Headshots-220953.jpg",
  "FOMA_Headshots-220962.jpg",
].map((filename, index) => ({
  src: `/home/featured/foma/${filename}`,
  alt: `FOMA portrait frame ${index + 1}.`,
  width: 1333,
  height: 2000,
}));

function AnimatedHeading({
  text,
  className,
  animate = true,
  delayOffset = 0,
}: {
  text: string;
  className?: string;
  animate?: boolean;
  delayOffset?: number;
}) {
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const words = text.split(" ");

  const applyLineDelays = useCallback(() => {
    if (!animate) {
      wordRefs.current.forEach((node, index) => {
        if (!node) {
          return;
        }
        node.style.animationDelay = `${delayOffset + index * 55}ms`;
      });
      return;
    }

    const nodeOffsets = wordRefs.current.map((node) => node?.offsetTop ?? 0);
    let currentLine = -1;
    let lastOffset = -1;

    nodeOffsets.forEach((offset, index) => {
      if (offset !== lastOffset) {
        currentLine += 1;
        lastOffset = offset;
      }

      const node = wordRefs.current[index];
      if (!node) {
        return;
      }

      node.style.animationDelay = `${delayOffset + index * 55 + Math.max(currentLine, 0) * 120}ms`;
    });
  }, [animate, delayOffset]);

  useLayoutEffect(() => {
    applyLineDelays();
  }, [applyLineDelays, text, words.length]);

  useEffect(() => {
    const handleResize = () => applyLineDelays();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [applyLineDelays]);

  return (
    <h3 className={className}>
      <span className="featured-animated-title" aria-label={text}>
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            ref={(node) => {
              wordRefs.current[index] = node;
            }}
            className={`featured-animated-title__word ${
              animate ? "" : "featured-animated-title__word--static"
            }`}
            style={{ animationDelay: `${delayOffset + index * 55}ms` }}
            aria-hidden="true"
          >
            {word}&nbsp;
          </span>
        ))}
      </span>
    </h3>
  );
}

function AnimatedMeta({
  items,
  animate = true,
  delayOffset = 0,
}: {
  items: string[];
  animate?: boolean;
  delayOffset?: number;
}) {
  return (
    <div className="featured-work-panel__meta editorial-kicker">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className={`featured-meta-type ${
            animate ? "" : "featured-meta-type--static"
          }`}
          style={
            animate
              ? { animationDelay: `${delayOffset + index * 120}ms` }
              : undefined
          }
        >
          {item}
        </span>
      ))}
    </div>
  );
}

const stories: Story[] = [
  {
    id: "burma",
    label: "01",
    title: "Burmese Christian Orphanage",
    location: "Myanmar",
    year: "2019",
    description:
      "A documentary story centered on faith, education, and daily life inside a Christian orphanage community.",
    body: [
      "This story was built by staying close to the slower rhythm of life inside a Christian orphanage in Myanmar and by resisting the urge to reduce the place to a single dramatic image. What emerged instead was a quieter structure made of repetition: children moving between study and prayer, adults carrying responsibility through small gestures, and rooms gradually revealing themselves through light, patience, and use. The photographs rely on routine rather than spectacle. They are interested in how care becomes visible through posture, spacing, and daily movement, and in how the orphanage can be understood as both a physical environment and an emotional system shaped by shared time.",
      "The sequence is meant to work as a restrained photo essay, one that allows meaning to accumulate across ordinary moments. Faces, uniforms, doorways, hands, classrooms, and paths through the grounds all begin to describe the place from the inside. Instead of searching for a conclusion, the work lingers in the smaller details that carry emotional weight: waiting, watching, gathering, studying, praying, and returning. In that way the story becomes less about a headline and more about atmosphere, continuity, and the forms of tenderness and discipline that quietly hold a community together from one part of the day to the next.",
    ],
    hero: {
      src: "/home/myanmar/Recent-Website-12.webp",
      alt: "Two children walk down a dirt path inside the orphanage grounds in Myanmar.",
      width: 2500,
      height: 1667,
    },
    preview: {
      src: "/home/myanmar/Recent-Website-2.webp",
      alt: "Two children smiling with thanaka on their faces.",
      width: 2500,
      height: 1667,
    },
    gallery: [
      {
        src: "/home/myanmar/Myanmar-03935.webp",
        alt: "A child looks out from a window frame.",
        width: 2500,
        height: 1667,
      },
      {
        src: "/home/myanmar/Myanmar-03956.webp",
        alt: "A figure stands in a narrow passage between buildings.",
        width: 2500,
        height: 1667,
      },
      {
        src: "/home/myanmar/Myanmar-03968.webp",
        alt: "Two boys smile together for the camera.",
        width: 2500,
        height: 1667,
      },
      {
        src: "/home/myanmar/Myanmar-04167.webp",
        alt: "Young men sit in a row during prayer.",
        width: 2500,
        height: 1667,
      },
      {
        src: "/home/myanmar/Myanmar-04181.webp",
        alt: "A woman and children walk through the orphanage grounds.",
        width: 1667,
        height: 2500,
      },
      {
        src: "/home/myanmar/Myanmar-04215.webp",
        alt: "Women help an elder walk between buildings.",
        width: 1667,
        height: 2500,
      },
      {
        src: "/home/myanmar/Myanmar-04287.webp",
        alt: "Two women sit together outdoors in portrait.",
        width: 2500,
        height: 1667,
      },
      {
        src: "/home/myanmar/Myanmar-04307.webp",
        alt: "An older man walks through a doorway into sunlight.",
        width: 2500,
        height: 1667,
      },
      {
        src: "/home/myanmar/Myanmar-04369.webp",
        alt: "A girl studies papers in a dim room lit by sunlight.",
        width: 2500,
        height: 1667,
      },
      {
        src: "/home/myanmar/Myanmar-04617.webp",
        alt: "A quiet documentary frame from the orphanage.",
        width: 2500,
        height: 1667,
      },
      {
        src: "/home/myanmar/Myanmar-04626.webp",
        alt: "A quiet documentary frame from the orphanage grounds.",
        width: 2500,
        height: 1667,
      },
      {
        src: "/home/myanmar/Recent-Website-4.webp",
        alt: "A group of young women laugh together while seated.",
        width: 2500,
        height: 1667,
      },
      {
        src: "/home/myanmar/Recent-Website-7.webp",
        alt: "A wider documentary view from the orphanage grounds.",
        width: 2500,
        height: 1667,
      },
      {
        src: "/home/myanmar/Recent-Website-9.webp",
        alt: "A quieter moment from inside the orphanage community.",
        width: 2500,
        height: 1667,
      },
      {
        src: "/home/myanmar/orphanage-detail.webp",
        alt: "A close documentary detail from the orphanage.",
        width: 1792,
        height: 1024,
      },
      {
        src: "/home/myanmar/orphanage-frame-1.webp",
        alt: "An additional frame from the Burmese Christian orphanage story.",
        width: 1792,
        height: 1024,
      },
      {
        src: "/home/myanmar/orphanage-frame-2.webp",
        alt: "A second additional frame from the Burmese Christian orphanage story.",
        width: 1792,
        height: 1024,
      },
      {
        src: "/home/myanmar/orphanage-frame-3.webp",
        alt: "A third additional frame from the Burmese Christian orphanage story.",
        width: 1792,
        height: 1024,
      },
      {
        src: "/home/myanmar/orphanage-hero.webp",
        alt: "A wider contextual view from the Burmese Christian orphanage.",
        width: 1792,
        height: 1024,
      },
    ],
  },
  {
    id: "indonesia",
    label: "02",
    title: "Indonesia Documentary",
    location: "Indonesia",
    year: "2018",
    description:
      "A documentary body centered on schoolrooms, labor, family, and the everyday structures that shape community life.",
    body: [
      "This body of work moves through classrooms, roads, farms, homes, and gathering places in order to describe a wider social rhythm rather than isolate a single event. The photographs rely on movement between scales. Some stay close to expression or gesture, while others widen to hold architecture, landscape, labor, and the routes people take through them. Together they begin to show how community is organized by routine: children learning, adults working, families waiting, and the land itself shaping the tempo of the day. The sequence is designed to be read in relation, with each frame adding another fragment of atmosphere and place.",
      "What matters most here is the way ordinary actions reveal a larger visual order. A classroom becomes a room of attention and posture. A road becomes a line connecting one social space to another. Agricultural work introduces its own physical cadence, while portraiture inside that environment becomes less about display than presence. The photographs stay grounded in those connections. They ask the viewer to read the community through repetition, through the way light moves across people and buildings, and through the quieter transitions between work, education, domestic life, and the open landscape that surrounds them.",
    ],
    hero: {
      src: "/home/featured/indonesia/hero.jpg",
      alt: "Children in prayer inside a classroom.",
      width: 1152,
      height: 768,
    },
    preview: {
      src: "/home/featured/indonesia/frame-1.jpg",
      alt: "Children carrying chairs outside a school building.",
      width: 1152,
      height: 768,
    },
    gallery: [
      {
        src: "/home/featured/indonesia/frame-1.jpg",
        alt: "Children carrying chairs outside a school building.",
        width: 1152,
        height: 768,
      },
      {
        src: "/home/featured/indonesia/frame-2.jpg",
        alt: "Schoolchildren smiling together indoors.",
        width: 1152,
        height: 768,
      },
      {
        src: "/home/featured/indonesia/frame-3.jpg",
        alt: "A child smiling at a school desk.",
        width: 1152,
        height: 768,
      },
      {
        src: "/home/featured/indonesia/frame-4.jpg",
        alt: "A teacher with students in a classroom.",
        width: 1152,
        height: 768,
      },
      {
        src: "/home/featured/indonesia/frame-5.jpg",
        alt: "Children outdoors in school uniforms.",
        width: 1152,
        height: 768,
      },
      {
        src: "/home/featured/indonesia/frame-6.jpg",
        alt: "A man standing among trees.",
        width: 1152,
        height: 768,
      },
      {
        src: "/home/featured/indonesia/frame-7.jpg",
        alt: "A group gathered by water.",
        width: 1152,
        height: 768,
      },
      {
        src: "/home/featured/indonesia/frame-8.jpg",
        alt: "Two girls seated indoors.",
        width: 1152,
        height: 768,
      },
    ],
  },
  {
    id: "monument",
    label: "03",
    title: "ELS Monument Dedication",
    location: "United States",
    year: "2024",
    description:
      "An event-based documentary story focused on remembrance, ceremony, and the people gathering around a shared public memory.",
    body: [
      "This project follows a public ceremony through the gestures, pauses, and spatial relationships that give remembrance its visual language. Rather than concentrating only on a single decisive moment, the sequence pays attention to how memory is staged across an entire gathering: how people arrive, where they stand, how attention shifts toward the monument, and how symbolism is carried by posture, ritual, and the built environment. The photographs are concerned with the ceremony as a shared act of witness. They move between monument and crowd, between formal action and smaller moments of anticipation, reflection, and exchange.",
      "The story depends on that movement between center and edge. Public memory is never held only in the official focal point of an event. It also lives in the audience, in waiting, in glances, in the way people orient themselves toward a place asking to be read historically and emotionally at once. The sequence is meant to hold those layers together. It treats the dedication not only as something to document, but as a public process of meaning-making shaped by ritual, attention, architecture, and the presence of people gathering to witness a shared remembrance in real time.",
    ],
    hero: {
      src: "/home/featured/monument/hero.jpg",
      alt: "People gathered during the monument dedication ceremony.",
      width: 1152,
      height: 768,
    },
    preview: {
      src: "/home/featured/monument/frame-1.jpg",
      alt: "People gathered outdoors at the monument dedication.",
      width: 1152,
      height: 768,
    },
    gallery: monumentExpandedGallery,
  },
  {
    id: "sculpture",
    label: "04",
    title: "Stone Sculpture",
    location: "United States",
    year: "Series",
    description:
      "A study of carved form, material weight, surface detail, and the relationship between sculpture, maker, and place.",
    body: [
      "This series follows stone sculpture through process, surface, and presence. Rather than treating the work only as finished object, the photographs pay attention to texture, scale, and the way carved form changes under shifting light and distance. Some frames stay close to chisel marks, edges, and gesture, while others widen to hold the sculpture in relation to body, site, and surrounding space. The sequence is meant to read as a visual study of material transformed by patience and labor.",
      "What matters most in these photographs is the conversation between permanence and touch. Stone carries weight, resistance, and time, yet it also records intimate decisions made by hand. The images move between detail and structure to show how that tension lives in the work itself. Taken together, the sequence becomes less about documentation in the narrow sense and more about the atmosphere of making, the gravity of the material, and the presence a sculpture holds once it enters the world as an object to be encountered.",
    ],
    hero: {
      src: "/home/featured/sculpture/HERO_DSF4114.jpg",
      alt: "A hero view from the stone sculpture series.",
      width: 2500,
      height: 1667,
    },
    preview: {
      src: "/home/featured/sculpture/_DSF3650.jpg",
      alt: "A vertical preview image from the stone sculpture series.",
      width: 1333,
      height: 2000,
    },
    gallery: sculptureGallery,
  },
  {
    id: "foma",
    label: "05",
    title: "FOMA Portraits",
    location: "United States",
    year: "Series",
    description:
      "A portrait series built around direct presence, gesture, and the quieter variations that emerge across a sustained set of individual studies.",
    body: [
      "These portraits are built through repetition and small shifts rather than spectacle. The emphasis stays on posture, expression, and the way a single subject changes as attention slows down.",
      "Taken together, the series reads as a field of individual presences. The work is less about a single iconic frame than about how one face gives way to another through rhythm, proximity, and restraint.",
    ],
    hero: {
      src: "/home/featured/foma/FOMA_Headshots-220979.jpg",
      alt: "A portrait from the FOMA series.",
      width: 1333,
      height: 2000,
    },
    preview: {
      src: "/home/featured/foma/FOMA_Headshots-220985.jpg",
      alt: "A vertical preview portrait from the FOMA series.",
      width: 1333,
      height: 2000,
    },
    gallery: fomaGallery,
  },
];

const FEATURED_CAROUSEL_TUNING = {
  // Horizontal wheel sensitivity. Higher = faster wheel/trackpad movement.
  wheelSensitivity: 1.15,
  // Lerp / easing amount for currentX -> targetX. Higher = snappier motion.
  easing: 0.11,
  // Mouse-position influence across the viewport. Higher = more drift.
  mouseInfluence: 72,
  // Smoothness of mouse offset settling. Higher = snappier mouse response.
  mouseEasing: 0.075,
  // Stop animating once currentX is close enough to targetX.
  stopThreshold: 0.12,
  // Max rotateY applied to cards furthest from the viewport center.
  depthRotateY: 5.5,
  // Initial offset uses a portion of the extra right-side bleed so the strip
  // starts present in the viewport instead of padded inward on the left.
  initialRightBias: 0.42,
} as const;

const microDocumentaries: MicroDoc[] = [
  {
    id: "ephraim-pottery",
    label: "01",
    title: "Ephraim Pottery",
    descriptor: "Micro documentary",
    runtime: "Vimeo",
    poster: {
      src: "/home/micro-docs/ephraim/cover-image-ephraim-pottery.png",
      alt: "Cover image for Ephraim Pottery.",
      width: 3024,
      height: 1510,
    },
    vimeoUrl: "https://vimeo.com/1178515551/732a9ee3ec?fl=ml&fe=ec",
    vimeoSourceFile:
      "/Users/blundsten/Desktop/My Workspace/2. Areas/Website Build/Homepage/Featured Work/Micro Docs/Ephraim Pottery/Ephraim Pottery Vimeo Link.rtf",
    video: {
      src: null as string | null,
      mimeType: "video/mp4",
      poster: "/home/micro-docs/ephraim/cover-image-ephraim-pottery.png",
    },
  },
  {
    id: "what-child-is-this",
    label: "02",
    title: "What Child Is This?",
    descriptor: "Micro documentary",
    runtime: "Vimeo",
    poster: {
      src: "/home/micro-docs/what-child/cover-image-what-child-is-this.png",
      alt: "Cover image for What Child Is This?.",
      width: 3024,
      height: 1454,
    },
    vimeoUrl: "https://vimeo.com/1178516319/b3219ff1a4?fl=ml&fe=ec",
    vimeoSourceFile:
      "/Users/blundsten/Desktop/My Workspace/2. Areas/Website Build/Homepage/Featured Work/Micro Docs/What Child Is This?/What Child IS this Vimeo Link.rtf",
    video: {
      src: null as string | null,
      mimeType: "video/mp4",
      poster: "/home/micro-docs/what-child/cover-image-what-child-is-this.png",
    },
  },
  {
    id: "sanctify-the-arts",
    label: "03",
    title: "Sanctify The Arts",
    descriptor: "Micro documentary",
    runtime: "Vimeo",
    poster: {
      src: "/home/micro-docs/sanctify/cover-image-bill-sanctify-the-arts.png",
      alt: "Cover image for Sanctify The Arts.",
      width: 3024,
      height: 1516,
    },
    vimeoUrl: "https://vimeo.com/1178517000/ed5fc1a55a?fl=ml&fe=ec",
    vimeoSourceFile:
      "/Users/blundsten/Desktop/My Workspace/2. Areas/Website Build/Homepage/Featured Work/Micro Docs/William Bukowski Sanctify The Arts/William Bukowski Vimeo Link.rtf",
    video: {
      src: null as string | null,
      mimeType: "video/mp4",
      poster:
        "/home/micro-docs/sanctify/cover-image-bill-sanctify-the-arts.png",
    },
  },
  {
    id: "marcus-thomas-the-prism-effect",
    label: "04",
    title: "Marcus Thomas: The Prism Effect",
    descriptor: "Micro documentary",
    runtime: "Vimeo",
    poster: {
      src: "/home/micro-docs/marcus/cover-image-marcus-thomas.png",
      alt: "Cover image for Marcus Thomas: The Prism Effect.",
      width: 3024,
      height: 1511,
    },
    vimeoUrl: "https://vimeo.com/1178516129/c8ba108fbe?fl=ml&fe=ec",
    vimeoSourceFile:
      "/Users/blundsten/Desktop/My Workspace/2. Areas/Website Build/Homepage/Featured Work/Micro Docs/Marcus Thomas The Prism Effect/Marcus Thomas Vimeo Link.rtf",
    video: {
      src: null as string | null,
      mimeType: "video/mp4",
      poster: "/home/micro-docs/marcus/cover-image-marcus-thomas.png",
    },
  },
] as const;

export function FeaturedWorkSwitcher() {
  const [activeId, setActiveId] = useState(stories[0].id);
  const [activeMicroDocId, setActiveMicroDocId] = useState(microDocumentaries[0].id);
  const [openId, setOpenId] = useState<string | null>(null);
  const [openMicroDocId, setOpenMicroDocId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [closeHintVisible, setCloseHintVisible] = useState(false);
  const featuredCarouselViewportRef = useRef<HTMLDivElement | null>(null);
  const featuredCarouselRef = useRef<HTMLDivElement | null>(null);
  const closeHintRef = useRef<HTMLSpanElement | null>(null);
  const closeHintFrameRef = useRef<number | null>(null);
  const closeHintTargetRef = useRef({ x: 0, y: 0 });
  const closeHintCurrentRef = useRef({ x: 0, y: 0 });
  const carouselRafRef = useRef<number | null>(null);
  const carouselCurrentXRef = useRef(0);
  const carouselTargetXRef = useRef(0);
  const carouselBaseXRef = useRef(0);
  const carouselMouseTargetOffsetRef = useRef(0);
  const carouselMouseCurrentOffsetRef = useRef(0);
  const carouselHoveredRef = useRef(false);
  const carouselDesktopEnabledRef = useRef(false);

  const activeStory = stories.find((story) => story.id === activeId) ?? stories[0];
  const openStory = stories.find((story) => story.id === openId) ?? null;
  const openMicroDoc =
    microDocumentaries.find((film) => film.id === openMicroDocId) ?? null;
  const lightboxStory = openStory ?? activeStory;
  const lightboxImages = openStory
    ? [lightboxStory.hero, ...lightboxStory.gallery]
    : lightboxStory.gallery;
  const lightboxImageCount = lightboxImages.length;
  const photoOverlayVisible = openId !== null;
  const microDocOverlayVisible = openMicroDocId !== null;
  const activeLightboxImage =
    lightboxIndex === null ? null : lightboxImages[lightboxIndex];
  const activeLightboxLabel =
    lightboxIndex === null ? null : String(lightboxIndex + 1).padStart(2, "0");

  const updateCarouselDepth = useCallback(() => {
    const viewport = featuredCarouselViewportRef.current;
    const track = featuredCarouselRef.current;
    if (!viewport || !track) {
      return;
    }

    const viewportBounds = viewport.getBoundingClientRect();
    const viewportCenter = viewportBounds.left + viewportBounds.width / 2;
    const contents = track.querySelectorAll<HTMLElement>(".featured-story-card__content");

    contents.forEach((content) => {
      const card = content.closest(".featured-story-card");
      if (!(card instanceof HTMLElement)) {
        return;
      }

      const bounds = card.getBoundingClientRect();
      const cardCenter = bounds.left + bounds.width / 2;
      const normalizedDistance = (cardCenter - viewportCenter) / (viewportBounds.width / 2);
      const clampedDistance = Math.max(-1, Math.min(1, normalizedDistance));
      const rotateY = clampedDistance * FEATURED_CAROUSEL_TUNING.depthRotateY;

      content.style.transform = `perspective(1400px) rotateY(${rotateY}deg)`;
    });
  }, []);

  const ensureCarouselAnimation = useCallback(() => {
    const track = featuredCarouselRef.current;
    const viewport = featuredCarouselViewportRef.current;
    if (!track || !viewport || carouselRafRef.current !== null) {
      return;
    }

    const getViewportBleed = () => {
      const styles = window.getComputedStyle(viewport);
      return Number.parseFloat(styles.paddingLeft) || 0;
    };
    const getMaxX = () => Math.max(track.scrollWidth - viewport.clientWidth, 0);
    const getMinX = () => -getViewportBleed();
    const clampX = (value: number) =>
      Math.min(getMaxX(), Math.max(getMinX(), value));
    const applyTransform = (value: number) => {
      track.style.transform = `translate3d(${-value}px, 0, 0)`;
      updateCarouselDepth();
    };

    const runCarouselAnimation = () => {
      carouselMouseCurrentOffsetRef.current +=
        (carouselMouseTargetOffsetRef.current - carouselMouseCurrentOffsetRef.current) *
        FEATURED_CAROUSEL_TUNING.mouseEasing;

      carouselTargetXRef.current = clampX(
        carouselBaseXRef.current + carouselMouseCurrentOffsetRef.current,
      );

      carouselCurrentXRef.current +=
        (carouselTargetXRef.current - carouselCurrentXRef.current) *
        FEATURED_CAROUSEL_TUNING.easing;
      applyTransform(carouselCurrentXRef.current);

      const shouldContinue =
        Math.abs(carouselTargetXRef.current - carouselCurrentXRef.current) >
          FEATURED_CAROUSEL_TUNING.stopThreshold ||
        Math.abs(
          carouselMouseTargetOffsetRef.current - carouselMouseCurrentOffsetRef.current,
        ) > FEATURED_CAROUSEL_TUNING.stopThreshold;

      if (shouldContinue) {
        carouselRafRef.current = window.requestAnimationFrame(runCarouselAnimation);
      } else {
        carouselCurrentXRef.current = carouselTargetXRef.current;
        applyTransform(carouselCurrentXRef.current);
        carouselRafRef.current = null;
      }
    };

    carouselRafRef.current = window.requestAnimationFrame(runCarouselAnimation);
  }, [updateCarouselDepth]);

  const goToPreviousImage = useCallback(() => {
    setLightboxIndex((currentIndex) => {
      if (currentIndex === null) {
        return null;
      }

      return currentIndex === 0
        ? lightboxImageCount - 1
        : currentIndex - 1;
    });
  }, [lightboxImageCount]);

  const goToNextImage = useCallback(() => {
    setLightboxIndex((currentIndex) => {
      if (currentIndex === null) {
        return null;
      }

      return currentIndex === lightboxImageCount - 1
        ? 0
        : currentIndex + 1;
    });
  }, [lightboxImageCount]);

  useEffect(() => {
    if (lightboxIndex !== null || photoOverlayVisible || microDocOverlayVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [lightboxIndex, microDocOverlayVisible, photoOverlayVisible]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
          return;
        }

        setOpenId(null);
        setOpenMicroDocId(null);
      }

      if (lightboxIndex === null) {
        return;
      }

      if (event.key === "ArrowLeft") {
        goToPreviousImage();
      }

      if (event.key === "ArrowRight") {
        goToNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextImage, goToPreviousImage, lightboxIndex]);

  const handleStoryOpen = (storyId: string) => {
    setActiveId(storyId);
    setLightboxIndex(null);
    setOpenId(storyId);
  };

  const handleMicroDocOpen = (microDocId: string) => {
    setActiveMicroDocId(microDocId);
    setOpenId(null);
    setLightboxIndex(null);
    setOpenMicroDocId(microDocId);
  };

  const closeStoryWindow = () => {
    setOpenId(null);
    setLightboxIndex(null);
    setCloseHintVisible(false);
  };

  const closeMicroDocWindow = () => {
    setOpenMicroDocId(null);
  };

  useEffect(() => {
    if (!photoOverlayVisible) {
      if (closeHintFrameRef.current !== null) {
        cancelAnimationFrame(closeHintFrameRef.current);
        closeHintFrameRef.current = null;
      }
      return;
    }

    const tick = () => {
      const node = closeHintRef.current;
      if (node) {
        closeHintCurrentRef.current.x +=
          (closeHintTargetRef.current.x - closeHintCurrentRef.current.x) * 0.16;
        closeHintCurrentRef.current.y +=
          (closeHintTargetRef.current.y - closeHintCurrentRef.current.y) * 0.16;

        node.style.transform = `translate3d(${closeHintCurrentRef.current.x + 34}px, ${closeHintCurrentRef.current.y + 26}px, 0)`;
      }

      closeHintFrameRef.current = window.requestAnimationFrame(tick);
    };

    closeHintFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (closeHintFrameRef.current !== null) {
        cancelAnimationFrame(closeHintFrameRef.current);
        closeHintFrameRef.current = null;
      }
    };
  }, [photoOverlayVisible]);

  useEffect(() => {
    const viewport = featuredCarouselViewportRef.current;
    const track = featuredCarouselRef.current;
    if (!viewport || !track) {
      return;
    }

    carouselDesktopEnabledRef.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    const getViewportLeftBleed = () => {
      const styles = window.getComputedStyle(viewport);
      return Number.parseFloat(styles.paddingLeft) || 0;
    };
    const getViewportRightBleed = () => {
      const styles = window.getComputedStyle(viewport);
      return Number.parseFloat(styles.paddingRight) || 0;
    };
    const maxX = () => Math.max(track.scrollWidth - viewport.clientWidth, 0);
    const minX = () => -getViewportLeftBleed();
    const clampX = (value: number) => Math.min(maxX(), Math.max(minX(), value));
    const canScrollLeft = () => carouselBaseXRef.current > minX() + 1;
    const canScrollRight = () =>
      carouselBaseXRef.current < maxX() - 1;
    const getInitialRestingX = () => {
      const leftBleed = getViewportLeftBleed();
      const rightBleed = getViewportRightBleed();
      const weightedOverflowOffset = Math.max(
        (rightBleed - leftBleed) * FEATURED_CAROUSEL_TUNING.initialRightBias,
        0,
      );

      return clampX(weightedOverflowOffset);
    };

    // Starting offset is derived from the asymmetric viewport bleed so the
    // carousel reads like a wider strip extending beyond the section.
    carouselBaseXRef.current = getInitialRestingX();
    carouselMouseTargetOffsetRef.current = 0;
    carouselMouseCurrentOffsetRef.current = 0;
    carouselCurrentXRef.current = carouselBaseXRef.current;
    carouselTargetXRef.current = carouselBaseXRef.current;
    track.style.transform = `translate3d(${-carouselCurrentXRef.current}px, 0, 0)`;
    updateCarouselDepth();

    const stopCarouselAnimation = () => {
      if (carouselRafRef.current !== null) {
        cancelAnimationFrame(carouselRafRef.current);
        carouselRafRef.current = null;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (!carouselDesktopEnabledRef.current || !carouselHoveredRef.current) {
        return;
      }

      const primaryDelta = Math.abs(event.deltaY) > 0 ? event.deltaY : event.deltaX;

      if (primaryDelta === 0) {
        return;
      }

      const intendsLeft = primaryDelta < 0;
      const intendsRight = primaryDelta > 0;
      const canHandle =
        (intendsLeft && canScrollLeft()) || (intendsRight && canScrollRight());

      if (!canHandle) {
        return;
      }

      event.preventDefault();
      carouselBaseXRef.current = clampX(
        carouselBaseXRef.current +
          primaryDelta * FEATURED_CAROUSEL_TUNING.wheelSensitivity,
      );
      ensureCarouselAnimation();
    };

    const handleResize = () => {
      // Recalculate the resting strip position from the current viewport bleed
      // so the filmstrip stays balanced as the section resizes.
      if (!carouselHoveredRef.current) {
        carouselBaseXRef.current = getInitialRestingX();
      } else {
        carouselBaseXRef.current = clampX(carouselBaseXRef.current);
      }
      carouselTargetXRef.current = clampX(
        carouselBaseXRef.current + carouselMouseCurrentOffsetRef.current,
      );
      carouselCurrentXRef.current = clampX(carouselCurrentXRef.current);
      track.style.transform = `translate3d(${-carouselCurrentXRef.current}px, 0, 0)`;
      updateCarouselDepth();
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);

    return () => {
      viewport.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      stopCarouselAnimation();
    };
  }, [ensureCarouselAnimation, updateCarouselDepth]);

  const showCloseHint = (event: MouseEvent<HTMLDivElement>) => {
    closeHintTargetRef.current = { x: event.clientX, y: event.clientY };
    closeHintCurrentRef.current = { x: event.clientX, y: event.clientY };
    const node = closeHintRef.current;
    if (node) {
      node.style.transform = `translate3d(${event.clientX + 34}px, ${event.clientY + 26}px, 0)`;
    }
    setCloseHintVisible(true);
  };

  const handleCloseZoneMove = (event: MouseEvent<HTMLDivElement>) => {
    closeHintTargetRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleFeaturedCarouselPointerMove = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    const viewport = featuredCarouselViewportRef.current;
    if (!viewport || !carouselDesktopEnabledRef.current || !carouselHoveredRef.current) {
      return;
    }

    const bounds = viewport.getBoundingClientRect();
    const pointerRatio = (event.clientX - bounds.left) / bounds.width;
    const centeredRatio = (pointerRatio - 0.5) * 2;

    // Mouse-position drift is blended into the neutral resting position.
    // Left side increases offset so the cards drift left; right side does the reverse.
    carouselMouseTargetOffsetRef.current =
      -centeredRatio * FEATURED_CAROUSEL_TUNING.mouseInfluence;
    ensureCarouselAnimation();
  };

  const handleFeaturedCarouselPointerEnter = () => {
    carouselHoveredRef.current = true;
  };

  const handleFeaturedCarouselPointerLeave = () => {
    carouselHoveredRef.current = false;
    carouselMouseTargetOffsetRef.current = 0;
    ensureCarouselAnimation();
  };

  const renderStoryPanel = (story: Story) => {
    const imageGroups = groupStoryImages(story.gallery);

    return (
      <article key={story.id} className="featured-work-panel featured-work-panel--overlay">
        <div className="featured-work-panel__content">
        <header className="featured-work-panel__header">
          <AnimatedMeta
            items={[story.label, story.location, story.year]}
            delayOffset={540}
          />
          <button
            type="button"
            className="featured-work-panel__close"
            onClick={closeStoryWindow}
          >
            Close story
          </button>
        </header>

        <div className="featured-work-panel__copy featured-work-panel__copy--animated">
          <AnimatedHeading
            text={story.title}
            className="display-heading text-4xl leading-[0.94] md:text-6xl"
            delayOffset={460}
          />
          <p className="featured-work-panel__dek">{story.description}</p>
        </div>

        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className="featured-work-panel__hero photo-motion featured-work-panel__hero--animated"
          aria-label={`Open hero image from ${story.title}`}
        >
          <Image
            src={story.hero.src}
            alt={story.hero.alt}
            width={story.hero.width}
            height={story.hero.height}
          />
        </button>

        <div className="featured-work-panel__body featured-work-panel__body--animated">
          {story.body.map((paragraph, index) => (
            <p
              key={paragraph}
              className="featured-work-panel__paragraph"
              style={{ animationDelay: `${180 + index * 80}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="featured-work-panel__storyflow">
          {imageGroups.map((group) => {
            return (
              <div
                key={`${story.id}-row-${group.startIndex}`}
                className={`featured-story-row featured-story-row--variant-${group.variant} featured-story-row--count-${group.images.length}`}
              >
                <div className="featured-story-row__pair">
                  {group.images.map((image, pairIndex) => {
                    const imageIndex = group.startIndex + pairIndex + 1;

                    return (
                      <button
                        key={`${story.id}-${image.src}`}
                        type="button"
                        onClick={() => setLightboxIndex(imageIndex)}
                        className={`featured-story-frame photo-motion featured-story-frame--paired featured-story-frame--slot-${pairIndex + 1}`}
                        style={{ animationDelay: `${280 + imageIndex * 55}ms` }}
                        aria-label={`Open image ${imageIndex} from ${story.title}`}
                      >
                        <div className="featured-story-frame__media">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                          />
                        </div>
                        <div className="featured-story-frame__index">
                          {String(imageIndex).padStart(2, "0")}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </article>
    );
  };

  const renderMicroDocPanel = (film: MicroDoc) => {
    const embedUrl = createVimeoEmbedUrl(film.vimeoUrl);

    return (
      <article key={film.id} className="micro-doc-panel">
        <div className="micro-doc-panel__content">
          <header className="micro-doc-panel__header">
            <AnimatedMeta
              items={[film.label, film.descriptor, film.runtime]}
              delayOffset={540}
            />
            <button
              type="button"
              className="featured-work-panel__close"
              onClick={closeMicroDocWindow}
            >
              Close story
            </button>
          </header>

          <div className="micro-doc-panel__copy micro-doc-panel__copy--animated">
            <AnimatedHeading
              text={film.title}
              className="display-heading text-4xl leading-[0.94] md:text-6xl"
              delayOffset={460}
            />
            <p className="micro-doc-panel__dek">
              Vimeo-hosted micro documentary. Cover image and Vimeo source are mapped
              from the local project folder so this can later swap to a self-hosted
              or directly embedded player without changing the Story Window layout.
            </p>
          </div>

          <div
            className="micro-doc-panel__video micro-doc-panel__video--animated"
            aria-label={`Vimeo player for ${film.title}`}
          >
            <div className="micro-doc-panel__video-frame">
              <Image
                src={film.poster.src}
                alt={film.poster.alt}
                width={film.poster.width}
                height={film.poster.height}
                className="micro-doc-panel__video-poster"
              />
              <iframe
                src={embedUrl}
                title={film.title}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          <div className="micro-doc-panel__body micro-doc-panel__body--animated">
            <p className="micro-doc-panel__paragraph" style={{ animationDelay: "180ms" }}>
              This micro documentary is currently being delivered through Vimeo. The
              player source is mapped from the Vimeo link saved in the project folder,
              while the cover image remains available as the poster state for future
              self-hosted or HTML5 video support.
            </p>
            <p className="micro-doc-panel__paragraph" style={{ animationDelay: "260ms" }}>
              Source file: {film.vimeoSourceFile}
            </p>
          </div>
        </div>
      </article>
    );
  };

  return (
    <>
      <section id="featured-work" className="featured-work-shell white-band">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10 lg:px-12">
          <div className="featured-work-grid">
            <div className="featured-work-grid__intro">
              <p className="editorial-kicker">Featured work</p>
              <h2 className="display-heading text-4xl leading-[0.96] md:text-6xl">
                Photo Stories
              </h2>
              <p className="featured-work-grid__description">
                A growing set of documentary and portrait stories shaped through
                observation, sequence, and the slower accumulation of visual detail.
              </p>
            </div>

            <div
              ref={featuredCarouselViewportRef}
              className="featured-work-grid__viewport"
              onPointerEnter={handleFeaturedCarouselPointerEnter}
              onPointerLeave={handleFeaturedCarouselPointerLeave}
              onPointerMove={handleFeaturedCarouselPointerMove}
            >
              <div ref={featuredCarouselRef} className="featured-work-grid__cards">
                {stories.map((story) => {
                  return (
                    <button
                      key={story.id}
                      type="button"
                      onClick={() => handleStoryOpen(story.id)}
                      className="featured-story-card photo-motion"
                      aria-label={`Open featured story ${story.title}`}
                    >
                      <div className="featured-story-card__content">
                        <div className="featured-story-card__label featured-story-card__label--top">
                          <div className="featured-story-card__label-clip">
                            <span className="featured-story-card__label-text featured-story-card__label-text--top">
                              {story.label}
                            </span>
                          </div>
                        </div>
                        <div className="featured-story-card__image">
                          <Image
                            src={story.preview.src}
                            alt={story.preview.alt}
                            width={story.preview.width}
                            height={story.preview.height}
                            priority={story.id === stories[0].id}
                          />
                        </div>
                        <div className="featured-story-card__label featured-story-card__label--bottom">
                          <div className="featured-story-card__label-clip">
                            <span className="featured-story-card__label-text featured-story-card__label-text--bottom">
                              {story.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="micro-docs">
              <div className="micro-docs__intro">
                <h3 className="display-heading text-3xl leading-[0.96] md:text-5xl">
                  Micro Documentaries
                </h3>
                <p className="micro-docs__description">
                  Short documentary films shaped with the same editorial pacing,
                  restraint, and visual attention as the photo stories above.
                </p>
              </div>

              <div className="micro-docs__grid">
                {microDocumentaries.map((film) => (
                  <button
                    key={film.id}
                    type="button"
                    onMouseEnter={() => setActiveMicroDocId(film.id)}
                    onFocus={() => setActiveMicroDocId(film.id)}
                    onClick={() => handleMicroDocOpen(film.id)}
                    className="micro-doc-card"
                    aria-label={`Open micro documentary ${film.title}`}
                  >
                    <div className="micro-doc-card__meta editorial-kicker">
                      <span className="featured-story-card__label-clip">
                        <span className="featured-story-card__label-text micro-doc-card__text micro-doc-card__text--top">
                          {film.label}
                        </span>
                      </span>
                      <span className="featured-story-card__label-clip">
                        <span className="featured-story-card__label-text micro-doc-card__text micro-doc-card__text--top micro-doc-card__text--delay-sm">
                          {film.runtime}
                        </span>
                      </span>
                    </div>

                    <div
                      className="micro-doc-card__poster photo-motion"
                      data-video-ready={film.video.src ? "true" : "false"}
                    >
                      {film.video.src ? (
                        <video
                          className="micro-doc-card__video"
                          preload="metadata"
                          playsInline
                          muted
                          poster={film.video.poster}
                        >
                          <source src={film.video.src} type={film.video.mimeType} />
                        </video>
                      ) : (
                        <Image
                          src={film.poster.src}
                          alt={film.poster.alt}
                          width={film.poster.width}
                          height={film.poster.height}
                        />
                      )}
                      <span className="micro-doc-card__play" aria-hidden="true">
                        Play
                      </span>
                    </div>

                    <div className="micro-doc-card__copy">
                      <h4 className="micro-doc-card__title">
                        <span className="featured-story-card__label-clip">
                          <span className="featured-story-card__label-text micro-doc-card__text micro-doc-card__text--bottom">
                            {film.title}
                          </span>
                        </span>
                      </h4>
                      <p className="micro-doc-card__descriptor">
                        <span className="featured-story-card__label-clip">
                          <span className="featured-story-card__label-text micro-doc-card__text micro-doc-card__text--bottom micro-doc-card__text--delay-md">
                            {film.descriptor}
                          </span>
                        </span>
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {typeof document !== "undefined" && photoOverlayVisible
        ? createPortal(
            <div
              className="featured-work-overlay"
              onClick={closeStoryWindow}
              role="presentation"
            >
              <div
                className="featured-work-overlay__shell"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="featured-work-overlay__layout">
                  <aside className="featured-work-rail featured-work-overlay__rail">
                    <div className="featured-work-rail__intro">
                      <p className="editorial-kicker">Featured Work</p>
                      <h2 className="display-heading text-3xl leading-[0.94] md:text-5xl">
                        Photo Stories
                      </h2>
                    </div>

                    <div className="featured-work-rail__list">
                      {stories.map((story) => {
                        const isActive = story.id === activeId;
                        const isOpen = story.id === openId;

                        return (
                          <button
                            key={`overlay-${story.id}`}
                            type="button"
                            onMouseEnter={() => setActiveId(story.id)}
                            onFocus={() => setActiveId(story.id)}
                            onClick={() => handleStoryOpen(story.id)}
                            className={`featured-work-rail__item ${
                              isActive ? "featured-work-rail__item--active" : ""
                            } ${isOpen ? "featured-work-rail__item--open" : ""}`}
                            aria-pressed={isOpen}
                          >
                            <div className="featured-work-rail__meta">
                              <span>{story.label}</span>
                              <span>{story.year}</span>
                            </div>
                            <h3 className="featured-work-rail__title">{story.title}</h3>
                          </button>
                        );
                      })}
                    </div>
                    <div
                      className="featured-work-overlay__close-zone"
                      onClick={closeStoryWindow}
                      onMouseEnter={showCloseHint}
                      onMouseLeave={() => setCloseHintVisible(false)}
                      onMouseMove={handleCloseZoneMove}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          closeStoryWindow();
                        }
                      }}
                      aria-label="Close story window"
                    >
                    </div>
                  </aside>

                  <div className="featured-work-overlay__viewport">
                    {openStory ? renderStoryPanel(openStory) : null}
                  </div>
                </div>
              </div>
              <span
                ref={closeHintRef}
                className={`featured-work-overlay__close-hint ${
                  closeHintVisible
                    ? "featured-work-overlay__close-hint--visible"
                    : ""
                }`}
              >
                Close story
              </span>
            </div>,
            document.body
          )
        : null}

      {typeof document !== "undefined" && microDocOverlayVisible
        ? createPortal(
            <div
              className="micro-doc-overlay"
              onClick={closeMicroDocWindow}
              role="presentation"
            >
              <div
                className="micro-doc-overlay__shell"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="micro-doc-overlay__layout">
                  <aside className="micro-doc-rail micro-doc-overlay__rail">
                    <div className="micro-doc-rail__intro">
                      <p className="editorial-kicker">Featured Work</p>
                      <h2 className="display-heading text-3xl leading-[0.94] md:text-5xl">
                        Micro Docs
                      </h2>
                    </div>

                    <div className="micro-doc-rail__list">
                      {microDocumentaries.map((film) => {
                        const isActive = film.id === activeMicroDocId;
                        const isOpen = film.id === openMicroDocId;

                        return (
                          <button
                            key={`micro-doc-overlay-${film.id}`}
                            type="button"
                            onMouseEnter={() => setActiveMicroDocId(film.id)}
                            onFocus={() => setActiveMicroDocId(film.id)}
                            onClick={() => handleMicroDocOpen(film.id)}
                            className={`micro-doc-rail__item ${
                              isActive ? "micro-doc-rail__item--active" : ""
                            } ${isOpen ? "micro-doc-rail__item--open" : ""}`}
                            aria-pressed={isOpen}
                          >
                            <div className="micro-doc-rail__meta">
                              <span>{film.label}</span>
                              <span>{film.runtime}</span>
                            </div>
                            <h3 className="micro-doc-rail__title">{film.title}</h3>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      className="micro-doc-overlay__close"
                      onClick={closeMicroDocWindow}
                    >
                      Close story
                    </button>
                  </aside>

                  <div className="micro-doc-overlay__viewport">
                    {openMicroDoc ? renderMicroDocPanel(openMicroDoc) : null}
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}

      {typeof document !== "undefined" && activeLightboxImage
        ? createPortal(
            <div
              className="lightbox-backdrop"
              onClick={() => setLightboxIndex(null)}
              role="presentation"
            >
              <button
                type="button"
                className="lightbox-nav lightbox-nav--left"
                onClick={goToPreviousImage}
                aria-label="View previous image"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                className="lightbox-close"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close image lightbox"
              >
                Close
              </button>
              <button
                type="button"
                className="lightbox-nav lightbox-nav--right"
                onClick={goToNextImage}
                aria-label="View next image"
              >
                <span aria-hidden="true">→</span>
              </button>
              <div
                className="lightbox-panel"
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={activeLightboxImage.alt}
              >
                <div className="lightbox-panel__meta">
                  <span>{lightboxStory.title}</span>
                  <span>{activeLightboxLabel}</span>
                </div>
                <button
                  type="button"
                  className="lightbox-panel__image"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close image lightbox"
                >
                  <Image
                    src={activeLightboxImage.src}
                    alt={activeLightboxImage.alt}
                    width={activeLightboxImage.width}
                    height={activeLightboxImage.height}
                  />
                </button>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
