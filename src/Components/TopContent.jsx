import React from 'react'

const TopContent = () => {
    return (
        <div className='mb-8'>
            <div className='flex items-center justify-center '>
                <h1 className='inline-block mt-10 px-4 py-2 font-bold text-5xl bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text'>QuizMaster</h1>
            </div>

            <div className='flex items-center justify-center'>
                <p className='px-3 py-2 text-xl font-light text-gray-400'>Use Your PDF resource to test your knowledge</p>
            </div>
        </div>
    )
}

export default TopContent