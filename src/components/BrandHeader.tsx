const BrandHeader = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 py-8 px-6">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto text-center">


        
        {/* Floating elements */}
        <div className="absolute top-12 left-12 w-4 h-4 bg-emerald-400 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-24 right-16 w-3 h-3 bg-teal-300 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-16 left-20 w-5 h-5 bg-white/30 rounded-full animate-bounce delay-1500"></div>
      </div>
    </div>
  );
};

export default BrandHeader;