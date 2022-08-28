import { Button, Modal, Space, Table } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getCategoryList, removeCate } from '../../../features/Slide/category/CategorySlide'
// import { getCategoryList, removeCate } from '../../features/category/CategorySlide'
// import { CategoryType } from '../../types'

const List = () => {
    const category =  useSelector<any, any>(data => data.category.value);
    const dispath = useDispatch();
    console.log(category);
    
    const onRemoveCate = (id:any) => {
        Modal.confirm({
            title:"You want to delete this category ?",
            onOk:() => {
                dispath(removeCate(id))
            }
            
        })
        
    }
    useEffect( () => {
        dispath(getCategoryList())
    }, []);

    // console.log(category);

    // title 
    const headings = [
        { title: "STT", dataIndex: "stt", key: "stt" },
        { title: "Title", dataIndex: "title", key: "title" },
        { title: "Image", dataIndex: "image", key: "image" },
        { title: "Desc", dataIndex: "detail", key: "detail" },
        {
            title: "Action",
            key: 'action',
            render: (recore: any) => (
                <Space size="middle">
                    {/* <a href='edit/:id' >Edit</a> */}
                    <NavLink type="primary" to={'/admin/category/edit/' + recore.id}><Button type="primary" >Edit</Button></NavLink>
                    {/* <button onClick={ () => onRemove(id)}>Remove</button> */}
                    <Button type="primary" danger onClick={() => onRemoveCate(recore.id)} >Delete</Button>
                </Space>
            )
        }
    ]

    // data
    const dataSourd = category?.map((item: any, index: any) => {
        console.log(item);
        return {
            key: index + 1,
            stt: index + 1,
            title: item.title,
            image: <img src={item.image} alt="" style={{ width: "100px" }} />,
            detail: item.detail,
            id: item._id,
        }
    })


    return (
        <div>

            <h1>Category Manager</h1>
            <button className='btnAdmin border px-4 py-1 bg-green-600 my-4 '><NavLink to="/admin/category/add" className="text-white">Add Category</NavLink></button>

            <Table columns={headings} dataSource={dataSourd}></Table>

        </div>
    )
}

export default List