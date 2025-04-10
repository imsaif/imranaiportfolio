export default function Loading() {
  return (
    <div className="bg-[#f8f9fe] min-h-screen">
      {/* Header section */}
      <header className="bg-white py-4 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="w-40 h-7 bg-gray-200 animate-pulse rounded"></div>
          <nav className="flex space-x-8">
            <div className="w-16 h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-16 h-6 bg-gray-200 animate-pulse rounded"></div>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="w-2/3 h-14 bg-gray-200 animate-pulse rounded-lg mb-12"></div>

        {/* Introduction Section */}
        <div className="mb-16 border-l-4 border-gray-200 pl-6 py-4 bg-white rounded-lg shadow-sm">
          <div className="space-y-3">
            <div className="w-full h-5 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-full h-5 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-4/5 h-5 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>

        {/* Project Overview Section */}
        <section className="mb-16">
          <div className="w-1/3 h-8 bg-gray-200 animate-pulse rounded mb-6"></div>
          <div className="h-1 w-24 mb-10 rounded-full bg-gray-200 animate-pulse"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow h-32 animate-pulse"></div>
            <div className="bg-white rounded-2xl p-6 shadow h-32 animate-pulse"></div>
            <div className="bg-white rounded-2xl p-6 shadow h-32 animate-pulse"></div>
          </div>
        </section>

        {/* Additional Sections */}
        <div className="space-y-16">
          <section>
            <div className="w-1/3 h-8 bg-gray-200 animate-pulse rounded mb-6"></div>
            <div className="h-1 w-24 mb-10 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="bg-white p-8 rounded-xl shadow mb-8">
              <div className="space-y-4">
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-4/5 h-5 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          </section>

          <section>
            <div className="w-1/3 h-8 bg-gray-200 animate-pulse rounded mb-6"></div>
            <div className="h-1 w-24 mb-10 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="bg-white p-8 rounded-xl shadow mb-8">
              <div className="space-y-4">
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-4/5 h-5 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
