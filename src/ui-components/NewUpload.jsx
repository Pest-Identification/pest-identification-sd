import React from 'react';
import './FReference.css';

function NewUpload() {
  return (
<div className="flex flex-col items-center justify-center w-screen h-screen">
  <div className="flex flex-col items-center justify-center w-full max-w-lg bg-white rounded-lg shadow-xl">
    <div className="p-10">
      <h2 className="text-2xl font-semibold mb-2">Upload your files</h2>
      <p className="text-xs text-gray-500 mb-4">File should be of format .mp4, .avi, .mov or .mkv</p>
      <form action="#" className="relative w-full h-48 max-w-xs bg-gray-100 rounded-lg shadow-inner flex items-center justify-center">
        <input type="file" id="file-upload" className="hidden"/>
        <label htmlFor="file-upload" className="flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
          <p className="text-xs font-light text-center text-gray-500 mb-2">Drag &amp; Drop your files here</p>
          <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
          </svg>
        </label>
      </form>
    </div>
  </div>
</div>

  );
}

export default NewUpload;
