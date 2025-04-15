"use client"
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [advice, setAdvice] = useState('');
  const [diet, setDiet] = useState(null);

  const getDietPlan = (bmiValue) => {
    const bmi = parseFloat(bmiValue);

    if (bmi < 18.5) {
      return {
        category: 'Underweight',
        meals: {
          breakfast: 'Peanut butter toast, banana, and milk',
          lunch: 'Dal, rice with ghee, salad, curd',
          snack: 'Dry fruits, dates, and boiled potatoes',
          dinner: 'Paneer curry, roti, and mixed veg sabzi',
        },
        tips: [
          'Eat every 2-3 hours',
          'Include good fats like nuts, seeds, ghee',
          'Avoid skipping meals',
        ],
      };
    } else if (bmi >= 18.5 && bmi < 25) {
      return {
        category: 'Normal',
        meals: {
          breakfast: 'Oats porridge with fruits and chia seeds',
          lunch: '2 rotis, sabzi, dal, salad, and curd',
          snack: 'Roasted makhana or sprouts',
          dinner: 'Light khichdi with moong dal and ghee',
        },
        tips: [
          'Maintain hydration (8–10 glasses of water)',
          'Limit processed food',
          'Balance carbs, protein, and fats',
        ],
      };
    } else if (bmi >= 25 && bmi < 30) {
      return {
        category: 'Overweight',
        meals: {
          breakfast: 'Vegetable upma and green tea',
          lunch: '1-2 rotis, sabzi (less oil), cucumber salad',
          snack: 'Buttermilk or boiled chana',
          dinner: 'Grilled vegetables or soup with 1 roti',
        },
        tips: [
          'Avoid sugary drinks',
          'Walk 30 mins daily',
          'Use less oil and salt',
        ],
      };
    } else {
      return {
        category: 'Obese',
        meals: {
          breakfast: 'Besan chilla with mint chutney',
          lunch: '1 roti, lauki/tinda sabzi, curd',
          snack: 'Fruit salad or coconut water',
          dinner: 'Clear soup and salad (no roti/rice)',
        },
        tips: [
          'Follow portion control',
          'Increase fiber (salads, fruits)',
          'Consult a dietitian if needed',
        ],
      };
    }
  };

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);

    if (h > 0 && w > 0) {
      const bmiValue = (w / (h * h)).toFixed(2);
      setBMI(bmiValue);

      const plan = getDietPlan(bmiValue);
      setDiet(plan);

      const msg = {
        Underweight: 'You are underweight. Eat more balanced meals and build strength 💪',
        Normal: 'You are in a healthy range. Keep it up and stay active! ✨',
        Overweight: 'You are overweight. Try reducing junk and moving more 🚶‍♀️',
        Obese: 'You are in the obese range. Focus on health with expert advice 🧨',
      };

      setAdvice(msg[plan.category]);
    } else {
      setBMI(null);
      setDiet(null);
      setAdvice('Please enter valid weight and height.');
    }
  };

  return (<>
   <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{ backgroundImage: "url('/bmi.jpg')" }}
      ></div>
    <Card className="max-w-xl relative z-10 mx-auto bg-amber-50 p-6 shadow-xl mt-36 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-3xl text-center flex items-center justify-center "><span className='bg-gradient-to-r from-gray-800 via-slate-500 to-gray-600 inline-block text-transparent bg-clip-text'>BMI Calculator </span><span className='text-3xl'>{'\u{1F4D0}'}</span></CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <Button className="w-full bg-slate-700 hover:bg-slate-600 hover:scale-110 transition-transform" onClick={calculateBMI}>
          Calculate
        </Button>

        {bmi && (
          <div className="space-y-3">
            <Separator />
            <p className="text-lg font-medium">Your BMI: {bmi}</p>
            <p className="text-sm text-muted-foreground">{advice}</p>

            {diet && (
              <div>
                <h3 className="text-xl font-semibold mt-4">🌿 Veg Diet Plan ({diet.category})</h3>

                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li><strong>Breakfast:</strong> {diet.meals.breakfast}</li>
                  <li><strong>Lunch:</strong> {diet.meals.lunch}</li>
                  <li><strong>Snack:</strong> {diet.meals.snack}</li>
                  <li><strong>Dinner:</strong> {diet.meals.dinner}</li>
                </ul>

                <h4 className="font-semibold mt-4">Tips:</h4>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                  {diet.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
    </>
  );
};

export default BMICalculator;
