"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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
      days.push(date.toISOString().split("T")[0]);
    }
    return days;
  };

  const last7Days = getLast7Days();

  const dailyData = last7Days.map((date) => {
    const hydrationLog = hydration.find((log) => log.date === date);
    const dailyWorkouts = workouts.filter((w) => w.date === date);
    const totalCalories = dailyWorkouts.reduce(
      (sum, w) => sum + (w.caloriesBurned || 0),
      0
    );
    const progressLog = progressData.find((log) => log.date === date);

    return {
      date,
      glasses: hydrationLog?.glasses || 0,
      caloriesBurned: progressLog?.caloriesBurned || 0,
    };
  });

  const waterChartData = {
    labels: dailyData.map((item) => item.date),
    datasets: [
      {
        label: "Water Intake (Glasses)",
        data: dailyData.map((item) => item.glasses),
        borderColor: "rgba(56, 182, 255, 1)",
        backgroundColor: "rgba(56, 182, 255, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgba(56, 182, 255, 1)",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const caloriesChartData = {
    labels: dailyData.map((item) => item.date),
    datasets: [
      {
        label: "Calories Burned",
        data: dailyData.map((item) => item.caloriesBurned),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "7-Day Progress",
        font: {
          size: 16,
        },
      },
    },
    animation: {
      duration: 2000,
      easing: "easeInOutQuad",
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-[#f3de65] pt-5 px-4">
      <Navbar />
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-6">
        📊 Progress Tracker
      </h1>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Water Intake Chart */}
        <div className="bg-gray-200 shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Water Intake Progress
          </h2>
          <div className="h-80">
            <Line data={waterChartData} options={chartOptions} />
          </div>
        </div>

        {/* Calories Burned Chart */}
        <div className="bg-gray-200 shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-red-900 mb-4">
            Calories Burned Progress
          </h2>
          <div className="h-80">
            <Line data={caloriesChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}