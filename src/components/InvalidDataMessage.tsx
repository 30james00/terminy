import React from 'react'

interface IProps {
  message: string,
}

const InvalidDataMessage:React.FC<IProps> = ({message}) => {
  return (
    <div className='m-2 px-7 py-2 bg-gray-100 rounded-md'>
      <p className='text-sm text-gray-700'>{message}</p>
    </div>
  )
}

export default InvalidDataMessage
