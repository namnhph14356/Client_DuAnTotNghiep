/* eslint-disable no-restricted-globals */

import React, { useEffect, useState } from 'react'
import { listVocabulary } from '../api/vocabulary';
import { NavLink, Outlet } from 'react-router-dom';

import NavDeatil from '../components/NavDeatil'
import "../css/vocabulary.css";
import { VocabulatyType } from '../types/vocabularyType';
import { useSpeechSynthesis } from "react-speech-kit";
import MenuVocab from '../components/VocabConponent/MenuVocab';

const Vocabulary = () => {
  
  return (
    <>
      <MenuVocab />
      <Outlet />
    </>
  )
}

export default Vocabulary
