"use client";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(Draggable);

const referenceImages = [
  "/home/story-detail.jpeg",
  "/home/street-collection-1.jpeg",
  "/home/featured/indonesia/frame-2.jpg",
  "/home/featured/indonesia/frame-6.jpg",
  "/home/sketchbook-1.jpeg",
  "/home/featured/monument/hero.jpg",
  "/home/featured/sculpture/HERO_DSF4114.jpg",
  "/home/featured/indonesia/frame-1.jpg",
];

function buildSeamlessLoop(
  items: HTMLElement[],
  spacing: number,
  animateFunc: (element: HTMLElement) => gsap.core.Timeline,
) {
  const overlap = Math.ceil(1 / spacing);
  const startTime = items.length * spacing + 0.5;
  const loopTime = (items.length + overlap) * spacing + 1;
  const rawSequence = gsap.timeline({ paused: true });
  const seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      if (this._time === this._dur) {
        this._tTime += this._dur - 0.01;
      }
    },
  });

  const total = items.length + overlap * 2;

  for (let i = 0; i < total; i += 1) {
    const index = i % items.length;
    const time = i * spacing;
    rawSequence.add(animateFunc(items[index]), time);
    if (i <= items.length) {
      seamlessLoop.add(`label${i}`, time);
    }
  }

  rawSequence.time(startTime);
  seamlessLoop
    .to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: "none",
    })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + 1 },
      {
        time: startTime,
        duration: startTime - (overlap * spacing + 1),
        immediateRender: false,
        ease: "none",
      },
    );

  return seamlessLoop;
}

export function PhotoStoriesCarouselTest() {
  const rootRef = useRef<HTMLElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const spacerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLUListElement | null>(null);
  const dragProxyRef = useRef<HTMLDivElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    const spacer = spacerRef.current;
    const cardsRoot = cardsRef.current;
    const dragProxy = dragProxyRef.current;
    const prevButton = prevButtonRef.current;
    const nextButton = nextButtonRef.current;

    if (!gallery || !spacer || !cardsRoot || !dragProxy || !prevButton || !nextButton) {
      return;
    }

    const ctx = gsap.context(() => {
      let iteration = 0;
      let lastScrollY = window.scrollY;
      let scrollEndTimer: number | null = null;

      gsap.set(".photo-stories-reference-page .cards li", {
        xPercent: 400,
        opacity: 0,
        scale: 0,
      });

      const spacing = 0.1;
      const snapTime = gsap.utils.snap(spacing);
      const cards = gsap.utils.toArray<HTMLElement>(".photo-stories-reference-page .cards li");
      const animateFunc = (element: HTMLElement) => {
        const tl = gsap.timeline();
        tl.fromTo(
          element,
          { scale: 0, opacity: 50 },
          {
            scale: 1,
            opacity: 1,
            zIndex: 100,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power1.in",
            immediateRender: false,
          },
        ).fromTo(
          element,
          { xPercent: 400 },
          {
            xPercent: -400,
            duration: 1,
            ease: "none",
            immediateRender: false,
          },
          0,
        );

        return tl;
      };

      const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
      const playhead = { offset: 0 };
      const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
      const scrub = gsap.to(playhead, {
        offset: 0,
        onUpdate() {
          seamlessLoop.time(wrapTime(playhead.offset));
        },
        duration: 0.5,
        ease: "power3",
        paused: true,
      });

      const getSectionStart = () => {
        const root = rootRef.current;
        if (!root) {
          return window.scrollY;
        }

        return root.getBoundingClientRect().top + window.scrollY;
      };
      const getScrollLength = () => Math.max(spacer.offsetHeight - window.innerHeight, 1);
      const getSectionScroll = () => window.scrollY - getSectionStart();

      const wrap = (iterationDelta: number, scrollTo: number) => {
        iteration += iterationDelta;
        window.scrollTo({ top: getSectionStart() + scrollTo, behavior: "auto" });
      };

      const progressToScroll = (progress: number) =>
        gsap.utils.clamp(
          1,
          getScrollLength() - 1,
          gsap.utils.wrap(0, 1, progress) * getScrollLength(),
        );

      function scrollToOffset(offset: number) {
        const snappedTime = snapTime(offset);
        const progress =
          (snappedTime - seamlessLoop.duration() * iteration) /
          seamlessLoop.duration();
        const scroll = progressToScroll(progress);

        if (progress >= 1 || progress < 0) {
          wrap(Math.floor(progress), scroll);
          return;
        }

        window.scrollTo({ top: getSectionStart() + scroll, behavior: "auto" });
      }

      const updateFromScroll = () => {
        const scroll = getSectionScroll();
        const direction = window.scrollY >= lastScrollY ? 1 : -1;
        lastScrollY = window.scrollY;
        const scrollLength = getScrollLength();

        if (scroll > scrollLength - 1) {
          wrap(1, 2);
          return;
        }

        if (scroll < 1 && direction < 0) {
          wrap(-1, scrollLength - 2);
          return;
        }

        const progress = gsap.utils.clamp(0, 1, scroll / scrollLength);
        scrub.vars.offset = (iteration + progress) * seamlessLoop.duration();
        scrub.invalidate().restart();
      };

      const handleScroll = () => {
        updateFromScroll();

        if (scrollEndTimer !== null) {
          window.clearTimeout(scrollEndTimer);
        }

        scrollEndTimer = window.setTimeout(() => {
          scrollToOffset(scrub.vars.offset as number);
        }, 140);
      };

      const prevHandler = () => scrollToOffset((scrub.vars.offset as number) - spacing);
      const nextHandler = () => scrollToOffset((scrub.vars.offset as number) + spacing);

      prevButton.addEventListener("click", prevHandler);
      nextButton.addEventListener("click", nextHandler);
      window.addEventListener("scroll", handleScroll, { passive: true });

      const draggable = Draggable.create(dragProxy, {
        type: "x",
        trigger: cardsRoot,
        onPress() {
          (this as Draggable & { startOffset: number }).startOffset =
            scrub.vars.offset as number;
        },
        onDrag() {
          const state = this as Draggable & { startOffset: number };
          scrub.vars.offset =
            state.startOffset + (this.startX - this.x) * 0.001;
          scrub.invalidate().restart();
        },
        onDragEnd() {
          scrollToOffset(scrub.vars.offset as number);
        },
      })[0];

      updateFromScroll();

      return () => {
        prevButton.removeEventListener("click", prevHandler);
        nextButton.removeEventListener("click", nextHandler);
        window.removeEventListener("scroll", handleScroll);
        if (scrollEndTimer !== null) {
          window.clearTimeout(scrollEndTimer);
        }
        draggable.kill();
        scrub.kill();
        seamlessLoop.kill();
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="photo-stories-reference-page">
      <div ref={galleryRef} className="gallery">
        <ul ref={cardsRef} className="cards">
          {referenceImages.map((src, index) => (
            <li key={`${src}-${index}`} style={{ backgroundImage: `url(${src})` }} />
          ))}
        </ul>

        <div className="actions">
          <button ref={prevButtonRef} className="prev" type="button">
            Prev
          </button>
          <button ref={nextButtonRef} className="next" type="button">
            Next
          </button>
        </div>
      </div>

      <div ref={dragProxyRef} className="drag-proxy" />
      <div
        ref={spacerRef}
        className="photo-stories-reference-page__spacer"
        aria-hidden="true"
      />
    </section>
  );
}
