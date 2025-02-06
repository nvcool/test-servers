import { useQuery } from "@tanstack/react-query";
import { SeminarsList } from "../components/SeminarsList";
import { useState } from "react";
import { Button } from "../components/ui/Button";

export const HomePage = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["seminarsData", page],
    queryFn: async () =>
      await fetch(
        `http://localhost:3000/seminars?_page=${page}&_per_page=5`
      ).then((res) => res.json()),
  });

  console.log(data);

  if (isLoading) {
    return (
      <h3 className="text-3xl font-semibold text-center">Loading . . .</h3>
    );
  }

  if (error) {
    return <h3 className="text-3xl font-semibold"> Error: </h3> + error.message;
  }

  return (
    <div className=" container mx-auto mb-20">
      <h1 className="text-3xl text-center mb-6">Семинары</h1>
      <div className="flex justify-center gap-20 mb-10 items-center">
        <Button disabled={page <= 1} onClick={() => setPage((i) => --i)}>
          {"<=="}
        </Button>

        <div className="text-xl ">
          <span>{page}</span>/<span>{data.pages}</span>
        </div>

        <Button
          disabled={page >= data.pages}
          onClick={() => setPage((i) => ++i)}>
          {"==>"}
        </Button>
      </div>

      <SeminarsList seminars={data.data} />
    </div>
  );
};
