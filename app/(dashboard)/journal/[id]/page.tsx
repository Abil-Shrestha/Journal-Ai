import Editor from '@/components/Editor'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id: string) => {
    const user = await getUserByClerkID()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id,
            }
        },
    })
    return entry
}


const EntryPage = async ({ params }: any) => {
    const entry = await getEntry(params.id)
    const analysisData = [
        { name: 'Summary', value: '' },
        { name: 'Subject', value: '' },
        { name: 'Mood', value: '' },
        { name: 'Negative', value: 'false' },]

    return (
        <div className='h-full w-full grid grid-cols-3'>
            <div className='col-span-2'>
               { entry ? <Editor entry={entry} /> : <p> Loading...</p> }
            </div>
            <div className="border-l border-black/10">
                <div className='bg-purple-300 px-6 py-10'>
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

export default EntryPage