import { Button, Image, Input, InputRef, message, Modal, Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import AdminPageHeader from '../../../components/AdminPageHeader';
import { getCommentList, removeCommentSlice } from '../../../features/Slide/comment/CommentSlice';
import { Helmet } from "react-helmet";
import moment from 'moment';
import { CommentType } from '../../../types/comment';
import { getListDaySlice } from '../../../features/Slide/day/DaySlice';
import { getListPracticeActivitylice } from '../../../features/Slide/practiceActivity/PracticeActivitySlice';
import { ColumnsType } from 'antd/lib/table';
import { getReplyCommentList, removeReplyCommentSlice } from '../../../features/Slide/comment/ReplySilce';
import { ReplyCommentType } from '../../../types/replycomment';
import { StarFilled, SearchOutlined } from '@ant-design/icons'
import { ColumnType, FilterConfirmProps } from 'antd/lib/table/interface';
import { DayType } from '../../../types/day';

type Props = {}

type DataIndex = keyof CommentType;
interface type {
    id?: number,
    type: string,
    title: string
}
const Rating = [
    { id: 1, value: 5, text: '5 Sao' },
    { id: 2, value: 4, text: '4 Sao' },
    { id: 3, value: 3, text: '3 Sao' },
    { id: 3, value: 2, text: '2 Sao' },
    { id: 3, value: 1, text: '1 Sao' }
]

const ListComment = (props: Props) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selected, setSelected] = useState<{ key: number, id: number | undefined }[]>([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const comment = useAppSelector(data => data.comment.value)
    const day = useAppSelector(data => data.day.value)
    const prativeActivity = useAppSelector(data => data.practiceActivity.value)
    const replyComment = useAppSelector(data => data.reply.value)
    const dispath = useAppDispatch();
    const searchInput = useRef<InputRef>(null);



    const onRemoveContact = (id: any) => {
        Modal.confirm({
            title: "Bạn có muốn xóa bình luận này ?",
            onOk: () => {
                dispath(removeCommentSlice(id))
                const fil = replyComment.filter((item: ReplyCommentType) => item.commentId === id)
                fil.map((e: ReplyCommentType) => {
                    dispath(removeReplyCommentSlice(e._id))
                });
                message.success("Xóa thành công")
            }
        })

    }
    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleOk = async (id) => {
        const key = 'updatable';

        dispath(removeReplyCommentSlice(id))

        message.success({ content: 'Xóa Thành Công!', key, duration: 2 });
    };
    const handleCancel = () => {
        message.error('Hủy Hành Động!');
    };
    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex: any): ColumnType<CommentType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Tìm Kiếm ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Tìm
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Xóa
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Lọc
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record: any) => {
            return record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase())
        }

    });
    const dataSourd = comment.map((item: CommentType, index: number) => {
        return {
            key: index + 1,
            _id: item._id,
            author: item.author,
            avatar: item.avatar,
            content: item.content,
            day: day.filter((day: any) => day._id === item.dayId).reduce((result: any, item: any) => { return `${result}${item.title}` }, ""),
            post: prativeActivity.filter((day: any) => day._id === item.postId).reduce((result: any, item: any) => { return `${result}${item.title}` }, ""),
            rating: item.rating,
            userId: item.userId,
            like: item.like,
            dislike: item.dislike,
            createdAt: moment(item.createdAt).format("DD/MM/YYYY"),
        }
    })

    const headings: ColumnsType<any> = [
        { title: "STT", dataIndex: "key", key: "key" },
        {
            title: 'Ảnh đại diện', key: 'avatar',
            render: (record) => (
                <div className="">
                    <Image
                        width={80}
                        height={80}
                        src={record.avatar}
                    />
                </div>
            )
        },
        { title: "Tên người dùng", dataIndex: "author", key: "author", ...getColumnSearchProps('author'), },
        { title: "Bình luận", dataIndex: "content", key: "content", render: (item: any) => (<p dangerouslySetInnerHTML={{ __html: `${item}` }}></p>), ...getColumnSearchProps('content') },
        { title: "Phần học", dataIndex: "post", key: "post" },
        {
            title: "Ngày bài học", dataIndex: "day", key: "day", className: 'w-[130px]',
            filters: day.map((item: type) => { return { text: item.title, value: item.title } }),
            onFilter: (value, record) => {
                return record.day == value
            }
        },
        {
            title: "Đánh giá", dataIndex: "rating", key: "rating", render: (item: any) => (
                <div className='flex my-auto'>
                    <span className='px-1 mt-[5px]'>{item}</span>
                    <span className='text-yellow-500 text-base'><StarFilled /></span>
                </div>
            ),
            filters: Rating.map((item: any) => { return { text: item.text, value: item.value } }),
            onFilter: (value, record) => {
                return record.rating == value
            }
        },
        {
            title: 'Ngày bình luận',
            dataIndex: 'createdAt',
            key: "createdAt",
            className: 'w-[130px]',
            render: ((value) => (
                <Tooltip title={value}>
                    <span>{value}</span>
                </Tooltip>
            ))

        },
        {
            title: "Hành động",
            key: 'action',
            render: (recore: any) => (
                <Space size="middle">
                    <Button type="primary" danger onClick={() => onRemoveContact(recore._id)} >Xóa</Button>
                </Space>
            )
        }
    ]
    const expandedRowRender = (row: any) => {
        const columns2: ColumnsType<ReplyCommentType> = [
            { title: 'Key', dataIndex: 'key', key: 'key', className: "hidden" },
            { title: 'STT', dataIndex: 'stt', key: 'stt' },
            {
                title: 'Hình ảnh', dataIndex: 'avatar', key: 'avatar',
                render: (record) => (
                    <div className="">
                        {record ?
                            <Image width={60} height={60} src={record} />
                            : ""}
                    </div>
                )
            },
            { title: 'Tên người dùng', dataIndex: 'author', key: 'author' },
            { title: 'Bình luận', dataIndex: 'content', key: 'content' },
            { title: 'Ngày bình luận', dataIndex: 'createAt', key: 'createAt' },
            {
                title: 'Hành động',
                key: "action", render: (text, record) => (
                    <Popconfirm
                        placement="topRight"
                        title="Bạn Có Muốn Xóa?"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => { handleOk(record._id) }}
                        onCancel={handleCancel}
                    >
                        <Button type="primary" danger >
                            Xóa
                        </Button>
                    </Popconfirm>
                ),

            },
        ];

        let data: any = replyComment.filter((item1: any) => item1.commentId === row._id).map((item: ReplyCommentType, index) => {
            return {
                key: item._id,
                stt: index + 1,
                _id: item._id,
                author: item.author,
                userId: item.userId,
                postId: item.postId,
                avatar: item.avatar,
                createAt: moment(item.createdAt).format("DD/MM/YYYY"),
                content: item.content,
                commentId: item.commentId
            }
        })

        return (
            <div>
                <Table bordered columns={columns2} dataSource={data} pagination={false} />
            </div>
        )
    }


    useEffect(() => {
        dispath(getCommentList())
        dispath(getListDaySlice())
        dispath(getListPracticeActivitylice())
        dispath(getReplyCommentList())
    }, []);
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Quản Lí Bình luận | Vian English</title>
            </Helmet>
            <AdminPageHeader breadcrumb={"Danh sách bình luận"} />
            <Table columns={headings} expandable={{ expandedRowRender }} dataSource={dataSourd}></Table>
        </div>
    )
}

export default ListComment