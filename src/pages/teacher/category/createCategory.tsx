import React from 'react'

const AddCategory = () => {
    return (
        <div className='form__category__teacher'>
            <h2>
                Quản lý video bài giảng/Create
            </h2>
            <div className="form__add__category">
                <form action="">
                    <div className="item__form">
                        <label htmlFor="">Tên video</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="btn__">
                        <button>
                            Submit
                        </button>
                        <button>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCategory