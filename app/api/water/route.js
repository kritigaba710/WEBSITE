import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";

export async function PATCH(req) {
  const { email, goal } = await req.json();
  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  user.dailyGoal = goal;
  await user.save();

  return NextResponse.json({ message: "Daily goal updated!" });
}

export async function PUT(req) {
  const { email, glasses } = await req.json();
  const date = new Date().toISOString().split('T')[0];;

  await connectToDatabase();
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingLog = user.hydration.find((log) => log.date === date);

  if (existingLog) {
    existingLog.glasses = glasses;
  } else {
    user.hydration.push({ date, glasses });
  }

  await user.save();

  return NextResponse.json({ message: "Water intake logged!" });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  await connectToDatabase();
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  console.log("User progress data:", user.progress);
  return NextResponse.json({
    hydration: user.hydration,
    goal: user.dailyGoal || 8, 
    workouts: user.workouts,
    progress: user.progress || [] 
      
  });
}
