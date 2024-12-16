// components/ToursSkeleton.tsx
const ToursSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, idx) => (
        <div
          key={idx}
          className="p-4 rounded-lg shadow-md bg-gray-300 animate-pulse h-52"
        />
      ))}
    </div>
  );
};

export default ToursSkeleton;
