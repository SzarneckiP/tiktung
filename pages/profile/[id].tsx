import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'

import { VideoCard, NoResults } from '@/components'
import { IUser, Video } from '@/types'
import { BASE_URL } from '@/utils'

interface IProps {
    data: {
        user: IUser,
        userVideos: Video[]
        userLikedVideos: Video[]
    }
}

const Profile = ({ data }: IProps) => {
    const { user, userLikedVideos, userVideos } = data

    console.log(data)

    console.log('userLikeVideos:', userLikedVideos)

    const [showUserVideos, setShowUserVideos] = useState(true)
    const [videosList, setVideosList] = useState<Video[]>([])

    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
    const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'

    useEffect(() => {
        if (showUserVideos) {
            setVideosList(userVideos)
        } else {
            setVideosList(userLikedVideos)
        }
    }, [showUserVideos, userVideos, userLikedVideos])

    return (
        <div className='w-full'>
            <div className='flex gap-6 md:gap-10 my-4 bg-white w-full'>
                <div className='w-16 h-16 md:w-32 md:h-32'>
                    <Image
                        className='rounded-full'
                        src={user.image}
                        alt='user profile'
                        width={120}
                        height={120}
                    />
                </div>
                <div className='flex flex-col justify-center'>
                    <p className='md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase'>
                        {user.userName.replaceAll(' ', '')}
                        <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitalize md:text-xl text-gray-400 text-xs'>
                        {user.userName}
                    </p>
                </div>
            </div>
            <div>
                <div className='flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full'>
                    <p
                        onClick={() => setShowUserVideos(true)}
                        className={`text-xl font-semibold cursor-pointer mt-2 transition ${videos}`}
                    >
                        Videos
                    </p>
                    <p
                        onClick={() => setShowUserVideos(false)}
                        className={`text-xl font-semibold cursor-pointer mt-2 transition ${liked}`}
                    >
                        Liked
                    </p>
                </div>
                <div className='flex gap-6 flex-wrap md:justify-start'>
                    {videosList?.length > 0 ? (
                        videosList.map((post: Video, idx: number) => (
                            <div>
                                <VideoCard post={post} key={idx} />
                            </div>
                        ))
                    ) : (
                        <NoResults text={`${user.userName} Have No ${showUserVideos ? '' : 'Liked'} Videos Yet!`} />
                    )}
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({
    params: { id }
}: {
    params: { id: string }
}) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

    return {
        props: { data: res.data }
    }
}

export default Profile