"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";

export default function ProgressPage() {   
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const [hydration, setHydration] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState([]);


  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(`/api/workouts?email=${email}`);
        setHydration(res.data.hydration);
        setWorkouts(res.data.workouts || []);
        setProgressData(res.data.progress || []);
      } catch (err) {
        console.error("Failed to fetch progress:", err);
      } finally {
        setLoading(false);
      }
    };
  
    if (status === "authenticated" && email) {
      fetchProgress();
    }
  }, [status, email]);
  

  const getLast7Days = () => {
    const today = new Date();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const last7Days = getLast7Days();

  const dailyData = last7Days.map((date) => {
    const hydrationLog = hydration.find((log) => log.date === date);
    const dailyWorkouts = workouts.filter((w) => w.date === date);
    const totalCalories = dailyWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
    const progressLog = progressData.find((log) => log.date === date);

    return {
        date,
        glasses: hydrationLog?.glasses || 0,
        caloriesBurned: progressLog?.caloriesBurned || 0,
      };
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-300 pt-5 px-4">
      <Navbar />
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">📊 Progress Tracker</h1>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Water (Glasses)</th>
              <th className="py-2 px-4 border-b">Calories Burned</th>
            </tr>
          </thead>
          <tbody>
            {dailyData.map((log, i) => (
              <tr key={i} className="hover:bg-sky-100">
                <td className="py-2 px-4 border-b">{log.date}</td>
                <td className="py-2 px-4 border-b">{log.glasses}</td>
                <td className="py-2 px-4 border-b">{log.caloriesBurned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}