export function GradeScale() {
  const gradeRanges = [
    { range: '1.0 - 1.4', rating: 'Excellent', color: 'bg-green-500' },
    { range: '1.5 - 1.9', rating: 'Superior', color: 'bg-green-400' },
    { range: '2.0 - 2.4', rating: 'Very Good', color: 'bg-blue-500' },
    { range: '2.5 - 2.9', rating: 'Good', color: 'bg-blue-400' },
    { range: '3.0', rating: 'Passed', color: 'bg-yellow-500' },
    { range: '3.1 - 4.0', rating: 'Conditional Failure', color: 'bg-orange-500' },
    { range: '4.1 - 5.0', rating: 'Failure', color: 'bg-red-500' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-center text-gray-700 mb-6">Grading Scale</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gradeRanges.map((item, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
            <div className="flex-1">
              <div className="text-gray-600">{item.range}</div>
            </div>
            <div className="text-gray-800">{item.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
