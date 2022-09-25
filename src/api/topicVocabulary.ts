import instance from "./instance";

export const getDetailTopic = (id:string) => {
    const url = `topicVocabulary/${id}`;
    return instance.get(url);
}