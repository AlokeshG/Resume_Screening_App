import React, { useState } from 'react';
import UploadForm from './components/UploadForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full border border-gray-100">
        <h1 className="text-5xl font-extrabold text-indigo-800 mb-3 text-center tracking-tight">
           AI Resume Analyzer
        </h1>
        <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
          Upload your resume and compare it with a job description to get instant AI-powered feedback, skill match, and smart suggestions.
        </p>
        <UploadForm />
      </div>
    </div>
  );
}


export default App;
