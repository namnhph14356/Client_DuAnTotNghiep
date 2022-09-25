import React, { createElement, useState } from 'react'
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import ReactStars from "react-rating-stars-component";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCommentSlide } from '../../features/comment/CommentSlice';
import toas from 'toastr';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, List, Comment, Tooltip } from 'antd';
import moment from 'moment';
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
const CommentList = ({ comments }: { comments: CommentItem[] }) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState<string | null>(null);
    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };
    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={dislike}>
                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                <span className="comment-action">{dislikes}</span>
            </span>
        </Tooltip>,
    ];

    return (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={props =>
                <Comment
                    actions={actions}
                    {...props} />
            }
        />
    )
}
const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => {
    return (
        <>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    Add Comment
                </Button>
            </Form.Item>
        </>
    )

};

const CommentBox = () => {
    const [rating, setRating] = useState(0)
    const dispath = useDispatch();
    const navigate = useNavigate();

    const [comments, setComments] = useState<CommentItem[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    const handleSubmit = async () => {
        if (!value) return;

        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
            setValue('');
            setComments([
                ...comments,
                {
                    author: 'Han Solo',
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    content: <p>{value}</p>,
                    datetime: moment('2016-11-22').fromNow(),
                },
            ]);
        }, 1000);
        
    };
    console.log(comments);
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };



    const ratingStar = {
        size: 30,
        value: 2.5,
        edit: true,
        onChange: (newValue) => {
            console.log(`Example 2: new value is ${newValue}`);
            setRating(newValue)
        }
    };
    console.log(rating);
    const isAuthenticate = () => {
        if (!localStorage.getItem('user')) return;
        return JSON.parse(localStorage.getItem('user') as string);
    }
    const user = isAuthenticate()

    const onFinish = async (values: any) => {
        try {
            dispath(addCommentSlide(
                {
                    surname: values.contact.surname,
                    name: values.contact.name,
                    address: values.contact.address,
                    birthday: values.contact.birthday,
                    email: values.contact.email,
                    phone: values.contact.phone,
                    message: values.contact.message,
                    status: 0,
                    sendAds: values.contact.sendAds || 0
                }
            ))

            toas.success("Gửi biểu mẫu thành công");



        } catch (error: any) {
            toas.error(error.response.data);
        }

    };
    return (
        <>
            <ReactStars {...ratingStar} />

            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
        </>
    )
}

export default CommentBox