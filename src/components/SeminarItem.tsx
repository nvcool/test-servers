import { ISeminar } from "../types/ISemirnars";
import { SeminarEditModal } from "./modals/SeminarEditModal";
import { ConfirmationModal } from "./modals/ConfirmationModal";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../App";
import { seminarsApi } from "../lib/queries";

interface ISeminarItemProps {
  seminar: ISeminar;
}

export const SeminarItem = ({ seminar }: ISeminarItemProps) => {
  const { mutate, error } = useMutation({
    mutationFn: seminarsApi.deleteSeminar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seminarsData"] });
    },
  });

  if (error) {
    return <h3 className="text-3xl font-semibold"> Error: </h3> + error.message;
  }

  const handleDelete = (id: string) => {
    mutate(id);
  };

  return (
    <div className="grid grid-cols-[_60px_120px_400px_150px_1fr] border border-gray-500 rounded-md p-3 text-xl items-center bg-[#F9F1E7]">
      <span className="p-2 rounded-full border border-green-500 text-center w-full">
        {seminar.id}
      </span>

      <img
        className="w-20 h-20 mx-auto rounded-2xl"
        src={seminar.photo}
        alt="seminar image"
      />

      <div className="grid gap-2">
        <span>{seminar.title}</span>
        <span>{seminar.description}</span>
      </div>

      <div className="grid">
        <span>Дата: {seminar.date}</span>
        <span>Время:{seminar.time}</span>
      </div>

      <div className="flex justify-end gap-2">
        <SeminarEditModal id={seminar.id} />
        <ConfirmationModal onConfirm={() => handleDelete(seminar.id)} />
      </div>
    </div>
  );
};
