import { Form, Input, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addGrammar, getGrammarDetail, updateGrammar, } from "../../../api/grammar";
import JoditEditor from "jodit-react";
import AdminPageHeader from "../../../components/AdminPageHeader";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { changeBreadcrumb } from "../../../features/Slide/answerQuiz/AnswerQuizSlide";
import { GrammarType } from "../../../types/grammar";
import { PracticeActivityType } from "../../../types/practiceActivity";
import { editPracticeActivitylice } from "../../../features/Slide/practiceActivity/PracticeActivitySlice";
import { getListGrammarSlice } from "../../../features/Slide/grammar/grammarSlice";
import { QuizType } from "../../../types/quiz";
import { Helmet } from "react-helmet";

type Props = {};

const FormGrammar = (props: Props) => {
  const grammars = useAppSelector((item) => item.grammar.value)
  const practiceActivity = useAppSelector(item => item.practiceActivity.value)
  const quizs = useAppSelector(item => item.quiz.value)

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const { id, dayId } = useParams();
  const breadcrumb = useAppSelector(item => item.answerQuiz.breadcrumb)
  const dispatch = useAppDispatch();

  var titlePage: string = "";
  if (id) {
    titlePage = "Cập Nhật Ngữ Pháp Bài Học";
  } else {
    titlePage = "Thêm Ngữ Pháp Bài Học";
  }
  let activity: any = practiceActivity.find((e: PracticeActivityType) => e.day === dayId && e.type === "grammar")
  let gram = grammars.filter((e: GrammarType) => e.dayId === dayId)
  let listQuiz = quizs.filter((e: QuizType) => e.practiceActivity?._id === activity._id && e.status === true)
  
  const checkActivity = () => {
    if (gram.length === 0 && listQuiz.length === 10) {
      dispatch(editPracticeActivitylice({ ...activity, status: true }))
    }
  }

  const onFinish = async (value: GrammarType) => {
    const key = "updatable";
    if (id) {
      try {
        message.loading({ content: "Loading...", key });
        updateGrammar({ ...value, dayId: dayId });
        message.success({ content: "Sửa Thành Công!", key, duration: 2 });
        navigate(`/manageDay/${dayId}/grammar`);
      } catch (error) {
        message.error({ content: "Lỗi", key, duration: 2 });
      }
    } else {
      try {
        if (gram.length === 1) {
          message.warning("Đã đạt giới hạn bài học !")
          return navigate(`/manageDay/${dayId}/grammar`);
        }
        checkActivity();
        message.loading({ content: "Loading...", key });
        addGrammar({ ...value, dayId: dayId });
        message.success({ content: "Thêm Thành Công!", key, duration: 2 });
        navigate(`/manageDay/${dayId}/grammar`);
      } catch (error) {
        message.error({ content: "Lỗi", key, duration: 2 });
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    id
      ? message.error("Sửa Không Thành Công!")
      : message.error("Thêm Không Thành Công!");
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    if (id) {
      const getDetail = async () => {
        const { data } = await getGrammarDetail(id);
        console.log("data", data);
        
        setDescription(data.description);
        form.setFieldsValue(data);
      };
      getDetail();
      dispatch(changeBreadcrumb("Sửa học ngữ pháp"))
    } else {
      dispatch(changeBreadcrumb("Thêm bài học ngữ pháp"))
    }
    dispatch(getListGrammarSlice())
  }, [id]);

  const config: any = {
    readonly: false,
    addNewLineOnDBLClick: false,
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Luyện Ngữ Pháp | Vian English</title>
      </Helmet>
      <AdminPageHeader breadcrumb={breadcrumb} day={dayId} activity={{ title: "Luyện ngữ pháp", route: "grammar" }} type={{ title: "Bài học", route: "listLesson" }} />
      <div>
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

          <Form.Item
            label="Tiêu đề"
            name="name"
            tooltip="Tên đề mục"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            tooltip="Chi tiết"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <JoditEditor value={description} config={config} />
          </Form.Item>

          <Form.Item label="Tóm tắt" name="summary" tooltip="Tóm tắt">
            <Input />
          </Form.Item>

          <Form.Item >
            <Button
              className="inline-block mr-2"
              type="primary"
              htmlType="submit"
            >
              {id ? "Sửa" : "Thêm"}
            </Button>
            <Button
              className="inline-block "
              type="primary"
              danger
              onClick={() => {
                onReset();
              }}
            >
              Xóa Hết
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormGrammar;
