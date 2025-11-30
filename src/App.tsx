import { useState } from 'react';
import { GradeScale } from './components/GradeScale';
import { Plus, Trash2, Calculator } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  grade: string;
}

export default function App() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: '', grade: '' }
  ]);
  const [average, setAverage] = useState<number | null>(null);
  const [rating, setRating] = useState<string>('');

  const getRating = (grade: number): string => {
    if (grade >= 1.0 && grade <= 1.4) return 'Excellent';
    if (grade >= 1.5 && grade <= 1.9) return 'Superior';
    if (grade >= 2.0 && grade <= 2.4) return 'Very Good';
    if (grade >= 2.5 && grade <= 2.9) return 'Good';
    if (grade === 3.0) return 'Passed';
    if (grade >= 3.1 && grade <= 4.0) return 'Conditional Failure';
    if (grade >= 4.1 && grade <= 5.0) return 'Failure';
    return 'Invalid Grade';
  };

  const addSubject = () => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: '',
      grade: ''
    };
    setSubjects([...subjects, newSubject]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(subject => subject.id !== id));
    }
  };

  const updateSubject = (id: string, field: 'name' | 'grade', value: string) => {
    setSubjects(subjects.map(subject =>
      subject.id === id ? { ...subject, [field]: value } : subject
    ));
  };

  const computeGrade = () => {
    const validGrades = subjects
      .map(s => parseFloat(s.grade))
      .filter(g => !isNaN(g) && g >= 1.0 && g <= 5.0);

    if (validGrades.length === 0) {
      alert('Please enter at least one valid grade (1.0 - 5.0)');
      return;
    }

    const sum = validGrades.reduce((acc, grade) => acc + grade, 0);
    const avg = sum / validGrades.length;
    const roundedAvg = Math.round(avg * 100) / 100;

    setAverage(roundedAvg);
    setRating(getRating(roundedAvg));
  };

  const resetForm = () => {
    setSubjects([{ id: '1', name: '', grade: '' }]);
    setAverage(null);
    setRating('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-center text-indigo-600 mb-2">Grade Computing System</h1>
          <p className="text-center text-gray-600 mb-8">Enter your subject grades to compute your average</p>

          <div className="space-y-4 mb-6">
            {subjects.map((subject, index) => (
              <div key={subject.id} className="flex gap-4 items-center">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Subject name"
                    value={subject.name}
                    onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    placeholder="Grade"
                    step="0.1"
                    min="1.0"
                    max="5.0"
                    value={subject.grade}
                    onChange={(e) => updateSubject(subject.id, 'grade', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  onClick={() => removeSubject(subject.id)}
                  disabled={subjects.length === 1}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={addSubject}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Subject
            </button>
            <button
              onClick={computeGrade}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Calculator className="w-5 h-5" />
              Compute Grade
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Reset
            </button>
          </div>

          {average !== null && (
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6 text-center">
              <p className="opacity-90 mb-2">Your Average Grade</p>
              <p className="text-5xl mb-2">{average.toFixed(2)}</p>
              <p className="text-2xl">{rating}</p>
            </div>
          )}
        </div>

        <GradeScale />
      </div>
    </div>
  );
}
