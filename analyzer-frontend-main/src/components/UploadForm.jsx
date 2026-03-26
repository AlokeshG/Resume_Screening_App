import React, { useState } from 'react';
import axios from 'axios';
import ResultCard from './ResultCard';

const UploadForm = () => {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);  // 👈 loader state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loader
    setResult(null);   // Clear previous result
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('job_description', jd);

    try {
      const res = await axios.post('https://analyzer-backend-1esq.onrender.com/analyze', formData);
      setResult(res.data);
    } catch (err) {
      console.error('Error:', err);
      alert("Something went wrong while analyzing.");
    } finally {
      setLoading(false);  // Stop loader
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" accept="application/pdf" onChange={(e) => setResume(e.target.files[0])} required />
        <textarea
          placeholder="Paste Job Description here..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          rows="6"
          className="w-full p-2 border"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {loading && (
        <div className="flex justify-center mt-4">
            <div className="h-6 w-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {result && (
        <div className="mt-6 border-t pt-4">
          <ResultCard
            score={result.match_score}
            matched={result.matching_skills}
            missing={result.missing_skills}
            suggestions={result.gpt_suggestions}
            name={result.name}
            email={result.email}
            links={result.links}
          />
        </div>
      )}
    </div>
  );
};

export default UploadForm;
