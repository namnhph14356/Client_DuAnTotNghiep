import React from 'react'
const soundTest = require("../Component/soundDemo.mp3");
type Props = {}

const Sound = (props: Props) => {
  return (  
    <>
        <audio className='audioVocabulary'  controls src={soundTest} >
            {/* <source src="horse.ogg" type="audio/ogg"> */}
        </audio>
    </>
  )
}

export default Sound