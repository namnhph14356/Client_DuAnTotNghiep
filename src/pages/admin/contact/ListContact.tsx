import { Button, Modal, Space, Table, Tag } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getContactList, removeContacts } from '../../../features/Slide/contact/ContactSlide'
// import { getCategoryList, removeCate } from '../../features/category/CategorySlide'
// import { CategoryType } from '../../types'

const ListContact = () => {
    const contact = useSelector<any, any>(data => data.contact.value);
    const dispath = useDispatch();

    const onRemoveContact = (id: any) => {
        Modal.confirm({
            title: "You want to delete this Contact ?",
            onOk: () => {
                dispath(removeContacts(id))
            }
        })

    }
    useEffect(() => {
        dispath(getContactList())
    }, []);
console.log(contact);

    // console.log(category);

    // title 
    const headings = [
        { title: "STT", dataIndex: "stt", key: "stt" },
        { title: "Họ", dataIndex: "surname", key: "surname" },
        { title: "Tên", dataIndex: "name", key: "name" },
        { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Địa chỉ", dataIndex: "address", key: "address" },
        { title: "Lời nhắn", dataIndex: "message", key: "message" },

        {
            title: "Trạng thái", dataIndex: "status", key: "status", render: (_: any, { status }: any) => (
                <>
                    {status == "0"
                        ? <Tag color="volcano">Chưa liên hệ</Tag>
                        : status == "1"
                            ? <Tag color="geekblue">Đã liên hệ</Tag>
                            : status == "2"
                                ? <Tag color="yellow">Không liên hệ được</Tag>
                                : status == "3"
                                    ? <Tag color="green">Hẹn liên hệ sau</Tag>
                                    : ""
                    }


                </>
            ),
        },
        {
            title: "Gửi quảng cáo", dataIndex: "sendAds", key: "sendAds", render: (_: any, { sendAds }: any) => (
                <>
                    {sendAds == "0"
                        ? <Tag color="volcano">Không cho phép</Tag>
                        : sendAds == "1"
                            ? <Tag color="green">Cho phép</Tag>
                            : ""
                    }


                </>),
        },

        {
            title: "Action",
            key: 'action',
            render: (recore: any) => (
                <Space size="middle">
                    {/* <a href='edit/:id' >Edit</a> */}
                    <NavLink type="primary" to={'/admin/contact/edit/' + recore.id}><Button type="primary" >Edit</Button></NavLink>
                    {/* <button onClick={ () => onRemove(id)}>Remove</button> */}
                    <Button type="primary" danger onClick={() => onRemoveContact(recore.id)} >Delete</Button>
                </Space>
            )
        }
    ]

    // data
    const dataSourd = contact?.map((item: any, index: any) => {
        // console.log(item);
        return {
            key: index + 1,
            stt: index + 1,
            surname: item.surname,
            name: item.name,
            phone: item.phone,
            email: item.email,
            address: item.address,
            message: item.message,
            status: item.status,
            sendAds: item.sendAds,

            id: item._id,
        }
    })


    return (
        <div>

            <h1>Contact Manager</h1>

            <Table columns={headings} dataSource={dataSourd}></Table>

        </div>
    )
}

export default ListContact