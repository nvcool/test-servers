// Вспомогательная функция для обработки запросов, которая обрабатывает промисы и возвращает результат в удобном формате
export const fetchHandler = async (query: Promise<Response>) => {
  const res = await query;
  if (!res.ok) {
    throw { status: res.status, message: res.statusText };
  } else {
    return res.json();
  }
};
