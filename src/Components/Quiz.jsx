import React, { useState } from 'react';

export default function Quiz({ quizData }) {
    const questions = quizData || [];
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [showSummary, setShowSummary] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [selectedQuestionDetail, setSelectedQuestionDetail] = useState(null);

    // If no questions, show a friendly message
    if (!questions.length) {
        return (
            <div className="bg-white rounded-lg shadow-md p-8 text-center animate-fade-in">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">No quiz questions available.</h2>
                <p className="text-gray-600">Please upload a valid PDF or try again.</p>
            </div>
        );
    }

    const question = questions[current];
    const isLast = current === questions.length - 1;

    function handleSelect(option) {
        setSelected(option);
    }

    function handleSubmit() {
        setShowAnswer(true);
        setAnswers([...answers, { selected, correct: selected === question.answer }]);
    }

    function handleRestart() {
        setCurrent(0);
        setSelected(null);
        setShowAnswer(false);
        setAnswers([]);
        setShowSummary(false);
        setShowHint(false);
        setSelectedQuestionDetail(null);
    }

    function handleNextQuestion() {
        setSelected(null);
        setShowAnswer(false);
        setShowHint(false);
        if (isLast) {
            setShowSummary(true);
        } else {
            setCurrent(current + 1);
        }
    }

    if (showSummary) {
        const correctCount = answers.filter(a => a.correct).length;
        
        if (selectedQuestionDetail !== null) {
            const q = questions[selectedQuestionDetail];
            const answer = answers[selectedQuestionDetail];
            return (
                <div className="bg-white rounded-lg shadow-md p-8 animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-purple-700">Question {selectedQuestionDetail + 1} Details</h2>
                        <button 
                            className="bg-gray-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-600"
                            onClick={() => setSelectedQuestionDetail(null)}
                        >
                            Back to Summary
                        </button>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-4">{q.question}</h3>
                        <div className="grid gap-3 mb-6">
                            {q.options.map((option, idx) => {
                                const isYourAnswer = answer?.selected === option;
                                const isCorrect = option === q.answer;
                                return (
                                    <div
                                        key={idx}
                                        className={`px-4 py-3 rounded-xl border font-medium
                                            ${isCorrect ? "border-green-600 bg-green-50 text-green-700" : ""}
                                            ${isYourAnswer && !isCorrect ? "border-red-600 bg-red-50 text-red-700" : ""}
                                            ${!isYourAnswer && !isCorrect ? "border-gray-200 bg-gray-50" : ""}`}
                                    >
                                        {option}
                                        {isYourAnswer && <span className="ml-2 text-sm">(Your answer)</span>}
                                        {isCorrect && <span className="ml-2 text-sm">(Correct)</span>}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="bg-blue-50 p-4 rounded-xl mb-4">
                            <p className="font-semibold text-blue-700 mb-2">Explanation:</p>
                            <p className="text-blue-600">{q.explanation}</p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-xl">
                            <p className="font-semibold text-yellow-700 mb-2">Hint:</p>
                            <p className="text-yellow-600">{q.hint}</p>
                        </div>
                    </div>
                </div>
            );
        }
        
        return (
            <div className="bg-white rounded-lg shadow-md p-8 text-center animate-fade-in">
                <h2 className="text-3xl font-bold mb-4 text-purple-700">Quiz Summary</h2>
                <p className="text-lg mb-6">You scored <span className="font-bold text-green-600">{correctCount}</span> out of <span className="font-bold">{questions.length}</span></p>
                
                {/* Visual Brief Summary */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Click on any result to view details:</h3>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {answers.map((answer, i) => (
                            <button
                                key={i}
                                className="text-2xl hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                                onClick={() => setSelectedQuestionDetail(i)}
                                title={`Question ${i + 1}: ${answer.correct ? 'Correct' : 'Incorrect'}`}
                            >
                                {answer.correct ? '✅' : '❌'}
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500">
                        ✅ Correct ({correctCount}) • ❌ Incorrect ({questions.length - correctCount})
                    </p>
                </div>
                
                <button className="bg-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700" onClick={handleRestart}>Restart Quiz</button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-8 animate-fade-in">
            <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2">Question {current + 1} of {questions.length}</div>
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-purple-700 flex-1">{question.question}</h2>
                    {!showAnswer && (
                        <button
                            className="ml-4 bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
                            onClick={() => setShowHint(!showHint)}
                        >
                            💡 {showHint ? 'Hide' : 'Show'} Hint
                        </button>
                    )}
                </div>
                {showHint && !showAnswer && (
                    <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <p className="text-yellow-700 font-medium">💡 Hint: {question.hint}</p>
                    </div>
                )}
            </div>
            <div className="mb-8 grid gap-4">
                {question.options.map((option, idx) => {
                    const isSelected = selected === option;
                    const isCorrect = showAnswer && option === question.answer;
                    const isWrong = showAnswer && isSelected && !isCorrect;
                    return (
                        <button
                            key={idx}
                            className={`w-full text-left px-6 py-3 rounded-xl border font-medium transition-colors duration-150
                                ${isSelected ? "border-purple-600 bg-purple-100" : "border-gray-200 bg-gray-50"}
                                ${showAnswer && isCorrect ? "border-green-600 bg-green-50 text-green-700" : ""}
                                ${showAnswer && isWrong ? "border-red-600 bg-red-50 text-red-700" : ""}
                                ${showAnswer ? "cursor-not-allowed" : "hover:border-purple-400 hover:bg-purple-50"}`}
                            disabled={showAnswer}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
            {!showAnswer ? (
                <button
                    className="bg-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
                    disabled={!selected}
                    onClick={handleSubmit}
                >
                    Submit Answer
                </button>
            ) : (
                <div className="mt-6">
                    <div className={`mb-4 text-lg font-semibold ${selected === question.answer ? "text-green-700" : "text-red-700"}`}>
                        {selected === question.answer ? "🎉 Correct!" : "❌ Incorrect."}
                    </div>
                    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-blue-700"><span className="font-semibold">Explanation:</span> {question.explanation}</p>
                    </div>
                    <button
                        className="bg-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700"
                        onClick={handleNextQuestion}
                    >
                        {isLast ? "Finish Quiz" : "Next Question"}
                    </button>
                </div>
            )}
        </div>
    );
}