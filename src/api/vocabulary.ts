import instance from "./instance";


export const listVocabulary = () => {
    const url = `vocabulary`;
    return instance.get(url);
}

export const addVocabulary = (data: any) => {
    const url = `vocabulary`;
    return instance.post(url, data)
}
export const editVocabulary = (data:any) => {
    const url = `vocabulary/${data._id}`;
    return instance.put(url, data)
}

export const detailVocabulary = (id:any) => {
    const url = `vocabulary/${id}`;
    return instance.put(url)
}

export const deleteVocabulary = (id:any) =>{
    const url = `vocabulary/${id}`
    return instance.delete(url)
}