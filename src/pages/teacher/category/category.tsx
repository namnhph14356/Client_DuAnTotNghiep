import React from 'react'

const CategoryList = () => {
    return (
        <div className='table__categories__teacher'>
            <div className="header__categories__teacher">
                <div className="">
                    <h2>
                        categories/list
                    </h2>
                </div>
                <div className="">
                    <button className='btn__category__teacher'>
                        publish
                    </button>
                </div>
            </div>
            <table className='table__admin__teacher'>
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            NAME
                        </th>
                        <th>
                            ACTION
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            2
                        </td>
                        <td>
                            Family
                        </td>
                        <td>
                            <button className='btn__edit__teacher'>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button className='btn__delete__teacher'>
                                <i className="fa-solid fa-delete-left"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="btn__next__category">
                <button>
                    <i className="fa-solid fa-angle-left"></i>
                </button>
                <button>
                    1
                </button>
                <button>
                    2
                </button>
                <button>
                    <i className="fa-solid fa-angle-right"></i>
                </button>
            </div>
        </div>
    )
}

export default CategoryList
