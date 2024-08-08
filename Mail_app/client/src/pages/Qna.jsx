import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import GridPattern from '@/components/magicui/grid-pattern';
import { useUser } from '@clerk/clerk-react';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const questions = [
  "Are you building your first campaign?",
  "Do you know how to use email template servicing?",
  "Do you have a campaign plan in mind?",
  "Have you used email marketing tools before?",
  "Are you familiar with email design best practices?",
  "Do you have an audience for your campaign?"
];

const Qna = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState(Array(questions.length).fill(false));
  const [progress, setProgress] = useState((currentStep + 1) / questions.length * 100);

  useEffect(() => {
    setProgress((currentStep + 1) / questions.length * 100);
  }, [currentStep]);

  const handleChange = (value) => {
    setResponses((prev) => {
      const newResponses = [...prev];
      newResponses[currentStep] = value;
      return newResponses;
    });

    handleNext();
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const noAnswers = responses.filter(response => !response).length;
    if (noAnswers >= questions.length / 2) {
      navigate('/started');
    } else {
      navigate('/campaign');
    }
  };

  const username = user?.firstName;

  return (
    <motion.div className="relative min-h-screen"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}>
      <Helmet>
        <title>Mail Vista - QNA  </title>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/666/666162.png" type="image/png" />
      </Helmet>
      <GridPattern className="absolute inset-0 z-0" />
      <div className="fixed top-0 left-0 right-0 h-20 p-4 flex justify-start items-center bg-gray-100 z-10">
        <h1 className="text-3xl font-bold">Mail Vista</h1>
      </div>
      <div className="w-full fixed flex justify-center mt-20">
        <Progress value={progress} className="w-full h-2 bg-gray-200">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(to right, yellow, orange)'
            }}
          />
        </Progress>
      </div>
      <div className="relative flex flex-col items-center justify-center min-h-screen pt-10">
        <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full max-w-screen-md flex flex-col items-center">
          <div className="text-center mb-6">
            {currentStep === 0 && (
              <h1 className="text-4xl font-bold mb-4">Nice to meet you {username}!</h1>
            )}
            <AnimatePresence>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-2">{questions[currentStep]}</h2>
                <p className="text-lg text-gray-600">Your answer will help us to give you the best start.</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto mb-8">
            <button
              onClick={() => handleChange(true)}
              className={`py-4 px-8 border-2 border-blue-500 rounded ${responses[currentStep] ? 'bg-blue-500 text-white' : 'bg-transparent text-blue-500'}`}
            >
              Yes
            </button>
            <button
              onClick={() => handleChange(false)}
              className={`py-4 px-8 border-2 border-red-500 rounded ${!responses[currentStep] ? 'bg-red-500 text-white' : 'bg-transparent text-red-500'}`}
            >
              No
            </button>
          </div>
        </div>
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="absolute top-24 left-8 bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 px-6 rounded flex items-center gap-2"
        >
          <ArrowBack />
          Back
        </button>
      </div>
    </motion.div>
  );
};

export default Qna;
