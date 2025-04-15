"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion"; // ✅ Import motion
import Navbar from "@/components/navbar";

export default function CaloriesCalculator() {
  const [food, setFood] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const APP_ID = "894a7de9";
  const APP_KEY = "1b1a82cec47484647077a000141b6b68";

  const handleAdd = async () => {
    if (!food) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-id": APP_ID,
          "x-app-key": APP_KEY,
        },
        body: JSON.stringify({ query: food }),
      });

      const data = await response.json();

      if (data.foods && data.foods.length > 0) {
        const item = data.foods[0];
        setItems([...items, {
          food: item.food_name,
          calories: Math.round(item.nf_calories)
        }]);
        setFood("");
      } else {
        setError("No data found for that item.");
      }

    } catch (err) {
      setError("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalCalories = items.reduce((total, item) => total + item.calories, 0);

  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{ backgroundImage: "url('/backg.jpg')" }}
      ></div>
      <Navbar/>
      <div className="w-full h-[75vh] relative z-10 flex items-center justify-center">
      <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{
    opacity: 1,
    scale: 1,
    y: [0, -10, 0, 10, 0], // floating effect
  }}
  transition={{
    duration: 4,
    ease: "easeInOut",
  }}
>

          <Card className="md:h-auto w-[90%] sm:w-[420px] bg-blue-50 p-4 sm:p-8 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-center text-4xl flex items-center justify-center font-bold">
                <span className="bg-gradient-to-r from-gray-800 via-slate-500 to-gray-600 inline-block text-transparent bg-clip-text">
                  Calories
                </span>
                <motion.p
                  className="ml-2"
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {'\u{1F354}'}
                </motion.p>
              </CardTitle>
              <CardDescription className="text-sm text-gray-400 text-center">
                Calculate the Calories of Your Food items
              </CardDescription>
            </CardHeader>

            <CardContent className="px-2 sm:px-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="text"
                    placeholder="Enter food item (e.g., banana)"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                  />
                  <Button
                    className="bg-slate-700 hover:bg-slate-600 hover:scale-110 transition-transform"
                    onClick={handleAdd}
                    disabled={loading}
                  >
                    {loading ? "Calculating..." : "Add"}
                  </Button>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="text-sm space-y-1">
                  {items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex justify-between border-b py-1"
                    >
                      <span>{item.food}</span>
                      <span>{item.calories} kcal</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="font-semibold text-gray-800 text-center"
                >
                  Total Calories: {totalCalories} kcal
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
