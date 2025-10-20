import React, { useState } from 'react'
import TopContent from './Components/TopContent'
import DropYourPdf from './Components/DropYourPdf'
import BottomContent from './Components/BottomContent'
import Quiz from './Components/Quiz'

import { Toaster } from 'react-hot-toast';

const App = () => {
  const [quizData, setQuizData] = useState(null);

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4 flex-col'>
      <div className='w-full max-w-2xl animate-fade-in'>
        <Toaster />
        <TopContent />
        {!quizData && <DropYourPdf onQuizData={setQuizData} />}
        {quizData && <Quiz quizData={quizData} />}
        <BottomContent />
      </div>
    </div>
  );
}

export default App