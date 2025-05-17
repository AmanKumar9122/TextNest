import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightSideBar = ({ selectedUser }) => {

  return selectedUser ? (
    <div className="h-full flex flex-col"> {/* Add flex and height */}
      <div className="p-4 border-l border-gray-800 flex-1 flex flex-col"> {/* Add flex-1 */}
        {/* User Info */}
        <div className="flex flex-col items-center gap-4">
          <img 
            src={selectedUser?.profilePic || assets.avatar_icon} 
            alt="Profile"
            className="w-20 aspect-square rounded-full" 
          />
          <h1 className="text-xl font-medium text-white flex items-center gap-2">
            {selectedUser.fullName}
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          </h1>
          <p className="text-gray-400 text-center">{selectedUser.bio}</p>
        </div>

        {/* Media Section */}
        <hr className='border-[#ffffff50] my-4'/>
        <div className='px-5 text-xs text-white'>
          <p>Media</p>
          <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
            {imagesDummyData.map((url, index) => (
              <div 
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded overflow-hidden"
              >
                <img 
                  src={url} 
                  alt={`Media ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Logout Button */}
        <button
          className="absolute bottom-5 left-1/2 transform
          -translate-x-1/2 bg-gradient-to-r from-purple-400
          to-violet-600 text-white border-none text-sm font-light
          py-2 px-20 rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  ) : null;
}

export default RightSideBar