import { FileText } from 'lucide-react'
import React from 'react'

const BottomContent = () => {
    return (
        <div >
            <div className='flex p-8 justify-center item-center gap-2 '>
                <FileText className='h-5 w-5 ' />
                <p className='font-light text-gray-800 '>Supported format: PDF only</p>
            </div>
        </div>
    )
}

export default BottomContent