import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { ISeminar } from "../../types/ISemirnars";
import { FormSchemaType } from "../../lib/schemas";
import { queryClient } from "../../App";
import { Button } from "../ui/Button";
import { SeminarForm } from "../SeminarForm";
import { seminarsApi } from "../../lib/queries";
interface ISeminarEditModalProps {
  id: string;
}

export const SeminarEditModal = ({ id }: ISeminarEditModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    data: seminar,
    error,
    isLoading,
  } = useQuery<ISeminar>({
    queryKey: ["getData", id],
    queryFn: () => seminarsApi.getSeminar(id),
    enabled: isOpen && !!id,
  });

  const {
    mutate: updateSeminare,
    isSuccess,
    reset: resetMutation,
    isPending,
  } = useMutation({
    mutationKey: ["putData", id],
    mutationFn: async (seminarsData: ISeminar) =>
      seminarsApi.putSeminar(id, seminarsData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seminarsData"] });
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    if (id) {
      updateSeminare({
        id,
        ...data,
        date: data.date.split("-").reverse().join("."),
      });
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          resetMutation();
        }
      }}>
      <Dialog.Trigger asChild>
        <Button className=" hover:bg-green-300 bg-green-400 text-white ">
          Редактировать
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className=" fixed inset-0 backdrop-blur-[3px] bg-black/20" />
        <Dialog.Content className="fixed top-[50%] left-[50%]  -translate-[50%] rounded-2xl p-4 w-full max-w-[700px] bg-gray-200 ">
          {error && <h3 className="text-2xl text-center">Ошибка !</h3>}
          {isLoading && <h3 className="text-2xl text-center">Загрузка !</h3>}
          {isSuccess && (
            <h3 className="text-2xl text-center">Данные успешно изменены!</h3>
          )}
          <Dialog.Title className="text-2xl text-center">Семинары</Dialog.Title>
          <Dialog.Close className="text-2xl absolute right-6 top-2 cursor-pointer font-bold">
            Х
          </Dialog.Close>
          <Dialog.Description className="text-xl text-left mb-5">
            Тут можно внести изменения!
          </Dialog.Description>
          <SeminarForm
            isLoading={isPending || isLoading}
            onSubmit={onSubmit}
            seminar={seminar}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
