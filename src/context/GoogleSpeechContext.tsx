import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const SpeechContext = createContext<any>(null);

const GoogleSpeechContext = (props: any) => {
    const [speechValue,setSpeechValue] = useState<any>(null)
    const [transcript,setTranscript] = useState<string>('')
    const onHandleUpdateTranscript = (value: string)=>{
        setTranscript(value)
    }
     const onHandleUpdateSpeech = (value: any)=>{
        setSpeechValue(value)
    }
  return (
    <SpeechContext.Provider value={{speechValue, onHandleUpdateSpeech, transcript, onHandleUpdateTranscript}}>
       <Outlet />
    </SpeechContext.Provider>
  )
}

export default GoogleSpeechContext