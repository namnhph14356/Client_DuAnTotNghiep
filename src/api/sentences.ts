import instance from "./instance";

export const listSentences = () => {
    const url = `/sentences`;
    return instance.get(url);
}

export const addSentences = (data: any) => {
    const url = `/sentences`;
    return instance.post(url, data)
}

export const editSentences = (data:any) => {
    const url = `sentences/${data._id}`;
    return instance.put(url, data)
}

export const detailSentences = (id:any) => {
    const url = `/sentences/${id}`;
    return instance.put(url)
}

// export const deleteVocabulary = (id:any) =>{
//     const url = `vocabulary/${id}`
//     return instance.delete(url)
// }