"use client";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function BubbleLine({ count = 20, start = false, onComplete }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true });
  const [floatMode, setFloatMode] = useState(false);

  const controlsArray = Array.from({ length: count }, () =>
    useAnimationControls()
  );

  useEffect(() => {
    if (start && inView) {
      controlsArray.forEach((controls, i) => {
        controls.start({
          x: [0, 10, -5, 0],
          transition: {
            duration: 0.6,
            delay: i * 0.1,
            ease: "easeInOut",
          },
        });

        if (i === count - 1) {
          setTimeout(() => {
            setFloatMode(true);
            onComplete?.();
          }, (i + 1) * 100 + 800);
        }
      });
    }
  }, [start, inView]);

  useEffect(() => {
    if (floatMode) {
      controlsArray.forEach((controls, i) => {
        controls.start({
          x: [`${Math.random() * 100 - 50}px`],
          y: [`${Math.random() * 100 - 50}px`],
          transition: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 3 + Math.random() * 2,
            ease: "easeInOut",
          },
        });
      });
    }
  }, [floatMode]);

  return (
    <div ref={ref} className="relative flex justify-center items-center gap-2 my-10 min-h-[60px] overflow-visible">
      {controlsArray.map((controls, i) => (
        <motion.div
          key={i}
          className="w-4 h-4 rounded-full shadow-lg"
          animate={controls}
          style={{
            background: "radial-gradient(circle at 30% 30%, #96c24e, #46522b)",
            boxShadow: "0 0 6px rgba(70, 82, 43, 0.6)",
            position: "relative",
          }}
        />
      ))}
    </div>
  );
}
