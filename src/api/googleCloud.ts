
import instance from "./instance";


export const uploadAudio = (data: any) => {
    const url = `/upload`;
    return instance.post(url, data);
}
