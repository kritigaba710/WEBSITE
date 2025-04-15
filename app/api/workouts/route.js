import connectToDatabase from '@/lib/mongodb';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // adjust path!
import User from "@/models/user";


import { NextResponse } from 'next/server';

export async function POST(req) {
  const { action, workoutData, email } = await req.json(); // Ensure you read the body as JSON

  if (!action || !email || !workoutData) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.email !== email) {
        console.log('Unauthorized access attempt', session);
      return NextResponse.json({ error: 'User not authenticated or unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    if (action === 'log-workout') {
      const log = {
        email,
        ...workoutData,
      };
      console.log('Received email:', email);

      await User.updateOne(
        { email },
        {
          $push: {
            workouts: {
              name: workoutData.workoutName,
              duration: parseInt(workoutData.duration),
              caloriesBurned: workoutData.caloriesBurned,
              date: new Date().toISOString().split('T')[0],
            },
          },
        }
      );
      
      const today = new Date().toISOString().split('T')[0];

await User.updateOne(
  { email, "progress.date": today },
  {
    $set: {
      "progress.$.workoutDone": true,
      "progress.$.caloriesBurned": workoutData.caloriesBurned,
    },
  }
);

// If no existing entry for today, push a new one:
await User.updateOne(
  { email, "progress.date": { $ne: today } },
  {
    $push: {
      progress: {
        date: today,
        workoutDone: true,
        waterGlasses: 0,
        caloriesBurned: workoutData.caloriesBurned
      },
    },
  }
);

      return NextResponse.json({ success: 'Workout logged successfully', data: log }, { status: 200 });
    }
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error, please try again later' }, { status: 500 });
  }
}

export async function GET(req) {
    const email = req.nextUrl.searchParams.get("email"); // updated way to get search param
  
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
  
    try {
      await connectToDatabase();
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      console.log("User progress data:", user.progress);
      return NextResponse.json({ 
        workouts: user.workouts || [], 
        hydration: user.hydration || [],
        progress: user.progress || []
      }, { status: 200 });
      
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Server error, please try again later' }, { status: 500 });
    }
  }