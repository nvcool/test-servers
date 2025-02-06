import { z } from "zod";
import { SeminarForm } from "../components/SeminarForm";
import { formSchema } from "../lib/schemas";
import { useMutation } from "@tanstack/react-query";

export const CreateSeminarPage = () => {
  const {
    mutate: postSeminar,
    isSuccess,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (newSeminarData: z.infer<typeof formSchema>) => {
      const post = await fetch("http://localhost:3000/seminars", {
        method: "POST",
        body: JSON.stringify({
          title: newSeminarData.title,
          description: newSeminarData.description,
          date: newSeminarData.date.split("-").reverse().join("."),
          time: newSeminarData.time,
          photo: newSeminarData.photo,
        }),
      });
      if (!post.ok) {
        throw { status: post.status, message: post.statusText };
      } else {
        return post.json();
      }
    },
    onSuccess: () => {},
  });

  return (
    <div className="container mx-auto mb-20">
      <h1 className="text-3xl text-center mb-6">Добавление нового семинара</h1>
      {isSuccess && (
        <h3 className="text-3xl text-center mb-6">
          Новый семинар упешно создан!
        </h3>
      )}
      {error && (
        <span className="text-red-500 text-2xl mx-auto block">
          {error.message}
        </span>
      )}
      <SeminarForm
        onSubmit={(parametr) => {
          postSeminar(parametr);
        }}
        isLoading={isPending}
        isSuccess={isSuccess}
      />
    </div>
  );
};
