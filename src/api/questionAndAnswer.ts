import instance from "./instance"

export const getDetailQandA = (id:string) => {
    const url = `/questionVocabulary/${id}`
    return instance.get(url)
}
export const getAllQandA = () => {
    const url = `/questionVocabulary`
    return instance.get(url)
}

// export const getAnswer = () => {
//     const url = ``
// }