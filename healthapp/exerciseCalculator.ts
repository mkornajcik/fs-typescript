import { parseExercise } from "./utils.ts";

type Rating = 1 | 2 | 3;
type RatingDescription =
  | "The target was missed by a lot"
  | "The target was missed slightly"
  | "The target was met or exceeded";

interface RatingCombined {
  rating: Rating;
  ratingDescription: RatingDescription;
}

interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
}

const getTrainingDays = (exerciseHours: number[]): number => {
  return exerciseHours.filter((hours) => hours > 0).length;
};

const getAverageHours = (exerciseHours: number[]): number => {
  const periodLength = exerciseHours.length;
  if (periodLength === 0) return 0;
  let hours = 0;

  for (const v of exerciseHours) {
    hours += v;
  }

  return hours / periodLength;
};

const getRating = (target: number, average: number): RatingCombined => {
  if (average >= target) return { rating: 3, ratingDescription: "The target was met or exceeded" };

  const diff = target - average;

  if (diff <= 0.5) return { rating: 2, ratingDescription: "The target was missed slightly" };

  return { rating: 1, ratingDescription: "The target was missed by a lot" };
};

export const calculateExercises = (exerciseHours: number[], target: number): ExercisesResult => {
  const periodLength = exerciseHours.length;
  const trainingDays = getTrainingDays(exerciseHours);
  const average = getAverageHours(exerciseHours);
  const success = average >= target;
  const { rating, ratingDescription } = getRating(target, average);

  return { periodLength, trainingDays, target, average, success, rating, ratingDescription };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, exerciseHours } = parseExercise(process.argv);
    console.log(calculateExercises(exerciseHours, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
