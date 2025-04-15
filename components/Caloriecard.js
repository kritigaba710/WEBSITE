'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Caloriecard = () => {
  const [typedText, setTypedText] = useState('');
  const typingText = 'Click here to Try';
  const indexRef = useRef(0);
  const hasTypedRef = useRef(false);
  const timeoutRef = useRef(null);

  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView && !hasTypedRef.current) {
      hasTypedRef.current = true;

      const type = () => {
        if (indexRef.current < typingText.length) {
          const nextChar = typingText.charAt(indexRef.current);
          setTypedText((prev) => prev + nextChar);
          indexRef.current += 1;
          timeoutRef.current = setTimeout(type, 100);
        }
      };

      type();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [inView]);

  return (<>
    <div className='flex items-center justify-center gap-10 py-10' ref={ref}>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src="/calory.png" width={250} height={250} alt="Calorie Calculator" />
      </motion.div>

      <div className='flex flex-col justify-center items-center gap-5'>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='flex flex-col justify-center items-center gap-2'
        >
          <div className='text-4xl font-bold text-[#4f4a36cc]'>
            Calculate your Calories in Food
          </div>
          <div className='text-2xl font-semibold text-[#4f4a36cc]'>
            Wanna know how many calories are in the foods you eat?
          </div>
          <div className='text-xl font-semibold text-[#4f4a36cc] min-h-[28px]'>
            {typedText}
          </div>
        </motion.div>

        {typedText === typingText && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          >
            <Link href='/Calories'>
              <button
                type="button"
                className="text-gray-900 cursor-pointer bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Try Now
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
    
    <div className="relative z-10 h-[1px] bg-[#4f4a36cc] w-[80%] mx-auto"></div></>
  );
};

export default Caloriecard;
