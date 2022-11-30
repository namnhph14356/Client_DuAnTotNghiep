import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

const MenuOralSaying = () => {
  const { dayId } = useParams();

  return (
    <div>
      <div className="menu__exem__layout">
        <button>
          Bài thi Câu nói thông dụng Tuần 1
        </button>
        <NavLink to={`/learning/oral/${dayId}`} className="text-black">
          <button>
            Thi Oral phản xạ
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default MenuOralSaying
