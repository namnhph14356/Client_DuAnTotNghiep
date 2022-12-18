import { log } from 'console'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getAudio, getAudioDetail, getTextToAudio, getTranscriptAudio, uploadAudio, uploadAudio2 } from '../api/googleCloud'
import GoogleSpeechAudio from '../components/GoogleSpeech/GoogleSpeechAudio'
import { checkAccents } from '../utils/checkAccents'


type Props = {}

const Test3 = (props: Props) => {
    const [dataAudio, setDataAudio] = useState<any>()
    const [url, setUrl] = useState<any>()
    const [speaker, setSpeaker] = useState<any>()
    const [ggSpeech, setGgSpeech] = useState<any>()
    let postid = uuidv4();
    const check = checkAccents("how are you")
    console.log("check", check);
    console.log("dataAudio", dataAudio);
    console.log("url", url);
    console.log("speaker", speaker);
    console.log("ggSpeech", ggSpeech);

    function base64ToArrayBuffer(base64) {
        var binaryString = window.atob(base64);
        var len = binaryString.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }
    
    

    const b64toBlob = (b64Data, contentType, sliceSize = 512) => {
        const byteCharacters = window.atob(b64Data);
        const byteArrays: any = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
    // const blob = b64toBlob(speaker, "audio/mp3");
    // const blobUrl = URL.createObjectURL(blob);
    // console.log("blobUrl",blobUrl);

    const abc = new File([speaker], `output123.mp3`, { type: "audio/mp3" })
    let flag = URL.createObjectURL(abc);
    // const gg = readFileDataAsBase64(abc)
    // const reader = new FileReader();
    // const buffer = new ArrayBuffer(speaker);
    // const blob = new Blob([])
    // const test1 = reader.readAsArrayBuffer(speaker)
    // const base64String = btoa(String.fromCharCode(...new Uint8Array(speaker)));
    // console.log("base64String", base64String);
    console.log("flag", flag);
    console.log("abc", abc);
    // console.log("buffer", buffer);
    // console.log("test1", test1);
    // console.log("blob", blob);
    const abc123 = window.URL.createObjectURL(
        new Blob([speaker]),
    );
    console.log("abc123", abc123);

    const audioCorrect = new Audio(flag)

    function readFileDataAsBase64(e) {
        const file = e

        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event: any) => {
                resolve(event.target.result);
            };

            reader.onerror = (err) => {
                reject(err);
            };

            reader.readAsDataURL(file);
        });
    }

    function convertFile(audioFileData, targetFormat) {
        try {
            targetFormat = targetFormat.toLowerCase();
            let reader = new FileReader();
            return new Promise(resolve => {
                reader.onload = function (event: any) {
                    let contentType = 'audio/' + targetFormat;
                    let data = event.target.result.split(',');
                    let b64Data = data[1];
                    let blob = getBlobFromBase64Data(b64Data, contentType);
                    let blobUrl = URL.createObjectURL(blob);
                    let convertedAudio = {
                        name: audioFileData.name.substring(0, audioFileData.name.lastIndexOf(".")),
                        format: targetFormat,
                        data: blobUrl
                    }
                    console.log("convertedAudio: ", convertedAudio);
                    resolve(convertedAudio);
                }
                reader.readAsDataURL(audioFileData);
            });

        } catch (e) {
            console.log("Error occurred while converting : ", e);
        }
    }

    function getBlobFromBase64Data(b64Data, contentType, sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays: any = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    function uuidv4() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    const onHandleChange = async (data: any) => {
        let file: any = await convertFile(data.target.files[0], "wav")
        console.log("data.target.files[0]", data.target.files[0]);
        console.log("file", file);
        console.log("file.data", file.data);
        let blob2 = await fetch(file.data)
            .then(r => r.blob())
            .then(blobFile => new File([blobFile], `${postid}_${file.name}.wav`, { type: "audio/wav" }))
        console.log("blob2", blob2);

        // let file = data.target.files[0];
        // console.log("file", file)
        // let blob = file.slice(0, file.size, file.type);
        // const newFile = new File([blob], `${postid}_${file.name}`, { type: file.type });
        const flag = new File([data.target.files[0]], `${postid}_${data.target.files[0].name}.wav`, { type: data.target.files[0].type })
        console.log("flag", flag);
        let formData = new FormData();
        formData.append("audiofile", blob2);
        // const { data: data2 } = await uploadAudio(formData)
        // console.log("data2", data2);

        // const {data: data2} = await getTranscriptAudio(`${postid}.wav`)
        // setGgSpeech(data2)
    }

    useEffect(() => {
        const getDataAudio = async () => {
            const { data } = await getAudio()
            // const flag2 = await getTextToAudio({ value: "xin chào ngày hôm nay của bạn thế nào" })
            // console.log("flag2", flag2);
            // setSpeaker(flag2.data)
            // const blob: any = b64toBlob(flag2.data, "");
            // const blobUrl = URL.createObjectURL(blob);
            // console.log("blobUrl", blobUrl);

            // const test5 = base64ToArrayBuffer(flag2.data)
            // console.log("test5",test5);
            // const fileAudio = new File([test5], `output123.mp3`, { type: "audio/mp3" })
            // console.log("fileAudio", fileAudio);
            // const fileAudioUrl = URL.createObjectURL(fileAudio);
            // console.log("fileAudioUrl", fileAudioUrl);

            //  new Promise((resolve, reject) => {
            //     const reader = new FileReader();

            //     reader.onload = (event: any) => {
            //         resolve(event.target.result);
            //     };

            //     reader.onerror = (err) => {
            //         reject(err);
            //     };

            //     reader.readAsDataURL(flag2.data);
            // });



            // const abc123 = readFileDataAsBase64(flag2.data)
            // console.log("abc123", abc123);

            // const blobUrl2 = URL.createObjectURL(abc);
            // console.log("blobUrl2", blobUrl2);

            // const audioCorrect = new Audio(abc)

            setDataAudio(data)
            setUrl(`https://storage.googleapis.com/vian_english/${data[0][0].id}`)
            const filter = data[0].find((item: any) => item.id === `0d853290-51a1-9e89-2b96-2fbc410ae9ee.wav`)
            console.log("filter", filter);
            // let blob3 = await fetch(`https://storage.googleapis.com/vian_english/${filter.id}`)
            // .then(r => r.blob())
            // .then(blobFile => new File([blobFile], `${postid}.wav`, { type: "audio/wav" }))
            // console.log("blob3", blob3);
            let blob3 = await getAudioDetail(filter.id)
            console.log("blob3", blob3);
        }
        getDataAudio()

        //    if(speaker){
        //     const blob = b64toBlob(speaker, "audio/mp3");
        //     const blobUrl = URL.createObjectURL(blob);
        //     console.log("blobUrl",blobUrl);
        //    }

    }, [])



    return (
        <div>
            <input type="file" name="imgfile" accept="audio/*" id="imgfile" onChange={onHandleChange} />
            <div className="block">
                <audio id="beep" >

                    <source
                        // src="./mysound.mp3"
                        src={url}
                        // src="https://res.cloudinary.com/vintph16172/video/upload/v1667919067/Luy%E1%BB%87n_n%C3%B3i_Ti%E1%BA%BFng_Anh_qua_phim__Harry_Potter_v%C3%A0_h%C3%B2n_%C4%91%C3%A1_ph%C3%B9_th%E1%BB%A7y_grkiwv.mp3"
                        type="audio/wav"
                    />
                    Your browser does not support the audio tag.
                </audio>

                <audio id="beep" >

                    <source
                        // src="./mysound.mp3"
                        src={speaker}
                        // src="https://res.cloudinary.com/vintph16172/video/upload/v1667919067/Luy%E1%BB%87n_n%C3%B3i_Ti%E1%BA%BFng_Anh_qua_phim__Harry_Potter_v%C3%A0_h%C3%B2n_%C4%91%C3%A1_ph%C3%B9_th%E1%BB%A7y_grkiwv.mp3"
                        type="audio/mp3"
                    />
                    Your browser does not support the audio tag.
                </audio>

                <button onClick={() => { audioCorrect.play() }}>
                    audio
                </button>


                <a href={flag} download target='_blank'>
                    <button> click </button>
                </a>


                <GoogleSpeechAudio value={"How are you doing"} gender={false} />
            </div>
        </div>
    )
}

export default Test3