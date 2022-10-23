import React, { useContext, useEffect, useRef } from 'react'
// import io from 'socket.io'
import io from 'socket.io-client'
import { SpeechContext } from '../../context/GoogleSpeechContext';

// import {} from './recorderWorkletProcessor'

type Props = {}
const socket = io("http://localhost:8000", { transports: ['websocket'] });

const GoogleSpeechSpeaker = (props: Props) => {

    const { speechValue, onHandleUpdateSpeech, onHandleUpdateTranscript } = useContext(SpeechContext)
    // console.log("speechValue ggspeaker", speechValue);


    useEffect(() => {
        //================= CONFIG =================
        // Stream Audio
        let bufferSize = 2048,
            AudioContext,
            context,
            processor,
            input,
            globalStream;

        //vars
        let audioElement = document.querySelector('audio') as HTMLAudioElement,
            finalWord = false,
            resultText: any = document.getElementById('ResultText') as HTMLParagraphElement,
            removeLastSentence = true,
            streamStreaming = false;

        //audioStream constraints
        const constraints = {
            audio: true,
            video: false,
        };

        //================= RECORDING =================

        async function initRecording() {
            socket.emit('startGoogleCloudStream', ''); //init socket Google Speech Connection
            streamStreaming = true;
            AudioContext = window.AudioContext
            context = new AudioContext({
                // if Non-interactive, use 'playback' or 'balanced' // https://developer.mozilla.org/en-US/docs/Web/API/AudioContextLatencyCategory
                latencyHint: 'interactive',
            });

            await context.audioWorklet.addModule('/assets/js2/recorderWorkletProcessor.js')
            context.resume();

            globalStream = await navigator.mediaDevices.getUserMedia(constraints)
            input = context.createMediaStreamSource(globalStream)
            processor = new window.AudioWorkletNode(
                context,
                'recorder.worklet'
            );
            processor.connect(context.destination);
            context.resume()
            input.connect(processor)
            processor.port.onmessage = (e) => {
                const audioData = e.data;
                microphoneProcess(audioData)
            }
        }

        function microphoneProcess(buffer) {
            socket.emit('binaryData', buffer);
        }

        //================= INTERFACE =================
        var startButton = document.getElementById('startRecButton') as HTMLButtonElement;
        startButton.addEventListener('click', startRecording);

        var endButton = document.getElementById('stopRecButton') as HTMLButtonElement;
        // endButton.addEventListener('click', stopRecording);
        // endButton.disabled = true;

        var recordingStatus = document.getElementById('recordingStatus') as HTMLDivElement;

        function startRecording() {
            startButton.disabled = true;
            startButton.className = "text-white !h-10 !w-10 !bg-red-600 !rounded-full scale-105 "
            // endButton.disabled = false;
            // recordingStatus.style.visibility = 'visible';
            initRecording();
            setTimeout(() => {
                stopRecording()
            }, 5000)

        }

        function stopRecording() {
            // waited for FinalWord
            startButton.disabled = false;
            startButton.className = "text-white !h-10 !w-10 !bg-blue-600 !rounded-full "
            // endButton.disabled = true;
            // recordingStatus.style.visibility = 'hidden';
            streamStreaming = false;
            socket.emit('endGoogleCloudStream', '');

            let track = globalStream.getTracks()[0];
            track.stop();

            input.disconnect(processor);
            processor.disconnect(context.destination);
            context.close().then(function () {
                input = null;
                processor = null;
                context = null;
                AudioContext = null;
                startButton.disabled = false;
            });

        }

        //================= SOCKET IO =================
        socket.on('connect', () => {
            // console.log('connected to socket');
            socket.emit('join', 'Server Connected to Client');
        });

        socket.on('messages', function (data) {
            // console.log(data);
        });

        socket.on('speechData', function (data) {
            // console.log(data.results[0].alternatives[0].transcript);
            var dataFinal = undefined || data.results[0].isFinal;
            // console.log("dataFinal", dataFinal);
            // console.log("data", data);

            if (dataFinal === false) {
                // console.log(resultText.lastElementChild);
                if (removeLastSentence) {
                    // resultText.lastElementChild.remove();
                }
                removeLastSentence = true;

                // console.log("dataFinal false", dataFinal);
            } else if (dataFinal === true) {
                // resultText.lastElementChild.remove();

 
                // console.log("dataFinal true", dataFinal);
                // console.log("data final", data);
                onHandleUpdateSpeech(data)
                onHandleUpdateTranscript(data.results[0].alternatives[0].transcript.toLowerCase())
                // console.log("Google Speech sent 'final' Sentence.");

                finalWord = true;
                // endButton.disabled = false;

                removeLastSentence = false;
            }
            console.log("speechValue ggspeaker", speechValue);
        });



        window.onbeforeunload = function () {
            if (streamStreaming) {
                socket.emit('endGoogleCloudStream', '');
            }
        };

        //================= SANTAS HELPERS =================

        // sampleRateHertz 16000 //saved sound is awefull
        function convertFloat32ToInt16(buffer) {
            let l = buffer.length;
            let buf = new Int16Array(l / 3);

            while (l--) {
                if (l % 3 == 0) {
                    buf[l / 3] = buffer[l] * 0xffff;
                }
            }
            return buf.buffer;
        }

        function capitalize(s) {
            if (s.length < 1) {
                return s;
            }
            return s.charAt(0).toUpperCase() + s.slice(1);
        }




    }, [])


    return (
        <div>
            <audio  ></audio>
            <button className='!h-10 !w-10 !bg-blue-600 !rounded-full !text-white ' id="startRecButton" type="button" >
                <i className="fa-solid fa-volume-high"></i>
            </button>
            {/* 
            <button id="startRecButton" type="button"  > Start recording</button>
            <button id="stopRecButton" type="button"> Stop recording</button> */}
            {/* <div id="recordingStatus">&nbsp;</div> */}



        </div>
    )
}

export default GoogleSpeechSpeaker