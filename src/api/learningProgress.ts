import { AddLearningProgressType, LearningProgressType } from "../types/learningProgress";
import instance from "./instance";

export const listLearningProgress = () => {
    const url = `/learningProgress`
    return instance.get(url)
}

export const detailLearningProgressByUser= (dayId: string, userId: string | undefined) => {
    const url = `/learningProgress?dayId=${dayId}&userId=${userId}`
    return instance.get(url)
}

export const detailLearningProgress = (id: string) => {
    const url = `/learningProgress/${id}`
    return instance.get(url)
}

export const addLearningProgress = (data: AddLearningProgressType) => {
    const url = `/learningProgress`
    return instance.post(url,data)
}

export const editLearningProgress = (data: LearningProgressType) => {
    const url = `/learningProgress/${data._id}`
    return instance.put(url,data)
}

export const removeLearningProgress = (id: string) => {
    const url = `/learningProgress/${id}`
    return instance.delete(url)
}