import instance from "./instance";

export const listSentencesByIdDay = (dayId: string) => {
  const url = `/sentences/day/${dayId}`;
  return instance.get(url);
};

export const listSentencesByIdActivity = (id: string) => {
  const url = `/sentences/activity/${id}`;
  return instance.get(url);
};

export const listSentences = () => {
  const url = `/sentences`;
  return instance.get(url);
};

export const addSentences = (data: any) => {
  const url = `/sentences`;
  return instance.post(url, data);
};

export const editSentences = (data: any) => {
  const url = `sentences/${data._id}`;
  return instance.put(url, data);
};

export const detailSentences = (id: any) => {
  const url = `/sentences/${id}`;
  return instance.put(url);
};

export const deleteSentence = (id: any) => {
  const url = `sentences/${id}`;
  return instance.delete(url);
};
