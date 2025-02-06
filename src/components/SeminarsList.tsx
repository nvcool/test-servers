import { ISeminar } from "../types/ISemirnars";
import { SeminarItem } from "./SeminarItem";

interface ISeminarListProps {
  seminars: ISeminar[];
}

export const SeminarsList = ({ seminars }: ISeminarListProps) => {
  return (
    <ul className="grid gap-5 justify-center">
      {seminars.map((seminar) => {
        return (
          <li key={seminar.id}>
            <SeminarItem seminar={seminar} />
          </li>
        );
      })}
    </ul>
  );
};
