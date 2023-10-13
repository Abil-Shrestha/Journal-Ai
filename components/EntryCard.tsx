
const EntryCard = ({entry}) => {
const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-neutral-300 shadow hover:scale-105">
      <div className="px-4 py-5 ">{date}</div>
      <div className="px-4 py-5 ">Journal Entry</div>
      <div className="px-4 py-4 ">{entry.content}</div>
    </div>
  )
}

export default EntryCard