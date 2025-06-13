// App.jsx
import { useState } from 'react';
import InputForms from './components/InputForms';
import PreviewPane from './components/PreviewPane';

function App() {
  const initialPaperState = {
    header: {
      schoolName: "",
      subject: "",
      maxMarks: "",
      // add other header fields as needed
    },
    sections: [],
  };
  const [paperData, setPaperData] = useState(initialPaperState);

  return (
    <div className="flex h-screen w-screen">
      {/* Left Side: Preview Pane */}
      <div className="w-1/2">
        <PreviewPane paperData={paperData} />
      </div>

      {/* Right Side: Input Forms */}
      <div className="w-1/2">
        <InputForms paperData={paperData} setPaperData={setPaperData} />
      </div>
    </div>
  );
}

export default App;