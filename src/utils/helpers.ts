export const fetchHandler = async (query: Promise<Response>) => {
  const res = await query;
  if (!res.ok) {
    throw { status: res.status, message: res.statusText };
  } else {
    return res.json();
  }
};
