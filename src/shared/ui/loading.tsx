interface LoadingCardProps {
  title?: string;
  className?: string;
}

export function LoadingCard({ title, className = "" }: LoadingCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border p-6 animate-pulse ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {title && <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>}
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded"></div>
      </div>
      <div className="mt-4">
        <div className="h-4 bg-gray-200 rounded w-40"></div>
      </div>
    </div>
  );
}

interface LoadingStatsProps {
  count?: number;
}

export function LoadingStats({ count = 3 }: LoadingStatsProps) {
  return (
    <div>
      {/* Stock Plans Summary Loading */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8 max-w-2xl animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
        <div className="flex items-center gap-4">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      {/* Stats Cards Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: count }).map((_, index) => (
          <LoadingCard key={index} title="Loading..." />
        ))}
      </div>
    </div>
  );
}
