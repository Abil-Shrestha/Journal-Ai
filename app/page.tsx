import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-black text-white">
      <div className='w-full max-w-[640px] mx-auto'>
        <h1 className='text-6xl mb-4'>The best Journal App</h1>
        <p className='text-2xl text-white/60 mb-4'>This is the best app for tracking your mood througout you life. All you have to do is be honest</p>
        <div>
          <Link href='/journal'>
            <button className='bg-purple-700 rounded-xl px-4 py-2 text-lg'>Get started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
