import { API_URL } from "../utils/consts";
import { fetchHandler } from "../utils/helpers";
import { FormSchemaType } from "./schemas";
import { ISeminar } from "../types/ISemirnars";

export const seminarsApi = {
  // Метод для получения списка семинаров с пагинацией
  getAllSeminars: (page: number) =>
    fetchHandler(fetch(`${API_URL}/seminars?_page=${page}&_per_page=5`)),

  // Метод для получения информации о конкретном семинаре по ID
  getSeminar: (id: string) => fetchHandler(fetch(`${API_URL}/seminars/${id}`)),

  // Метод для создания нового семинара
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

  // Метод для обновления данных семинара по ID
  putSeminar: (id: string, seminarData: ISeminar) =>
    fetchHandler(
      fetch(`${API_URL}/seminars/${id}`, {
        method: "PUT",
        body: JSON.stringify(seminarData),
      })
    ),

  // Метод для удаления семинара по ID
  deleteSeminar: (id: string) =>
    fetchHandler(
      fetch(`${API_URL}/seminars/${id}`, {
        method: "DELETE",
      })
    ),
};
