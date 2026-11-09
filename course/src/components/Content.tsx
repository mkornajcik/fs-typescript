import type { CoursePart } from "../App";
import { Part } from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

export const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};
