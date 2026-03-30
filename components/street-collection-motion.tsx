"use client";

import { useCallback, useEffect, useRef } from "react";

type StreetCollectionMotionProps = {
  children: React.ReactNode;
  className?: string;
};

const STREET_COLLECTION_TUNING = {
  // Maximum horizontal drift for the strongest image.
  maxOffsetX: 18,
  // Maximum vertical drift for the strongest image.
  maxOffsetY: 14,
  // Lower = smoother / slower settling.
  easing: 0.09,
  // Per-image movement strengths in DOM order.
  strengths: [0.42, 0.72, 1] as const,
  // Stop the rAF loop once motion is nearly settled.
  stopThreshold: 0.08,
} as const;

export function StreetCollectionMotion({
  children,
  className = "",
}: StreetCollectionMotionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const currentRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const desktopEnabledRef = useRef(false);

  const updateTransforms = useCallback(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const frames = node.querySelectorAll<HTMLElement>(".story-image-frame.photo-motion");
    frames.forEach((frame, index) => {
      const strength =
        STREET_COLLECTION_TUNING.strengths[index] ??
        STREET_COLLECTION_TUNING.strengths[STREET_COLLECTION_TUNING.strengths.length - 1];

      frame.style.transform = `translate3d(${currentRef.current.x * strength}px, ${currentRef.current.y * strength}px, 0)`;
    });
  }, []);

  const ensureAnimation = useCallback(() => {
    if (frameRef.current !== null) {
      return;
    }

    const tick = () => {
      currentRef.current.x +=
        (targetRef.current.x - currentRef.current.x) *
        STREET_COLLECTION_TUNING.easing;
      currentRef.current.y +=
        (targetRef.current.y - currentRef.current.y) *
        STREET_COLLECTION_TUNING.easing;

      updateTransforms();

      const shouldContinue =
        Math.abs(targetRef.current.x - currentRef.current.x) >
          STREET_COLLECTION_TUNING.stopThreshold ||
        Math.abs(targetRef.current.y - currentRef.current.y) >
          STREET_COLLECTION_TUNING.stopThreshold;

      if (shouldContinue) {
        frameRef.current = window.requestAnimationFrame(tick);
      } else {
        currentRef.current.x = targetRef.current.x;
        currentRef.current.y = targetRef.current.y;
        updateTransforms();
        frameRef.current = null;
      }
    };

    frameRef.current = window.requestAnimationFrame(tick);
  }, [updateTransforms]);

  useEffect(() => {
    desktopEnabledRef.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    updateTransforms();

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [updateTransforms]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!desktopEnabledRef.current || !ref.current) {
      return;
    }

    const bounds = ref.current.getBoundingClientRect();
    const ratioX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const ratioY = (event.clientY - bounds.top) / bounds.height - 0.5;

    // Cursor left/right maps to restrained horizontal drift.
    targetRef.current.x = ratioX * 2 * STREET_COLLECTION_TUNING.maxOffsetX;
    // Cursor top/bottom maps to restrained vertical drift.
    targetRef.current.y = ratioY * 2 * STREET_COLLECTION_TUNING.maxOffsetY;

    ensureAnimation();
  };

  const handlePointerLeave = () => {
    targetRef.current.x = 0;
    targetRef.current.y = 0;
    ensureAnimation();
  };

  return (
    <div
      ref={ref}
      className={`street-collection-motion ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </div>
  );
}
