import { useState } from 'react';
import InputForms from './components/InputForms';
import PreviewPane from './components/PreviewPane';

function App() {
  // The central state for the entire application. Starts empty.
  const [paperData, setPaperData] = useState({
    header: {
      logoUrl: null,
      schoolName: "Your School Name",
      examName: "Exam Name",
      className: "",
      subject: "",
      maxMarks: ""
    },
    sections: [] // Sections start as an empty array
  });

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Left Side: The Live Preview */}
      <div className="w-1/2">
        <PreviewPane paperData={paperData} />
      </div>

      {/* Right Side: The Control Panel */}
      <div className="w-1/2 border-l border-gray-300">
        <InputForms paperData={paperData} setPaperData={setPaperData} />
      </div>
    </div>
  );
}

export default App;