/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef } from 'react'
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
import toWav from "audiobuffer-to-wav";
import axios from "axios";

const appId = '8048b4dd-a8e2-4547-88d2-0405420e90f1';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);


const ExeSpeak = () => {
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable
    } = useSpeechRecognition();
    const startListening = () => {
        SpeechRecognition.startListening()
        setCheck(false)
    }
    const [value, setValue] = useState('Table');
    const [check, setCheck] = useState(false);
    const [result, setResult] = useState("");
    const audioCorrect = new Audio("../audio/Quiz-correct-sound-with-applause.mp3")
    const audioWrong = new Audio("../audio/Fail-sound-effect-2.mp3")

    // transcript.charAt(0).toUpperCase() + transcript.slice(1).toLowerCase()

    // function titleCase(string) {
    //     return string[0].toUpperCase() + string.slice(1).toLowerCase();
    // }
    // titleCase(transcript)

    const capitalizeFirstLowercaseRest = str => {
        return str.toUpperCase()
        // return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    // const str = transcript
    // capitalizeFirstLowercaseRest(value)
    console.log(value);

    // console.log(capitalizeFirstLowercaseRest(value));


    const { cancel, speak, speaking, supported, voices, pause, resume } = useSpeechSynthesis();
    // console.log('voices', voices);
    // {name:"Vietnamese Female",flag:"vi",gender:"f",lang:"vi-VN",voiceIDs:[480,429,405]}
    // {name:"Vietnamese Male",flag:"vi",gender:"m",lang:"vi-VN",voiceIDs:[146]}

    console.log(transcript);
    console.log(listening);
    // console.log(browserSupportsSpeechRecognition);
    if (!browserSupportsSpeechRecognition) {
        alert("Browser doesn't support speech recognition.")
    }
    if (!isMicrophoneAvailable) {
        alert("Browser doesn't support speech recognition when Mic is Off")
    }

    //-----------------------------------UPLOAD---

    const recordBtn = useRef<HTMLButtonElement>(null);
    const finishBtn = useRef<HTMLButtonElement>(null);
    const playBtn = useRef<HTMLButtonElement>(null);
    const downLoad = useRef<HTMLAnchorElement>(null);
    

    let startTime;
    let stoptime;

    const hanldeOnClick = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    noiseSuppression: true,
                    echoCancellation: true
                }
            });

            const audioCtx = new AudioContext();
            const source = audioCtx.createBufferSource();

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: "audio/webm"
            });

            const chunks: Blob[] = [];

            mediaRecorder.start();
            // recordBtn.current.addEventListener("click", () => {
            // });

            finishBtn.current!.addEventListener("click", () => {
                mediaRecorder.stop();
            });

            playBtn.current!.addEventListener("click", () => {
                source.start();
            });

            mediaRecorder.onstart = (e) => {
                startTime = e.timeStamp;
            };

            mediaRecorder.onstop = (e) => {
                console.log(e.timeStamp - startTime);

                const blob = new Blob(chunks);

                blob.arrayBuffer().then(async (arrayBuffer) => {
                    audioCtx.decodeAudioData(arrayBuffer, async (buffer) => {
                        const wav = toWav(buffer);
                        console.log("wav", wav);
                        const wavBlob = new Blob([wav], { type: "audio/wav" });


                        const CLOUDINARY_PRESET = "ypn4yccr";
                        const CLOUDINARY_API_URL =
                            "https://api.cloudinary.com/v1_1/vintph16172/video/upload"
                        const formData = new FormData();
                        formData.append("file", wavBlob);
                        formData.append("upload_preset", CLOUDINARY_PRESET);
                        formData.append("resource_type", "video");
                        const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
                            headers: {
                                "Content-Type": "application/form-data"
                            }
                        });

                        downLoad.current!.href = URL.createObjectURL(wavBlob);
                        downLoad.current!.download = "example.wav";

                        source.buffer = buffer;
                        source.connect(audioCtx.destination);
                    });
                });
            };

            mediaRecorder.ondataavailable = (e) => {
                console.log(e.data);
                chunks.push(e.data);
            };
        } catch (error) {
            console.log(error.message);
        }
        //-----------------------------------



    }

    return (
        <div>
            <div>
                <section className="w-10/12 mx-auto">
                    <div className="mt-[10px]">
                        <div>
                            <a className='return__learning'>
                                <i className="fa-solid fa-xmark"></i>
                            </a>
                        </div>
                    </div>
                </section>
                <section className="w-6/12 mx-auto py-[50px]">
                    <div className="grid md:grid-cols-3 justify-items-center">
                        <div className="w-[300px]">
                            <img src="../image/image 24.png" />
                        </div>
                        <div className="col-span-2">
                            <div className="flex">
                                <h1 className="font-bold md:text-2xl text-lg md:px-[20px] px-[10px]">Table</h1>
                                <button onClick={() => speak({ text: value, voice: voices[4] })}>
                                    <img className="md:w-[30px] w-[20px]" src="../image/image 25.png" />
                                </button>
                            </div>
                            <div>
                                <p className="text-xl px-[30px] py-[20px]">/ˈteibl/</p>
                            </div>
                            <div className="w-[40px] mx-[30px]">
                                <button

                                    onTouchStart={startListening}
                                    onMouseDown={startListening}
                                    onTouchEnd={SpeechRecognition.stopListening}
                                    onMouseUp={SpeechRecognition.stopListening}
                                >
                                    <img src="../image/image 26.png" />
                                </button>
                            </div>
                            <div>
                                <p className="text-lg md:px-[8px] md:py-[20px]">Nhấn để nói</p>
                                <p>{transcript}</p>
                                {/* <div>
                                    <button ref={recordBtn} onClick={hanldeOnClick}>
                                        Record
                                    </button>
                                    <button ref={finishBtn}>Finish</button>
                                    <button ref={playBtn}>Play</button>
                                    <a id="download" ref={downLoad}>
                                        download
                                    </a>
                                </div> */}
                            </div>
                            <div>

                                <button className=" border-2 border-[#CCCCCC] px-[30px] py-[5px] font-bold text-lg rounded-md float-right cursor-pointer transition duration-700" onClick={() => {
                                    setCheck(true)
                                    transcript === value.toUpperCase() ? audioCorrect.play() : audioWrong.play()
                                }}>
                                    Kiểm tra
                                </button>
                            </div>
                        </div>
                    </div>
                    {check === true && transcript === value.toUpperCase() ?
                        <div className=" box__result__speak">
                            <div className="bg-[#D6EAF8] px-[15px] md:py-[10px] rounded-md">
                                <p className="text-[#2E86C1] font-bold">Đúng rồi !</p>
                                <p className="text-[#2E86C1] md:py-[10px] font-bold">Dịch nghĩa: <span>Mua</span></p>
                                <button className="text-white w-full py-[10px] rounded-md bg-[#5DADE2] mb-[20px] font-bold">Tiếp tục</button>
                            </div>
                        </div>
                        : ""}

                    {check === true && transcript !== value.toUpperCase() ?
                        <div className=" box__result__speak">
                            <div className="bg-[#F9EBEA] px-[15px] md:py-[10px] rounded-md">
                                <p className="font-bold text-[#C0392B]">Gần đúng rồi !</p>
                                <p className=" md:py-[5px] text-[#C0392B] font-bold">Dịch nghĩa: <span>Mua</span></p>
                                <button className="text-white w-full py-[10px] rounded-md bg-[#C0392B] mb-[20px] font-bold">Tiếp tục</button>
                            </div>
                        </div>
                        : ""}




                </section>
                <section className="w-10/12 mx-auto py-[100px]">
                    <div className="grid md:grid-cols-3 justify-items-center">
                        <div>
                            <img src="../image/image 24.png" />
                        </div>
                        <div className="col-span-2 ">
                            <div className="flex">
                                <h1 className="font-bold text-2xl px-[20px]">Buy</h1>
                                <img className="w-[30px]" src="../image/image 25.png" />
                            </div>
                            <div>
                                <p className="text-xl px-[30px] py-[20px]">/bai/</p>
                            </div>
                            <div className="w-[40px] mx-[30px]">
                                <img src="../image/image 26.png" />
                            </div>
                            <div>
                                <p className="text-lg px-[8px] py-[30px]">nhấn để nói</p>
                            </div>
                            <div>
                                <button className="px-[30px] py-[15px] shadow-lg font-bold border-2 border-[#CCCCCC] rounded-xl">Kiểm tra</button>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-6/12 w-10/12 mx-auto py-[10px] md:float-right">
                        <div className="bg-[#FFDFE0] px-[15px] md:py-[10px] rounded-md">
                            <p className="font-bold">Gần đúng rồi !</p>
                            <p className=" md:py-[10px] font-bold">Dịch nghĩa: <span>Mua</span></p>
                            <button className="text-white w-full py-[10px] rounded-md bg-[#C0392B] mb-[20px] font-bold">Tiếp tục</button>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default ExeSpeak