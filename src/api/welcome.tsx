import instance from "./instance";

export const addWellcome = (pro:any) => {
    const url = "/addWellcome";
    return instance.post(url, pro)
}
export const listWellcome = () => {
    const url = "/listWellcome";
    return instance.post(url)
}