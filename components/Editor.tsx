'use client'
import { updateEntry } from '@/utils/api';
import { useState } from 'react'
import { useAutosave } from 'react-autosave';
import Spinner from './Spinner';



const Editor = ({entry}:any) => {
    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)
    const [ai,setAi] = useState(entry.analysis)
    const { mood , summary, color, subject, negative } = ai
    const analysisData = [
        { name: 'Summary', value: summary },
        { name: 'Subject', value: subject },
        { name: 'Mood', value: mood },
        { name: 'Negative', value: negative ? 'True' : 'False'},]

        
    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const data  = await updateEntry(entry.id, _value)
            setAi(data.analysis)
            setIsLoading(false)
        }
    })

    return (
        <div className="w-full h-full grid grid-cols-3 gap-0 relative">
            <div className="col-span-2">
            {isLoading && <div className="text-xl mt-10 outline-none flex items-center justify-center"> <Spinner /></div>}
            <textarea
                className="w-full h-full p-8 text-xl outline-none"
                value={value}
                onChange={e => setValue(e.target.value)} />
            </div>
            <div className="border-l border-black/10">
                <div className=' px-6 py-10' style={{backgroundColor: color}}>
                    <p>AI Summary</p>
                </div>
                <div>
                        <ul>
                        {analysisData.map((item) => (
                            <li
                                key={item.name}
                                className="flex items-center justify-between px-2 py-4 border-b border-t border-black/10 "
                            >
                                <span className='text-lg font-semibold '>{item.name}</span>
                                <span>{item.value} </span>
                            </li>
                        ))}
                        </ul>
                </div>
            </div>
        </div>
    )
}

export default Editor