"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";


export default function WaterPage() {
    //const email = "kritigaba31@gmail.com"; // replace with dynamic session later
    const { data: session, status } = useSession();
    const email = session?.user?.email;
    const [glasses, setGlasses] = useState(0);
    const [logs, setLogs] = useState([]);
    const [goal, setGoal] = useState(8);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [goalInput, setGoalInput] = useState(goal);
    const [goalMsg, setGoalMsg] = useState("");

    const updateGoal = async () => {
        if (!email) {
            setMessage("You must be logged in.");
            return;
          }
        try {
            await axios.patch("/api/water", { email, goal: goalInput });
            setGoal(goalInput);
            setGoalMsg("Goal updated!");
            setTimeout(() => setGoalMsg(""), 2000);
        } catch (err) {
            setGoalMsg("Failed to update goal");
        }
    };

    const fetchLogs = async () => {
        console.log(`/api/water?email=${email}`);
        const res = await axios.get(`/api/water?email=${email}`);

        setLogs(res.data.hydration);
        setGoal(res.data.goal); 

        const today =new Date().toISOString().split('T')[0];;
        const todayLog = res.data.hydration.find(log => log.date === today);
        if (todayLog) setGlasses(todayLog.glasses);
    };

    const logWater = async () => {
        if (!email) {
            setMessage("You must be logged in.");
            return;
          }
        setLoading(true);
        try {
            await axios.put("/api/water", { email, glasses });
            setMessage("Water intake logged!");
            fetchLogs();
            setTimeout(() => setMessage(""), 2000); 
        } catch (err) {
            setMessage("Failed to log water");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (status === "authenticated" && email) {
          fetchLogs();
        }
      }, [status, email]);

    const progress = Math.min(100, (glasses / goal) * 100);

    const last7Days = logs.slice(-7).reverse();

    return (
        <div className="bg-[url('/water.jpg')] bg-cover bg-center min-h-screen pt-5">
          <Navbar />
      
          <h1
  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center text-[#2d3a49] mb-8 drop-shadow-md
              translate-y-5 animate-[fadeInUp_0.8s_ease-out_forwards]"
  style={{
    animationName: 'fadeInUp',
    animationDuration: '0.8s',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'forwards',
  }}
>
  Water Tracker
</h1>

      
          <div className="flex flex-col lg:flex-row gap-10 justify-center items-center px-4">
            
            <div className="flex justify-center">
              <img src="/glass.png" alt="Glass" className="w-48 sm:w-60 md:w-72 lg:w-[300px]" />
            </div>
      
            
            <div className="w-full max-w-xl p-4 sm:p-6 mb-4 md:mb-0 backdrop-blur-sm rounded-xl shadow-lg">
              
              <div className="mb-4">
                <label className="block text-center text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                  Today’s Intake: {glasses} glasses / Goal: {goal}
                </label>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={glasses}
                  onChange={(e) => setGlasses(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-center">
                  <button
                    onClick={logWater}
                    className="mt-4 cursor-pointer bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br text-white font-medium rounded-lg text-sm px-5 py-2.5 shadow-lg"
                  >
                    Log Water
                  </button>
                </div>
                {message && <p className="mt-2 text-green-600 text-center">{message}</p>}
              </div>
      
              
              <div className="mb-6">
                <div className="h-5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-center text-base sm:text-lg text-gray-700 mt-1">
                  Progress: {progress.toFixed(0)}%
                </p>
              </div>
      
             
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <label className="block text-lg sm:text-xl font-semibold text-gray-800">
                  Set Daily Goal
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    className="border rounded px-2 py-1 w-24"
                    value={goalInput}
                    onChange={(e) => setGoalInput(Number(e.target.value))}
                  />
                  <button
                    onClick={updateGoal}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
              {goalMsg && <p className="text-green-600 text-sm text-center mt-1">{goalMsg}</p>}
      
             
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">📅 Last 7 Days</h2>
              <ul className="space-y-1 text-gray-800 text-sm sm:text-base">
                {last7Days.map((log, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{log.date}</span>
                    <span>{log.glasses} glasses</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
      
}
