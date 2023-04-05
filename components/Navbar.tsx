import React from 'react'
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
            <div>
                search
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
                            <Link href='/'>
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