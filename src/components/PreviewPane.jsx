import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function PreviewPane({ paperData }) {

  const handleExportToPdf = () => {
    const input = document.getElementById('paper-preview');
    html2canvas(input, { scale: 2 }) // Increase scale for better quality
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        // A4 dimensions in mm: 210 x 297
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
      {/* Container for the paper and the button */}
      <div className="max-w-2xl mx-auto">
        
        {/* The A4-Styled Paper Preview */}
        <div id="paper-preview" className="bg-white p-12 shadow-lg">
          
          {/* Header */}
          <div className="flex items-center gap-4 border-b-2 border-black pb-2">
            {paperData.header.logoUrl && (
              <img src={paperData.header.logoUrl} alt="School Logo" className="h-16 w-16 object-contain" />
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

          {/* This is the corrected part: Map over sections and questions to DISPLAY them */}
          {paperData.sections.map(section => (
            <div key={section.id} className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{section.title}</h3>
                <span className="font-bold">{section.marksString}</span>
              </div>
              
              {section.questions.map(question => (
                <div key={question.id} className="flex gap-4 mb-2">
                  <span className="font-semibold">{question.number}</span>
                  <p>{question.text}</p>
                </div>
              ))}
            </div>
          ))}

        </div>
        
        {/* Export Button - Placed outside the printable area */}
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