import React, { useState } from 'react';
import './FReference.css';
import { createReport } from '../modules/datastore';
import {Pests} from '../models';
import {isJPEG} from '../modules/utility.jsx';

let userImage = null;
let userType = Pests.UNKNOWN;

function NewUpload() {
  const [imageUrl, setImageUrl] = useState('');
  const [submitedReports, setSubmittedReports] = useState([]);

  

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if(file == null){
      alert("File failed to upload: No file selected");
      userImage = null;
      return;
    }

    isJPEG(file).then(() => {
      console.log("File uploaded")
      const reader = new FileReader();
      userImage = file;
  
      reader.onload = () => {
        setImageUrl(reader.result);
      };
  
      reader.readAsDataURL(file);
      return;
    }).catch( () => {
      userImage = null;
      setImageUrl('');
      alert("Failed to upload: Uploaded image needs to be jpg/jpeg.");
    });
  };

  const handleUserTypeChange = (event) => {
    userType = event.target.value;
  };

  const handleSubmit = (event) => {
    //event.preventDefault();    
    createReport(userImage, userType)
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-full">
      <div className="relative mb-4">
      <h1 class="text-4xl font-bold">What Do You Think It Is?</h1>
        <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600" onChange={handleUserTypeChange}>
          <option value={Pests.SPOTTED_LANTERN_FLY}>Spotted LanternFly</option>
          <option value={Pests.GRAPE_BERRY_MOTH}>GrapeBerry Moth</option>
          <option value={Pests.UNKNOWN}>I Do Not Know</option>
        </select>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-lg bg-white rounded-lg shadow-xl">
        <div className="p-10">
          <h2 className="text-2xl font-semibold mb-2">Upload picture</h2>
          <p className="text-xs text-gray-500 mb-4">File should be of format .jpeg, .jpg</p>
          <form className="relative w-full h-48 max-w-xs bg-gray-100 rounded-lg shadow-inner flex items-center justify-center">
            <input type="file" accept="image/jpg, image/jpeg" id="file-upload" className="hidden" onChange={handleFileUpload} />
            <label htmlFor="file-upload" className="flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
              {imageUrl ? (
                <img src={imageUrl} alt="Uploaded file" className="w-full h-full object-contain" />
              ) : (
                <>
                  <p className="text-xs font-light text-center text-gray-500 mb-2">Drag &amp; Drop your files here</p>
                  <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                  </svg>
                </>
              )}
            </label>
          </form>
          <button type="submit" className="mt-4 bg-green-400 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700" onClick={handleSubmit}>
              Submit
            </button>
        </div>
      </div>

      <div>
      </div>
    </div>
  );
}

export default NewUpload;
