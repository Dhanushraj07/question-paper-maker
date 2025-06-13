// components/PreviewPane.jsx

export default function PreviewPane({ paperData }) {
  return (
    <div className="p-8 bg-gray-200 h-full overflow-y-auto">
      {/* A4 Paper Styled Container */}
      <div id="paper-preview" className="bg-white p-12 shadow-lg max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">{paperData.header.schoolName}</h1>
          <h2 className="text-xl">{paperData.header.examName}</h2>
        </div>
        <div className="flex justify-between mb-4">
          <p>Subject: {paperData.header.subject}</p>
          <p>Marks: {paperData.header.maxMarks}</p>
        </div>
        <hr className="my-4 border-black" />

        {/* Sections and Questions */}
        {paperData.sections.map(section => (
          <div key={section.id} className="mb-6">
            <h3 className="font-bold text-lg mb-2">{section.title}</h3>
            {section.questions.map(question => (
              <div key={question.id} className="flex gap-4 mb-2">
                <span>{question.number}</span>
                <p>{question.text}</p>
              </div>
            ))}
          </div>
        ))}

      </div>
       <button 
        // onClick handler that will use jspdf to print the 'paper-preview' div
        className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
        Export to PDF
      </button>
    </div>
  );
}