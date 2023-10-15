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
        include:{
            analysis: true
        },
    })

    return entry
}


const EntryPage = async ({ params }: any) => {
    const entry = await getEntry(params.id)
    return (
        <div className='h-full w-full'>
               { entry ? <Editor entry={entry} /> : <p> Loading...</p> }
        </div>
    )
}

export default EntryPage