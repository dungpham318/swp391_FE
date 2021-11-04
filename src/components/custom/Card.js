import React, { useState, useEffect } from 'react'

const Card = (props) => {


  return (
    <div
      className={
        'flex flex-col flex-wrap justify-start items-start ' +
        'bg-white box-border border border-border rounded-lg ' +
        'px-12 py-5 mx-3 my-30 shadow-md ' +
        props.className
      }
      onClick={() => {
        // props.onClick()
      }}
    >
      <div className='w-full'>
        {props.children}
      </div>

    </div>
  )


}

export default Card
