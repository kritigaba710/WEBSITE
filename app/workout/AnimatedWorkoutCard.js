import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedWorkoutCard = ({ workout, index, isSelected, onSelect }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const direction = index % 2 === 0 ? -100 : 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onClick={() => onSelect(workout)}
      className={`card flex justify-between gap-10 items-center flex-wrap p-10 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <div className="flex-1 min-w-[250px]">
        <h2 className="text-4xl text-[#343621] font-bold mb-3">{workout.name}</h2>
        <p className="text-xl font-semibold text-gray-800">{workout.description}</p>
      </div>
      <div className="flex-1 min-w-[250px]">
        <img
          src={workout.image}
          alt={workout.name}
          className="w-full max-w-sm mx-auto mb-4"
        />
      </div>
    </motion.div>
  );
};
export default AnimatedWorkoutCard;