/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-globals */
import '../../css/conversation.css'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import { getListenWriteById, getListenWriteByIdCategory } from '../../features/Slide/listenWrite/ListenWriteSlice';
import '../../css/writeAndListen.css'
import { getListQuestionListenWriteById } from '../../api/questionListenWrite';
import { listAnswerListenWriteById } from '../../api/answerListenWrite';
import { ListenWriteType, QuestionAnswerListenWriteType } from '../../types/listenWrite';
import { Collapse, message, Modal } from 'antd';
import Loading from '../../components/Loading';
import { addHistory } from '../../api/history';
import { RootState } from '../../app/store';
import { UserType } from '../../types/user';
import { LearningProgressType } from '../../types/learningProgress';
import { editLearningProgressSlice } from '../../features/Slide/learningProgress/LearningProgress';
import { useAppDispatch } from '../../app/hooks';
import { UserQuizType } from '../../types/userQuiz';
import { addUserQuizSlide } from '../../features/Slide/userQuiz/UserQuiz';
import { detailLearningProgressByUser } from '../../api/learningProgress';

const questionQuiz = [
  { id: 1, name: 'What was Dave suffering from ?' },
  { id: 2, name: 'What does Eric advise Dave to do ?' },
]
const answerQuiz = [
  { id: "1", answer: 'He had a headache.', quiz: "1", isCorrect: false },
  { id: "2", answer: 'He was ill.', quiz: "1", isCorrect: false },
  { id: "3", answer: 'He stayed up late.', quiz: "1", isCorrect: false },
  { id: "4", answer: 'He didn’t sleep a wink in 3 days.', quiz: "1", isCorrect: true },

  { id: "5", answer: 'See a doctor', quiz: "2", isCorrect: false },
  { id: "6", answer: 'Go to sleep in 3 days', quiz: "2", isCorrect: true },
  { id: "7", answer: 'See a friend', quiz: "2", isCorrect: false },
  { id: "8", answer: 'Go to the beauty salon', quiz: "2", isCorrect: false },
]

const listenWriteTest = {
  "response": {
    "results": [
      {
        "alternatives": [
          {
            "transcript": "another year ___",
            "confidence": 0.8507950901985168,
            "words": [
              {
                "startTime": {
                  "seconds": "12",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "13",
                  "nanos": 100000000
                },
                "word": "another"
              },
              {
                "startTime": {
                  "seconds": "13",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "13",
                  "nanos": 400000000
                },
                "word": "year"
              },
              {
                "startTime": {
                  "seconds": "13",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "14",
                  "nanos": 300000000
                },
                "word": "gone"
              }
            ]
          }
        ],
        "resultEndTime": {
          "seconds": "15",
          "nanos": 10000000
        },
        "languageCode": "en-us"
      },
      {
        "alternatives": [
          {
            "transcript": " and ___ was I understand it the house cup ___ awarding and the points standard Us in fourth place Gryffindor with 312 V",
            "confidence": 0.7790684103965759,
            "words": [
              {
                "startTime": {
                  "seconds": "15",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "16",
                  "nanos": 100000000
                },
                "word": "and"
              },
              {
                "startTime": {
                  "seconds": "16",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "16",
                  "nanos": 200000000
                },
                "word": "I"
              },
              {
                "startTime": {
                  "seconds": "16",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "16",
                  "nanos": 400000000
                },
                "word": "was"
              },
              {
                "startTime": {
                  "seconds": "16",
                  "nanos": 400000000
                },
                "endTime": {
                  "seconds": "16",
                  "nanos": 500000000
                },
                "word": "I"
              },
              {
                "startTime": {
                  "seconds": "16",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "17",
                  "nanos": 200000000
                },
                "word": "understand"
              },
              {
                "startTime": {
                  "seconds": "17",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "17",
                  "nanos": 400000000
                },
                "word": "it"
              },
              {
                "startTime": {
                  "seconds": "17",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "18"
                },
                "word": "the"
              },
              {
                "startTime": {
                  "seconds": "18"
                },
                "endTime": {
                  "seconds": "18",
                  "nanos": 300000000
                },
                "word": "house"
              },
              {
                "startTime": {
                  "seconds": "18",
                  "nanos": 300000000
                },
                "endTime": {
                  "seconds": "18",
                  "nanos": 800000000
                },
                "word": "cup"
              },
              {
                "startTime": {
                  "seconds": "18",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "19",
                  "nanos": 200000000
                },
                "word": "needs"
              },
              {
                "startTime": {
                  "seconds": "19",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "20",
                  "nanos": 300000000
                },
                "word": "awarding"
              },
              {
                "startTime": {
                  "seconds": "20",
                  "nanos": 300000000
                },
                "endTime": {
                  "seconds": "20",
                  "nanos": 400000000
                },
                "word": "and"
              },
              {
                "startTime": {
                  "seconds": "20",
                  "nanos": 400000000
                },
                "endTime": {
                  "seconds": "20",
                  "nanos": 500000000
                },
                "word": "the"
              },
              {
                "startTime": {
                  "seconds": "20",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "21",
                  "nanos": 100000000
                },
                "word": "points"
              },
              {
                "startTime": {
                  "seconds": "21",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "22",
                  "nanos": 100000000
                },
                "word": "standard"
              },
              {
                "startTime": {
                  "seconds": "22",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "22",
                  "nanos": 500000000
                },
                "word": "Us"
              },
              {
                "startTime": {
                  "seconds": "23",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "23",
                  "nanos": 700000000
                },
                "word": "in"
              },
              {
                "startTime": {
                  "seconds": "23",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "24"
                },
                "word": "fourth"
              },
              {
                "startTime": {
                  "seconds": "24"
                },
                "endTime": {
                  "seconds": "24",
                  "nanos": 500000000
                },
                "word": "place"
              },
              {
                "startTime": {
                  "seconds": "25",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "26"
                },
                "word": "Gryffindor"
              },
              {
                "startTime": {
                  "seconds": "26"
                },
                "endTime": {
                  "seconds": "26",
                  "nanos": 200000000
                },
                "word": "with"
              },
              {
                "startTime": {
                  "seconds": "26",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "27",
                  "nanos": 300000000
                },
                "word": "312"
              },
              {
                "startTime": {
                  "seconds": "27",
                  "nanos": 300000000
                },
                "endTime": {
                  "seconds": "27",
                  "nanos": 700000000
                },
                "word": "V"
              }
            ]
          }
        ],
        "resultEndTime": {
          "seconds": "29",
          "nanos": 10000000
        },
        "languageCode": "en-us"
      },
      {
        "alternatives": [
          {
            "transcript": " third-place Hufflepuff with 352 points in second place off Ravenclaw with 426 points off the first place with 472 points Slytherin house off yes yes well done well done slit however recent events must be taken into account recent events must be taken into account recent events must be taken into account",
            "confidence": 0.7179518342018127,
            "words": [
              {
                "startTime": {
                  "seconds": "31",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "33",
                  "nanos": 100000000
                },
                "word": "third-place"
              },
              {
                "startTime": {
                  "seconds": "33",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "34"
                },
                "word": "Hufflepuff"
              },
              {
                "startTime": {
                  "seconds": "34",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "35",
                  "nanos": 100000000
                },
                "word": "with"
              },
              {
                "startTime": {
                  "seconds": "35",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "36",
                  "nanos": 300000000
                },
                "word": "352"
              },
              {
                "startTime": {
                  "seconds": "36",
                  "nanos": 300000000
                },
                "endTime": {
                  "seconds": "36",
                  "nanos": 800000000
                },
                "word": "points"
              },
              {
                "startTime": {
                  "seconds": "42",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "42",
                  "nanos": 200000000
                },
                "word": "in"
              },
              {
                "startTime": {
                  "seconds": "42",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "42",
                  "nanos": 600000000
                },
                "word": "second"
              },
              {
                "startTime": {
                  "seconds": "42",
                  "nanos": 600000000
                },
                "endTime": {
                  "seconds": "42",
                  "nanos": 900000000
                },
                "word": "place"
              },
              {
                "startTime": {
                  "seconds": "42",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "43",
                  "nanos": 100000000
                },
                "word": "off"
              },
              {
                "startTime": {
                  "seconds": "44",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "45",
                  "nanos": 800000000
                },
                "word": "Ravenclaw"
              },
              {
                "startTime": {
                  "seconds": "45",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "46",
                  "nanos": 100000000
                },
                "word": "with"
              },
              {
                "startTime": {
                  "seconds": "46",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "47",
                  "nanos": 100000000
                },
                "word": "426"
              },
              {
                "startTime": {
                  "seconds": "48",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "49",
                  "nanos": 300000000
                },
                "word": "points"
              },
              {
                "startTime": {
                  "seconds": "54",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "55",
                  "nanos": 100000000
                },
                "word": "off"
              },
              {
                "startTime": {
                  "seconds": "55",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "55",
                  "nanos": 200000000
                },
                "word": "the"
              },
              {
                "startTime": {
                  "seconds": "55",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "55",
                  "nanos": 600000000
                },
                "word": "first"
              },
              {
                "startTime": {
                  "seconds": "55",
                  "nanos": 600000000
                },
                "endTime": {
                  "seconds": "56",
                  "nanos": 600000000
                },
                "word": "place"
              },
              {
                "startTime": {
                  "seconds": "56",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "56",
                  "nanos": 900000000
                },
                "word": "with"
              },
              {
                "startTime": {
                  "seconds": "56",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "58",
                  "nanos": 300000000
                },
                "word": "472"
              },
              {
                "startTime": {
                  "seconds": "58",
                  "nanos": 300000000
                },
                "endTime": {
                  "seconds": "59",
                  "nanos": 600000000
                },
                "word": "points"
              },
              {
                "startTime": {
                  "seconds": "59",
                  "nanos": 600000000
                },
                "endTime": {
                  "seconds": "60",
                  "nanos": 500000000
                },
                "word": "Slytherin"
              },
              {
                "startTime": {
                  "seconds": "60",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "60",
                  "nanos": 900000000
                },
                "word": "house"
              },
              {
                "startTime": {
                  "seconds": "66",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "67",
                  "nanos": 100000000
                },
                "word": "off"
              },
              {
                "startTime": {
                  "seconds": "73",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "74",
                  "nanos": 100000000
                },
                "word": "yes"
              },
              {
                "startTime": {
                  "seconds": "74",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "74",
                  "nanos": 500000000
                },
                "word": "yes"
              },
              {
                "startTime": {
                  "seconds": "74",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "74",
                  "nanos": 800000000
                },
                "word": "well"
              },
              {
                "startTime": {
                  "seconds": "74",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "75",
                  "nanos": 200000000
                },
                "word": "done"
              },
              {
                "startTime": {
                  "seconds": "75",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "76",
                  "nanos": 100000000
                },
                "word": "well"
              },
              {
                "startTime": {
                  "seconds": "76",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "76",
                  "nanos": 400000000
                },
                "word": "done"
              },
              {
                "startTime": {
                  "seconds": "76",
                  "nanos": 400000000
                },
                "endTime": {
                  "seconds": "76",
                  "nanos": 600000000
                },
                "word": "slit"
              },
              {
                "startTime": {
                  "seconds": "76",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "77",
                  "nanos": 500000000
                },
                "word": "however"
              },
              {
                "startTime": {
                  "seconds": "78",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "78",
                  "nanos": 700000000
                },
                "word": "recent"
              },
              {
                "startTime": {
                  "seconds": "78",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "79",
                  "nanos": 100000000
                },
                "word": "events"
              },
              {
                "startTime": {
                  "seconds": "79",
                  "nanos": 400000000
                },
                "endTime": {
                  "seconds": "79",
                  "nanos": 900000000
                },
                "word": "must"
              },
              {
                "startTime": {
                  "seconds": "79",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "80"
                },
                "word": "be"
              },
              {
                "startTime": {
                  "seconds": "80"
                },
                "endTime": {
                  "seconds": "80",
                  "nanos": 500000000
                },
                "word": "taken"
              },
              {
                "startTime": {
                  "seconds": "80",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "80",
                  "nanos": 900000000
                },
                "word": "into"
              },
              {
                "startTime": {
                  "seconds": "80",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "81",
                  "nanos": 500000000
                },
                "word": "account"
              },
              {
                "startTime": {
                  "seconds": "81",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "82",
                  "nanos": 300000000
                },
                "word": "recent"
              },
              {
                "startTime": {
                  "seconds": "82",
                  "nanos": 300000000
                },
                "endTime": {
                  "seconds": "83"
                },
                "word": "events"
              },
              {
                "startTime": {
                  "seconds": "83"
                },
                "endTime": {
                  "seconds": "83",
                  "nanos": 500000000
                },
                "word": "must"
              },
              {
                "startTime": {
                  "seconds": "83",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "83",
                  "nanos": 600000000
                },
                "word": "be"
              },
              {
                "startTime": {
                  "seconds": "83",
                  "nanos": 600000000
                },
                "endTime": {
                  "seconds": "84",
                  "nanos": 100000000
                },
                "word": "taken"
              },
              {
                "startTime": {
                  "seconds": "84",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "84",
                  "nanos": 500000000
                },
                "word": "into"
              },
              {
                "startTime": {
                  "seconds": "84",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "85",
                  "nanos": 100000000
                },
                "word": "account"
              },
              {
                "startTime": {
                  "seconds": "85",
                  "nanos": 400000000
                },
                "endTime": {
                  "seconds": "85",
                  "nanos": 900000000
                },
                "word": "recent"
              },
              {
                "startTime": {
                  "seconds": "86"
                },
                "endTime": {
                  "seconds": "86",
                  "nanos": 600000000
                },
                "word": "events"
              },
              {
                "startTime": {
                  "seconds": "86",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "87",
                  "nanos": 100000000
                },
                "word": "must"
              },
              {
                "startTime": {
                  "seconds": "87",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "87",
                  "nanos": 300000000
                },
                "word": "be"
              },
              {
                "startTime": {
                  "seconds": "87",
                  "nanos": 300000000
                },
                "endTime": {
                  "seconds": "87",
                  "nanos": 800000000
                },
                "word": "taken"
              },
              {
                "startTime": {
                  "seconds": "87",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "88",
                  "nanos": 100000000
                },
                "word": "into"
              },
              {
                "startTime": {
                  "seconds": "88",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "88",
                  "nanos": 700000000
                },
                "word": "account"
              }
            ]
          }
        ],
        "resultEndTime": {
          "seconds": "89",
          "nanos": 310000000
        },
        "languageCode": "en-us"
      },
      {
        "alternatives": [
          {
            "transcript": " I might have a few last-minute points to award",
            "confidence": 0.864876389503479,
            "words": [
              {
                "startTime": {
                  "seconds": "89",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "89",
                  "nanos": 800000000
                },
                "word": "I"
              },
              {
                "startTime": {
                  "seconds": "89",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "90"
                },
                "word": "might"
              },
              {
                "startTime": {
                  "seconds": "90"
                },
                "endTime": {
                  "seconds": "90",
                  "nanos": 200000000
                },
                "word": "have"
              },
              {
                "startTime": {
                  "seconds": "90",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "90",
                  "nanos": 200000000
                },
                "word": "a"
              },
              {
                "startTime": {
                  "seconds": "90",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "91",
                  "nanos": 500000000
                },
                "word": "few"
              },
              {
                "startTime": {
                  "seconds": "91",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "92",
                  "nanos": 300000000
                },
                "word": "last-minute"
              },
              {
                "startTime": {
                  "seconds": "92",
                  "nanos": 300000000
                },
                "endTime": {
                  "seconds": "92",
                  "nanos": 700000000
                },
                "word": "points"
              },
              {
                "startTime": {
                  "seconds": "92",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "92",
                  "nanos": 800000000
                },
                "word": "to"
              },
              {
                "startTime": {
                  "seconds": "92",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "93",
                  "nanos": 500000000
                },
                "word": "award"
              }
            ]
          }
        ],
        "resultEndTime": {
          "seconds": "94",
          "nanos": 60000000
        },
        "languageCode": "en-us"
      },
      {
        "alternatives": [
          {
            "transcript": " to miss Hermione Granger the cool use of intellect While others were in grave peril",
            "confidence": 0.8690311312675476,
            "words": [
              {
                "startTime": {
                  "seconds": "95",
                  "nanos": 400000000
                },
                "endTime": {
                  "seconds": "95",
                  "nanos": 600000000
                },
                "word": "to"
              },
              {
                "startTime": {
                  "seconds": "95",
                  "nanos": 600000000
                },
                "endTime": {
                  "seconds": "96",
                  "nanos": 100000000
                },
                "word": "miss"
              },
              {
                "startTime": {
                  "seconds": "96",
                  "nanos": 600000000
                },
                "endTime": {
                  "seconds": "97",
                  "nanos": 100000000
                },
                "word": "Hermione"
              },
              {
                "startTime": {
                  "seconds": "97",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "97",
                  "nanos": 800000000
                },
                "word": "Granger"
              },
              {
                "startTime": {
                  "seconds": "98",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "98",
                  "nanos": 700000000
                },
                "word": "the"
              },
              {
                "startTime": {
                  "seconds": "98",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "99",
                  "nanos": 100000000
                },
                "word": "cool"
              },
              {
                "startTime": {
                  "seconds": "99",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "99",
                  "nanos": 300000000
                },
                "word": "use"
              },
              {
                "startTime": {
                  "seconds": "99",
                  "nanos": 300000000
                },
                "endTime": {
                  "seconds": "99",
                  "nanos": 500000000
                },
                "word": "of"
              },
              {
                "startTime": {
                  "seconds": "99",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "100",
                  "nanos": 200000000
                },
                "word": "intellect"
              },
              {
                "startTime": {
                  "seconds": "101",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "101",
                  "nanos": 400000000
                },
                "word": "While"
              },
              {
                "startTime": {
                  "seconds": "101",
                  "nanos": 400000000
                },
                "endTime": {
                  "seconds": "102"
                },
                "word": "others"
              },
              {
                "startTime": {
                  "seconds": "102"
                },
                "endTime": {
                  "seconds": "102",
                  "nanos": 200000000
                },
                "word": "were"
              },
              {
                "startTime": {
                  "seconds": "102",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "102",
                  "nanos": 400000000
                },
                "word": "in"
              },
              {
                "startTime": {
                  "seconds": "102",
                  "nanos": 400000000
                },
                "endTime": {
                  "seconds": "102",
                  "nanos": 800000000
                },
                "word": "grave"
              },
              {
                "startTime": {
                  "seconds": "102",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "103",
                  "nanos": 700000000
                },
                "word": "peril"
              }
            ]
          }
        ],
        "resultEndTime": {
          "seconds": "104",
          "nanos": 130000000
        },
        "languageCode": "en-us"
      },
      {
        "alternatives": [
          {
            "transcript": " fifty points",
            "confidence": 0.8474520444869995,
            "words": [
              {
                "startTime": {
                  "seconds": "104",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "105",
                  "nanos": 100000000
                },
                "word": "fifty"
              },
              {
                "startTime": {
                  "seconds": "105",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "105",
                  "nanos": 600000000
                },
                "word": "points"
              }
            ]
          }
        ],
        "resultEndTime": {
          "seconds": "106",
          "nanos": 400000000
        },
        "languageCode": "en-us"
      },
      {
        "alternatives": [
          {
            "transcript": " second choice reasoning for the best play game of chess that Hogwarts have seen these many years fifty points off",
            "confidence": 0.6908962726593018,
            "words": [
              {
                "startTime": {
                  "seconds": "116",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "117",
                  "nanos": 600000000
                },
                "word": "second"
              },
              {
                "startTime": {
                  "seconds": "118",
                  "nanos": 600000000
                },
                "endTime": {
                  "seconds": "118",
                  "nanos": 800000000
                },
                "word": "choice"
              },
              {
                "startTime": {
                  "seconds": "119",
                  "nanos": 400000000
                },
                "endTime": {
                  "seconds": "120"
                },
                "word": "reasoning"
              },
              {
                "startTime": {
                  "seconds": "120",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "121",
                  "nanos": 100000000
                },
                "word": "for"
              },
              {
                "startTime": {
                  "seconds": "121",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "121",
                  "nanos": 200000000
                },
                "word": "the"
              },
              {
                "startTime": {
                  "seconds": "121",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "121",
                  "nanos": 500000000
                },
                "word": "best"
              },
              {
                "startTime": {
                  "seconds": "121",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "121",
                  "nanos": 900000000
                },
                "word": "play"
              },
              {
                "startTime": {
                  "seconds": "121",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "122",
                  "nanos": 200000000
                },
                "word": "game"
              },
              {
                "startTime": {
                  "seconds": "122",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "122",
                  "nanos": 400000000
                },
                "word": "of"
              },
              {
                "startTime": {
                  "seconds": "122",
                  "nanos": 400000000
                },
                "endTime": {
                  "seconds": "123"
                },
                "word": "chess"
              },
              {
                "startTime": {
                  "seconds": "123",
                  "nanos": 300000000
                },
                "endTime": {
                  "seconds": "123",
                  "nanos": 500000000
                },
                "word": "that"
              },
              {
                "startTime": {
                  "seconds": "123",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "124",
                  "nanos": 500000000
                },
                "word": "Hogwarts"
              },
              {
                "startTime": {
                  "seconds": "124",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "124",
                  "nanos": 700000000
                },
                "word": "have"
              },
              {
                "startTime": {
                  "seconds": "124",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "125",
                  "nanos": 100000000
                },
                "word": "seen"
              },
              {
                "startTime": {
                  "seconds": "125",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "125",
                  "nanos": 500000000
                },
                "word": "these"
              },
              {
                "startTime": {
                  "seconds": "125",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "127",
                  "nanos": 700000000
                },
                "word": "many"
              },
              {
                "startTime": {
                  "seconds": "127",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "127",
                  "nanos": 700000000
                },
                "word": "years"
              },
              {
                "startTime": {
                  "seconds": "127",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "128",
                  "nanos": 100000000
                },
                "word": "fifty"
              },
              {
                "startTime": {
                  "seconds": "128",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "128",
                  "nanos": 600000000
                },
                "word": "points"
              },
              {
                "startTime": {
                  "seconds": "130",
                  "nanos": 600000000
                },
                "endTime": {
                  "seconds": "130",
                  "nanos": 800000000
                },
                "word": "off"
              }
            ]
          }
        ],
        "resultEndTime": {
          "seconds": "135"
        },
        "languageCode": "en-us"
      },
      {
        "alternatives": [
          {
            "transcript": " to mister Harry Potter for pure love and outstanding courage I award Gryffindor House am 60 points and what type of what type of Taylor and I'm finally it takes a great deal of Bravery to stand up to your enemies but a great deal more to stand up to your friends your friends stand up to your friends I award ten points to Neville Longbottom",
            "confidence": 0.7065150141716003,
            "words": [
              {
                "startTime": {
                  "seconds": "135",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "136"
                },
                "word": "to"
              },
              {
                "startTime": {
                  "seconds": "136"
                },
                "endTime": {
                  "seconds": "136",
                  "nanos": 600000000
                },
                "word": "mister"
              },
              {
                "startTime": {
                  "seconds": "136",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "137",
                  "nanos": 300000000
                },
                "word": "Harry"
              },
              {
                "startTime": {
                  "seconds": "137",
                  "nanos": 300000000
                },
                "endTime": {
                  "seconds": "137",
                  "nanos": 900000000
                },
                "word": "Potter"
              },
              {
                "startTime": {
                  "seconds": "138",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "139",
                  "nanos": 100000000
                },
                "word": "for"
              },
              {
                "startTime": {
                  "seconds": "139",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "139",
                  "nanos": 600000000
                },
                "word": "pure"
              },
              {
                "startTime": {
                  "seconds": "139",
                  "nanos": 600000000
                },
                "endTime": {
                  "seconds": "140",
                  "nanos": 500000000
                },
                "word": "love"
              },
              {
                "startTime": {
                  "seconds": "140",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "140",
                  "nanos": 900000000
                },
                "word": "and"
              },
              {
                "startTime": {
                  "seconds": "141"
                },
                "endTime": {
                  "seconds": "142",
                  "nanos": 400000000
                },
                "word": "outstanding"
              },
              {
                "startTime": {
                  "seconds": "142",
                  "nanos": 400000000
                },
                "endTime": {
                  "seconds": "143"
                },
                "word": "courage"
              },
              {
                "startTime": {
                  "seconds": "143",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "143",
                  "nanos": 900000000
                },
                "word": "I"
              },
              {
                "startTime": {
                  "seconds": "143",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "144",
                  "nanos": 800000000
                },
                "word": "award"
              },
              {
                "startTime": {
                  "seconds": "144",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "145",
                  "nanos": 500000000
                },
                "word": "Gryffindor"
              },
              {
                "startTime": {
                  "seconds": "145",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "146"
                },
                "word": "House"
              },
              {
                "startTime": {
                  "seconds": "146",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "147",
                  "nanos": 100000000
                },
                "word": "am"
              },
              {
                "startTime": {
                  "seconds": "147",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "148"
                },
                "word": "60"
              },
              {
                "startTime": {
                  "seconds": "148"
                },
                "endTime": {
                  "seconds": "148",
                  "nanos": 900000000
                },
                "word": "points"
              },
              {
                "startTime": {
                  "seconds": "158",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "158",
                  "nanos": 400000000
                },
                "word": "and"
              },
              {
                "startTime": {
                  "seconds": "158",
                  "nanos": 400000000
                },
                "endTime": {
                  "seconds": "158",
                  "nanos": 500000000
                },
                "word": "what"
              },
              {
                "startTime": {
                  "seconds": "158",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "158",
                  "nanos": 800000000
                },
                "word": "type"
              },
              {
                "startTime": {
                  "seconds": "158",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "159",
                  "nanos": 100000000
                },
                "word": "of"
              },
              {
                "startTime": {
                  "seconds": "159",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "159",
                  "nanos": 800000000
                },
                "word": "what"
              },
              {
                "startTime": {
                  "seconds": "159",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "160",
                  "nanos": 100000000
                },
                "word": "type"
              },
              {
                "startTime": {
                  "seconds": "160",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "160",
                  "nanos": 300000000
                },
                "word": "of"
              },
              {
                "startTime": {
                  "seconds": "160",
                  "nanos": 300000000
                },
                "endTime": {
                  "seconds": "160",
                  "nanos": 700000000
                },
                "word": "Taylor"
              },
              {
                "startTime": {
                  "seconds": "160",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "161",
                  "nanos": 500000000
                },
                "word": "and"
              },
              {
                "startTime": {
                  "seconds": "161",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "161",
                  "nanos": 900000000
                },
                "word": "I'm"
              },
              {
                "startTime": {
                  "seconds": "161",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "162",
                  "nanos": 600000000
                },
                "word": "finally"
              },
              {
                "startTime": {
                  "seconds": "163",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "163",
                  "nanos": 700000000
                },
                "word": "it"
              },
              {
                "startTime": {
                  "seconds": "163",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "164"
                },
                "word": "takes"
              },
              {
                "startTime": {
                  "seconds": "164"
                },
                "endTime": {
                  "seconds": "164"
                },
                "word": "a"
              },
              {
                "startTime": {
                  "seconds": "164"
                },
                "endTime": {
                  "seconds": "164",
                  "nanos": 400000000
                },
                "word": "great"
              },
              {
                "startTime": {
                  "seconds": "164",
                  "nanos": 400000000
                },
                "endTime": {
                  "seconds": "164",
                  "nanos": 900000000
                },
                "word": "deal"
              },
              {
                "startTime": {
                  "seconds": "164",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "165",
                  "nanos": 100000000
                },
                "word": "of"
              },
              {
                "startTime": {
                  "seconds": "165",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "165",
                  "nanos": 700000000
                },
                "word": "Bravery"
              },
              {
                "startTime": {
                  "seconds": "165",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "165",
                  "nanos": 800000000
                },
                "word": "to"
              },
              {
                "startTime": {
                  "seconds": "165",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "166",
                  "nanos": 100000000
                },
                "word": "stand"
              },
              {
                "startTime": {
                  "seconds": "166",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "166",
                  "nanos": 300000000
                },
                "word": "up"
              },
              {
                "startTime": {
                  "seconds": "166",
                  "nanos": 300000000
                },
                "endTime": {
                  "seconds": "166",
                  "nanos": 300000000
                },
                "word": "to"
              },
              {
                "startTime": {
                  "seconds": "166",
                  "nanos": 300000000
                },
                "endTime": {
                  "seconds": "166",
                  "nanos": 500000000
                },
                "word": "your"
              },
              {
                "startTime": {
                  "seconds": "166",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "167"
                },
                "word": "enemies"
              },
              {
                "startTime": {
                  "seconds": "167",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "168",
                  "nanos": 100000000
                },
                "word": "but"
              },
              {
                "startTime": {
                  "seconds": "168",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "168",
                  "nanos": 200000000
                },
                "word": "a"
              },
              {
                "startTime": {
                  "seconds": "168",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "168",
                  "nanos": 400000000
                },
                "word": "great"
              },
              {
                "startTime": {
                  "seconds": "168",
                  "nanos": 400000000
                },
                "endTime": {
                  "seconds": "168",
                  "nanos": 700000000
                },
                "word": "deal"
              },
              {
                "startTime": {
                  "seconds": "168",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "169",
                  "nanos": 200000000
                },
                "word": "more"
              },
              {
                "startTime": {
                  "seconds": "169",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "169",
                  "nanos": 400000000
                },
                "word": "to"
              },
              {
                "startTime": {
                  "seconds": "169",
                  "nanos": 400000000
                },
                "endTime": {
                  "seconds": "169",
                  "nanos": 700000000
                },
                "word": "stand"
              },
              {
                "startTime": {
                  "seconds": "169",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "169",
                  "nanos": 800000000
                },
                "word": "up"
              },
              {
                "startTime": {
                  "seconds": "169",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "169",
                  "nanos": 900000000
                },
                "word": "to"
              },
              {
                "startTime": {
                  "seconds": "169",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "170",
                  "nanos": 100000000
                },
                "word": "your"
              },
              {
                "startTime": {
                  "seconds": "170",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "171",
                  "nanos": 100000000
                },
                "word": "friends"
              },
              {
                "startTime": {
                  "seconds": "171",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "171",
                  "nanos": 700000000
                },
                "word": "your"
              },
              {
                "startTime": {
                  "seconds": "171",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "172",
                  "nanos": 500000000
                },
                "word": "friends"
              },
              {
                "startTime": {
                  "seconds": "172",
                  "nanos": 600000000
                },
                "endTime": {
                  "seconds": "173"
                },
                "word": "stand"
              },
              {
                "startTime": {
                  "seconds": "173"
                },
                "endTime": {
                  "seconds": "173",
                  "nanos": 100000000
                },
                "word": "up"
              },
              {
                "startTime": {
                  "seconds": "173",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "173",
                  "nanos": 200000000
                },
                "word": "to"
              },
              {
                "startTime": {
                  "seconds": "173",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "173",
                  "nanos": 300000000
                },
                "word": "your"
              },
              {
                "startTime": {
                  "seconds": "173",
                  "nanos": 300000000
                },
                "endTime": {
                  "seconds": "174"
                },
                "word": "friends"
              },
              {
                "startTime": {
                  "seconds": "175",
                  "nanos": 300000000
                },
                "endTime": {
                  "seconds": "175",
                  "nanos": 400000000
                },
                "word": "I"
              },
              {
                "startTime": {
                  "seconds": "175",
                  "nanos": 400000000
                },
                "endTime": {
                  "seconds": "176",
                  "nanos": 500000000
                },
                "word": "award"
              },
              {
                "startTime": {
                  "seconds": "176",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "176",
                  "nanos": 800000000
                },
                "word": "ten"
              },
              {
                "startTime": {
                  "seconds": "176",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "178",
                  "nanos": 400000000
                },
                "word": "points"
              },
              {
                "startTime": {
                  "seconds": "178",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "178",
                  "nanos": 700000000
                },
                "word": "to"
              },
              {
                "startTime": {
                  "seconds": "178",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "179",
                  "nanos": 600000000
                },
                "word": "Neville"
              },
              {
                "startTime": {
                  "seconds": "179",
                  "nanos": 600000000
                },
                "endTime": {
                  "seconds": "180",
                  "nanos": 300000000
                },
                "word": "Longbottom"
              }
            ]
          }
        ],
        "resultEndTime": {
          "seconds": "182",
          "nanos": 310000000
        },
        "languageCode": "en-us"
      },
      {
        "alternatives": [
          {
            "transcript": "assuming that my calculations are correct I believe that a change of decoration is in order",
            "confidence": 0.8084881901741028,
            "words": [
              {
                "startTime": {
                  "seconds": "195",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "195",
                  "nanos": 700000000
                },
                "word": "assuming"
              },
              {
                "startTime": {
                  "seconds": "195",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "195",
                  "nanos": 900000000
                },
                "word": "that"
              },
              {
                "startTime": {
                  "seconds": "195",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "196",
                  "nanos": 100000000
                },
                "word": "my"
              },
              {
                "startTime": {
                  "seconds": "196",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "196",
                  "nanos": 900000000
                },
                "word": "calculations"
              },
              {
                "startTime": {
                  "seconds": "196",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "197"
                },
                "word": "are"
              },
              {
                "startTime": {
                  "seconds": "197"
                },
                "endTime": {
                  "seconds": "197",
                  "nanos": 500000000
                },
                "word": "correct"
              },
              {
                "startTime": {
                  "seconds": "197",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "197",
                  "nanos": 500000000
                },
                "word": "I"
              },
              {
                "startTime": {
                  "seconds": "197",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "198",
                  "nanos": 600000000
                },
                "word": "believe"
              },
              {
                "startTime": {
                  "seconds": "198",
                  "nanos": 600000000
                },
                "endTime": {
                  "seconds": "198",
                  "nanos": 800000000
                },
                "word": "that"
              },
              {
                "startTime": {
                  "seconds": "198",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "198",
                  "nanos": 900000000
                },
                "word": "a"
              },
              {
                "startTime": {
                  "seconds": "198",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "199",
                  "nanos": 500000000
                },
                "word": "change"
              },
              {
                "startTime": {
                  "seconds": "199",
                  "nanos": 500000000
                },
                "endTime": {
                  "seconds": "199",
                  "nanos": 700000000
                },
                "word": "of"
              },
              {
                "startTime": {
                  "seconds": "199",
                  "nanos": 700000000
                },
                "endTime": {
                  "seconds": "200",
                  "nanos": 900000000
                },
                "word": "decoration"
              },
              {
                "startTime": {
                  "seconds": "200",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "201",
                  "nanos": 100000000
                },
                "word": "is"
              },
              {
                "startTime": {
                  "seconds": "201",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "201",
                  "nanos": 200000000
                },
                "word": "in"
              },
              {
                "startTime": {
                  "seconds": "201",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "201",
                  "nanos": 800000000
                },
                "word": "order"
              }
            ]
          }
        ],
        "resultEndTime": {
          "seconds": "202",
          "nanos": 350000000
        },
        "languageCode": "en-us"
      },
      {
        "alternatives": [
          {
            "transcript": " Gryffindor all the windows my house cover off off off",
            "confidence": 0.6645189523696899,
            "words": [
              {
                "startTime": {
                  "seconds": "208",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "208",
                  "nanos": 900000000
                },
                "word": "Gryffindor"
              },
              {
                "startTime": {
                  "seconds": "208",
                  "nanos": 900000000
                },
                "endTime": {
                  "seconds": "209",
                  "nanos": 100000000
                },
                "word": "all"
              },
              {
                "startTime": {
                  "seconds": "209",
                  "nanos": 100000000
                },
                "endTime": {
                  "seconds": "209",
                  "nanos": 200000000
                },
                "word": "the"
              },
              {
                "startTime": {
                  "seconds": "209",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "210",
                  "nanos": 100000000
                },
                "word": "windows"
              },
              {
                "startTime": {
                  "seconds": "210",
                  "nanos": 600000000
                },
                "endTime": {
                  "seconds": "210",
                  "nanos": 800000000
                },
                "word": "my"
              },
              {
                "startTime": {
                  "seconds": "210",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "211",
                  "nanos": 200000000
                },
                "word": "house"
              },
              {
                "startTime": {
                  "seconds": "211",
                  "nanos": 200000000
                },
                "endTime": {
                  "seconds": "211",
                  "nanos": 800000000
                },
                "word": "cover"
              },
              {
                "startTime": {
                  "seconds": "217",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "218"
                },
                "word": "off"
              },
              {
                "startTime": {
                  "seconds": "229",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "230"
                },
                "word": "off"
              },
              {
                "startTime": {
                  "seconds": "241",
                  "nanos": 800000000
                },
                "endTime": {
                  "seconds": "242"
                },
                "word": "off"
              }
            ]
          }
        ],
        "resultEndTime": {
          "seconds": "245",
          "nanos": 820000000
        },
        "languageCode": "en-us"
      }
    ],
    "totalBilledTime": {
      "seconds": "285"
    }
  }
}

const answerListenWriteTest = [
  {
    _id: "6364d872a4abd6f7cc388f32",
    order: "1",
    answer: "gone",
    index: "1"
  },
  {
    _id: "6364d872a4abd6f7cc388f34",
    order: "1",
    answer: "i",
    index: "2"
  },
  {
    _id: "6364d872a4abd6f7cc388f34",
    order: "2",
    answer: "needs",
    index: "2"
  }
]

const ExeWriteAndListen = () => {
  const listenWrite = useSelector((item: any) => item.listenWrite.value);
  const [listQuestionAnswer, setListQuestionAnswer] = useState<QuestionAnswerListenWriteType[]>([]);
  const { register, handleSubmit, formState } = useForm();
  const dispatch = useAppDispatch();
  const { id, dayId } = useParams();
  const [check, setCheck] = useState(false)
  const [checkPause, setCheckPause] = useState(false)
  const [point, setPoint] = useState(0)
  const [convertValues, setConvertValues] = useState<any>([])
  const [convertQuizz, setConvertQuizz] = useState<any>([])
  const [checkMeaning, setCheckMeaning] = useState(false)
  const auth = useSelector(((item: RootState) => item.auth.value)) as UserType
  const [learningProgress, setLearningProgress] = useState<LearningProgressType>()
  const [listText, setListText] = useState<any>([])

  const onSubmit2 = async (item: any) => {
    let num: number = 0;
    for (const key in item.ans) {
      if (item.ans[key] != "") {
        num++
      }
    }

    let countAnswer: number = questionQuiz.length;
    listQuestionAnswer.map((e) => {
      if (e.answer) {
        countAnswer += e.answer.answer.length
      }
    })

    let countAnswerUser = num + convertQuizz.length
    if (countAnswerUser < countAnswer) {
      return Modal.warning({
        title: "Chú ý",
        content: <div className=' text-sm'>
          <p>Bạn phải hoàn thành tất cả các câu trước khi [Nộp bài] !</p>
          <div className='font-bold'>Số câu chưa hoàn thành: {countAnswer - countAnswerUser}</div>
        </div>,
        width: "30%",
        onOk: () => {
        }
      })
    }

    // check answer listenWrite
    let convertValues2: any = [];
    for (let key in item.ans) {
      const idQuestion = key.split("-")[1];
      const keyQuestion = key.split("-")[2];
      //   tách chuỗi key (inputAnswer-62ff6998b77f3ffb3d4ec7c3-1) rồi lấy phần tử thứ 2 (62ff6998b77f3ffb3d4ec7c3), và phần tử thứ 3 (index)
      convertValues2 = [...convertValues2, {
        idQuestion,
        keyQuestion,
        answerUser: item.ans[key],
        answerCorrect: "",
        isCorrect: false
      },]
      //   push vào mảng convertValues với id và answer
    }

    let numAnswer = 0;
    answerListenWriteTest.map((item: any, key: number) => {
      if (item.answer.toLowerCase() === convertValues2[key].answerUser.toLowerCase() && item.order === convertValues2[key].keyQuestion && item.index === convertValues2[key].idQuestion) {
        convertValues2[key].isCorrect = true;
        convertValues2[key].answerCorrect = convertValues2[key].answerUser
        numAnswer += 1
      } else {
        convertValues2[key].isCorrect = false;
        convertValues2[key].answerCorrect = item.answer
      }
    })

    const quizTrueAnswer = convertQuizz.filter((item) => item.isCorrect === true)
    const score = pointResult(numAnswer + quizTrueAnswer.length, convertQuizz.length + answerListenWriteTest.length)
    setConvertValues(convertValues2)
    setCheck(true)

    const { data: history } = await addHistory({
      user: auth._id,
      learningProgress: learningProgress?._id,
      practiceActivity: id,
      score: score,
      totalScore: 0,
      totalCorrect: numAnswer + quizTrueAnswer.length,
      result: score >= 8 ? 1 : 0,
      type: "conversation"
    })

    for (let index = 0; index < convertQuizz.length; index++) {
      const flag: UserQuizType = {
        quiz: convertQuizz[index].quiz as string,
        answer: convertQuizz[index].answer as string,
        history: history._id,
        time: "0",
        point: 0
      }
      await addUserQuizSlide(flag)
    }

    const { payload } = await dispatch(editLearningProgressSlice({
      _id: learningProgress?._id,
      listeningSpeakingScore: learningProgress?.listeningSpeakingScore as number,
      vocabularyScore: learningProgress?.vocabularyScore as number,
      structureSentencesScore: learningProgress?.structureSentencesScore as number,
      conversationScore: score,
      grammarScore: learningProgress?.grammarScore as number,
      oralScore: learningProgress?.oralScore as number,
      isPass: false,
      day: dayId as string,
      user: auth._id as string
    }))
    message.success("Chúc mừng bạn đã hoàn thành bài thi !")
  }

  const pointResult = (totalCorrect: number, lengthQuestion: number) => {
    const score = Math.round(10 / lengthQuestion * totalCorrect)
    setPoint(score)
    return score
  }

  const checkAnswerIscorrect = (id: any, key: any) => {
    let className = "";
    convertValues.forEach(e => {
      if (e.idQuestion == id && key == e.keyQuestion) {
        if (e.isCorrect == true) {
          className = "text__result__correct"
        } else {
          className = "red text__result__wrong"
        }
      }
    });
    return className
  }

  const btListenWrite = async () => {
    const { payload } = await dispatch(getListenWriteByIdCategory(id))
    const avx = JSON.parse(payload.test);
    setListText(avx)

    if (payload) {
      const { data: question } = await getListQuestionListenWriteById(String(payload._id))
      let arr: any = [];
      for (let i = 0; i < question.length; i++) {
        const { data: answer } = await listAnswerListenWriteById(question[i]._id)
        arr.push({ question: question[i], answer: answer })
      }
      setListQuestionAnswer(arr)
    }
  }
  const getLearningProgressByUser = async () => {
    const { data } = await detailLearningProgressByUser(String(dayId), auth._id)
    setLearningProgress(data);
  }

  useEffect(() => {
    if (id) {
      btListenWrite();
      getLearningProgressByUser()
    }
  }, [convertValues, convertQuizz, id])

  const changeValueQuiz = (e: any, answer: any) => {
    if (convertQuizz.length > 0) {
      const exist = convertQuizz.find((item) => String(item.quiz) == answer.quiz)
      if (exist) {
        convertQuizz.map((element) => {
          if (element.quiz == answer.quiz && element.answer !== answer.answer) {
            setConvertQuizz(convertQuizz.map((a) => a.quiz === answer.quiz ? answer : a))
          }
        })
        return
      }
      setConvertQuizz([...convertQuizz, answer])
    } else {
      setConvertQuizz([...convertQuizz, answer])
    }
  }

  const onStartAudio = async (value: any, index: number) => {
    const audio: any = document.getElementById("audio1");
    const firstItem = value?.alternatives[0].words[0]
    audio.startTime = firstItem.startTime.seconds
    audio.endTime = value.resultEndTime.seconds
    audio.currentTime = firstItem.startTime.seconds

    setCheckPause(true)
    checkColorSpeech(value, index)
    await audio.play()
  }

  const onTimeUpdate = async () => {
    const audio: any = document.getElementById("audio1");
    let speech: any = document.querySelectorAll("#speech");
    let iconAudio: any = document.querySelectorAll("#iconAudio");

    if (Math.floor(audio.currentTime) === Number(audio.endTime)) {
      speech.forEach((element, i) => {
        speech[i].style.color = "black";
        iconAudio[i].style.display = "block"
      });
      setCheckPause(false)
      await audio.pause()
    }
  }

  const onPause = async () => {
    const audio: any = document.getElementById("audio1");
    let speech: any = document.querySelectorAll("#speech");
    let iconAudio: any = document.querySelectorAll("#iconAudio");
    speech.forEach((element, i) => {
      speech[i].style.color = "black";
      iconAudio[i].style.display = "block"
    });
    setCheckPause(false)
    await audio.pause()
  }

  const convertText = (text: String) => {
    if (text.charAt(0) === " ") {
      return text.charAt(1).toUpperCase() + text.slice(2).toLowerCase();
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  const checkColorSpeech = (text: any, index: number) => {
    let speech: any = document.querySelectorAll("#speech");
    let iconAudio: any = document.querySelectorAll("#iconAudio");

    speech[index].style.color = "orange";
    iconAudio.forEach((element, i) => {
      if (i !== index) {
        iconAudio[i].style.display = "none"
      }
    });
  }

  return (
    <div className='conversation__page'>
      {listQuestionAnswer.length > 0 ?
        <div className="main__conversation">
          <form className="content__conversation" onSubmit={handleSubmit(onSubmit2)} >
            <div className='mx-4 '>
              <audio
                id='audio1'
                className='w-full rounded-none'
                controls={true}
                onTimeUpdate={onTimeUpdate}
                src={`${listenWrite?.audio}`}>
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            </div>

            {check &&
              <div className='text-center font-bold mt-5'>
                Kết quả của bạn: <span className={`px-2 py-1 text-white rounded ml-2 ${point >= 8 ? 'bg-green-500' : 'bg-red-500'}`}>{point} / 10</span>
              </div>
            }

            <div className='mx-4 my-8 '>
              <div className=' text-lg border-b'>
                <div><i className="fa-solid fa-pen"></i> Nghe và trả lời câu hỏi.</div>
              </div>
              <div>
                {questionQuiz.map((item, index) => {
                  return (
                    <div className='py-4' key={item.id}>
                      <div className='text-base flex font-medium space-x-4 mx-auto'>
                        <div >{index + 1}. {item.name}</div>
                        <span >{convertQuizz.length > 0 && check == true ?
                          convertQuizz[index].isCorrect == true ?
                            <i className="fa-solid fa-check text-green-500 text-xl rounded font-bold"></i>
                            :
                            <i className="fa-solid fa-xmark text-red-500  text-xl my-auto "></i>
                          : ""
                        }
                        </span>
                      </div>
                      <ul className='mb-0 '>
                        {
                          answerQuiz.map((e, index) => {
                            const answer: any = []
                            if (check == true) {
                              const find = convertQuizz.filter((ans) => ans.id == e.id)
                              answer.push(...find)
                            }
                            if (Number(e.quiz) == item.id) {
                              return (
                                // even:bg-slate-100
                                <div className='even:bg-slate-100 ' key={e.id}>
                                  <li key={e.id} className={`${answer.length > 0 && answer[0].quiz == e.quiz ? answer[0].id == e.id && e.isCorrect == false ? "bg-[#FBE1DB]" : "" : ""} ${check == true && e.isCorrect == true ? "bg-[#CCF0A5]" : ""}  py-2 px-4  font-sans flex gap-2  `} >
                                    <input type="radio" id={e.answer} name={String(item.id)} onChange={(em) => changeValueQuiz(em, e)} value={e.answer} />
                                    <label className='align-middle mt-[-2px] w-full hover:cursor-pointer' htmlFor={e.answer}>{e.answer}</label>
                                  </li>
                                </div>
                              )
                            }
                          })
                        }
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='mx-4 py-8 '>
              <div className='mb-4 text-lg border-b'>
                <div><i className="fa-solid fa-pen"></i> Nghe và điền vào chỗ trống.</div>
              </div>

              <div className='float-right'>
                <div className='border px-3 rounded bg-gray-200 font-medium cursor-pointer hover:border-slate-400' onClick={() => setCheckMeaning(!checkMeaning)}>
                  {
                    checkMeaning ? 'Ẩn tiếng việt' : 'Hiện tiếng việt'
                  }
                </div>
              </div>

              <div className="content">
                {
                  listenWriteTest?.response?.results.map((item: any, index: number) => {

                    const quesToArr = item.alternatives[0].transcript.split("___");
                    var tempQues: any = [];
                    quesToArr.forEach((item2: any, index2: number) => {
                      if (index2 < quesToArr.length - 1) {
                        tempQues.push(<span>{item2}</span>, check == true ?
                          <input key={index2 + 1} className={`inp__text ${checkAnswerIscorrect(index + 1, index2 + 1)}`} {...register(`ans.inputAnswer-${index + 1}-${index2 + 1}`)} disabled />
                          : <input key={index2 + 1} className="inp__text bg-transparent" {...register(`ans.inputAnswer-${index + 1}-${index2 + 1}`)} />)
                      } else {
                        tempQues.push(<span key={index2 + 1}>{item2}</span>)
                      }
                    })

                    return (
                      <div key={index + 1} className="hover:cursor-pointer grid grid-cols-12 gap-8 w-full px-4 py-3 even:bg-slate-100"  >
                        <div className='col-span-2 flex justify-between gap-4 my-auto'>
                          <strong className='my-auto'>Long: </strong>
                          {
                            checkPause ?
                              <span id='iconAudio' key={index + 1} onClick={onPause}><i className="fa-sharp fa-solid fa-circle-pause text-green-500 text-lg"></i></span>
                              :
                              <span id='iconAudio' key={index + 1} onClick={() => onStartAudio(item, index)}><i className="fa-solid fa-circle-play text-green-500 text-lg"></i></span>
                          }
                        </div>
                        <div className='col-span-10 my-auto'>
                          <span id='speech' key={index + 1} className='text-base'>{quesToArr.length == 1 ? convertText(item.alternatives[0].transcript) : tempQues}</span>
                          {
                            checkMeaning ?
                              <div className='text-sm text-gray-500'>Nghĩa tiếng việt</div>
                              : ""
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>

            <div className="btn__Check__answer" >
              <button>Làm lại </button>
              <button>Nộp bài</button>
            </div>
          </form>
        </div>
        :
        <Loading />
      }
    </div>
  )
}

export default ExeWriteAndListen