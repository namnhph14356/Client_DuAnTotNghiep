import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

const MenuOral = () => {
  const { dayId } = useParams();
  return (
    <div className="menu__exem__layout">
      <button>
        Bài thi từ vựng cơ bản 1 tuần
      </button>
      <NavLink to={`/learning/oral/${dayId}`} className="text-black">
        <button>
          Thi Oral phản xạ
        </button>
      </NavLink>
    </div>
  )
}

export default MenuOral