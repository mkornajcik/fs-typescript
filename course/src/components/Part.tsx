import type { CoursePart } from "../App";

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <hr />
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>group exercises {part.groupProjectCount}</p>
          <hr />
        </div>
      );
    case "background":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>{part.backgroundMaterial}</p>
          <hr />
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>{part.requirements.join(", ")}</p>
          <hr />
        </div>
      );
    default:
      return assertNever(part);
  }
};
