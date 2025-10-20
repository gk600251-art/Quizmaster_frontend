import React, { ChangeEvent, useState } from 'react'
import { Upload } from 'lucide-react'

import toast from 'react-hot-toast';


const DropYourPdf = ({ onQuizData }) => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const [aboutToStart, setAboutToStart] = useState(false);

    function handleFileUpload(e) {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        }
    }

    function handleDragOver(e) {
        e.preventDefault()
        setIsDragging(true)
    }

    function handleDragLeave(e) {
        e.preventDefault()
        setIsDragging(false)
    }

    function handleDragDrop(e) {
        e.preventDefault()
        setIsDragging(false)
        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile && droppedFile.type === "application/pdf") {
            setFile(droppedFile)
        }
    }

    function handleNewFile() {
        setFile(null)
    };

    const handleStartQuiz = async () => {
        if (!file) return;

        setAboutToStart(true);

        const apiURL = 'https://quizapi-backend.onrender.com/generate-quiz';
        const formData = new FormData();

        formData.append('file', file);
        setAboutToStart(true);

        // Store the toast ID to manually dismiss it later
        const toastId = toast.loading('Preparing your quiz...', {
            position: 'top-right',
        });

        try {
            const res = await fetch(apiURL, {
                method: 'POST',
                body: formData
            });

            const data = await res.json();
            if (!data.quiz) throw new Error('No quiz data received');

            // Dismiss the loading toast and show success
            toast.dismiss(toastId);
            toast.success('Quiz ready! 🎉', {
                position: 'top-right',
                duration: 3000,
            });

            onQuizData(data.quiz);
            setAboutToStart(false);
        } catch (e) {
            setAboutToStart(false);
            console.error('Error starting quiz:', e);

            // Dismiss the loading toast and show error
            toast.dismiss(toastId);
            toast.error('Failed to start quiz. Please try again.', {
                position: 'top-right',
                duration: 4000,
            });
        }
    };


    return (
        <div className='relative rounded-lg bg-white shadow-sm p-8 border-2 border-gray-200'>
            {/* Overlay for drag state */}
            {isDragging && (
                <div className='absolute inset-0 z-10 flex items-center justify-center bg-gray-400 bg-opacity-50 pointer-events-none'>
                    <p className='text-white text-lg'>Release to drop the file</p>
                </div>
            )}
            <div
                className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-150 ${isDragging ? "border-purple-600 bg-purple-50" : "border-gray-200"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragDrop}
                style={aboutToStart ? { pointerEvents: 'none', userSelect: 'none', opacity: 0.6, filter: 'blur(1px)' } : {}}
            >
                {!file ? (
                    <>
                        <Upload className='text-purple-600 w-16 h-16 mx-auto mb-6 animate-bounce' />
                        <h3 className='text-xl font-semibold mb-1'>Drop your PDF here</h3>
                        <p className='mb-10 font-extralight'>or click to browse files</p>
                        <input type='file' accept='.pdf' className='hidden' id='file-upload' onChange={handleFileUpload} />
                        <label htmlFor='file-upload'>
                            <span className='bg-purple-600 rounded-xl h-10 px-4 py-2 cursor-pointer hover:bg-blue-700 font-semibold text-white'>Select PDF file</span>
                        </label>
                    </>
                ) : (
                    <div className='mt-4'>
                        <h2 className='text-2xl font-semibold mb-5'>Your Uploaded File</h2>
                        <p><strong>File Name:</strong> {file.name}</p>
                        <p><strong>File Size:</strong> {(file.size / 1048576).toFixed(2)} MB</p>
                        <p><strong>File Type: </strong>{file.type}</p>

                        <div className='flex gap-20 p-5 mt-10 justify-center items-center'>
                            <label
                                onClick={handleStartQuiz}
                                className='bg-purple-600 rounded-xl h-10 px-4 py-2 cursor-pointer hover:bg-blue-700 font-semibold text-white'>
                                Start Quiz
                            </label>
                            <label className='bg-purple-600 rounded-xl h-10 px-4 py-2 cursor-pointer hover:bg-blue-700 font-semibold text-white' onClick={handleNewFile}>
                                New File
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DropYourPdf