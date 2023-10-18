'use client'
import React, { useState } from 'react'

const Question = () => {
    const [value,setValue] = useState('')
    const onChange= (e:any) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
            onChange={onChange}
            type="text"
            placeholder="ask a question"
            value={value}
            className='border border-black/20 px-4 py-2 text-lg rounded-lg '/>
            <button 
            type="submit" 
            className='bg-neutral-400/20 px-4 py-2 rounded-lg text-lg ml-2'>Ask</button>
        </form>
    </div>
  )
}

export default Question