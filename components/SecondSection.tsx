import React from 'react'
import Image from 'next/image'

function SecondSection() {
  return (
    <div className='w-full px-4 md:px-10'>

        <div className='justify-center flex'>
            <Image className='rounded-xl hover:shadow-lg dark:shadow-neutral-900 shadow-md transiti ease-linear duration-100 md:rounded-3xl' width={1280} height={720} src="/612shots_so.png" alt="" />
        </div>
    </div>
  )
}

export default SecondSection