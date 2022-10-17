import React, { createElement, useEffect, useState } from 'react'
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { addCommentSlide, editdCommentSlide, getCommentList, removeCommentSlice, updateLikeSlice } from '../../features/Slide/comment/CommentSlice';
import toas from 'toastr';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, List, Comment, Tooltip, Rate, Card, Popconfirm } from 'antd';
import moment from 'moment';
import { CommentType } from '../../types/comment';
import 'moment/locale/vi'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addReplyCommentSlide, editdReplyCommentSlide, getReplyCommentList, removeReplyCommentSlice } from '../../features/Slide/comment/ReplySilce';
const { TextArea } = Input;
interface CommentItem {
  author: string;
  avatar: string;
  content: React.ReactNode;
  datetime: string;
}
interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}
const CommentList = ({ comments }: { comments: CommentType[] }) => {
  const dispath = useDispatch();
  const replyy = useSelector<any, any>(data => data.reply.value);
  useEffect(() => {
    dispath(getReplyCommentList())
  }, []);

  return (
    <div className="w-fullbg-white rounded-lg border p-1 md:p-3">
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

  )
}

const CommentItem = ({ item }: any) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string | null>(null);
  const [cmt, setCmt] = useState<any>();
  const dispath = useDispatch();
  const [reply, setReply] = React.useState(false)
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const replyy = useSelector<any, any>(data => data.reply.value);
  useEffect(() => {
    dispath(getReplyCommentList())
  }, []);
  useEffect(() => {
    setCmt(item)
  })
  const id = item._id
  const fil = replyy.filter(item => item.commentId === id)


  const isAuthenticate = () => {
    if (!localStorage.getItem('user')) return;
    return JSON.parse(localStorage.getItem('user') as string);
  }
  const user = isAuthenticate()

  const like = (e) => {
    const NewUser = { ...item }

    if (!user) {
      toas.error("Bạn cần phải đăng nhập để thực hiện chức năng này");
    } else {
      if (NewUser.dislike.find(like => like.userId === user.user._id)) {
        const filtered = NewUser.dislike.filter(obj => {
          return obj.userId !== user.user._id;
        });
        const newComment = { ...cmt, dislike: [...filtered], like: [...cmt.like, { userId: user.user._id, status: 'liked' }] }
        console.log(newComment);
        dispath(editdCommentSlide(
          newComment
        ))
      } else if (NewUser.like.find(like => like.userId === user.user._id)) {
        const filtered = NewUser.like.filter(obj => {
          return obj.userId !== user.user._id;
        });
        const newComment = { ...cmt, like: [...filtered] }
        dispath(editdCommentSlide(
          newComment
        ))
      } else {
        const newComment = { ...cmt, like: [...cmt.like, { userId: user.user._id, status: 'liked' }] }

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
      if (NewUser.like.find(like => like.userId === user.user._id)) {
        const filtered = NewUser.like.filter(obj => {
          return obj.userId !== user.user._id;
        });
        const newComment = { ...cmt, like: [...filtered], dislike: [...cmt.dislike, { userId: user.user._id, status: 'disliked' }] }
        dispath(editdCommentSlide(
          newComment
        ))
      } else if (NewUser.dislike.find(dislike => dislike.userId === user.user._id)) {
        const filtered = NewUser.dislike.filter(obj => {
          return obj.userId !== user.user._id;
        });
        const newComment = { ...cmt, dislike: [...filtered] }
        dispath(editdCommentSlide(
          newComment
        ))
      } else {
        const newComment = { ...cmt, dislike: [...cmt.dislike, { userId: user.user._id, status: 'disliked' }] }

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
            author: user.user.username,
            userId: user.user._id,
            avatar: 'https://joeschmoe.io/api/v1/random',
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
  const deleteComment = (id) => {
    dispath(removeCommentSlice(id))
    toas.success('Xóa thành công');
  };

  const cancel = () => {
    return false
  };

  return (
    <div>
      <div>
        <div className="flex w-full justify-between border rounded-md">

          <div className="p-3">
            <div className="flex gap-3 items-center">
              <img src={item.avatar}
                className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400" />
              <h3 className="font-bold">
                {item.author}
                <br />
                <span className="text-sm text-gray-400 font-normal">{moment(item.createdAt).local().fromNow()}</span>
                <span style={{ fontSize: '10px', marginLeft: '10px' }}><Rate style={{ fontSize: '150%' }} disabled defaultValue={item.rating} /></span>
              </h3>
            </div>
            <p className="text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: `${item.content}` }}>
            </p>
            <Tooltip key="comment-basic-like" title="Like">
              <span onClick={() => like(item._id)} style={{ fontSize: '15px', cursor: 'pointer' }}>
                {item.like.find(like => like.userId === user.user._id) ? <LikeFilled /> : <LikeOutlined />}
                <span className="comment-action">{item.like.length}</span>
              </span>
            </Tooltip>,
            <Tooltip key="comment-basic-dislike" title="Dislike" >
              <span onClick={() => dislike(item._id)} style={{ fontSize: '15px', cursor: 'pointer' }}>
                {item.dislike.find(dislike => dislike.userId === user.user._id) ? <DislikeFilled /> : <DislikeOutlined />}
                <span className="comment-action">{item.dislike.length}</span>
              </span>
            </Tooltip>
            <button className="text-right text-blue-500 ml-1" onClick={() => setReply(!reply)}>Trả lời</button>

          </div>
          <div className="flex flex-col items-end gap-3 pr-3 py-3">
            {item.userId === user.user._id ?
              <Popconfirm
                placement="bottomLeft"
                title="Bạn có muốn xóa bình luận này"
                onConfirm={() => {
                  deleteComment(item._id);
                }}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <span style={{ marginLeft: '5px', cursor: 'pointer', color: '#DC143C' }}>Xóa</span>
              </Popconfirm>
              : null
            }
          </div>
        </div>
        <div>
          {fil.map((reply) => {
            return (
              <ReplyComment reply={reply} cmt={cmt} _id={id} />
            )
          })}
        </div>
        <div className='ml-10 mt-5'>
          {reply ?
            <div>
              <Form onFinish={onFinish}>
                <Form.Item name={['replycomment', 'content']}>
                  <ReactQuill theme="snow" style={{ backgroundColor: 'white' }} />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Bình luận
                  </Button>
                </Form.Item>
              </Form>
            </div>
            : null
          }
        </div>
      </div>

    </div>
  )

}
const ReplyComment = ({ reply, cmt, _id }: any) => {
  const dispath = useDispatch();

  const isAuthenticate = () => {
    if (!localStorage.getItem('user')) return;
    return JSON.parse(localStorage.getItem('user') as string);
  }
  const user = isAuthenticate()
  const cancel = () => {
    return false
  };
  const deleteReply = (id) => {
    dispath(removeReplyCommentSlice(id))
    toas.success('Xóa thành công');
  }
  const like = (e) => {
    const NewUser = { ...reply }

    if (!user) {
      toas.error("Bạn cần phải đăng nhập để thực hiện chức năng này");
    } else {
      if (NewUser.dislike.find(like => like.userId === user.user._id)) {
        const filtered = NewUser.dislike.filter(obj => {
          return obj.userId !== user.user._id;
        });
        const newComment = { ...reply, dislike: [...filtered], like: [...reply.like, { userId: user.user._id, status: 'liked' }] }
        dispath(editdReplyCommentSlide(
          newComment
        ))
      } else if (NewUser.like.find(like => like.userId === user.user._id)) {
        const filtered = NewUser.like.filter(obj => {
          return obj.userId !== user.user._id;
        });
        const newComment = { ...reply, like: [...filtered] }
        dispath(editdReplyCommentSlide(
          newComment
        ))
      } else {
        const newComment = { ...reply, like: [...reply.like, { userId: user.user._id, status: 'liked' }] }

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
      if (NewUser.like.find(like => like.userId === user.user._id)) {
        const filtered = NewUser.like.filter(obj => {
          return obj.userId !== user.user._id;
        });
        const newComment = { ...reply, like: [...filtered], dislike: [...reply.dislike, { userId: user.user._id, status: 'disliked' }] }
        dispath(editdReplyCommentSlide(
          newComment
        ))
      } else if (NewUser.dislike.find(dislike => dislike.userId === user.user._id)) {
        const filtered = NewUser.dislike.filter(obj => {
          return obj.userId !== user.user._id;
        });
        const newComment = { ...reply, dislike: [...filtered] }
        dispath(editdReplyCommentSlide(
          newComment
        ))
      } else {
        const newComment = { ...reply, dislike: [...reply.dislike, { userId: user.user._id, status: 'disliked' }] }

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
      <div className="text-gray-300 font-bold pl-20">|</div>
      <div className="flex justify-between border ml-9  rounded-md">
        <div className="p-3">
          <div className="flex gap-3 items-center">
            <img src={reply.avatar}
              className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400" />
            <h3 className="font-bold">
              {reply.author}
              <br />
              <span className="text-sm text-gray-400 font-normal">{moment(reply.createdAt).local().fromNow()}</span>
            </h3>
          </div>
          <p className="text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: `${reply.content}` }}>
          </p>
          <Tooltip key="comment-basic-like" title="Like">
            <span onClick={() => like(reply._id)} style={{ fontSize: '15px', cursor: 'pointer' }}>
              {reply.like.find(like => like.userId === user.user._id) ? <LikeFilled /> : <LikeOutlined />}
              <span className="comment-action">{reply.like.length}</span>
            </span>
          </Tooltip>,
          <Tooltip key="comment-basic-dislike" title="Dislike" >
            <span onClick={() => dislike(reply._id)} style={{ fontSize: '15px', cursor: 'pointer' }}>
              {reply.dislike.find(dislike => dislike.userId === user.user._id) ? <DislikeFilled /> : <DislikeOutlined />}
              <span className="comment-action">{reply.dislike.length}</span>
            </span>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-3 pr-3 py-3">
          {reply.userId === user.user._id ?
            <Popconfirm
              placement="bottomLeft"
              title="Bạn có muốn xóa bình luận này"
              onConfirm={() => {
                deleteReply(reply._id);
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <span style={{ marginLeft: '5px', cursor: 'pointer', color: '#DC143C' }}>Xóa</span>
            </Popconfirm>
            : null
          }
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
  const isAuthenticate = () => {
    if (!localStorage.getItem('user')) return;
    return JSON.parse(localStorage.getItem('user') as string);
  }
  const user = isAuthenticate()
  const comment = useSelector<any, any>(data => data.comment.value);
  useEffect(() => {
    dispath(getCommentList())
  }, []);
  const onFinish = async (values: any) => {
    try {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        dispath(addCommentSlide(
          {
            author: user.user.username,
            avatar: 'https://joeschmoe.io/api/v1/random',
            content: values.comment.content,
            rating: rating,
            userId: user.user._id
          }
        ))
        toas.success("Bình luận thành công");

      }, 1000);

    } catch (error: any) {
      toas.error(error.response.data);
    }

  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const handleClick = () => {
    setValue('')
  }


  return (
    <>
      < CommentList comments={comment} />
      <Comment
        avatar={
          <div>
            {!user ? '' : <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
          </div>
        }
        content={
          <div>
            {!user ? (<Form.Item name={['comment', 'content']}>
              <List.Item.Meta
                description={
                  <Card style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '20px' }}>Bạn cần phải đăng nhập để bình luận</h1>
                    <NavLink to="/login"><Button type='primary' style={{ backgroundColor: 'black', marginRight: '30px' }}>Đăng nhập</Button></NavLink>
                    <NavLink to="/register"><Button type='primary'>Đăng ký</Button></NavLink>
                  </Card>
                }
              ></List.Item.Meta>


            </Form.Item>) : (
              <Form onFinish={onFinish}>

                <Form.Item name={['comment', 'rating']}>
                  <Rate onChange={setRating} value={rating} defaultValue={3} />
                </Form.Item>
                <Form.Item name={['comment', 'content']}>
                  <ReactQuill theme="snow" style={{ backgroundColor: 'white' }} />
                </Form.Item>
                <Form.Item>
                  <Button loading={submitting} htmlType="submit" onClick={handleClick} type="primary">
                    Bình luận
                  </Button>
                </Form.Item>
              </Form>

            )}
          </div>
        }
      />
    </>
  )
}

export default QuestionAnswer