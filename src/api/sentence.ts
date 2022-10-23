import instance from "./instance";


export const listSentences = () => {
    const url = `sentences`;
    return instance.get(url);
}

export const createSentence = (data: any) => {
    const url = `sentences`;
    return instance.post(url, data)
}
export const editSentence = (data:any) => {
    const url = `sentences/${data._id}`;
    return instance.put(url, data)
}

export const detailSentence = (id:any) => {
    const url = `sentences/${id}`;
    return instance.put(url)
}

export const deleteSentence = (id:any) =>{
    const url = `sentences/${id}`
    return instance.delete(url)
}