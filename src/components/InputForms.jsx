import { v4 as uuidv4 } from 'uuid';

export default function InputForms({ paperData, setPaperData }) {

  // --- HANDLER FUNCTIONS ---

  // 1. HEADER HANDLERS
  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setPaperData(prevData => ({
      ...prevData,
      header: { ...prevData.header, [name]: value }
    }));
  };

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const tempLogoUrl = URL.createObjectURL(file);
      setPaperData(prevData => ({
        ...prevData,
        header: { ...prevData.header, logoUrl: tempLogoUrl }
      }));
    }
  };

  // 2. SECTION HANDLERS
  const addSection = () => {
    const newSection = {
      id: uuidv4(),
      title: "New Section",
      marksString: "5x1=5",
      questions: []
    };
    setPaperData(prevData => ({
      ...prevData,
      sections: [...prevData.sections, newSection]
    }));
  };
  
  const deleteSection = (sectionId) => {
    setPaperData(prevData => ({
      ...prevData,
      sections: prevData.sections.filter(section => section.id !== sectionId)
    }));
  };

  const updateSection = (sectionId, field, value) => {
    setPaperData(prevData => ({
      ...prevData,
      sections: prevData.sections.map(section => 
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    }));
  };

  // 3. QUESTION HANDLERS
  const addQuestion = (sectionId) => {
    const newQuestion = {
      id: uuidv4(),
      number: "",
      text: ""
    };
    setPaperData(prevData => ({
      ...prevData,
      sections: prevData.sections.map(section => {
        if (section.id === sectionId) {
          return { ...section, questions: [...section.questions, newQuestion] };
        }
        return section;
      })
    }));
  };

  const deleteQuestion = (sectionId, questionId) => {
    setPaperData(prevData => ({
      ...prevData,
      sections: prevData.sections.map(section => {
        if (section.id === sectionId) {
          return { ...section, questions: section.questions.filter(q => q.id !== questionId) };
        }
        return section;
      })
    }));
  };

  const updateQuestion = (sectionId, questionId, field, value) => {
    setPaperData(prevData => ({
      ...prevData,
      sections: prevData.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.map(q => 
              q.id === questionId ? { ...q, [field]: value } : q
            )
          };
        }
        return section;
      })
    }));
  };


  // --- RENDERED JSX ---

  return (
    <div className="p-6 bg-gray-50 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Control Panel</h2>

      {/* Header Details Section */}
      <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
        <h3 className="font-semibold mb-3">Header Details</h3>
        <label className="block text-sm font-medium text-gray-700 mb-1">School Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <input
          type="text"
          name="schoolName"
          placeholder="Enter School Name"
          value={paperData.header.schoolName}
          onChange={handleHeaderChange}
          className="w-full p-2 border rounded mt-3 mb-2"
        />
        <input
          type="text"
          name="examName"
          placeholder="Enter Exam Name (e.g., III MID Term)"
          value={paperData.header.examName}
          onChange={handleHeaderChange}
          className="w-full p-2 border rounded mb-2"
        />
        <div className="flex gap-2">
            <input type="text" name="className" placeholder="Class" value={paperData.header.className} onChange={handleHeaderChange} className="w-full p-2 border rounded" />
            <input type="text" name="subject" placeholder="Subject" value={paperData.header.subject} onChange={handleHeaderChange} className="w-full p-2 border rounded" />
            <input type="text" name="maxMarks" placeholder="Marks" value={paperData.header.maxMarks} onChange={handleHeaderChange} className="w-full p-2 border rounded" />
        </div>
      </div>

      {/* Paper Content Section */}
      <div className="p-4 border rounded-lg bg-white shadow-sm">
        <h3 className="font-semibold mb-2">Paper Content</h3>
        {paperData.sections.map((section) => (
          <div key={section.id} className="p-3 my-2 bg-gray-50 border rounded-md">
            <div className="flex items-center justify-between mb-2">
              <input
                  type="text"
                  placeholder="Section Title (e.g., I. Fill in the blanks)"
                  value={section.title}
                  onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                  className="w-2/3 p-2 border rounded font-bold"
              />
              <input
                  type="text"
                  placeholder="Marks (5x1=5)"
                  value={section.marksString}
                  onChange={(e) => updateSection(section.id, 'marksString', e.target.value)}
                  className="w-1/4 p-2 border rounded text-right"
              />
              <button onClick={() => deleteSection(section.id)} className="text-red-500 hover:text-red-700 font-bold text-xl">×</button>
            </div>
            
            {section.questions.map((q) => (
               <div key={q.id} className="flex items-center gap-2 mt-2">
                 <input
                   type="text"
                   placeholder="Num"
                   value={q.number}
                   onChange={(e) => updateQuestion(section.id, q.id, 'number', e.target.value)}
                   className="p-2 border rounded w-16"
                 />
                 <input
                   type="text"
                   placeholder="Enter Question Text"
                   value={q.text}
                   onChange={(e) => updateQuestion(section.id, q.id, 'text', e.target.value)}
                   className="w-full p-2 border rounded"
                 />
                 <button onClick={() => deleteQuestion(section.id, q.id)} className="text-red-400 hover:text-red-600 font-bold">×</button>
               </div>
            ))}
             <button
              onClick={() => addQuestion(section.id)}
              className="mt-3 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200"
            >
              + Add Question
            </button>
          </div>
        ))}
        <button
          onClick={addSection}
          className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 font-semibold"
        >
          + Add New Section
        </button>
      </div>

    </div>
  );
}