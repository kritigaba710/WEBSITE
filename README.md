# Health & Fitness Tracker

A Health and Fitness Tracker built with **Next.js**, **React**, and **MongoDB**. This app allows users to track their hydration, workouts, and progress, while also providing workout recommendations and diet tracking.

## Features

- **Water Tracker**: 
  - Log daily water intake and set hydration goals.
  - Progress bar for hydration.
  - Edit and delete options for hydration logs.
  - Hydration chart showing intake over the last 7 days.
  - Restriction to one log per day (update instead of adding multiple logs).

- **Workout Library**: 
  - View workouts categorized by difficulty (beginner, intermediate, advanced).
  - Filter workouts by goal (strength, cardio, etc.).
  - Timer/Rep tracker for workouts.
  - Track calories burned during workouts.

- **Progress Tracker**: 
  - View your progress based on hydration and workout data with graphs and analytics.

- **Analytics**: 
  - Weekly/Monthly analytics to track:
    - Water intake.
    - Workouts performed.
    - Calories burned.
    - Diet intake (based on logged meals).

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js (via API routes in Next.js)
- **Database**: MongoDB
- **Authentication**: NextAuth (GitHub & Credentials)
- **Styling**: Tailwind CSS

## Setup

### Prerequisites

- Node.js (version >= 14)
- MongoDB account (for connecting to your MongoDB database)
