const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date()
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: true
        },
        name: {
          type: String,
          trim: true,
          required: true
        },
        duration: {
          type: Number,
          required: "Enter a number in minutes for duration"
        },
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number
      }
    ]
  },
  {
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true
    }
  }
);

// adds a dynamically-created property to schema
workoutSchema.virtual("totalDuration").get(function () {
  // "reduce" array of exercises down to just the sum of their durations
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
