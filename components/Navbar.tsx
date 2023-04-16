import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'

import Logo from '../utils/tiktung-logo.png'
import { createOrGetUser } from '../utils';

import useAuthStore from '../store/authStore'

const Navbar = () => {
    const { userProfile, addUser, removeUser } = useAuthStore()

    const [searchValue, setSearchValue] = useState<string | string[]>('')

    const router = useRouter()

    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        if (searchValue) {
            router.push(`/search/${searchValue}`)
        }

        setSearchValue('')
    }

    return (
        <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
            <Link href='/'>
                <div className='w-[100px] md:w-[130px]'>
                    <Image
                        src={Logo}
                        alt='TikTung'
                        className='cursor-pointer w-[100%] h-[100%]'
                    />
                </div>
            </Link>
            <div className='relative hidden md:block'>
                <form
                    onSubmit={handleSearch}
                    className='absolute md:static top-10 left-20 bg-white'
                >
                    <input
                        className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0'
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='Search accounts and videos'
                    />
                    <button
                        onClick={handleSearch}
                        className='bg-primary absolute md:right-2 right-6 top-4 border-l-2 border-gray-300 px-4 rounded-br-full rounded-tr-full text-2xl text-gray-400'
                    >
                        <BiSearch />
                    </button>
                </form>
            </div>
            <div>
                {userProfile ? (
                    <div className='flex items-center gap-5 md:gap-10'>
                        <Link href='/upload'>
                            <button className='flex border-2 px-2 py-1 md:px-4 text-md font-semibold items-center justify-center gap-2 cursor-pinter'>
                                <IoMdAdd className='text-xl' /> {' '}
                                <span className='hidden md:block'>Upload</span>
                            </button>
                        </Link>
                        {userProfile?.image && (
                            <Link href={`/profile/${userProfile._id}`}>
                                <>
                                    <Image
                                        width={40}
                                        height={40}
                                        src={userProfile?.image}
                                        alt='profile-photo'
                                        className='rounded-full w-15 h-15 cursor-pointer'
                                    />
                                </>
                            </Link>
                        )}
                        <button
                            type='button'
                            className='p-2 border-2 rounded-full'
                        >
                            <AiOutlineLogout
                                color='tomato'
                                fontSize={21}
                                onClick={() => {
                                    googleLogout()
                                    removeUser()
                                }}
                            />
                        </button>
                    </div>
                ) : (
                    <GoogleLogin
                        onSuccess={(res) => createOrGetUser(res, addUser)}
                        onError={() => console.log('error')}
                    />
                )}
            </div>
        </div>
    )
}

export default Navbar