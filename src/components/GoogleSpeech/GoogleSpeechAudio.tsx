import React, { useEffect, useState } from 'react'
import { getTextToAudio } from '../../api/googleCloud'
import { checkAccents } from '../../utils/checkAccents'

type GoogleSpeechAudioProps = {
    value: string,
    gender: boolean,
    // type: string
}

const GoogleSpeechAudio = ({ value, gender }: GoogleSpeechAudioProps) => {
    const [speaker, setSpeaker] = useState<any>()
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

    const getDataAudio = async (string: string) => {
        const flag2 = await getTextToAudio({ value: string, language: check? "vi-VN": "en-US", gender: gender? "MALE": "FEMALE", type: check ? `vi-VN-Wavenet-${gender? "D": "C"}`: `en-US-Neural2-${gender? "D" :"F"}`})
        console.log("flag2", flag2);
        setSpeaker(flag2.data)
        const test5 = base64ToArrayBuffer(flag2.data)
        console.log("test5", test5);
        const fileAudio = new File([test5], `output123.mp3`, { type: "audio/mp3" })
        console.log("fileAudio", fileAudio);
        const fileAudioUrl = URL.createObjectURL(fileAudio);
        console.log("fileAudioUrl", fileAudioUrl);
        const audioCorrect = new Audio(fileAudioUrl)
        audioCorrect.play()
    }

    return (
        <div>
            <button className='' onClick={() => {getDataAudio(value) }}>
                <span><i className="fa-solid fa-volume-high"></i></span>
            </button>
        </div>
    )
}

export default GoogleSpeechAudio