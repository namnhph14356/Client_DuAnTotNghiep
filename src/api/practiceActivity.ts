

import { PracticeActivityType } from "../types/practiceActivity";
import instance from "./instance";

export const listPracticeActivity = () => {
    const url = `/practiceActivities`
    return instance.get(url)
}

export const listPracticeActivityByDay = (id: string) => {
    const url = `/practiceActivity/day/${id}`
    return instance.get(url)
}

export const detailPracticeActivity = (id: string, userId:string) => {
    const url = `/practiceActivity/${id}/userId`
    return instance.get(url)
}

export const addPracticeActivity = (data: PracticeActivityType) => {
    const url = `/practiceActivity`
    return instance.post(url,data)
}

export const editPracticeActivity = (data: PracticeActivityType) => {
    const url = `/practiceActivity/${data._id}`
    return instance.put(url,data)
}

export const removePracticeActivity = (id: string) => {
    const url = `/practiceActivity/${id}`
    return instance.delete(url)
}