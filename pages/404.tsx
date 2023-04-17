import React from 'react'
import Image from 'next/image'
import img404 from '../utils/404.png'

const page404 = () => {
    return (
        <div className=' flex justify-center items-center flex-col p-5 mt-10 font-bold'>
            <h1 className='text-6xl text-[#f51997]'>
                404
            </h1>
            <Image
                src={img404}
                alt='404'
                className='rounded-xl my-5'
                width={300}
                height={300}
            />

            <span className='text-sm sm:text-xl mt-5 text-gray-500 text-center'>
                We could't find this page..
            </span>
        </div>

    )
}

export default page404