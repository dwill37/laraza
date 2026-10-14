"use client";

import { MotionConfig } from "framer-motion";

/** Global motion defaults. `reducedMotion="user"` strips transform/layout animations for reduced-motion users;
 *  components additionally check `useReducedMotion()` to skip clip-path and line-drawing effects. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 140, damping: 22 }}>
      {children}
    </MotionConfig>
  );
}
