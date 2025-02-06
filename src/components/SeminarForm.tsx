import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { formSchema, FormSchemaType } from "../lib/schemas";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/Textarea";
import { ISeminar } from "../types/ISemirnars";

interface ISeminarFormProps {
  onSubmit: SubmitHandler<FormSchemaType>;
  seminar?: ISeminar;
  isSuccess?: boolean;
  isLoading?: boolean;
}

export const SeminarForm = ({
  seminar,
  onSubmit,
  isSuccess,
  isLoading,
}: ISeminarFormProps) => {
  const { handleSubmit, control, reset } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      reset({
        title: "",
        description: "",
        date: "",
        time: "",
        photo: "",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (seminar) {
      reset({
        title: seminar.title,
        description: seminar.description,
        date: new Date(seminar.date.split(".").reverse().join("-"))
          .toISOString()
          .split("T")[0],
        time: seminar.time,
        photo: seminar.photo,
      });
    } else {
      reset();
    }
  }, [seminar]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid text-xl gap-2 mb-5 w-full max-w-[1200px] mx-auto mt-10"
      action="">
      <div className="grid gap-1 p-2 border rounded-md ">
        <label className="" htmlFor="title">
          Заголовок
        </label>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <div className="grid gap-2">
              <Input
                {...field}
                isError={!!fieldState.error}
                id="title"
                type="text"
                placeholder="Введите заголовок. . ."
                className="w-full bg-[#F9F1E7]"
              />
              {fieldState.error && (
                <span className="text-[16px] text-red-500">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />
      </div>
      <div className="grid gap-1 p-2 border rounded-md ">
        <label htmlFor="description">Описание</label>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <div className="grid gap-2">
              <Textarea
                {...field}
                isError={!!fieldState.error}
                id="description"
                placeholder="Введите описание. . ."
                className="bg-[#F9F1E7]"
              />
              {fieldState.error && (
                <span className="text-[16px] text-red-500">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />
      </div>
      <div className="grid gap-1 p-2 border rounded-md">
        <label htmlFor="date">Дата </label>
        <Controller
          name="date"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <div className="grid gap-2">
              <Input
                {...field}
                isError={!!fieldState.error}
                id="date"
                type="date"
                placeholder="Введите дату. . ."
                className="bg-[#F9F1E7]"
              />
              {fieldState.error && (
                <span className="text-[16px] text-red-500">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />
      </div>
      <div className="grid gap-1 p-2 border rounded-md ">
        <label htmlFor="time">Время</label>
        <Controller
          name="time"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <div className="grid gap-2">
              <Input
                {...field}
                isError={!!fieldState.error}
                id="time"
                type="time"
                placeholder="Введите время. . ."
                className="bg-[#F9F1E7]"
              />
              {fieldState.error && (
                <span className="text-[16px] text-red-500">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />
      </div>
      <div className="grid gap-1 p-2 border rounded-md ">
        <label htmlFor="photo">Фото</label>
        <Controller
          name="photo"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <div className="grid gap-2">
              <Input
                {...field}
                isError={!!fieldState.error}
                id="photo"
                type="url"
                placeholder="Введите URL. . ."
                className="bg-[#F9F1E7]"
              />
              {fieldState.error && (
                <span className="text-[16px] text-red-500">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />
      </div>

      <Button
        disabled={isLoading}
        type="submit"
        className="hover:bg-green-500 hover:text-white w-full">
        {isLoading ? "загрузка. . ." : "сохранить"}
      </Button>
    </form>
  );
};
