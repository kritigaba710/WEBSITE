import Image from "next/image";
import Navbar from "../components/navbar";
import Hero from "@/components/hero";
import Caloriecard from "@/components/Caloriecard";
import BMIcard from "@/components/BMIcard";
import ProfileCard from "@/components/ProfileCard";

export default function Home() {
  return (
    <div className="bg-[#CEC093] p-2">
        <Navbar/>
        <Hero/>
        <Caloriecard/>
        <BMIcard/>
        <ProfileCard/>
    </div>
  );
}
