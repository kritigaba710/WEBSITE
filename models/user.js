import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  age: Number,
  height: Number,
  weight: Number,
  hydration: [{ date: String, glasses: Number }],

workouts: [{
  workoutName: String,
  duration: Number,
  caloriesBurned: Number, 
  date: String,
}],
  progress: [
  {
    date: { type: String },
    workoutDone: { type: Boolean },
    waterGlasses: { type: Number },
    caloriesBurned: { type: Number, default: 0 },
  }
],
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema)
