import express from "express";
import type { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);

  return res.json({ weight, height, bmi });
});

app.post("/exercises", (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const targetNumber = Number(target);
  const hours = daily_exercises.map(Number);

  if (isNaN(targetNumber) || hours.some((h) => isNaN(h))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.json(calculateExercises(hours, targetNumber));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
