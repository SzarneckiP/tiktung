import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { SanityAssetDocument } from '@sanity/client'

import useAuthStore from '@/store/authStore'
import { client } from '@/utils/client'

import { topics } from '@/utils/constants'
import user from '@/sanity_tiktung/schemas/user'
import { BASE_URL } from '@/utils'

const Upload = () => {
    const { userProfile }: { userProfile: any } = useAuthStore()

    const [isLoading, setIsLoading] = useState(false)
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>()
    const [wrongFileType, setWrongFileType] = useState(false)
    const [caption, setCaption] = useState('')
    const [category, setCategory] = useState(topics[0].name)
    const [savingPost, setSavingPost] = useState(false)

    const router = useRouter()

    const uploadVideo = async (e: any) => {
        const selectedFile = e.target.files[0]
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']

        if (fileTypes.includes(selectedFile.type)) {
            client.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name,
            })
                .then((data) => {
                    setVideoAsset(data)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
            setWrongFileType(true)
        }
    }

    const handlePost = async () => {
        if (caption && videoAsset?._id && category) {
            setSavingPost(true)

            const document = {
                _type: 'post',
                caption,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: videoAsset?._id
                    },
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id,
                },
                topic: category,
            }

            await axios.post(`${BASE_URL}/api/post`, document)
            router.push('/')
        }
    }

    const handleDiscard = () => {
        setSavingPost(false);
        setVideoAsset(undefined);
        setCaption('');
        setCategory('');
    }

    return (
        <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center'>
            {userProfile ? (
                <div className='bg-white rounded-lg h-[100vh] w-[90%] xl:w-[70%] md:w-[90%] flex gap-6 flex-wrap justify-between items-center p-5 pt-6 sm:p-14'>
                    <div>
                        <div>
                            <p className='text-2xl font-bold'>Upload Video</p>
                            <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
                        </div>
                        <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-pink-500 hover:bg-gray-100 transition'>
                            {isLoading ? (
                                <p>Uploading...</p>
                            ) : (
                                <div>
                                    {videoAsset ? (
                                        <div>
                                            <video
                                                src={videoAsset.url}
                                                loop
                                                controls
                                                className='rounded-xl h-[400px] sm:h-[400px] mt-5 bg-black'
                                            >

                                            </video>
                                        </div>
                                    ) : (
                                        <label className='cursor-pointer'>
                                            <div className='flex flex-col items-center justify-center h-full'>
                                                <div className='flex flex-col items-center justify-center'>
                                                    <p className='font-bold text-xl'>
                                                        <FaCloudUploadAlt
                                                            className='text-gray-300 text-6xl'
                                                        />
                                                    </p>
                                                    <p className='text-xl font-semibold'>
                                                        Upload Video
                                                    </p>
                                                </div>
                                                <p className='text-gray-400 text-center mt-10 text-sm leading-9'>
                                                    MP4 or WebM or ogg <br />
                                                    720x1280 or higher <br />
                                                    Up to 10 minutes <br />
                                                    Less than 2GB
                                                </p>
                                                <p className='bg-[#f51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                                                    Select File
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                name='upload-video'
                                                className=' w-0 h-0'
                                                onChange={uploadVideo}
                                                accept='.mp4, .ogg, .webm'
                                            />
                                        </label>
                                    )}
                                </div>
                            )}
                            {wrongFileType && (
                                <p className='text-center text-sl text-red-400 font-semibold mt-4 w-[250px]'>
                                    Please select a video file
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 pb-10 mt-10'>
                        <label className='text-md font-medium'>
                            Caption
                        </label>
                        <input
                            type="text"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className='rounded outline-none text-md border-2 border-gray-300 p-2'
                        />
                        <label className='text-md font-medium'>
                            Choose a Category
                        </label>
                        <select
                            className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
                            onChange={(e) => { setCategory(e.target.value) }}
                        >
                            {topics.map((topic) => (
                                <option
                                    className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                                    key={topic.name}
                                    value={topic.name}
                                >
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                        <div className='flex gap-6 mt-10'>
                            <button
                                onClick={handleDiscard}
                                type='button'
                                className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none hover:border-[#f51997] hover:text-[#f51997] transition'
                            >
                                Discard
                            </button>
                            <button
                                disabled={videoAsset?.url ? false : true}
                                onClick={handlePost}
                                type='button'
                                className='bg-[#f51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none hover:border-[#f51997] hover:border-2 hover:text-[#f51997] hover:bg-white transition'
                            >
                                {savingPost ? 'Posting...' : 'Post'}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='m-5'>
                    <p className='text-2xl font-bold text-pink-500'>
                        Sing Up or Login first, please!
                    </p>
                </div>
            )}
        </div>
    )
}

export default Upload