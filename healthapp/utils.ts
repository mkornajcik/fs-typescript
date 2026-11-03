interface BmiValues {
  height: number;
  weight: number;
}

interface ExerciseValues {
  target: number;
  exerciseHours: number[];
}

export const isNotNumber = (args: string[]): boolean => {
  return args.some((arg) => isNaN(Number(arg)));
};

export const parseBmi = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (Number(args[2]) <= 0 || Number(args[3]) <= 0) {
    throw new Error("Height and weight must be > 0");
  }

  const checkedArgs = [args[2], args[3]];

  if (isNotNumber(checkedArgs)) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

export const parseExercise = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const checkedArgs = args.slice(2);

  if (isNotNumber(checkedArgs)) {
    throw new Error("Provided values were not numbers!");
  }

  const [target, ...exerciseHours] = checkedArgs.map(Number);

  return { target, exerciseHours };
};
