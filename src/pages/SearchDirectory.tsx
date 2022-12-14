import { Input, Space } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Difidition from '../components/DirectoryConponent/Difidition';
import { Helmet } from "react-helmet";

const { Search } = Input;

type Props = {}

const SearchDirectory = (props: Props) => {
  const [word, setWord] = useState("")
  const [meaning, setMeaning] = useState([])
  const [phonetics, setPhonetics] = useState([])
  const onSearch = (text: any) => {
    setWord(text);

  }

  const directory = async () => {
    try {
      const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      //   setPhonetics(data);  
      setMeaning(data.data)
      console.log("data", data.data);


    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    directory();
  }, [word])

  return (
    <div className='w-8/12 m-auto mt-8 min-h-[300px]'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tra từ | Vian English</title>
      </Helmet>
      <div className='w-8/12 m-auto'>
        <Search className='search-directory' style={{ width: "", height: "40px" }} placeholder="Tra từ" onSearch={onSearch} enterButton />
      </div>
      <div className='mt-6 w-10/12 m-auto' >
        <Difidition word={word} meaning={meaning} />
      </div>

    </div>

  )
}

export default SearchDirectory