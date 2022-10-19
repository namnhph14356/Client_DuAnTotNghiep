import instance from "./instance";

export const getGrammarDetail = (id:string) => {
    const url = `/grammar/${id}`;
    return instance.get(url)
}

export const getListGrammar = () => {
    const url = `/grammar`;
    return instance.get(url)
}

export const addGrammar = (grammar:any) => {
    const url = `/grammar`;
    return instance.post(url, grammar)
}

export const updateGrammar = (grammar:any) => {
    const url = `/grammar/${grammar._id}`
    return instance.put(url, grammar);
}

export const deleteGrammar = (id:string) => {
    const url = `/grammar/${id}`;
    return instance.delete(url)
}

export const detailDayIdGrammmar = (dayId:any) => {
    const url = `/grammar/${dayId}`;
    return instance.get(url)
}   