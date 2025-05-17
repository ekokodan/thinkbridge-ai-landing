
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-16 h-16 border-4 border-thinkbridge-300 border-t-thinkbridge-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
