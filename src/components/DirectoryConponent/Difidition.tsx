import { Tag } from 'antd'
import React from 'react'

type Props = {}

const Difidition = ({word, meaning}) => {  
  return (
    <>
    <div className="meanings">
      <div className='w-full  border-b-[1px]'>
        {word ?  <span className=''>Meaning of <i className='font-bold'> {word} </i>in English</span> : "" }
    </div>

    <div className='mb-4'>
      <div className='mt-4'>
        <h1 className='text-3xl text-sky-900'>{word}</h1>
        <h4 className=''>{meaning[0] && (
          meaning[0].phonetics[0] && meaning[0].phonetics[0].text ?  meaning[0].phonetics[0].text : meaning[0].phonetics[1].text
        )}</h4>
      </div>
      {/* audio---------------------------- */}
      {meaning[0] && word && (
        <audio className='mt-4'
          style={{ backgroundColor: "#fff", borderRadius: 10 }}
          src={meaning[0].phonetics[0] && meaning[0].phonetics[0].audio}
          controls
        >
          Your browser does not support the audio element.
        </audio>
      )}
      </div>
      {/* audio---------------------------- */}

      {word === "" ? (
        <span className="subTitle text-lg font-bold">Start by typing a word in search</span>
      ) : (
        meaning.map((mean) =>
          // <div></div>
          mean.meanings.map((item) => 
          <>
          <div className='singleMean  p-2 mt-2 border-b-2 border-double border-orange-400'>
            <div className='mt-2 text-lg'>
            {item.partOfSpeech === "noun" ?
             <Tag color="green"  className='text-2xl'>Nouns</Tag>
             : item.partOfSpeech === "verb" ? 
              <Tag color="purple" >Verb</Tag> 
              : item.partOfSpeech === "adjective" ? 
              <Tag color='orange' >Adjective</Tag> 
              : item.partOfSpeech === "adverb" ? 
              <Tag color='blue' >Adverb</Tag> :
              <Tag color='red' >{item.partOfSpeech}</Tag>}
            </div>
            {item.definitions.map((def) => (
              <div
                className="singleMean mt-4 border-b-[1px] border-double border-blue-900"
              >
                <p><span className='font-bold'> Definition: </span> <i>{def.definition}</i></p>
                
                {def.example && (
                  <span>
                    <b>Example :</b> <i>{def.example}</i>
                  </span>
                )}
                {def.synonyms && (
                  <p>
                    <b>Synonyms :</b> {def.synonyms.map((s) => `${s}, `)}
                  </p>
                )}
              </div>
            ))}
            </div>
            </>
          )
        )
      )}
    </div>
    </>
  )
}

export default Difidition