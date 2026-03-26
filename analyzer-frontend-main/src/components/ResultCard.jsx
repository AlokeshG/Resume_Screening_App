import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const ResultCard = ({ score, matched, missing, suggestions, name, email, links }) => {
  const reportRef = useRef();

  const downloadPDF = () => {
    const opt = {
      margin: 0.5,
      filename: 'AI_Resume_Analysis.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(reportRef.current).save();
  };


  return (
    <div>
      <div ref={reportRef} className="p-6 rounded-3xl shadow-xl bg-white mt-4 space-y-6 border border-gray-100">


        {(name || email || links?.github || links?.linkedin || links?.portfolio) && (
          <div className="text-sm text-gray-700 space-y-1">
            <h2 className="text-xl font-bold mb-2">👤 Candidate Info</h2>
            {name && <p><strong>Name:</strong> {name}</p>}
            {email && <p><strong>Email:</strong> <a href={`mailto:${email}`} className="text-blue-600 underline">{email}</a></p>}
            {links?.linkedin && <p><strong>LinkedIn:</strong> <a href={links.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 underline">{links.linkedin}</a></p>}
            {links?.github && <p><strong>GitHub:</strong> <a href={links.github} target="_blank" rel="noreferrer" className="text-blue-600 underline">{links.github}</a></p>}
            {links?.portfolio && <p><strong>Portfolio:</strong> <a href={links.portfolio} target="_blank" rel="noreferrer" className="text-blue-600 underline">{links.portfolio}</a></p>}
          </div>
        )}

        <div>
            <h2 className="text-xl font-bold mb-2">🎯 Match Score</h2>
            <div className="text-4xl font-extrabold text-blue-600">{score}%</div>

            {/* Badge based on score */}
            <div className="mt-2">
              {score >= 80 ? (
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full inline-block">
                  🔥 Strong Match
                </span>
              ) : score >= 60 ? (
                <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full inline-block">
                  ✅ Good Match
                </span>
              ) : score >= 40 ? (
                <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full inline-block">
                  ⚠️ Weak Match
                </span>
              ) : (
                <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full inline-block">
                  ❌ Poor Match
                </span>
              )}
            </div>



            {/* Score bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${score}%` }}
                ></div>
            </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-green-700">✅ Matching Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {matched.length ? matched.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition"
              >
                {skill}
              </span>
            )) : <p className="text-sm text-gray-400">No matches found.</p>}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-red-700">❌ Missing Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {missing.length ? missing.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm hover:bg-red-200 transition"
              >
                {skill}
              </span>
            )) : <p className="text-sm text-gray-400">You're all set!</p>}
          </div>
        </div>

        {suggestions && (
            <div>
                <h3 className="text-lg font-semibold text-indigo-700">🧠 GPT Skill Suggestions</h3>
                <div className="mt-2 bg-indigo-50 p-4 rounded-xl text-indigo-900 shadow-sm text-sm">
                {suggestions}
                </div>
            </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={downloadPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md"
        >
          ⬇️ Download as PDF
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
