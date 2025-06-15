import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

export default function InputForms({ paperData, setPaperData }) {
  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setPaperData(prev => ({ ...prev, header: { ...prev.header, [name]: value } }));
  };

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const logoUrl = URL.createObjectURL(file);
      setPaperData(prev => ({ ...prev, header: { ...prev.header, logoUrl } }));
    }
  };

  const addSection = () => {
    const newSection = {
      id: uuidv4(),
      title: 'New Section',
      marksString: '',
      questions: []
    };
    setPaperData(prev => ({ ...prev, sections: [...prev.sections, newSection] }));
  };

  const deleteSection = (id) => {
    setPaperData(prev => ({
      ...prev,
      sections: prev.sections.filter(sec => sec.id !== id)
    }));
  };

  const updateSection = (id, field, value) => {
    setPaperData(prev => ({
      ...prev,
      sections: prev.sections.map(sec => sec.id === id ? { ...sec, [field]: value } : sec)
    }));
  };

  const addQuestion = (sectionId, type = 'text') => {
    const newQuestion = {
      id: uuidv4(),
      number: '',
      type,
      text: '',
      rows: 2,
      cols: 2,
      cellValues: Array(2).fill().map(() => Array(2).fill('')),
      cellWidths: Array(2).fill(100)
    };
    setPaperData(prev => ({
      ...prev,
      sections: prev.sections.map(sec =>
        sec.id === sectionId ? { ...sec, questions: [...sec.questions, newQuestion] } : sec
      )
    }));
  };

  const deleteQuestion = (sectionId, questionId) => {
    setPaperData(prev => ({
      ...prev,
      sections: prev.sections.map(sec =>
        sec.id === sectionId
          ? { ...sec, questions: sec.questions.filter(q => q.id !== questionId) }
          : sec
      )
    }));
  };

  const updateQuestion = (sectionId, questionId, field, value) => {
    setPaperData(prev => ({
      ...prev,
      sections: prev.sections.map(sec => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            questions: sec.questions.map(q => q.id === questionId ? { ...q, [field]: value } : q)
          };
        }
        return sec;
      })
    }));
  };

  const updateCellValue = (sectionId, questionId, rowIdx, colIdx, value) => {
    setPaperData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map(question =>
                question.id === questionId
                  ? {
                      ...question,
                      cellValues: question.cellValues.map((row, r) =>
                        r === rowIdx
                          ? row.map((cell, c) => (c === colIdx ? value : cell))
                          : row
                      )
                    }
                  : question
              )
            }
          : section
      )
    }));
  };

  const updateCellWidth = (sectionId, questionId, colIdx, newWidth) => {
    setPaperData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map(question =>
                question.id === questionId
                  ? {
                      ...question,
                      cellWidths: question.cellWidths.map((w, i) =>
                        i === colIdx ? newWidth : w
                      )
                    }
                  : question
              )
            }
          : section
      )
    }));
  };

  const updateTableSize = (sectionId, questionId, rows, cols) => {
    const newCellValues = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => "")
    );
    const newCellWidths = Array(cols).fill(100);

    setPaperData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map(q =>
                q.id === questionId
                  ? { ...q, rows, cols, cellValues: newCellValues, cellWidths: newCellWidths }
                  : q
              )
            }
          : section
      )
    }));
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Control Panel</h2>

      <div className="mb-6 p-4 border rounded bg-white">
        <h3 className="font-semibold mb-2">Header Details</h3>
        <input type="file" onChange={handleLogoChange} className="mb-2" />
        <input type="text" name="schoolName" placeholder="School Name" value={paperData.header.schoolName} onChange={handleHeaderChange} className="w-full mb-2 p-2 border rounded" />
        <input type="text" name="examName" placeholder="Exam Name" value={paperData.header.examName} onChange={handleHeaderChange} className="w-full mb-2 p-2 border rounded" />
        <div className="flex gap-2">
          <input type="text" name="className" placeholder="Class" value={paperData.header.className} onChange={handleHeaderChange} className="w-full p-2 border rounded" />
          <input type="text" name="subject" placeholder="Subject" value={paperData.header.subject} onChange={handleHeaderChange} className="w-full p-2 border rounded" />
          <input type="text" name="maxMarks" placeholder="Max Marks" value={paperData.header.maxMarks} onChange={handleHeaderChange} className="w-full p-2 border rounded" />
        </div>
      </div>

      <div className="p-4 border rounded bg-white">
        <h3 className="font-semibold mb-2">Sections</h3>
        {paperData.sections.map(section => (
          <div key={section.id} className="mb-4 p-3 border bg-gray-50 rounded">
            <div className="flex justify-between items-center mb-2">
              <input value={section.title} onChange={e => updateSection(section.id, 'title', e.target.value)} className="w-2/3 p-2 border rounded font-bold" />
              <input value={section.marksString} onChange={e => updateSection(section.id, 'marksString', e.target.value)} placeholder="5x1=5" className="w-1/4 p-2 border rounded" />
              <button onClick={() => deleteSection(section.id)} className="text-red-500">×</button>
            </div>

            {section.questions.map(q => (
              <div key={q.id} className="mt-2 flex flex-col gap-2">
                <div className="flex gap-2">
                  <input value={q.number} onChange={e => updateQuestion(section.id, q.id, 'number', e.target.value)} placeholder="#" className="w-16 p-2 border rounded" />
                  <select value={q.type} onChange={e => updateQuestion(section.id, q.id, 'type', e.target.value)} className="p-2 border rounded">
                    <option value="text">Text</option>
                    <option value="table">Table</option>
                  </select>
                  <button onClick={() => deleteQuestion(section.id, q.id)} className="text-red-500">×</button>
                </div>

                {q.type === 'text' ? (
                  <input value={q.text} onChange={e => updateQuestion(section.id, q.id, 'text', e.target.value)} placeholder="Question text" className="w-full p-2 border rounded" />
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input type="number" value={q.rows} onChange={e => updateTableSize(section.id, q.id, parseInt(e.target.value), q.cols)} className="w-1/2 p-2 border rounded" placeholder="Rows" />
                      <input type="number" value={q.cols} onChange={e => updateTableSize(section.id, q.id, q.rows, parseInt(e.target.value))} className="w-1/2 p-2 border rounded" placeholder="Cols" />
                    </div>
                    <div className="overflow-x-auto">
                      <table className="border border-black w-full mt-2">
                        <tbody>
                          {q.cellValues.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, colIndex) => (
                                <td key={colIndex} className="border border-black p-1">
                                  <ResizableBox
                                    width={q.cellWidths[colIndex] || 100}
                                    height={40}
                                    axis="x"
                                    resizeHandles={['e']}
                                    onResizeStop={(e, data) => updateCellWidth(section.id, q.id, colIndex, data.size.width)}
                                  >
                                    <input
                                      type="text"
                                      className="w-full h-full p-1"
                                      value={q.cellValues[rowIndex][colIndex]}
                                      onChange={e => updateCellValue(section.id, q.id, rowIndex, colIndex, e.target.value)}
                                    />
                                  </ResizableBox>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            ))}
            <button onClick={() => addQuestion(section.id)} className="mt-2 bg-blue-100 px-3 py-1 rounded">+ Add Question</button>
          </div>
        ))}
        <button onClick={addSection} className="w-full bg-green-500 text-white p-2 rounded">+ Add Section</button>
      </div>
    </div>
  );
}
