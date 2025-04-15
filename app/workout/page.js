'use client';

import { useState, useEffect } from 'react';
import { motion,useAnimation } from "framer-motion";
import { useRouter } from 'next/navigation';
import { useRef } from 'react'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/navbar';
import AnimatedWigglyUnderline from '@/components/AnimatedWigglyUnderline';
import AnimatedWorkoutCard from './AnimatedWorkoutCard';
import BubbleLine from './BubbleLine';

const workouts = [
  { id: 1, name: 'Push Ups', description: 'Start in a high plank position with hands shoulder-width apart and body in a straight line. Lower your chest toward the ground, then push back up — keep your core tight throughout.',image: '/pushup.png' },
  { id: 2, name: 'Squats', description: 'Stand with feet shoulder-width apart, lower your hips back and down as if sitting on a chair.Keep your chest up, knees over toes, then push through your heels to return to standing.',image: '/squat.png' },
  { id: 3, name: 'Burpees', description: 'Start in a standing position, drop into a squat with hands on the ground, kick your feet back into a plank, then return to squat and jump up. Keep your core engaged, land softly, and repeat the motion with control and speed.',image: '/burpees.png' },
  { id: 4, name: 'Lunges', description: 'Step forward with one leg, lowering your hips until both knees are bent at 90 degrees.Push through your front heel to return to standing, then repeat on the other leg.',image: '/lunges.png' },
];

const WorkoutPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [userDetails, setUserDetails] = useState({ weight: '', age: '', height: '' });
  const [userDetailsMissing, setUserDetailsMissing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }

    const userDetailsFromDB = JSON.parse(localStorage.getItem('userDetails')) || {};
    if (!userDetailsFromDB.weight || !userDetailsFromDB.height || !userDetailsFromDB.age) {
      setUserDetailsMissing(true);
    } else {
      setUserDetails(userDetailsFromDB);
    }
  }, [status, router]);

  const handleWorkoutSelect = (workout) => {
    setSelectedWorkout(workout);
    setError('');
  };

  const handleWorkoutSubmit = async () => {
    if (!selectedWorkout || !duration) {
      setError('Please select a workout and enter duration');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const calories = await calculateCaloriesBurned(selectedWorkout.name, duration);

      const workoutData = {
        workoutName: selectedWorkout.name,
        duration,
        caloriesBurned: calories,
        date: new Date().toISOString().split('T')[0],
      };
      console.log('Session:', session)
      await axios.post('/api/workouts', {
        action: 'log-workout',
        email: session?.user?.email,
        workoutData
      });

      setCaloriesBurned(calories);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateCaloriesBurned = async (workoutName, duration) => {
    try {
      console.log("Sending to /api/nutritionix:", {
        query: workoutName,
        duration: parseInt(duration),
        weight: parseFloat(userDetails.weight) || 70
      });
      if (!workoutName || isNaN(duration) || duration <= 0) {
        alert("Please enter a valid workout and duration.");
        return;
      }

      const response = await axios.post('/api/nutritionix', {
        query: workoutName,
        duration: parseInt(duration),
        weight: parseFloat(userDetails.weight) || 70
      });


      if (!response.data.exercises || !response.data.exercises[0]) {
        throw new Error('No exercise data returned');
      }

      return response.data.exercises[0].nf_calories * duration;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to calculate calories. Please try again later.');
    }
  };


  const handleUserDetailsSubmit = () => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    setUserDetailsMissing(false);
  };

  if (status === 'loading') return <div className='font-bold text-5xl text-center'>Loading...</div>;
  if (!session) return null;

  return (
    <div className=" bg-gradient-to-br from-[#96a03977] via-[#90a039c5] to-[#b1b344c7] w-full p-6 px-10">
      <Navbar />
      {userDetailsMissing ? (
        <div className="user-details-form mt-4 bg-[#bd9e7a] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#573f2b8c] text-center mb-4">Please Enter Your Details</h2>
          <input
            className="input w-full mt-2 p-3 border-[#6e5a4b] border rounded-md"
            type="number"
            placeholder="Weight (kg)"
            value={userDetails.weight}
            onChange={(e) => setUserDetails({ ...userDetails, weight: e.target.value })}
          />
          <input
            className="input w-full mt-2 p-3 border-[#6e5a4b] border rounded-md"
            type="number"
            placeholder="Age"
            value={userDetails.age}
            onChange={(e) => setUserDetails({ ...userDetails, age: e.target.value })}
          />
          <input
            className="input w-full mt-2 p-3 border-[#6e5a4b] border rounded-md"
            type="number"
            placeholder="Height (cm)"
            value={userDetails.height}
            onChange={(e) => setUserDetails({ ...userDetails, height: e.target.value })}
          />
          <button
            className="btn text-lg font-bold text-[#6e5a4b] bg-gradient-to-r from-[#6f4b2e] via-[#b59478] to-[#8d6544] hover:bg-gradient-to-br  w-full mt-4 p-3 rounded-md "
            onClick={handleUserDetailsSubmit}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="workout-section">
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-7xl font-bold text-center text-[#343621] mb-2"
            >
              Workout Tracker
            </motion.h1>

            <AnimatedWigglyUnderline/>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
<div className='h-[1px] w-[70vh] bg-green-950 text-center mx-auto my-9'></div>
<div className="flex flex-col gap-20">
{workouts.map((workout, index) => (
  <div key={workout.id}>
    <AnimatedWorkoutCard
      workout={workout}
      index={index}
      isSelected={selectedWorkout?.id === workout.id}
      onSelect={handleWorkoutSelect}
    />

    {index < workouts.length - 1 && (
      <BubbleLine
        count={30}
        start={activeLine === index}
        onComplete={() => setActiveLine(index + 1)}
      />
    )}
  </div>
))}

</div>



          {selectedWorkout && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-center mb-4">{selectedWorkout.name} - Log Your Workout</h3>
              <div className="flex flex-col items-center">
                <input
                  className="input w-2/3 p-3 border rounded-md mb-4"
                  type="number"
                  placeholder="Duration (minutes)"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="1"
                />
                <button
                  className="btn bg-blue-500 text-white w-2/3 p-3 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                  onClick={handleWorkoutSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Log Workout'}
                </button>
              </div>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-xl font-semibold">Calories Burned: {caloriesBurned}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPage;
