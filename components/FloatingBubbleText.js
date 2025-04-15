const FloatingBubbleText = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 30, damping: 10 });
    const springY = useSpring(y, { stiffness: 30, damping: 10 });
    const ref = useRef(null);
  
    const [isMobile, setIsMobile] = React.useState(false);
  
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    useEffect(() => {
      if (isMobile) return;
  
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
    }, [isMobile, x, y]);
  
    return (
      <motion.p
        ref={ref}
        style={{
          x: isMobile ? undefined : springX,
          y: isMobile ? undefined : springY,
        }}
        className={`cursor-default ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: isMobile ? [0, -5, 0] : undefined,
        }}
        transition={{
          duration: isMobile ? 4 : 1,
          ease: isMobile ? 'easeInOut' : 'easeOut',
          repeat: isMobile ? Infinity : 0,
        }}
      >
        {children}
      </motion.p>
    );
  };
  