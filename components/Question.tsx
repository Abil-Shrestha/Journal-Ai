'use client'
import { askQuestion } from '@/utils/api'
import React, { useState } from 'react'
import Spinner from './Spinner';

const Question = () => {
    const [value,setValue] = useState('')
    const [loading,setLoading] = useState(false)
    const [response,setResponse] = useState()
    const onChange= (e:any) => {
        setValue(e.target.value)
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        setLoading(true)
        const answer = await askQuestion(value)
        setResponse(answer)
        setValue('')
        setLoading(false)
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
            disabled={loading}
            onChange={onChange}
            type="text"
            placeholder="ask a question"
            value={value}
            className='border border-black/20 px-4 py-2 text-lg rounded-lg '/>
            <button 
            disabled={loading}
            type="submit" 
            className='bg-neutral-400/20 px-4 py-2 rounded-lg text-lg ml-2'>Ask</button>
        </form>
        {loading && <div className="text-xl mt-10 outline-none flex items-center justify-center"> <Spinner /></div>}
        {response && <div>{response}</div>}
    </div>
  )
}

export default Question