import React from "react";

const Loader = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center max-w-sm mx-auto">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
        <p className="mt-4 text-white">Loading...</p>
      </div>
    </>
  );
};

export default Loader;
