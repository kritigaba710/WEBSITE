"use client";
import { useRouter } from "next/navigation";
import { useSession,useEffect } from "next-auth/react";
import Navbar from "@/components/navbar";
import { motion } from "framer-motion";

export default function MainDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/sign-up");
    }
  }, [session, router]);
  if (status === "loading") {return <div>Loading...</div>};
  return (
    <main className="min-h-screen bg-gradient-to-br pt-5 from-[#ddb27b] via-[#c29073] to-[#dfb288]">
        <Navbar/>
        <div className="mt-8 mx-4 rounded-4xl font-bold mb-6 text-center shadow-lg overflow-hidden relative 
  h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[45vh] 
  p-8 sm:pt-12 md:p-20 lg:p-24 
  text-3xl sm:text-4xl md:text-6xl lg:text-7xl
  bg-[url('/mainbg.jpg')] bg-cover bg-center bg-no-repeat">
  
  <span className="shiny-text block w-full my-auto text-white drop-shadow-md">
    Welcome, {session.user.name}!
  </span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 mx-3 gap-6">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
        className="bg-[#67808d] text-slate-800 rounded-2xl shadow-xl p-6 text-center"
      >
        <h2 className="font-bold text-4xl mb-4">💧 Water Tracker</h2>
        <p className="text-lg font-semibold">Track your daily hydration goal and glasses consumed.</p>
        <button onClick={() => router.push("/water")} className="mt-4 cursor-pointer bg-blue-500 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Go to Water Page
        </button>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        className="bg-[#5b7a69] text-teal-950 rounded-2xl shadow-xl p-6 text-center"
      >
        <h2 className="text-4xl font-bold mb-4">🏋️ Workouts</h2>
        <p className="text-lg font-semibold">Log workouts, learn new ones, and track calories burned & eaten.</p>
        <button onClick={() => router.push("/workout")} className="mt-4 cursor-pointer text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Go to Workout Page
        </button>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="bg-[#89688d] text-purple-950 rounded-2xl shadow-xl p-6 text-center"
      >
        <h2 className="text-4xl font-bold mb-4">📊 Progress</h2>
        <p className="text-lg font-semibold">See your hydration and workout progress visualized over time.</p>
        <button onClick={() => router.push("/progress")} className="mt-4 bg-purple-600 text-white rounded-xl bg-gradient-to-r from-purple-500 via-purple-600 cursor-pointer to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2">
          View Progress
        </button>
      </motion.section>
    </div>
      <div className="footer h-20 mt-10 text-center text-lg font-semibold shadow-2xl text-slate-950 p-5 bg-[#c98e6c]">All Copyrights to kritigaba31@gmail.com</div>
    </main>
  );
}
