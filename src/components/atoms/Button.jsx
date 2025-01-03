import React from 'react'

const Button = ({text, value, sendClick}) => {
  const handleClick = () => {
    sendClick(value); // Mengirimkan kembali nilai yang diterima dari parent
  };
  return (
    <button onClick={handleClick} className='px-6 py-2 rounded-lg bg-blue-900 font-medium text-white text-sm'>{text}</button>
  )
}

export default Button