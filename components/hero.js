'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const FloatingBubbleText = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 30, damping: 10 });
  const springY = useSpring(y, { stiffness: 30, damping: 10 });

  const ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const offsetX = e.clientX - (rect.left + rect.width / 2);
      const offsetY = e.clientY - (rect.top + rect.height / 2);
      x.set(offsetX * 0.05);
      y.set(offsetY * 0.05);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <motion.p
      ref={ref}
      style={{
        x: springX,
        y: springY,
        textShadow: '0px 10px 20px rgba(0,0,0,0.3)',
      }}
      className={`cursor-default ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {children}
    </motion.p>
  );
};

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const bubbles = [
    { top: '5%', left: '20%', size: 80, delay: 0 },
    { top: '25%', left: '70%', size: 100, delay: 1.2 },
    { top: '45%', left: '40%', size: 70, delay: 0.5 },
    { top: '65%', left: '25%', size: 90, delay: 2 },
    { top: '15%', left: '50%', size: 110, delay: 1.7 },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen text-[#4f4a36cc] bg-transparent px-4 sm:px-8 lg:px-12">
      {/* Animated Bubbles */}
      <div className="absolute top-[10vh] left-0 w-full h-[300px] sm:h-[400px] z-0 pointer-events-none">
        {bubbles.map((bubble, index) => {
          const size = isMobile ? bubble.size * 0.5 : bubble.size;

          return (
            <motion.div
              key={index}
              className="absolute rounded-full"
              style={{
                top: bubble.top,
                left: bubble.left,
                width: size,
                height: size,
                background: `radial-gradient(circle at 30% 30%, #4f4a36cc, #776f54)`,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
                opacity: 0.8,
              }}
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: bubble.delay,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '20%',
                  width: '30%',
                  height: '30%',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.35)',
                  filter: 'blur(4px)',
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Main Text */}
      <div className="pt-[20vh] sm:pt-[25vh] flex flex-col gap-4 text-center z-10 relative max-w-4xl mx-auto px-2">
        <FloatingBubbleText className="text-xl sm:text-2xl md:text-4xl font-bold">
          LET&apos;S START TAKING CARE OF YOUR
        </FloatingBubbleText>
        <FloatingBubbleText className="text-3xl sm:text-5xl md:text-7xl font-bold font-serif">
          HEALTH & FITNESS
        </FloatingBubbleText>
        <FloatingBubbleText className="text-base sm:text-lg md:text-2xl font-semibold">
          Where health meets technology — stay fit the smart way
        </FloatingBubbleText>
      </div>

      <div className="h-[250px] sm:h-[300px] md:h-[350px]"></div>

      {/* Divider */}
      <div className="relative z-10 h-[1px] bg-[#4f4a36cc] w-[80%] mx-auto"></div>
    </div>
  );
};

export default Hero;
