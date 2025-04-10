import { Project } from '@/data/projects';

interface ProjectMockupProps {
  project: Project;
}

export const ProjectMockup = ({ project }: ProjectMockupProps) => {
  if (project.slug === 'lessonloom') {
    return (
      <div className="relative aspect-video bg-gradient-to-br from-white to-indigo-100 rounded-lg overflow-hidden shadow-lg">
        {/* Add an animated gradient overlay for better visibility */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none z-10 bg-[length:200%_200%]"
          style={{ animation: 'gradientFlow 2s ease infinite' }}
        ></div>

        {/* Dashboard-style mockup */}
        <div className="absolute inset-0 p-4">
          {/* Header */}
          <div className="h-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm flex items-center px-4 mb-4">
            <div className="w-32 h-4 bg-indigo-200 rounded"></div>
            <div className="ml-auto flex space-x-2">
              <div className="w-8 h-8 bg-indigo-200 rounded-full"></div>
              <div className="w-8 h-8 bg-indigo-200 rounded-full"></div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-3 gap-4 h-[calc(100%-4rem)]">
            {/* Sidebar */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-4">
              <div className="w-full h-4 bg-indigo-200 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
                <div className="w-4/5 h-3 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-4">
              <div className="h-full flex flex-col">
                <div className="w-full h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-lg shadow-sm"></div>
                </div>
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <div className="bg-white/70 rounded-lg p-3 shadow-sm">
                    <div className="w-full h-4 bg-indigo-200 rounded mb-2"></div>
                    <div className="space-y-2">
                      <div className="w-full h-3 bg-gray-200 rounded"></div>
                      <div className="w-4/5 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 shadow-sm">
                    <div className="w-full h-4 bg-indigo-200 rounded mb-2"></div>
                    <div className="space-y-2">
                      <div className="w-full h-3 bg-gray-200 rounded"></div>
                      <div className="w-4/5 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (project.slug === 'scheduler') {
    return (
      <div className="relative aspect-video bg-gradient-to-br from-white to-blue-100 rounded-lg overflow-hidden shadow-lg">
        {/* Add an animated gradient overlay for better visibility */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none z-10 bg-[length:200%_200%]"
          style={{ animation: 'gradientFlow 2s ease infinite' }}
        ></div>

        {/* Calendar-style mockup */}
        <div className="absolute inset-0 p-4">
          {/* Header */}
          <div className="h-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm flex items-center px-4 mb-4">
            <div className="w-32 h-4 bg-blue-200 rounded"></div>
            <div className="ml-auto flex space-x-2">
              <div className="w-24 h-8 bg-blue-200 rounded-md"></div>
              <div className="w-8 h-8 bg-blue-200 rounded-full"></div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 h-[calc(100%-4rem)] bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="relative bg-white/70 rounded p-1 hover:bg-blue-50/90 transition-colors shadow-sm">
                <div className="absolute top-1 left-1 w-4 h-4 text-xs flex items-center justify-center text-gray-600">
                  {i + 1}
                </div>
                {i % 7 === 3 && (
                  <div className="absolute top-6 left-1 right-1">
                    <div className="h-2 bg-gradient-to-r from-blue-300 to-purple-300 rounded mb-1 shadow-sm"></div>
                    <div className="h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded shadow-sm"></div>
                  </div>
                )}
                {i % 7 === 5 && (
                  <div className="absolute top-6 left-1 right-1">
                    <div className="h-2 bg-gradient-to-r from-blue-300 to-purple-300 rounded shadow-sm"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
