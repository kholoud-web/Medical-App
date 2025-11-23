import React from 'react'

function Header() {
  const date = dayjs().format('dddd, MMMM D, YYYY');
  return (
    <>
    <div className='flex flex-col gap-1 p-7 bg-white drop-shadow-lg '>
        <h1 className='font-bold text-xl text-neutral-700'>Good morning, Dr.Ahmed!</h1>
        <p className='font-normal text-lg text-neutral-600'>{date}</p>
    </div>

    </>
  )
}

export default Header