/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
import { async } from '@firebase/util'
import { Button, Form, Input, message, Modal, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import ReactQuill from 'react-quill'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { uploadAudio } from '../../../../../api/googleCloud'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks'
import AdminPageHeader from '../../../../../components/AdminPageHeader'
import Loading from '../../../../../components/Loading'
import { addAnswerListenWriteSlide } from '../../../../../features/Slide/answerListenWrite/answerListenWrite'
import { addListen, changeBreadcrumb, editListen, getListListenWrite, removeListenSlide } from '../../../../../features/Slide/listenWrite/ListenWriteSlice'
import { editPracticeActivitylice, getListPracticeActivitylice } from '../../../../../features/Slide/practiceActivity/PracticeActivitySlice'
import { ListenWriteType } from '../../../../../types/listenWrite'
import { PracticeActivityType } from '../../../../../types/practiceActivity'
import { QuizType } from '../../../../../types/quiz'
import { uploadImage, uploadVideo } from '../../../../../utils/upload'

interface TypeArrAnswer {
  id: number,
  text: string,
  checkAnswer: boolean
}

const FormListenRead = () => {
  const { id, dayId } = useParams()
  const breadcrumb = useAppSelector(data => data.listenWrite.breadcrumb)
  const practiceActivity = useAppSelector(item => item.practiceActivity.value)
  const listenWrite = useAppSelector(item => item.listenWrite.value)
  const quizs = useAppSelector(item => item.quiz.value)
  const [preview, setPreview] = useState<any>();
  const [arrAnswer, setArrAnswer] = useState<any>([])
  const [audio, setAudio] = useState<string>("");
  const [listConversation, setListConversation] = useState<any>([])
  const [checkUpload, setcCheckUpload] = useState(false)
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const type = "conversation"

  const prative: any = practiceActivity.find((item: PracticeActivityType) => item.type === type && item.day === dayId)
  let detailListen: any = listenWrite.filter((e: ListenWriteType) => e.practiceActivity === prative._id)
  if (detailListen.length > 0) {
    navigate(`/manageDay/${dayId}/conversation/${detailListen[0]._id}/editListenRead`);
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

  const onHandleChangeAudio = async (data: any) => {
    setcCheckUpload(true)
    const audioPreview = document.getElementById("audio-preview") as any;
    // audioPreview.src = URL.createObjectURL(data.target.files[0])
    const image = await uploadVideo(data.target)
    setAudio(image)
    const postid = uuidv4();
    const file: any = await convertFile(data.target.files[0], "wav")
    const blob2 = await fetch(file.data)
      .then(r => r.blob())
      .then(blobFile => new File([blobFile], `${postid}_${file.name}.wav`, { type: "audio/wav" }))
    const formData = new FormData();
    formData.append("audiofile", blob2);
    const { data: data2 } = await uploadAudio(formData)
    if (data2) {
      setcCheckUpload(false)
    }
    setListConversation(data2)
  }

  const convertText = (text: String) => {
    if (text.charAt(0) === " ") {
      return text.charAt(1).toUpperCase() + text.slice(2).toLowerCase();
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (value: any) => {
    const key = "updatable";

    let arrText: any = []
    for (const key in value.textList) {
      arrText.push(value.textList[key])
    }

    let arrName: any = []
    for (const key in value.nameList) {
      arrName.push(value.nameList[key])
    }

    const newValue = await convertValue(value)

    const { payload } = await dispatch(addListen({
      practiceActivity: prative._id,
      audio: audio,
      conversation: newValue,
      structure: value.structure
    }))

    if (payload) {
      arrAnswer.map(async (e, index: number) => {
        await dispatch(addAnswerListenWriteSlide({
          idListenWrite: payload._id,
          answer: e.text,
          order: e.order,
          confidence: e.id,
          stt:e.stt
        }))
      })
    }
    message.loading({ content: "Loading...", key });
    message.success({ content: "Thêm Thành Công!", key, duration: 2 });

    navigate(`/manageDay/${dayId}/conversation/${payload._id}/editListenRead`);
  };

  const convertValue = async (value: any) => {

    let arrText: String[] = []
    for (const key in value.textList) {
      arrText.push(value.textList[key])
    }

    let arrName: String[] = []
    for (const key in value.nameList) {
      arrName.push(value.nameList[key])
    }

    const newArr = await Promise.all(
      listConversation.response.results.map((item, index: number) => {
        console.log("e", convertText(item.alternatives[0].transcript));
        let before = convertText(item.alternatives[0].transcript);

        arrAnswer.map((element, index2) => {

          if (item.alternatives[0].confidence === element.id) {
            let text = convertText(item.alternatives[0].transcript).split(" ");

            for (const key in text) {
              if (Number(key) === element.order - 1) {
                text[key] = "___"
              }
            }


            item = Object.assign({ ...item, name: arrName[index], alternatives: [{ ...item.alternatives[0], transcript: text.join(" "), beforeQuestion: before }] });
          } else {
            item = Object.assign({ ...item, name: arrName[index], alternatives: [{ ...item.alternatives[0], beforeQuestion: before }] });

          }

        })
        return item
      })
    )
    const newResults = Object.assign({ ...listConversation.response, results: newArr })
    const newResponse = Object.assign({ ...listConversation, response: newResults })
    return newResponse
  }

  const changeAnswer = (value: any, confidence: any, index: number, checkAnswer: boolean, order: number) => {
    console.log("đã vào đây");
    if (arrAnswer.length === 0) {
      value.target.style.background = "#16A34A"
      value.target.style.color = "white"
      setArrAnswer([...arrAnswer, { id: confidence, text: value.target.innerHTML, order: order, stt: index  }])
    }

    arrAnswer.map((e) => {
      if (e.text === value.target.innerHTML && e.id === confidence) {
        if (checkAnswer === true) {
          value.target.style.background = "white"
          value.target.style.color = "black";
          setArrAnswer(arrAnswer.filter((e) => e.id !== confidence))
        }
      } else {
        value.target.style.background = "#16A34A"
        value.target.style.color = "white"
        console.log("chua tonf tai");
        setArrAnswer([...arrAnswer, { id: confidence, text: value.target.innerHTML, order: order, stt: index  }])
      }
    })

  }

  const detailAnswer = (text: string) => {
    // arr answer
    let arrAns = text.replaceAll("?", '').replaceAll(',', '').replaceAll('.', '').split(' ')
    const arr: TypeArrAnswer[] = [];
    arrAns.map((element: string, index: number) => {
      if (element !== '') {
        arr.push({ id: index + 1, text: element, checkAnswer: false })
      }
    });
    return arr

  }

  const onFinishFailed = (errorInfo) => {
    id
      ? message.error("Sửa Không Thành Công!")
      : message.error("Thêm Không Thành Công!");
  };

  const checkStatusActivity = () => {
    const quizStatus = quizs.filter((item: QuizType) => item.practiceActivity?.type === "conversation" && item.practiceActivity?.day === String(dayId) && item.status === false)
    const lengthQuiz = quizs.filter((item: QuizType) => item.practiceActivity?.type === "conversation" && item.practiceActivity?.day === String(dayId))
    const listen = listenWrite.filter((e: ListenWriteType) => e.practiceActivity === prative._id)

    const detailActivity: any = practiceActivity.find((e: PracticeActivityType) => e.day === dayId && e.type === "conversation")

    if (quizStatus.length > 0 || lengthQuiz.length < 2 || listen.length < 1) {
      dispatch(editPracticeActivitylice({ ...detailActivity, status: false }))
    } else {
      dispatch(editPracticeActivitylice({ ...detailActivity, status: true }))
    }
  }

  useEffect(() => {
    dispatch(getListPracticeActivitylice())
    dispatch(getListListenWrite())
    checkStatusActivity()
    dispatch(changeBreadcrumb("Thêm hội thoại"))

  }, [dayId])

  return (
    <div className=''>
      <AdminPageHeader breadcrumb={breadcrumb} day={dayId} activity={{ title: "Luyện hội thoại", route: "conversation" }} type={{ title: "Nghe và đọc", route: "listListenRead" }} />
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {id ? (
          <Form.Item label="_id" name="_id" hidden={true}>
            <Input />
          </Form.Item>
        ) : (
          ""
        )}

        <div className='mb-4'>
          <Form.Item
            label="Audio"
            tooltip="Audio"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            <Input type={'file'} id={'upload_audio'} name="listenWrite.audio" accept="audio/*" onChange={(e) => onHandleChangeAudio(e)} disabled={audio ? true : false} />


          </Form.Item>
          <Form.Item valuePropName="src" label="AudioPreview" >
            <audio
              id='audio-preview'
              className='w-full rounded-none'
              controls={true}
              src={audio ? audio : ""}
            >
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </Form.Item>

        </div>

        {listConversation.length === 0 ?
          checkUpload &&
          <Loading />
          :

          <div className='mb-4'>
            <Form.Item
              label="Cuộc hội thoại"
            >
              {listConversation &&
                listConversation?.response?.results.map((item: any, index: number) => {
                  return (
                    <div key={index + 1} className="py-3 even:bg-slate-100">
                      <div className="hover:cursor-pointer grid grid-cols-12 gap-8 w-full px-4 "  >
                        <div className='col-span-2 flex justify-between gap-4 my-auto ' >
                          <Form.Item style={{ marginBottom: "5px" }} label="Tên nhân vật" name={[`nameList`, `name-${index + 1}`]} initialValue={breadcrumb === "Sửa cấu trúc" ? item.name : ""} rules={[{ required: true, message: "Không để Trống!" }]}>
                            <Input defaultValue={breadcrumb === "Sửa cấu trúc" ? item.name : ""} placeholder='Tên nhân vật' className='w-full px-2 py-1 border' />
                          </Form.Item>
                        </div>
                        <div className='col-span-10 my-auto' >
                          <Form.Item style={{ marginBottom: "5px" }} label="Lời thoại" name={[`textList`, `text-${index + 1}`]} initialValue={convertText(item.alternatives[0].transcript)} rules={[{ required: true, message: 'Không để Trống!' }]} >
                            <Input defaultValue={convertText(item.alternatives[0].transcript)} className={'px-2 py-1 border'} placeholder='Câu thoại' />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="hover:cursor-pointer grid grid-cols-12 gap-8 w-full px-4"  >
                        <div className='col-span-12  gap-4 my-auto'>
                          <Form.Item label="Đáp án" name={[`answerList`, `answer-${index + 1}`]} style={{ marginBottom: "0" }}  >
                            <ul className='flex-auto space-x-8 col-span-10 w-full mb-0'>
                              {item.alternatives[0].transcript &&
                                detailAnswer(convertText(item.alternatives[0].transcript)).map((item2: TypeArrAnswer, index2: number) => (
                                  <button key={item.id} type="button" onClick={(e) => changeAnswer(e, item.alternatives[0].confidence, index + 1, !item2.checkAnswer, index2 + 1)}><li className='border px-3 py-1 my-auto mb-4 rounded cursor-pointer border-green-600 hover:bg-green-600 hover:text-white'>{item2.text}</li></button>
                                ))
                              }
                            </ul>
                          </Form.Item>

                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </Form.Item>
          </div>
        }


        <Form.Item
          label="Phân tích cấu trúc"
          name="structure"
          tooltip="Phân tích cấu trúc"
          rules={[{ required: true, message: "Không để Trống!" }]}
        >
          <ReactQuill
            className="form-control rounded"
            theme="snow"
            style={{ background: "#fff", height: "200px", marginBottom: "40px" }}
          />
        </Form.Item>

        <Form.Item className="">
          <Button
            className="inline-block mr-2"
            type="primary"
            htmlType="submit"
          >
            {breadcrumb === "Sửa cấu trúc" ? "Sửa" : "Thêm"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormListenRead