// components/InputForms.jsx
import { v4 as uuidv4 } from 'uuid';

export default function InputForms({ paperData, setPaperData }) {

  // --- HANDLER FUNCTIONS ---

  // Handle changes in the header section (School Name, Subject, etc.)
  const handleHeaderChange = (e) => {
    setPaperData(prevData => ({
      ...prevData,
      header: { ...prevData.header, [e.target.name]: e.target.value }
    }));
  };

  // Add a new, blank section
  const addSection = () => {
    const newSection = {
      id: uuidv4(),
      title: "New Section",
      questions: []
    };
    setPaperData(prevData => ({
      ...prevData,
      sections: [...prevData.sections, newSection]
    }));
  };

  // --- RENDERED JSX ---

  return (
    <div className="p-6 bg-gray-50 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Control Panel</h2>

      {/* Header Section Form */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Header Details</h3>
        <input
          type="text"
          name="schoolName"
          placeholder="Enter School Name"
          value={paperData.header.schoolName}
          onChange={handleHeaderChange}
          className="w-full p-2 border rounded mb-2"
        />
        {/* ... Add more inputs for subject, maxMarks, etc. */}
      </div>

      {/* Sections and Questions */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Paper Content</h3>
        {paperData.sections.map((section, sectionIndex) => (
          <div key={section.id} className="p-3 my-2 bg-white border rounded-md">
            {/* Input for the section title */}
            <input
                type="text"
                placeholder="Section Title (e.g., I. Fill in the blanks)"
                // ... you'll need a handler to update the section title
                className="w-full p-2 border rounded mb-2 font-bold"
            />
            {/* Questions within the section */}
            {section.questions.map((question, questionIndex) => (
               <div key={question.id} className="flex items-center gap-2 mt-2">
                 <input
                   type="text"
                   placeholder="Q. Num"
                   // ... handler to update question number
                   className="p-2 border rounded w-16"
                 />
                 <input
                   type="text"
                   placeholder="Enter Question Text"
                   // ... handler to update question text
                   className="w-full p-2 border rounded"
                 />
               </div>
            ))}
             <button
              // onClick handler to add a new question to THIS section
              className="mt-3 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded"
            >
              + Add Question
            </button>
          </div>
        ))}
        <button
          onClick={addSection}
          className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          + Add New Section
        </button>
      </div>
    </div>
  );
}