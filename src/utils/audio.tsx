import { useState } from "react";
import { getTextToAudio } from "../api/googleCloud";
import { checkAccents } from "./checkAccents";

export const audioSpeak = (value: any, gender: boolean) => {
    const check = checkAccents(value)

    const base64ToArrayBuffer = (base64) => {
        var binaryString = window.atob(base64);
        var len = binaryString.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    const getDataAudio = async (string: any) => {
        const flag2 = await getTextToAudio({ value: string, language: check ? "vi-VN" : "en-US", gender: gender ? "MALE" : "FEMALE", type: check ? `vi-VN-Wavenet-${gender ? "D" : "C"}` : `en-US-Neural2-${gender ? "D" : "F"}` })
        const test5 = base64ToArrayBuffer(flag2.data)
        const fileAudio = new File([test5], `output123.mp3`, { type: "audio/mp3" })
        const fileAudioUrl = URL.createObjectURL(fileAudio);
        const audioCorrect = new Audio(fileAudioUrl)
        audioCorrect.play()
    }
    getDataAudio(value)
}