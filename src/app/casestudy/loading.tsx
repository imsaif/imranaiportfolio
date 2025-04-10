export default function Loading() {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12 max-w-5xl">
      <div className="py-4 mb-8">
        <div className="w-40 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>

      <div className="space-y-8">
        {/* Title skeleton */}
        <div className="w-3/4 h-12 bg-gray-200 animate-pulse rounded-lg"></div>

        {/* Description skeleton */}
        <div className="space-y-3">
          <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="w-3/4 h-4 bg-gray-200 animate-pulse rounded"></div>
        </div>

        {/* Image skeleton */}
        <div className="w-full aspect-video bg-gray-200 animate-pulse rounded-lg"></div>

        {/* Content skeletons */}
        <div className="space-y-5">
          <div className="w-1/2 h-6 bg-gray-200 animate-pulse rounded"></div>
          <div className="space-y-3">
            <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-5/6 h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="w-1/3 h-6 bg-gray-200 animate-pulse rounded"></div>
          <div className="space-y-3">
            <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-4/5 h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
