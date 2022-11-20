import React, { createElement, useEffect, useState } from 'react'
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { addCommentSlide, editdCommentSlide, getCommentList, removeCommentSlice, updateLikeSlice } from '../../features/Slide/comment/CommentSlice';
import toas from 'toastr';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, CommentOutlined, EnterOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, List, Comment, Tooltip, Rate, Card, Popconfirm } from 'antd';
import moment from 'moment';
import { CommentType } from '../../types/comment';
import 'moment/locale/vi'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addReplyCommentSlide, editdReplyCommentSlide, getReplyCommentList, removeReplyCommentSlice } from '../../features/Slide/comment/ReplySilce';
import { RootState } from '../../app/store';
import { UserType } from '../../types/user';
import { getUser, getUserList } from '../../features/Slide/user/userSlide';
import { getListUser, getUserById } from '../../api/user';
import Loading from '../../components/Loading';

const { TextArea } = Input;
interface CommentItem {
  author: string;
  avatar: string;
  content: React.ReactNode;
  datetime: string;
}
const CommentList = ({ comments }: { comments: CommentType[] }) => {
  const dispath = useDispatch();
  const replyy = useSelector<any, any>(data => data.reply.value);
  useEffect(() => {
    dispath(getReplyCommentList())
  }, []);
  console.log("comments", comments);

  return (
    <>
      {comments.length > 0
        ?
        <div className="w-fullbg-white border rounded-md">
          <h3 className="font-semibold p-1">{`${comments.length + replyy.length} ${comments.length > 1 ? 'Bình Luận' : 'Bình Luận'}`}</h3>
          <div className="flex flex-col gap-5 m-3">
            <List
              dataSource={comments}
              itemLayout="horizontal"
              renderItem={(item: CommentType) => {
                return (
                  <CommentItem item={item} />
                )
              }
              }
            />
          </div>
        </div>
        :
        <Loading />
      }
    </>

  )
}

const CommentItem = ({ item }: any) => {
  const [cmt, setCmt] = useState<any>();
  const dispath = useDispatch();
  const [reply, setReply] = React.useState(false)
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>();
  const replyy = useSelector<any, any>(data => data.reply.value);
  useEffect(() => {
    dispath(getReplyCommentList())
  }, []);
  useEffect(() => {
    setCmt(item)
  })
  const id = item._id
  const userId = item.userId
  useEffect(() => {
    const getText = async () => {
      const { payload } = await dispath(getUser(userId));
      setValue(payload);
    };
    getText();
  }, [userId]);

  const fil = replyy.filter(item => item.commentId === id)
  const user = useSelector(((item: RootState) => item.auth.value)) as UserType
  const users = useSelector<any, any>(data => data.user.value);

  const like = (e) => {
    const NewUser = { ...item }

    if (!user) {
      toas.error("Bạn cần phải đăng nhập để thực hiện chức năng này");
    } else {
      if (NewUser.dislike.find(like => like.userId === user._id)) {
        const filtered = NewUser.dislike.filter(obj => {
          return obj.userId !== user._id;
        });
        const newComment = { ...cmt, dislike: [...filtered], like: [...cmt.like, { userId: user._id, status: 'liked' }] }
        dispath(editdCommentSlide(
          newComment
        ))
      } else if (NewUser.like.find(like => like.userId === user._id)) {
        const filtered = NewUser.like.filter(obj => {
          return obj.userId !== user._id;
        });
        const newComment = { ...cmt, like: [...filtered] }
        dispath(editdCommentSlide(
          newComment
        ))
      } else {
        const newComment = { ...cmt, like: [...cmt.like, { userId: user._id, status: 'liked' }] }

        try {
          dispath(editdCommentSlide(
            newComment
          ))
        } catch (error: any) {
          toas.error(error.response.data);
        }
      }
    }
  };
  const dislike = (e) => {
    const NewUser = { ...item }


    if (!user) {
      toas.error("Bạn cần phải đăng nhập để thực hiện chức năng này");
    } else {
      if (NewUser.like.find(like => like.userId === user._id)) {
        const filtered = NewUser.like.filter(obj => {
          return obj.userId !== user._id;
        });
        const newComment = { ...cmt, like: [...filtered], dislike: [...cmt.dislike, { userId: user._id, status: 'disliked' }] }
        dispath(editdCommentSlide(
          newComment
        ))
      } else if (NewUser.dislike.find(dislike => dislike.userId === user._id)) {
        const filtered = NewUser.dislike.filter(obj => {
          return obj.userId !== user._id;
        });
        const newComment = { ...cmt, dislike: [...filtered] }
        dispath(editdCommentSlide(
          newComment
        ))
      } else {
        const newComment = { ...cmt, dislike: [...cmt.dislike, { userId: user._id, status: 'disliked' }] }

        try {
          dispath(editdCommentSlide(
            newComment
          ))
        } catch (error: any) {
          toas.error(error.response.data);
        }
      }
    }
  };

  const onFinish = async (values: any) => {
    const Newcomment = { ...item }
    try {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setReply(false)
        dispath(addReplyCommentSlide(
          {
            author: user.username,
            userId: user._id,
            avatar: user.img,
            content: values.replycomment.content,
            commentId: Newcomment._id
          }
        ))
        toas.success("Bình luận thành công");

      }, 1000);

    } catch (error: any) {
      toas.error(error.response.data);
    }

  };
  console.log(value);

  return (
    <div>
      <div>
        <div className="flex w-full justify-between">

          <div className="">
            <div className="flex gap-3 items-center">
              <img src={value?.img}
                className="object-cover w-12 h-12 rounded-full border-2 border-emerald-400  shadow-emerald-400" />
              {/* <Avatar image={String(user.img)} className="text-sm w-10 h-10 text-white" /> */}
              <div>
                <h3 className='font-bold'>{value?.username}
                  <span className="text-sm text-gray-400 font-normal pl-3">{moment(item.createdAt).local().fromNow()}</span>
                </h3>
                <Tooltip key="comment-basic-like" title="Like">
                  <span onClick={() => like(item._id)} style={{ fontSize: '15px', cursor: 'pointer' }}>
                    {item.like.find(like => like.userId === user._id) ? <LikeFilled /> : <LikeOutlined />}
                    <span className="comment-action pl-1">{item.like.length}</span>
                  </span>
                </Tooltip>
                <Tooltip key="comment-basic-dislike" title="Dislike" >
                  <span className='pl-2' onClick={() => dislike(item._id)} style={{ fontSize: '15px', cursor: 'pointer' }}>
                    {item.dislike.find(dislike => dislike.userId === user._id) ? <DislikeFilled /> : <DislikeOutlined />}
                    <span className="comment-action pl-1">{item.dislike.length}</span>
                  </span>
                </Tooltip>
                <button className="ml-2 text-lg" onClick={() => setReply(!reply)}><CommentOutlined /></button>
              </div>
            </div>
            <div className='pl-14'>
              <span><Rate style={{ fontSize: '110%' }} disabled defaultValue={item.rating} /></span>
              <p className="text-gray-600 mt-2 text-base" dangerouslySetInnerHTML={{ __html: `${item.content}` }}></p>
            </div>
          </div>
        </div>
        <div className='pl-4'>
          {fil.map((reply) => {
            return (
              <ReplyComment reply={reply} cmt={cmt} _id={id} />
            )
          })}
        </div>
        <div className='ml-10 mt-5'>
          {reply ?
            <div>
              <Comment
                content={
                  <div>
                    <Form onFinish={onFinish}>
                      <Form.Item name={['replycomment', 'content']}>
                        <ReactQuill theme="snow" />
                      </Form.Item>
                      <Form.Item>
                        <Button loading={submitting} htmlType="submit" type="primary">
                          Bình luận
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                }
              />
            </div>
            : null
          }
        </div>
      </div>

    </div>
  )

}
const ReplyComment = ({ reply, cmt, _id }: any) => {
  const [value, setValue] = useState<any>();
  const dispath = useDispatch();
  const user = useSelector(((item: RootState) => item.auth.value)) as UserType
  const userId = reply.userId
  useEffect(() => {
    const getText = async () => {
      const { payload } = await dispath(getUser(userId));
      setValue(payload);
    };
    getText();
  }, [userId]);
  const like = (e) => {
    const NewUser = { ...reply }

    if (!user) {
      toas.error("Bạn cần phải đăng nhập để thực hiện chức năng này");
    } else {
      if (NewUser.dislike.find(like => like.userId === user._id)) {
        const filtered = NewUser.dislike.filter(obj => {
          return obj.userId !== user._id;
        });
        const newComment = { ...reply, dislike: [...filtered], like: [...reply.like, { userId: user._id, status: 'liked' }] }
        dispath(editdReplyCommentSlide(
          newComment
        ))
      } else if (NewUser.like.find(like => like.userId === user._id)) {
        const filtered = NewUser.like.filter(obj => {
          return obj.userId !== user._id;
        });
        const newComment = { ...reply, like: [...filtered] }
        dispath(editdReplyCommentSlide(
          newComment
        ))
      } else {
        const newComment = { ...reply, like: [...reply.like, { userId: user._id, status: 'liked' }] }

        try {
          dispath(editdReplyCommentSlide(
            newComment
          ))
        } catch (error: any) {
          toas.error(error.response.data);
        }
      }
    }
  };
  const dislike = (e) => {
    const NewUser = { ...reply }
    if (!user) {
      toas.error("Bạn cần phải đăng nhập để thực hiện chức năng này");
    } else {
      if (NewUser.like.find(like => like.userId === user._id)) {
        const filtered = NewUser.like.filter(obj => {
          return obj.userId !== user._id;
        });
        const newComment = { ...reply, like: [...filtered], dislike: [...reply.dislike, { userId: user._id, status: 'disliked' }] }
        dispath(editdReplyCommentSlide(
          newComment
        ))
      } else if (NewUser.dislike.find(dislike => dislike.userId === user._id)) {
        const filtered = NewUser.dislike.filter(obj => {
          return obj.userId !== user._id;
        });
        const newComment = { ...reply, dislike: [...filtered] }
        dispath(editdReplyCommentSlide(
          newComment
        ))
      } else {
        const newComment = { ...reply, dislike: [...reply.dislike, { userId: user._id, status: 'disliked' }] }

        try {
          dispath(editdReplyCommentSlide(
            newComment
          ))
        } catch (error: any) {
          toas.error(error.response.data);
        }
      }
    }
  };

  return (
    <>
      <div className='relative'>
        <div className='absolute top-5 left-5 rotate-90 text-xl '><EnterOutlined /></div>
        <div className="flex justify-between ml-9">
          <div className="p-1">
            <div className="flex gap-3 items-center">
              <img src={value?.img}
                className="object-cover w-12 h-12 rounded-full border-2 border-emerald-400  shadow-emerald-400" />
              <div>
                <h3 className='font-bold'>{value?.username}
                  <span className="text-sm text-gray-400 font-normal pl-3">{moment(reply.createdAt).local().fromNow()}</span>
                </h3>
                <Tooltip key="comment-basic-like" title="Like">
                  <span onClick={() => like(reply._id)} style={{ fontSize: '15px', cursor: 'pointer' }}>
                    {reply.like.find(like => like.userId === user._id) ? <LikeFilled /> : <LikeOutlined />}
                    <span className="comment-action pl-1">{reply.like.length}</span>
                  </span>
                </Tooltip>
                <Tooltip key="comment-basic-dislike" title="Dislike" >
                  <span className='pl-2' onClick={() => dislike(reply._id)} style={{ fontSize: '15px', cursor: 'pointer' }}>
                    {reply.dislike.find(dislike => dislike.userId === user._id) ? <DislikeFilled /> : <DislikeOutlined />}
                    <span className="comment-action pl-1">{reply.dislike.length}</span>
                  </span>
                </Tooltip>
              </div>
            </div>
            <div className='pl-14'>
              <p className="text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: `${reply.content}` }}></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const QuestionAnswer = () => {
  const [rating, setRating] = useState(3)
  const dispath = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const user = useSelector(((item: RootState) => item.auth.value)) as UserType
  const [form] = Form.useForm();
  const users = useSelector<any, any>(data => data.user.value);
  const comment = useSelector<any, any>(data => data.comment.value);
  useEffect(() => {
    dispath(getCommentList())
  }, []);
  console.log(user);
  const onFinish = async (values: any) => {

    try {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        dispath(addCommentSlide(
          {
            author: user.username,
            avatar: user.img,
            content: values.comment.content,
            rating: rating,
            userId: user._id
          }
        ))
        toas.success("Bình luận thành công");
        setValue('')
        form.resetFields();
      }, 1000);

    } catch (error: any) {
      toas.error(error.response.data);
    }

  };

  return (
    <>
      < CommentList comments={comment} />
      <Comment
        content={
          <div>
            <Form onFinish={onFinish} form={form}>
              <Form.Item name={['comment', 'rating']}>
                <Rate onChange={setRating} value={rating} defaultValue={3} />
              </Form.Item>
              <Form.Item name={['comment', 'content']}>
                <ReactQuill theme="snow" style={{ backgroundColor: 'white' }} />
              </Form.Item>
              <Form.Item>
                <Button loading={submitting} htmlType="submit" type="primary">
                  Bình luận
                </Button>
              </Form.Item>
            </Form>
          </div>
        }
      />
    </>
  )
}

export default QuestionAnswer