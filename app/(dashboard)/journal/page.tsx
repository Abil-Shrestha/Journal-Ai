import NewEntryCard from '@/components/NewEntryCard'
import EntryCard from '@/components/EntryCard'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'
import { analyse } from '@/utils/ai.ts'


const getEntries = async () => {
  const user = await getUserByClerkID()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  console.log(
    await analyse('Today was a great day.I went to the beach and ate a lot of ice cream.')
  )
  return entries
}
const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className='p-10 bg-neutral-500/10 h-full'>
      <h1 className='text-3xl mb-8'>Journal Entries</h1>
      <div className='grid grid-cols-3 gap-4 p-10'>
        <NewEntryCard />
        {entries.map(entry => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard key={entry.id} entry={entry} />
          </Link>
        )
        )}
      </div>
    </div>
  )
}

export default JournalPage