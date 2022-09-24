import instance from "./instance";

export const getGrammarDetail = (id:string) => {
    const url = `/grammar/${id}`;
    return instance.get(url)
}