import React from 'react'
// import io from 'socket.io'
import io from 'socket.io-client'

type Props = {}
const socket = io("http://localhost:8000");

const GoogleSpeech = (props: Props) => {


    let bufferSize = 2048,
        AudioContext,
        context,
        processor,
        input,
        globalStream;

    //vars
    let audioElement = document.querySelector('audio'),
        finalWord = false,
        resultText = document.getElementById('ResultText'),
        removeLastSentence = true,
        streamStreaming = false;

    //audioStream constraints
    const constraints = {
        audio: true,
        video: false,
    };

    

    return (
        <div>
            <h1>Google Cloud Speech Node with Socket.io Playground</h1>

            <audio></audio>

            <br />
            <button id="startRecButton" type="button"> Start recording</button>
            <button id="stopRecButton" type="button"> Stop recording</button>
            <div id="recordingStatus">&nbsp;</div>
            <br />
            <div>
                <p id="ResultText">
                    <span className="greyText">No Speech to Text yet </span>

                </p>
            </div>


        </div>
    )
}

export default GoogleSpeech