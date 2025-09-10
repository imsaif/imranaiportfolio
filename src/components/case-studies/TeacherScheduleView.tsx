import React from 'react';

interface ScheduleItem {
  time: string;
  subject: string;
  teacher: string;
  color: string;
  type: 'lesson' | 'break' | 'assembly' | 'dismissal';
}

interface TeacherScheduleViewProps {
  onSubjectClick: (subject: string) => void;
}

const scheduleData: ScheduleItem[] = [
  { time: '8:00 AM', subject: 'Assembly', teacher: 'All Staff', color: 'bg-gray-100 text-gray-800', type: 'assembly' },
  { time: '8:30 AM', subject: 'Mathematics', teacher: 'Mr. Okoro', color: 'bg-blue-100 text-blue-800', type: 'lesson' },
  { time: '9:15 AM', subject: 'English', teacher: 'Ms. Adesina', color: 'bg-green-100 text-green-800', type: 'lesson' },
  { time: '10:00 AM', subject: 'Short Break', teacher: '', color: 'bg-gray-100 text-gray-800', type: 'break' },
  { time: '10:15 AM', subject: 'Science', teacher: 'Mr. Bello', color: 'bg-yellow-100 text-yellow-800', type: 'lesson' },
  { time: '11:00 AM', subject: 'Social Studies', teacher: 'Mr. Johnson', color: 'bg-orange-100 text-orange-800', type: 'lesson' },
  { time: '11:45 AM', subject: 'Lunch Break', teacher: '', color: 'bg-gray-100 text-gray-800', type: 'break' },
  { time: '12:30 PM', subject: 'Reading Time', teacher: 'Ms. Adesina', color: 'bg-purple-100 text-purple-800', type: 'lesson' },
  { time: '1:00 PM', subject: 'Art Class', teacher: 'Ms. Rivera', color: 'bg-pink-100 text-pink-800', type: 'lesson' },
  { time: '1:45 PM', subject: 'Physical Education', teacher: 'Coach Adams', color: 'bg-teal-100 text-teal-800', type: 'lesson' },
  { time: '2:30 PM', subject: 'Music Class', teacher: 'Mr. Davis', color: 'bg-indigo-100 text-indigo-800', type: 'lesson' },
  { time: '3:15 PM', subject: 'Study Hall', teacher: 'Various', color: 'bg-gray-100 text-gray-800', type: 'lesson' },
  { time: '4:00 PM', subject: 'After School Activities', teacher: 'Various', color: 'bg-gray-100 text-gray-800', type: 'assembly' },
  { time: '4:30 PM', subject: 'Dismissal', teacher: 'All Staff', color: 'bg-gray-100 text-gray-800', type: 'dismissal' },
];

const TeacherScheduleView: React.FC<TeacherScheduleViewProps> = ({ onSubjectClick }) => {
  const handleItemClick = (item: ScheduleItem) => {
    if (item.type === 'lesson') {
      onSubjectClick(item.subject);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Fixed Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex-shrink-0">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Today's Schedule - Monday
        </h3>
        <p className="text-gray-600 mt-1 text-sm">Click on any lesson to view the teaching guide</p>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {scheduleData.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex">
                <div className="bg-gray-50 px-4 py-4 text-sm font-medium text-gray-700 min-w-[100px] border-r border-gray-200">
                  {item.time}
                </div>
                <div className="flex-1 p-1">
                  <div 
                    className={`
                      rounded p-3 border border-gray-100
                      ${item.color} 
                      ${item.type === 'lesson' ? 'cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]' : 'cursor-default'}
                    `}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="font-semibold text-base mb-1">{item.subject}</div>
                    {item.teacher && (
                      <div className="text-sm opacity-75">{item.teacher}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add extra space to test scrolling */}
          <div className="h-20 flex items-center justify-center text-gray-400 text-sm">
            End of schedule
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherScheduleView;