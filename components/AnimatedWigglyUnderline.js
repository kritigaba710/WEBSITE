import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedUnderline() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ pathLength: 0, x: -100 }}
      animate={{ pathLength: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex justify-center mt-[-10px]"
    >
      <svg
        viewBox="0 0 240 20"
        className="w-[90%] max-w-[600px] h-6"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="glow" x1={`${offset}%`} x2={`${offset + 30}%`} y1="0" y2="0">
            <stop offset="0%" stopColor="#77a832" stopOpacity="0" />
            <stop offset="50%" stopColor="#77a832" stopOpacity="1" />
            <stop offset="100%" stopColor="#77a832" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,10 Q30,0 60,10 T120,10 T180,10 T240,10"
          fill="transparent"
          stroke="url(#glow)"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
      </svg>
    </motion.div>
  );
}
