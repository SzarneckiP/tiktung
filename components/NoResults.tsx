import React from 'react'
import { MdOutlineVideocamOff } from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi'

interface IProps {
    text: string;
}

const NoResults = ({ text }: IProps) => {
    return (
        <div className='flex flex-col justify-center items-center h-full w-full'>
            <div className='flex flex-col justify-center items-center h-full w-full'>
                <p className='text-8xl'>
                    {text === 'No comments yet! Be the first one to add comment.'
                        ?
                        <BiCommentX />
                        :
                        <MdOutlineVideocamOff />
                    }
                </p>
                <p>
                    {text}
                </p>
            </div>
        </div>

    )
}

export default NoResults