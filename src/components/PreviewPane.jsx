import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function PreviewPane({ paperData }) {
  const handleExportToPdf = () => {
    const input = document.getElementById('paper-preview');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const width = pdfWidth;
      const height = width / ratio;

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save("question-paper.pdf");
    });
  };

  return (
    <div className="p-8 bg-gray-200 h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div id="paper-preview" className="bg-white p-12 shadow-lg">
          {/* Header */}
          <div className="flex items-center gap-4 border-b-2 border-black pb-2">
            {paperData.header.logoUrl && (
              <img
                src={paperData.header.logoUrl}
                alt="School Logo"
                className="h-16 w-16 object-contain"
              />
            )}
            <div className="text-center flex-grow">
              <h1 className="text-2xl font-bold">{paperData.header.schoolName}</h1>
              <h2 className="text-xl">{paperData.header.examName}</h2>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 text-md">
            <span>Class: {paperData.header.className}</span>
            <span>Subject: {paperData.header.subject}</span>
            <span>Marks: {paperData.header.maxMarks}</span>
          </div>

          <div className="mt-2">
            <span>Name: _______________________________</span>
          </div>

          <hr className="my-4 border-black border-t-2" />

          {/* Sections */}
          {paperData.sections.map((section) => (
            <div key={section.id} className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{section.title}</h3>
                <span className="font-bold">{section.marksString}</span>
              </div>

              {section.questions.map((question) => (
                <div key={question.id} className="mb-4">
                  <div className="flex gap-2">
                    <span className="font-semibold">{question.number}.</span>
                    {question.type === 'text' ? (
                      <p>{question.text}</p>
                    ) : (
                      <p>Table:</p>
                    )}
                  </div>

                  {question.type === 'table' && (
                    <table className="border border-black mt-2" style={{ borderCollapse: 'collapse', width: '100%' }}>
                      <tbody>
                        {question.cellValues.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                              <td
                                key={colIndex}
                                className="border border-black px-2 py-1 text-center align-middle"
                                style={{
                                  width: question.cellWidths?.[colIndex] || 100,
                                  wordBreak: 'break-word'
                                }}
                              >
                                {cell || ``}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <button
          onClick={handleExportToPdf}
          className="mt-6 w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 font-bold shadow-md"
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
}
