
import instance from "./instance";


export const uploadAudio = (data: any) => {
    const url = `/upload`;
    return instance.post(url, data);
}

export const uploadAudio2 = (data: any) => {
    const url = `/upload2`;
    return instance.post(url, data);
}


export const getAudio = () => {
    const url = `/upload`;
    return instance.get(url);
}

export const getTranscriptAudio = (value: string) => {
    const url = `/googlespeech`;
    return instance.get(url);
}

export const getTextToAudio = (value: string) => {
    const url = `/speaker`;
    return instance.post(url,value);
}

export const getAudioDetail = (data: string) => {
    const url = `https://storage.googleapis.com/vian_english/${data}`;
    return instance.get(url);
}
