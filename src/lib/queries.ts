import { API_URL } from "../utils/consts";
import { fetchHandler } from "../utils/helpers";
import { FormSchemaType } from "./schemas";
import { ISeminar } from "../types/ISemirnars";

export const seminarsApi = {
  getAllSeminars: (page: number) =>
    fetchHandler(fetch(`${API_URL}/seminars?_page=${page}&_per_page=5`)),
  getSeminar: (id: string) => fetchHandler(fetch(`${API_URL}/seminars/${id}`)),
  createSeminar: (newSeminarData: FormSchemaType) =>
    fetchHandler(
      fetch(`${API_URL}/seminars`, {
        method: "POST",
        body: JSON.stringify({
          title: newSeminarData.title,
          description: newSeminarData.description,
          date: newSeminarData.date.split("-").reverse().join("."),
          time: newSeminarData.time,
          photo: newSeminarData.photo,
        }),
      })
    ),
  putSeminar: (id: string, seminarData: ISeminar) =>
    fetchHandler(
      fetch(`${API_URL}/seminars/${id}`, {
        method: "PUT",
        body: JSON.stringify(seminarData),
      })
    ),
  deleteSeminar: (id: string) =>
    fetchHandler(
      fetch(`${API_URL}/seminars/${id}`, {
        method: "DELETE",
      })
    ),
};
