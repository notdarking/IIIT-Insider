import React from 'react'
import { NavLink } from 'react-router-dom'

const Button = ({name,path}) => {
  return (
    <div>
        <NavLink
            to={path}
            className={({isActive})=>`{
                px-4 py-1 font-semibold transition-all rounded-xl active:tracking-tight cursor-pointer
                ${
                    isActive 
                    ? "bg-yellow-400/30 text-yellow-200"
                    : "text-yellow-100 hover:bg-yellow-400/20"
                }
            }`}
        >
            {name}
        </NavLink>
    </div>
  )
}

export default Button
