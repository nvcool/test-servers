import { SeminarForm } from "../components/SeminarForm";
import { useMutation } from "@tanstack/react-query";
import { seminarsApi } from "../lib/queries";

export const CreateSeminarPage = () => {
  const {
    mutate: postSeminar,
    isSuccess,
    error,
    isPending,
  } = useMutation({
    mutationFn: seminarsApi.createSeminar,
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
